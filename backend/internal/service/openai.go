package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"health-care-ai/internal/model"
)

const systemPrompt = `You are a medical assistant. Provide possible initial diagnosis and remedies based on age, sex, weight in lbs, height in cm, and symptoms. Emphasize this is not professional medical advice and to consult a doctor.

Respond in JSON format with two fields:
- "diagnosis": a string with the possible diagnosis
- "remedies": a string with suggested remedies

Only output valid JSON, no markdown fences.`

type chatRequest struct {
	Model    string        `json:"model"`
	Messages []chatMessage `json:"messages"`
}

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func Diagnose(req model.DiagnoseRequest) (*model.DiagnoseResponse, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("OPENAI_API_KEY not set")
	}

	userMsg := fmt.Sprintf(
		"Patient info:\n- Age: %d\n- Sex: %s\n- Weight: %.1f lbs\n- Height: %d cm\n- Symptoms: %s",
		req.Age, req.Sex, req.WeightLbs, req.HeightCm, req.Symptoms,
	)

	body, _ := json.Marshal(chatRequest{
		Model: "gpt-4o-mini",
		Messages: []chatMessage{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: userMsg},
		},
	})

	httpReq, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("OpenAI API error (status %d): %s", resp.StatusCode, string(respBody))
	}

	var chatResp chatResponse
	if err := json.Unmarshal(respBody, &chatResp); err != nil {
		return nil, err
	}

	if len(chatResp.Choices) == 0 {
		return nil, fmt.Errorf("no response from OpenAI")
	}

	var result model.DiagnoseResponse
	if err := json.Unmarshal([]byte(chatResp.Choices[0].Message.Content), &result); err != nil {
		// If JSON parsing fails, return raw content as diagnosis
		result.Diagnosis = chatResp.Choices[0].Message.Content
		result.Remedies = ""
	}

	return &result, nil
}
