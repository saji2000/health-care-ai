package handler

import (
	"encoding/json"
	"net/http"

	"health-care-ai/internal/model"
	"health-care-ai/internal/service"
)

func Diagnose(w http.ResponseWriter, r *http.Request) {
	var req model.DiagnoseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if req.Age <= 0 || req.Sex == "" || req.WeightLbs <= 0 || req.HeightCm <= 0 || req.Symptoms == "" {
		http.Error(w, `{"error":"all fields are required"}`, http.StatusBadRequest)
		return
	}

	result, err := service.Diagnose(req)
	if err != nil {
		http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
