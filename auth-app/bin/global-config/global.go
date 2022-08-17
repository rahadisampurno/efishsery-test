package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func Main(input string) string {
	get := godotenv.Load()
	if get != nil {
		fmt.Println("Godotent is null")
	}
	return os.Getenv(input)
}
