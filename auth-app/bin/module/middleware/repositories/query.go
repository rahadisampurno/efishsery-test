package repositories

import (
	"auth-app/bin/module/middleware/entity"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

func AddUser(user entity.User) (err error) {
	var users []entity.User

	bytUser, err := ioutil.ReadFile(os.Getenv("DBROUTE"))
	if err != nil {
		users = append(users, user)
		bytUser, err = json.Marshal(users)
		if err != nil {
			return
		}

		if err = ioutil.WriteFile(os.Getenv("DBROUTE"), bytUser, 0644); err != nil {
			return
		}
	}
	err = json.Unmarshal(bytUser, &users)
	if err != nil {
		return
	}

	for _, v := range users {
		if v.Phone == user.Phone {
			return fmt.Errorf("Data is exsist")
		}
	}

	users = append(users, user)
	bytUser, err = json.Marshal(users)
	if err != nil {
		return
	}

	if err = ioutil.WriteFile(os.Getenv("DBROUTE"), bytUser, 0644); err != nil {
		return
	}

	return
}

/*
func AddUser(user entity.User) (err error) {
	var users []entity.User
	var bytUser []byte

	// bytUser, err := ioutil.ReadFile("../database/db.json")
	file, err := os.OpenFile("../database/db.json", os.O_RDONLY, 0777)
	if err != nil {
		users = append(users, user)

		bytUser, err = json.Marshal(users)
		if err != nil {
			return
		}

		if err = ioutil.WriteFile("../database/db.json", bytUser, 0777); err != nil {
			return
		}
	}
	defer file.Close()

	fileinfo, err := file.Stat()
	if err != nil {
		return
	}

	filesize := fileinfo.Size()
	bytUser = make([]byte, filesize)
	_, err = file.Read(bytUser)
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(bytUser, &users)
	if err != nil {
		return
	}

	for _, v := range users {
		if v.Phone == user.Phone {
			return fmt.Errorf("Data is exsist")
		}
	}

	users = append(users, user)
	bytUser, err = json.Marshal(users)
	if err != nil {
		return
	}

	if err = ioutil.WriteFile("../database/db.json", bytUser, 0777); err != nil {
		return
	}

	return
}
*/

func UpdateRoleByPhone(phone, role string) (err error) {
	var users []entity.User
	bytUser, err := ioutil.ReadFile(os.Getenv("DBROUTE"))
	if err != nil {
		return
	}
	err = json.Unmarshal(bytUser, &users)
	if err != nil {
		return
	}

	for i, v := range users {
		if v.Phone == phone {
			users[i].Role = role
			break
		}
	}

	result, e := json.Marshal(users) //Returns the Json encoding of u into the variable result
	if e != nil {
		return
	}

	err = ioutil.WriteFile(os.Getenv("DBROUTE"), result, 0644)
	if err != nil {
		return
	}

	return
}

func GetUserByPhone(phone string) (user entity.User, err error) {
	var users []entity.User
	bytUser, err := ioutil.ReadFile(os.Getenv("DBROUTE"))
	if err != nil {
		return
	}
	err = json.Unmarshal(bytUser, &users)
	if err != nil {
		return
	}

	for _, v := range users {
		if v.Phone == phone {
			user = v
			break
		}
	}
	return
}
