# Project: Live Scoreboard API Service

## Overview
- This module is responsible for managing and updating the live scoreboard on our website.
- It listens for user score update requests, validates them, and ensures real-time updates for all connected clients.
- The scoreboard displays the top 10 users with the highest scores.

## Features
- Real-Time Scoreboard Updates: The top 10 user scores are updated live without the need to refresh the page.
- Secure Score Update: Prevents unauthorized score manipulation through robust validation and authentication mechanisms.
- Efficient Data Handling: Only the top 10 scores are retrieved and broadcasted to minimize server load.

## High-Level Architecture
- Middleware: Accepts and validates requests to update user scores.
- Scoreboard Service: Handles business logic for updating and retrieving the top 10 scores.
- WebSocket Service: Manages real-time communication with connected clients for live updates.
- Database Layer: Stores user scores and retrieves the top 10 for display.

## API Specification
#### 1. GET **/api/scores?limit=10**
- **Description**: Retrieves the top user scores. The limit query parameter specifies the maximum number of scores to return. Default is 10.
- **Request Parameters**:

  Parameter  | Type | Description | Required | Default
  ----- | ----- | ----- | ----- | -----
  `limit`  | Integer | Maximum number of scores to retrieve | No | 10

- **Response**:
  ```js
  {
    "scores": [
      { "username": "user1", "score": 100 },
      { "username": "user2", "score": 95 }
    ]
  }
  ```
- **Response Codes**:
	- `200 OK`: Successfully retrieved scores.
	- `400 Bad Request`: Invalid request data.
	- `401 Unauthorized`: Request not authenticated.
	- `500 Internal Server Error`: Server-side issue.
- **Security Considerations**:
	- Ensure all requests are authenticated using JWT.
	- Ensure limit is within a reasonable range (e.g., 1–100).
	- Protect the endpoint from abuse by applying rate limits.

 #### 2. POST **/api/scores**
- **Description**: Updates the user’s score upon completing an action.
- **Request body**:

  ```js
  { "username": "user1", "score": 100 }
  ```
- **Response**:
  ```js
  { _id: "xxxxxx", username": "user1", "score": 100 }
  ```
- **Response Codes**:
	- `200 OK`: Score updated successfully.
	- `400 Bad Request`: Invalid request data.
	- `401 Unauthorized`: Request not authenticated.
	- `500 Internal Server Error`: Server-side issue.
- **Security Considerations**:
	- Authenticate requests with a token-based authentication (e.g., JWT).
	- Validate the `username` and ensure it matches the authenticated user.
	- Limit the `score` to prevent unusually large values.
	- Rate-limit requests to avoid abuse.

## WebSocket Event
- **Event**: `scoreboard:update`
- **Description**: Broadcasts the updated top 10 scores to all connected clients.

## Database Schema (Example)
  Field  | Type | Description
  ----- | ----- | -----
  `id`  | UUID | Unique user identifier
  `username`  | VARCHAR(100) | User’s display name
  `score`  | INTEGER | User’s total score
  `updated_at`  | TIMESTAMP | Last score update time

## Sequence Diagram
![image](https://github.com/user-attachments/assets/eba7806d-6293-4dbd-b14e-eb20a50e29e1)


## Comments and Recommendations for Improvement
1. **Scalability**: Consider caching the top 10 scores in memory (e.g., Redis) to reduce database load and improve response time.
2. **Rate Limiting**: Implement request rate limiting to avoid server abuse.
3. **Audit Trail**: Log score updates for later analysis or rollback in case of disputes.
