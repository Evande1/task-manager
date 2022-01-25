# Task-manager
Evan A0231054W

### How to setup project
1. Git clone project
2. Create a mongoDB Atlas Cluster and copy Database link. Replace the password and <> with the password that came with the Atlas Cluster.

![first](/assets/1st.png)

![second](/assets/2nd.png)

![third](/assets/3rd.png)

3. create an app.env file and paste DB_SOURCE=mongodb+srv://evan:<<password>>@task-manager.ttttk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority in the same directory as main.go

4. cd to frontend and run npm install to ensure all dependencies are installed

### How to run locally

1. Starting backend, cd to backend and run

``` 
go run ./ 
```

2. Starting frontend, in another terminal, cd to frontend and run

``` 
npm run start:dev
```

3. Wait for a while and react app should start in a web browser

### Actual application 

# Navigation 

Home page contains all the tasks

![fourth](/assets/4th.png)

Urgent,current,optional page contains tasks filtered based on their priority 


Add task (Completed tasks are highlighted in green)
![fifth](/assets/5th.png)

Edit Task 
![sixth](/assets/6th.png)