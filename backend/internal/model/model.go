package model

type DiagnoseRequest struct {
	Age       int     `json:"age"`
	Sex       string  `json:"sex"`
	WeightLbs float64 `json:"weight_lbs"`
	HeightCm  int     `json:"height_cm"`
	Symptoms  string  `json:"symptoms"`
}

type DiagnoseResponse struct {
	Diagnosis string `json:"diagnosis"`
	Remedies  string `json:"remedies"`
}
