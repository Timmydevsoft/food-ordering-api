# Food Ordering API

## Overview

The Food Ordering API is a RESTful API built with Express and TypeScript, designed to facilitate food ordering for customers. This API allows users to create, read, update, and delete food items, manage orders, and handle user authentication.

## Features

- User authentication (registration and login)
- CRUD operations for food items
- Order management
- Search and filter capabilities for food items
- Responsive API design

## Tech Stack

- **Node.js**: JavaScript runtime for building the API
- **Express**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript for type safety
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for secure authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
      git clone https://github.com/Timmydevsoft/food-ordering-api.git
     cd food-ordering-api
     npm install
   ```

2. Setup environment variables
   ```
   MONGOURL = "mongodb://localhost:27017/FOOD_ORDERING_APP"
   PORT= yourportnum
   AUTH0_AUDIENCE= your auth0 audience if using it
   AUT0_ISSUERBASEURLSURL= AUT0_ISSUERBASEURLSURL
   AUTH0_TOKENSIGNINGALG= SIGHNING ALGORITHM 
   npm start
   ```
