package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	

	"backend/helper"
	"backend/models"

	"fmt"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Connection mongoDB with helper class
var collection = helper.ConnectDB()

// Get all tasks
func getTasks(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	var tasks []models.Task

	// empty filter bson.m{}, grab all data
	cur, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		helper.GetError(err, w)
		return
	}
	
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		var task models.Task
		
		err := cur.Decode(&task) 
		if err != nil {
			log.Fatal(err)
		}

		
		tasks = append(tasks, task)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(tasks) 
}

// Get specific Tasks
func getTask(w http.ResponseWriter, r *http.Request) {
	
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	var task models.Task
	// Get params with mux.
	var params = mux.Vars(r)

	// String to primitive.ObjectID
	id, _ := primitive.ObjectIDFromHex(params["id"])

	// Filter to get specific task
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.TODO(), filter).Decode(&task)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(task)
}

// Get Tasks based on priority tag
func getPriorityTasks(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	var tasks []models.Task

	var params = mux.Vars(r)
	id, _ := params["id"]
	
	// filter out based on priority
	filter := bson.M{"priority": id}
	cur, err := collection.Find(context.TODO(), filter)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		var task models.Task
		
		err := cur.Decode(&task) 
		if err != nil {
			log.Fatal(err)
		}

		tasks = append(tasks, task)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(tasks) 
}

func createTask(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	
	w.Header().Set("Content-Type", "application/json")
	if r.Method == http.MethodPost {
	
		var task models.Task
		
		// we decode our body request params
		_ = json.NewDecoder(r.Body).Decode(&task)

		// insert our task model.
		result, err := collection.InsertOne(context.TODO(), task)

		if err != nil {
			helper.GetError(err, w)
			return
		}

		json.NewEncoder(w).Encode(result)
	}
}

func updateTask(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(r)

	//Get id from parameters
	id, _ := primitive.ObjectIDFromHex(params["id"])

	var task models.Task

	// Create filter
	filter := bson.M{"_id": id}

	// Read update model from body request 
	_ = json.NewDecoder(r.Body).Decode(&task)

	// prepare update model.
	update := bson.D{
		{"$set", bson.D{
			{"title", task.Title},
			{"description", task.Description},
			{"completed", task.Completed},
			{"priority", task.Priority},
		}},
	}

	err := collection.FindOneAndUpdate(context.TODO(), filter, update).Decode(&task)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	task.ID = id

	json.NewEncoder(w).Encode(task)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(r)

	// string to primitve.ObjectID
	id, err := primitive.ObjectIDFromHex(params["id"])

	// prepare filter.
	filter := bson.M{"_id": id}

	deleteResult, err := collection.DeleteOne(context.TODO(), filter)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(deleteResult)
}

// To allow fetch requests from frontend (enable CORS) / * is used for convienience
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

}

func main() {
	fmt.Println("Hello, World!")
	// Init router
	r := mux.NewRouter()

	// Arrange routes
	r.HandleFunc("/api/tasks", getTasks).Methods("GET")
	r.HandleFunc("/api/tasks/{id}", getTask).Methods("GET")
	r.HandleFunc("/api/tasks/priority/{id}", getPriorityTasks).Methods("GET")

	r.HandleFunc("/api/tasks", createTask).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/tasks/{id}", updateTask).Methods("PUT","OPTIONS")
	r.HandleFunc("/api/tasks/{id}", deleteTask).Methods("DELETE","OPTIONS")
	// Set port address
	log.Fatal(http.ListenAndServe(":8000", r))
}
