import { Typography } from "@mui/material"

function AboutPage() {
    return (
        <div style={{ margin: 'auto' }}>
            <Typography variant="h5">This is a full-stack web application using ASP.NET Core (backend) and React + Redux (frontend).
                <br />It uses PostgreSQL as the database and is containerized with Docker and deployed on Fly.io.
                <br />The project is based on the Udemy course "Learn to build an e-commerce store with .Net, React & Redux" by Neil Cummings
                with additional changes and a mobile responsive views made by me.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Key Functionalities:
            </Typography>
            <ul>
                <li>
                    User Authentication & Authorization (JWT-based)
                </li>
                <li>
                    State Management with Redux for efficient data handling
                </li>
                <li>
                    CRUD Operations for managing resources (e.g., users, products, basket items)
                </li>
                <li>
                    Search & Filtering for an improved user experience
                </li>
                <li>
                    Responsive UI with Material UI for a modern design
                </li>
                <li>
                    API Integration between React and ASP.NET Core
                </li>
            </ul>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Tech Stack:
            </Typography>
            <ul>
                <li>
                    Backend: ASP.NET Core, Entity Framework Core, PostgreSQL
                </li>
                <li>
                    Frontend: React, Redux, Material UI
                </li>
                <li>
                    Deployment: Docker, Fly.io, GitHub Actions
                </li>
            </ul>

            <Typography variant="h6">
                Designed for scalability, state management, and smooth deployment. 🚀
            </Typography>
        </div >
    )
}

export default AboutPage
