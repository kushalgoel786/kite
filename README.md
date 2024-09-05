# Kite

### See it live [here](https://kite-zerodha.vercel.app/).

## Overview

This project is a Full Stack application that allows users to view historical stock data, manage their profiles, and place orders. The application consists of a backend API built with Node.js and a frontend developed using React. 

## Features

- **User Authentication**: Users can register and log in to access their dashboard.
- **Dashboard**: Displays user profile information, holdings, and an interactive chart of historical prices.
- **Historical Data API**: Fetches historical price data based on user input.
- **Order Placement**: Users can place orders through a simple form.
- **Real-time market data**: View real time data, implemented through Websockets

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: Supabase PostgreSQL (Prod), SQLite (Dev)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kushalgoel786/kite.git
   cd kite
   ```

2. **Install dependencies**:

   ```bash
   npm run setup
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following

   ```
   NODE_ENV=development
   JWT_SECRET=<jwt secret key>
   JWT_EXPIRES_IN=1d
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

   The application might throw an error saying `need to install sqlite3 manually`, which can be resolved by running `npm i sqlite3`.

## Usage
Once the development server is running, you can access the application at `http://localhost:5173`.

## API Endpoints

All endpoints start with the base url: "/api/v1"

- **User Profile**:
  - `POST /user/register`: Register a new user.
  - `POST /user/login`: Log in an existing user.
  - `GET /user/logout`: Log out the current user.
  - `GET /user/profile`: Retrieve user profile information.

- **Historical Data**:
  - `GET /historical-data`: Fetch historical price data with query parameters for `symbol`, `from_date`, and `to_date`.

- **Portfolio Holdings**:
  - `GET /portfolio/holdings`: Get holdings data.

- **Order Placement**:
  - `POST /order/place_order`: Submit a new order. Requires body to have `symbol`, `price` and `quantity` fields. 

## Websockets

The websocket server is implemented as a different application and deployed to a different server. It can be found [here](https://github.com/kushalgoel786/stock_price_server).

## Problems Faced

During the development of this application, several challenges were encountered:

- **Deployment Issues**: While deploying the application using Vercel serverless functions, I faced difficulties since Vercel does not support SQLite. As a solution, I transitioned to using Supabase PostgreSQL instead of SQLite.

- **WebSocket Limitations**: Vercel serverless functions do not support WebSockets, which led me to integrate Keyob for establishing WebSocket connections to publish dummy price data.

- **Chart Customization**: Customizing charts for the frontend to effectively display the data proved to be a challenging task.

