# Addis Eats API — Endpoint Design

**API Version:** v1  
**Base Path:** `/api/v1`  
**Project:** Addis Eats

## 1. Restaurants

| Method | Path                             | Purpose                                                                | Success | Failure         |
| ------ | -------------------------------- | ---------------------------------------------------------------------- | ------- | --------------- |
| GET    | `/api/v1/restaurants`            | Retrieve all restaurants, optionally filtered by category or location. | 200 OK  | 400 Bad Request |
| GET    | `/api/v1/restaurants/{id}`       | Retrieve a specific restaurant by its ID.                              | 200 OK  | 404 Not Found   |
| GET    | `/api/v1/restaurants/{id}/menus` | Retrieve all menu items belonging to a restaurant.                     | 200 OK  | 404 Not Found   |

## 2. Menus

| Method | Path                 | Purpose                                                                 | Success     | Failure         |
| ------ | -------------------- | ----------------------------------------------------------------------- | ----------- | --------------- |
| GET    | `/api/v1/menus`      | Retrieve all menu items, optionally filtered by category or restaurant. | 200 OK      | 400 Bad Request |
| GET    | `/api/v1/menus/{id}` | Retrieve a specific menu item by its ID.                                | 200 OK      | 404 Not Found   |
| POST   | `/api/v1/menus`      | Create a new menu item.                                                 | 201 Created | 400 Bad Request |
| PATCH  | `/api/v1/menus/{id}` | Partially update an existing menu item.                                 | 200 OK      | 404 Not Found   |

## 3. Orders

| Method | Path                  | Purpose                                                  | Success     | Failure          |
| ------ | --------------------- | -------------------------------------------------------- | ----------- | ---------------- |
| POST   | `/api/v1/orders`      | Create a new customer order.                             | 201 Created | 400 Bad Request  |
| GET    | `/api/v1/orders`      | Retrieve orders belonging to the authenticated customer. | 200 OK      | 401 Unauthorized |
| GET    | `/api/v1/orders/{id}` | Retrieve a specific order by its ID.                     | 200 OK      | 404 Not Found    |
| PATCH  | `/api/v1/orders/{id}` | Update the status of an existing order.                  | 200 OK      | 409 Conflict     |

## 4. Payments

| Method | Path                    | Purpose                                 | Success     | Failure         |
| ------ | ----------------------- | --------------------------------------- | ----------- | --------------- |
| POST   | `/api/v1/payments`      | Create a payment for an existing order. | 201 Created | 400 Bad Request |
| GET    | `/api/v1/payments/{id}` | Retrieve payment details by payment ID. | 200 OK      | 404 Not Found   |

## 5. Authentication

| Method | Path                    | Purpose                                                  | Success     | Failure          |
| ------ | ----------------------- | -------------------------------------------------------- | ----------- | ---------------- |
| POST   | `/api/v1/auth/register` | Register a new customer account.                         | 201 Created | 409 Conflict     |
| POST   | `/api/v1/auth/login`    | Authenticate a customer and return an access token.      | 200 OK      | 401 Unauthorized |
| POST   | `/api/v1/auth/refresh`  | Generate a new access token using a valid refresh token. | 200 OK      | 401 Unauthorized |

---

## API Design Rules

1. All endpoints are versioned under `/api/v1`.
2. Resource names use plural nouns.
3. HTTP methods describe the requested action.
4. Resource identifiers are included in the URL path.
5. Filters and pagination parameters belong in the query string.
6. POST requests that create resources return `201 Created`.
7. GET requests that successfully retrieve resources return `200 OK`.
8. Invalid caller input returns `400 Bad Request`, not `500 Internal Server Error`.
9. Missing resources return `404 Not Found`.
10. Authentication failures return `401 Unauthorized`.
11. Conflicting operations return `409 Conflict`.

## Example Query Parameters

Retrieve restaurants filtered by category:

`GET /api/v1/restaurants?category=Pizza`

Retrieve paginated restaurants:

`GET /api/v1/restaurants?page=1&pageSize=10`

Retrieve menu items below a maximum price:

`GET /api/v1/menus?maxPrice=500`

---

**End of API Endpoint Design**
