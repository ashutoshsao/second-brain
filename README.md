# Second Brain

This is a "Second Brain" application, designed to help you organize, store, and connect your thoughts, notes, and ideas.

## Development Status

**Backend:** Partially completed.
**Frontend:** Not started.

## Project Structure

The project is organized into two main directories:

*   `backend/`: Contains the Node.js backend application.
*   `frontend/`: Will contain the React frontend application (to be implemented).

## Technology Stack

### Backend

*   **Database**: MongoDB with Mongoose for object data modeling.
*   **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
*   **Password Hashing**: bcrypt for hashing user passwords.

## Features

### Backend

*   **User Authentication**: Partially implemented.
*   **Note Management**: Not started.
*   **Tagging/Categorization**: Not started.
*   **Search**: Not started.
*   **Graph-Based Linking**: Not started.

### Frontend (Planned)

*   **Rich Text Editor**: A powerful editor for creating and formatting notes.
*   **Note Visualization**: A graph visualization to see the connections between your notes.
*   **Intuitive UI**: A clean and easy-to-use interface for managing your second brain.

## Backend Setup

The backend is a Node.js application. To run it, follow these steps:

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm run dev
    ```

The server will start on the port specified in `src/index.ts`.