# HMCTS Task Management — Frontend

A web application for HMCTS caseworkers to create, view, update and delete tasks.

The frontend uses TypeScript, Express, Nunjucks and GOV.UK Frontend. It communicates with a backend REST API to store and manage tasks.

## Features

- View all tasks, including their title, description, status and due date.
- Create tasks with a title, optional description, status and due date.
- Update a task's status.
- Delete tasks.
- Display validation and error messages when an operation fails.
- Use GOV.UK Frontend components for a familiar, accessible interface.

## Prerequisites

- Node.js 18 or later.
- Corepack and Yarn.
- The HMCTS task management backend running locally on port `4000`.

## Getting started

Open a terminal in the frontend project directory.

Install dependencies:

```bash
corepack yarn install
```

Build the frontend assets:

```bash
corepack yarn build
```

Start the development server:

```bash
corepack yarn start:dev
```

Open the application at:

https://localhost:3100

The backend API must be running at `http://localhost:4000` for task operations to work.

## Testing and code quality

Run the frontend route tests:

```bash
corepack yarn test:routes
```

Run the unit tests:

```bash
corepack yarn test:unit
```

Build the frontend:

```bash
corepack yarn build
```

Check SCSS styling:

```bash
corepack yarn stylelint "src/**/*.scss" -q
```

Check JavaScript and TypeScript code:

```bash
corepack yarn eslint src
```

Check formatting:

```bash
corepack yarn prettier --check src
```

## Backend API

The frontend communicates with the following backend endpoints:

| Operation | Method | Endpoint |
|---|---|---|
| Retrieve all tasks | GET | `/api/tasks` |
| Create a task | POST | `/api/tasks` |
| Update task status | PATCH | `/api/tasks/{id}/status` |
| Delete a task | DELETE | `/api/tasks/{id}` |

The backend Swagger UI is available at:

http://localhost:4000/swagger-ui/index.html

See the backend project's README for backend setup, database configuration and full API documentation.
