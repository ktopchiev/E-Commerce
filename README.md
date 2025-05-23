### This is a full-stack web application using ASP.NET Core (backend) and React + Redux (frontend).
### It uses PostgreSQL as the database and is containerized with Docker and deployed on Fly.io.
### The project is based on Udemy course by Neil Cummings [Learn to build an e-commerce store with .Net, React & Redux](https://www.udemy.com/course/learn-to-build-an-e-commerce-store-with-dotnet-react-redux/) 
### with a few changes and added a mobile responsive views.

### Key Functionalities:
•	**User Authentication & Authorization** (JWT-based)

•	**State Management** with **Redux** for efficient data handling

•	**CRUD Operations** for managing resources (e.g., users, products, basket items)

•	**Search & Filtering** for an improved user experience

•	**Responsive UI** with **Material UI** for a modern design

•	**API Integration** between **React** and **ASP.NET Core**


### Tech Stack:
•	**Backend**: ASP.NET Core, Entity Framework Core, PostgreSQL

•	**Frontend**: React, Redux, Material UI

•	**Deployment**: Docker, Fly.io, GitHub Actions

### Designed for scalability, state management, and smooth deployment. 🚀

### How to run the app locally:

1. Create a project folder, open a terminal and cd to that folder, then run this command `git clone https://github.com/ktopchiev/E-Commerce` to clone the project.
2. [Install](https://www.docker.com/get-started/) Docker for desktop.
4. Go to terminal and run `docker run --name devDb -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest`.
5. Now Postgres Db container should be running. *When the initial image is created you can use Docker desktop to run it. Go to Containers and run devDb.*
6. Go to the project, cd to /API and run `dotnet watch --no-hot-reload`.
7. Cd to E-commerce/client and run `npm start`. Now you can explore the running app on [http://localhost:3000](http://localhost:3000).
8. To test the API endpoints go to:
   - [http://localhost:5000/swagger ](http://localhost:5000/swagger/index.html)
