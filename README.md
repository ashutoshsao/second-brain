# Second Brain

This is a "Second Brain" application, designed to help you organize, store, and connect your thoughts, notes, and ideas.

## Features

### Backend

- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).
- **Content Management**: Create, retrieve, update, and delete your content.
- **Tagging**: Assign tags to your content for better organization.
- **Sharing**: Generate a public link to share your content with others.

### Frontend

- **User Authentication**: Signup and signin forms.
- **Dashboard**: A dashboard to view and manage your content.
- **Create Content Modal**: A modal to add new content.
- **Custom UI Components**: A custom-built UI library with the following components:
    - Button
    - Card
    - Input
    - Sidebar
    - SidebarItem
    - and various icons.

## Technologies

### Backend

- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod

### Frontend

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Project Structure

The project is a monorepo with the following structure:

```
/
├── backend/
│   ├── src/
│   └── ...
└── frontend/
    ├── src/
    └── ...
```

- **`backend/`**: A Node.js, Express, and MongoDB application that serves as the API.
- **`frontend/`**: A React, TypeScript, and Vite application that provides the user interface.

## Getting Started

To get started with development, you will need to run both the backend and frontend services.

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```
    JWT_SECRET=your_jwt_secret
    MONGO_URL=your_mongo_db_url
    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.