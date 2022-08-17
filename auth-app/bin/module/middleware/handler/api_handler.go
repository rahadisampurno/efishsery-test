package user_handler

import (
	"auth-app/bin/module/middleware/entity"
	"auth-app/bin/module/middleware/model"
	"auth-app/bin/module/middleware/usecase"
	"encoding/json"
	"net/http"

	"github.com/gorilla/context"
	"github.com/gorilla/mux"
)

type Responses struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json"data"`
}

func RegistrasiUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var requestData entity.User
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	password, err := usecase.RegistrasiUser(requestData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	json.NewEncoder(w).Encode(Responses{
		Code:    200,
		Message: "success",
		Data: map[string]interface{}{
			"password": password,
		},
	})
}

type RequestLogin struct {
	Phone    string `json:"phone"`
	Password string `json:"password"`
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var requestData RequestLogin
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	token, err := usecase.Login(requestData.Phone, requestData.Password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	json.NewEncoder(w).Encode(Responses{
		Code:    200,
		Message: "success",
		Data: map[string]interface{}{
			"token": token,
		},
	})
}

func UpdateRoleUser(w http.ResponseWriter, r *http.Request) {
	var claims model.Payload
	bind, ok := context.Get(r, "bind").([]byte)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusBadRequest,
			Message: "error when bind data",
			Data:    nil,
		})
		return
	}

	err := json.Unmarshal(bind, &claims)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	role := mux.Vars(r)["role"]
	if err = usecase.UpdateRoleUser(claims.Phone, role); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Responses{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
			Data:    nil,
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Responses{
		Code:    200,
		Message: "updated",
		Data:    nil,
	})
}
