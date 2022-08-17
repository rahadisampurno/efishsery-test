# FROM playcourt/jenkins:go1.17-s
FROM golang:1.17.13-alpine

#Set Working Directory
WORKDIR /usr/src/app

COPY ./auth-app .

#COPY .env ./

# Build Go
RUN go build .

# Expose Application Port
EXPOSE 9001

# Run The Application
CMD ["./auth-app"]
