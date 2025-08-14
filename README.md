# Stock Market Dashboard

This is a full-stack stock market dashboard application. It features a FastAPI backend that serves stock data and a React-based frontend to display interactive charts and company information. The application comes pre-populated with sample data for several Indian stock market companies.

## Features

- **Company Overview**: Browse a list of sample companies from the Indian stock market.
- **Interactive Stock Charts**: View a 30-day historical price chart (OHLC) for any selected company.
- **Detailed Statistics**: See key metrics like 30-day high/low, average volume, and sector information.
- **Responsive UI**: The dashboard is designed to be usable on different screen sizes.
- **RESTful API**: A robust FastAPI backend serves all the necessary data.
- **Self-Populating Database**: The backend automatically populates the database with sample company and stock price data on startup.

## Tech Stack

| Component | Technology                                                              |
| :-------- | :---------------------------------------------------------------------- |
| **Frontend**  | React, Vite, [Tailwind CSS](https://tailwindcss.com), [Recharts](https://recharts.org), [Axios](https://axios-http.com), [Lucide React](https://lucide.dev/) |
| **Backend**   | [FastAPI](https://fastapi.tiangolo.com), Uvicorn, [SQLAlchemy](https://www.sqlalchemy.org), [Pydantic](https://pydantic.dev/), PostgreSQL             |

## Architecture

The project is structured as a monorepo with two main folders:

-   `frontend/`: Contains the React client application built with Vite.
-   `backend/`: Contains the FastAPI server application and database logic.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Git
-   Python 3.8+
-   Node.js and npm
-   PostgreSQL

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ajaitiwarii/Stock_market-_dashboard.git
    cd Stock_market-_dashboard/backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    # For Unix/macOS
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up the database connection:**
    -   Create a `.env` file in the `backend/` directory.
    -   Add your PostgreSQL database connection URL to the file. The database must exist, but the tables will be created automatically.
    ```
    # backend/.env
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
    ```
    *Example:* `DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/stock_dashboard_db`

5.  **Run the backend server:**
    ```bash
    python run.py
    ```
    The backend API will be available at `http://localhost:8000`. The database will be automatically populated with sample data on the first run.

### Frontend Setup

1.  **Navigate to the frontend directory in a new terminal:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint                             | Description                                            |
| :----- | :----------------------------------- | :----------------------------------------------------- |
| `GET`  | `/`                                  | Returns a welcome message from the API.                |
| `GET`  | `/companies/`                        | Retrieves a list of all companies.                     |
| `GET`  | `/companies/{company_id}`            | Retrieves detailed information for a specific company. |
| `GET`  | `/companies/{company_id}/stock-prices/` | Retrieves historical stock prices for a company (default: last 30 days). |
