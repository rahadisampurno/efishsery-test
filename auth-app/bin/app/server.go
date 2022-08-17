package app

import (
	config "auth-app/bin/global-config"
	user_handler "auth-app/bin/module/middleware/handler"
	"auth-app/bin/module/middleware/usecase"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Server() {
	port := config.Main("port")
	router := mux.NewRouter()
	http.Handle("/", router)

	router.HandleFunc("/efishery/auth/register", user_handler.RegistrasiUser).Methods("POST")
	router.HandleFunc("/efishery/auth/login", user_handler.LoginUser).Methods("POST")
	router.HandleFunc("/efishery/auth/{phone}/{role}", usecase.VerifyToken(user_handler.UpdateRoleUser)).Methods("PUT")

	//port of router
	fmt.Printf("Connected to port %v \n", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
