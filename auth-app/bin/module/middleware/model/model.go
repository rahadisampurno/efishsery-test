package model

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
)

type Payload struct {
	Username string    `json:"username"`
	Phone    string    `json:"phone"`
	ID       uuid.UUID `json:"id"`
	Role     string    `json:"role"`
	jwt.StandardClaims
}
