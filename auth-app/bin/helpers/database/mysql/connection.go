package mysql

import (
	config "auth-app/bin/global-config"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	host := config.Main("MYSQL_HOST")
	port := config.Main("MYSQL_PORT")
	user := config.Main("MYSQL_USER")
	password := config.Main("MYSQL_PASSWORD")
	database := config.Main("MYSQL_DATABASE")

	connection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, database)

	// db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/golang1")
	db, err := sql.Open("mysql", connection)

	if err != nil {
		log.Fatal(err)
	}

	return db
}
