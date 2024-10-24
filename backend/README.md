This backend is very rudementry and was written in both a hurry and at a time i didn't know much about backend development. It is not recommended to use this backend in a production environment. It just serves as a placeholder for the frontend to interact with. This documentation is also AI generated and may not be accurate.

## API Endpoints

**`/nav-data` (GET)**

- **Description:** Fetches navigation data.
- **Request Body:** None
- **Response Body:**
  ```JSON
  `{
    "navData": [
      {
        "_id": "string",
        "gender": "string",
        "title": "string",
        "description": "string",
        "image": "string",
        "categories": ["array of strings"]
      },
      // ... more nav data objects
    ]
  }`
  ```

**`/products` (GET)**

- **Description:** Retrieves all products.
- **Request Body:** None
- **Response Body:**
  ```JSON
  `{
    "products": [
      {
        "_id": "string",
        "id": "number",
        "brand": "string",
        "name": "string",
        // ... other product properties
      },
      // ... more product objects
    ]
  }`
  ```

**`/featured` (GET)**

- **Description:** Gets featured items data.
- **Request Body:** None
- **Response Body:**
  ```JSON
  `{
    "featuredData": [
      {
        "_id": "string",
        "title": "string",
        "description": "string",
        "image": "string",
        "color": "string",
        "products": ["array of product IDs"]
      },
      // ... more featured data objects
    ]
  }`
  ```

**`/authorize-token` (GET)**

- **Description:** Verifies a JWT.
- **Request Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:** None
- **Response Body:**
  - 200 OK if token is valid
  - 401 Unauthorized with error message if token is invalid or expired

**`/sign-in` (POST)**

- **Description:** Handles user sign-in.
- **Request Body:**
  ```JSON
  `{
    "email": "user@example.com",
    "password": "password123"
  }`
  ```
- **Response Body:**
  - 200 OK with JWT on success: `{ "message": "Logged In", "token": "<token>" }`
  - 401 Unauthorized with error message on failure

**`/fetch-user` (GET)**

- **Description:** Fetches user data.
- **Request Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:** None
- **Response Body:**
  - 200 OK with user data: `{ "user": { /* user data */ } }`
  - 401 Unauthorized with error message if token is invalid or expired

**`/authorize` (GET)**

- **Description:** Verifies a JWT and returns user data.
- **Request Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:** None
- **Response Body:**
  - 200 OK with user data if token is valid
  - 401 Unauthorized with error message if token is invalid or expired

**`/sign-up` (POST)**

- **Description:** Creates a new user account.
- **Request Body:**
  ```JSON
  `{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "wishlistItems": [],
    "cartItems": [],
    "addresses": [],
    "preferences": {}
  }`
  ```
- **Response Body:**
  - 201 Created on success
  - 401 Unauthorized with error message on failure (e.g., email already exists)

**`/deleteUser` (POST)**

- **Description:** Deletes a user account.
- **Request Body:**
  ```JSON
  `{
    "email": "user@example.com",
    "password": "password123"
  }`
  ```
- **Response Body:**
  - 202 Accepted on successful deletion
  - 401 Unauthorized with error message on failure

**`/changePassword` (POST)**

- **Description:** Updates the user's password.
- **Request Body:**
  ```JSON
  `{
    "email": "user@example.com",
    "password": "oldPassword123",
    "newPassword": "newPassword456"
  }`
  ```
- **Response Body:**
  - 202 Accepted on successful update
  - 401 Unauthorized with error message on failure

**`/updateUser` (POST)**

- **Description:** Updates user data.
- **Request Body:**
  ```JSON
  `{
    "_id": "user ID",
    "wishlistItems": ["array of product IDs"],
    "cartItems": ["array of product IDs"],
    "addresses": ["array of address objects"],
    "orders": ["array of order objects"]
  }`
  ```
- **Response Body:**
  - 202 Accepted on successful update
  - 401 Unauthorized with error message on failure

**`/review` (POST)**

- **Description:** Adds a product review.
- **Request Body:**
  ```JSON
  `{
    "_id": "product ID",
    "email": "user@example.com",
    "name": "John Doe",
    "rating": 4,
    "review": "This is a great product!"
  }`
  ```
- **Response Body:**
  - 202 Accepted on success
  - 401 Unauthorized with error message on failure

**`/placeOrder` (POST)**

- **Description:** Processes an order.
- **Request Body:**
  ```JSON
  `{
    "email": "user@example.com",
    "order": [
      {
        "_id": "product ID",
        "quantity": 2
      },
      // ... more products in the order
    ]
  }`
  ```
- **Response Body:**
  - 202 Accepted on success
  - 401 Unauthorized with error message on failure

**`/verifyPayment` (POST)**

- **Description:** Verifies a Razorpay payment.
- **Request Body:**
  ```JSON
  `{
    "razorpay_order_id": "string",
    "razorpay_payment_id": "string",
    "razorpay_signature": "string"
  }`
  ```
- **Response Body:**
  - 200 OK on successful verification
  - 400 Bad Request on verification failure
