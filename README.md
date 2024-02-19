# Elia Challenge

* Backend: **ASP.NET Core** / **.net 8.0**
* Frontend: **React**  / **NextJS** 
* Storage:  **MongoDB**
  

## How to run

### 🖥️ Backend 


**Ensure Docker is running, and then spin up the local MongoDB Docker container.**

    cd EliaChallengeAPI/

    docker-compose up -d


**Run the server**

    cd EliaChallengeAPI/

    dotnet dev-certs https --trust
    
    dotnet restore
    dotnet run --launch-profile https


### 🎨 Frontend 

    cd elia-challenge-app/

    # Make sure there is a **.env.local** file containing the environment variable **NEXT_PUBLIC_BACKEND_URL=https://localhost:7244** that points to the backend.

    npm install

    npm run dev

🚀🚀🚀
Enjoy!