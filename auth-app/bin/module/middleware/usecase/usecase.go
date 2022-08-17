package usecase

import (
	"auth-app/bin/module/middleware/entity"
	"auth-app/bin/module/middleware/model"
	"auth-app/bin/module/middleware/repositories"
	"auth-app/bin/response"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/gorilla/context"
	"golang.org/x/crypto/bcrypt"
)

func RegistrasiUser(user entity.User) (password string, err error) {
	hash, password := HashPassword()
	user.Password = hash
	err = repositories.AddUser(user)
	return
}

func UpdateRoleUser(phone string, role string) (err error) {
	return repositories.UpdateRoleByPhone(phone, role)
}

func GetTimeNowUnix(hour int) int64 {
	loc, _ := time.LoadLocation("Asia/Jakarta")
	return time.Now().In(loc).Add(time.Hour * time.Duration(hour)).Unix()
}

func GetTimeNowUnixIssued() int64 {
	loc, _ := time.LoadLocation("Asia/Jakarta")
	return time.Now().In(loc).Unix()
}

func NewPayload(user entity.User, typs string) (payload *model.Payload, err error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	var tmsNow int64 = 0
	if typs == "token" {
		tmsNow = GetTimeNowUnix(24)
	} else {
		tmsNow = GetTimeNowUnix(48)
	}

	tmsIssued := GetTimeNowUnixIssued()

	payload = &model.Payload{
		user.Name,
		user.Phone,
		tokenID,
		user.Role,
		jwt.StandardClaims{
			ExpiresAt: tmsNow,
			Issuer:    "Efishery",
			IssuedAt:  tmsIssued,
		},
	}
	return payload, nil
}

func Login(phone, password string) (token string, err error) {
	usr, err := repositories.GetUserByPhone(phone)
	if err != nil {
		return
	}
	if !CheckPasswordHash(password, usr.Password) {
		err = fmt.Errorf("Password is wrong")
		return
	}

	token = CreateToken(usr)
	return
}

func CreateToken(user entity.User) (token string) {
	Payload, _ := NewPayload(user, "token")

	secretKey := os.Getenv("SECRETKEY")
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, Payload)
	token, _ = jwtToken.SignedString([]byte(secretKey))
	return
}

func VerifyToken(next http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		var resp response.Response
		tokenString := request.Header.Get("Authorization")
		strArr := strings.Split(tokenString, " ")
		if len(strArr) == 2 {
			tokenString = strArr[1]
		} else {
			resp = response.Error(response.StatusUnauthorized, nil, nil)
			resp.JSON(writer)
			return
		}

		var claim model.Payload
		token, err := jwt.ParseWithClaims(tokenString, &claim, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("SECRETKEY")), nil
		})

		if err != nil {
			if strings.Contains(err.Error(), "token is expired") {
				resp = response.Error(response.StatusUnauthorized, nil, nil)
				resp.JSON(writer)
				return
			}
			resp = response.Error(response.StatusUnauthorized, nil, nil)
			resp.JSON(writer)
			return
		}

		if !token.Valid {
			resp = response.Error(response.StatusUnauthorized, nil, nil)
			resp.JSON(writer)
			return
		}

		byt, _ := json.Marshal(claim)
		context.Set(request, "bind", byt)
		next.ServeHTTP(writer, request)
	}
}

func CreateRefreshToken(user entity.User) (rfkn string) {
	Payload, err := NewPayload(entity.User{
		Role:  user.Role,
		Phone: user.Phone,
	}, "refreshtoken")
	if err != nil {
		return
	}

	secretKey := os.Getenv("SECRETKEY")
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, Payload)
	rfkn, _ = jwtToken.SignedString([]byte(secretKey))
	return
}

func HashPassword() (hashpass string, truepass string) {
	truepass = RandomWords(7)
	bytes, _ := bcrypt.GenerateFromPassword([]byte(truepass), 14)
	return string(bytes), truepass
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// RandomWords is
func RandomWords(sumRandom int) string {
	const letterBytes = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz"
	b := make([]byte, sumRandom)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}

	return string(b)
}
