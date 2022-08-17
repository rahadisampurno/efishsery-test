package entity

type User struct {
	Phone    string `json:"phone"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Password string `json:"password"`
}
