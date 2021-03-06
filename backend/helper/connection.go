package helper

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"backend/util"
	

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB :helper function to connect mongoDB
// fnc in caps to be exported to main
func ConnectDB() *mongo.Collection {
	
	//the input is current directory as main due to the fnc called there
	config, err := util.LoadConfig(".")

	if err!=nil {
		log.Fatal("cannot load config", err)
	}

	// Set client options
	clientOptions := options.Client().ApplyURI(config.DBSource)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("go_rest_api").Collection("tasks")

	return collection
}

// ErrorResponse : This is error model.
type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

// GetError : This is helper function to prepare error model.
func GetError(err error, w http.ResponseWriter) {

	log.Fatal(err.Error())
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}