# Day 57 In-Class Exercise — Addis Eats API

**Purpose:** Document the current API design, improve route naming, agree on error responses, and prepare the controller/Swagger checks.

> **Project context used:** The previous Day 56 work created `RestaurantsController` with `GetAll()`, `GetById(int id)`, and `Search(RestaurantQuery query)`. The API uses the base route `/api/v1/[controller]`, so the controller route is `/api/v1/restaurants`.
>
> **Important distinction:** The three restaurant GET actions are the endpoints already built in the previous lesson. The order and login endpoints below are the Day 57 target API design; they are not claimed to be implemented yet.

---

## 1. Current route table

### Existing routes from the Day 56 controller

| Method | Current path | Purpose | Success code | Failure codes |
|---|---|---|---:|---|
| GET | `/api/v1/restaurants` | Retrieve the restaurant collection | 200 | 500 |
| GET | `/api/v1/restaurants/{id}` | Retrieve one restaurant by ID | 200 | 404, 500 |
| GET | `/api/v1/restaurants/search` | Search restaurants using query filters | 200 | 400, 500 |

**Notes**
- `200 OK` is returned when the request succeeds.
- A search with no matches still returns `200 OK` with an empty array `[]`. It is not a `404`.
- `400 Bad Request` applies when query input is invalid or cannot be bound/validated.
- `404 Not Found` applies when the requested restaurant ID does not exist.
- `500 Internal Server Error` is for an unexpected server-side failure, not ordinary invalid input.

### Recommended canonical route design

The search action does not need its own `/search` path. Filtering is a query-string concern, so use the restaurant collection route for both listing and searching.

| Method | Recommended path | Purpose | Success code | Failure codes |
|---|---|---|---:|---|
| GET | `/api/v1/restaurants` | Retrieve all restaurants, or a filtered/paginated collection | 200 | 400, 500 |
| GET | `/api/v1/restaurants/{id}` | Retrieve one restaurant by ID | 200 | 404, 500 |

Examples:

```http
GET /api/v1/restaurants
GET /api/v1/restaurants?area=Bole
GET /api/v1/restaurants?area=Bole&page=1&pageSize=10
GET /api/v1/restaurants/14
```

After this change, the separate `GET /api/v1/restaurants/search` route is no longer needed. The query object can still be used:

```csharp
[HttpGet]
public IActionResult GetAll([FromQuery] RestaurantQuery query)
{
    // Apply filters and pagination here.
}
```

Do not keep both `GetAll()` and `Search()` with the same `[HttpGet]` route unless they have distinct route templates. Otherwise, the routes can conflict.

---

## 2. Mark path segments: identifier or filter

### Examples

| URL segment / parameter | Classification | Why |
|---|---|---|
| `/api` | API prefix, not a resource identifier/filter | Groups API routes |
| `/v1` | API version, not an identifier/filter | Selects API version |
| `/restaurants` | Resource collection | Names the resource |
| `/restaurants/14` — `14` | **Identifier** | Selects one specific restaurant |
| `?area=Bole` — `area=Bole` | **Filter** | Narrows the restaurant collection |
| `?maxFee=60` — `maxFee=60` | **Filter** | Narrows results by delivery fee |
| `?page=2` — `page=2` | Pagination parameter | Selects a page of the collection |
| `?pageSize=10` — `pageSize=10` | Pagination parameter | Sets the number of results per page |

### Move anything placed incorrectly

Incorrect:

```http
GET /api/v1/restaurants/area/Bole
```

Here, `Bole` is a filter, not a child resource or restaurant identifier.

Correct:

```http
GET /api/v1/restaurants?area=Bole
```

Correct identifier route:

```http
GET /api/v1/restaurants/14
```

**Rule:** Put a specific resource identifier in the path. Put collection filters in the query string.

---

## 3. Find verbs in paths and rewrite them three ways

Example action-style route:

```http
POST /api/v1/orders/91/cancel
```

The word `cancel` is an action verb in the path. Day 57 Slide 14 presents three design approaches.

### Option 1 — Change the resource's state (preferred)

```http
PATCH /api/v1/orders/91/status
Content-Type: application/json

{
  "status": "Cancelled"
}
```

### Option 2 — Create an event/subresource

```http
POST /api/v1/orders/91/cancellations
Content-Type: application/json

{
  "reason": "Customer requested cancellation"
}
```

### Option 3 — Use a scoped action endpoint

```http
POST /api/v1/orders/91/cancel
```

### Decision

**Choose Option 1: `PATCH /api/v1/orders/91/status`.**

Reason:
- The order already exists.
- Cancellation changes the order's status.
- PATCH communicates that only part of the order resource is being changed.
- It avoids making the URL a general-purpose command endpoint.

Option 2 is also useful when cancellation is an important event that needs its own record, such as a reason, timestamp, or audit history. Option 3 is acceptable when the business action does not fit a resource/state design cleanly, but it is the last choice in this example.

---

## 4. Peer review: challenge three decisions

Complete this section with your class partner. Do not invent a partner's answers; record the actual discussion.

| Decision to challenge | Review question | Agreed change / reason |
|---|---|---|
| Naming | Is the path a plural resource noun, lowercase, and free of unnecessary verbs? | To complete with partner |
| Verb choice | Does the HTTP method express the operation, or is an action hidden in the path? | To complete with partner |
| Status code | Does the status accurately describe success or the specific failure? | To complete with partner |

---

## 5. Error catalogue

Use stable machine-readable codes so a frontend can respond consistently. Keep the human-readable message understandable.

| Error code | HTTP status | Message |
|---|---:|---|
| `VALIDATION_FAILED` | 400 | One or more request fields are invalid. |
| `UNAUTHORIZED` | 401 | Authentication is required or the supplied credentials are invalid. |
| `FORBIDDEN` | 403 | You do not have permission to perform this operation. |
| `RESTAURANT_NOT_FOUND` | 404 | The requested restaurant could not be found. |
| `ORDER_NOT_FOUND` | 404 | The requested order could not be found. |
| `RESTAURANT_CLOSED` | 409 | This restaurant is currently not accepting orders. |
| `ORDER_ALREADY_DELIVERED` | 409 | A delivered order cannot be cancelled. |
| `AMOUNT_INVALID` | 422 | The amount must be greater than zero. |
| `PAYMENT_DECLINED` | 402 | The payment provider declined the payment. |
| `INTERNAL_ERROR` | 500 | An unexpected server error occurred. Please try again later. |

**Status-code reminders**
- `400`: malformed, missing, or invalid request input.
- `401`: the caller is not successfully authenticated.
- `403`: the caller is authenticated but lacks permission.
- `404`: the requested resource does not exist.
- `409`: the operation conflicts with the resource's current state.
- `422`: the request is understandable, but its content violates a business rule.
- `500`: unexpected server failure. Never use it for normal user input errors.

Use a consistent `ProblemDetails` / `ValidationProblem` response shape for errors. Do not send stack traces or private implementation details to clients.

---

## 6. Day 57 target API route table

These routes come from the Day 57 Slide 24 Addis Eats API specification. They are the target design for the broader project, not proof that every controller has already been implemented.

| Method | Path | Purpose | Success code | Failure codes |
|---|---|---|---:|---|
| GET | `/api/v1/restaurants` | List, filter, and paginate restaurants | 200 | 400 |
| GET | `/api/v1/restaurants/{id}` | Retrieve one restaurant | 200 | 404 |
| GET | `/api/v1/restaurants/{id}/menu` | Retrieve a restaurant's menu | 200 | 404 |
| POST | `/api/v1/orders` | Place an order | 201 | 400, 404, 409, 422 |
| GET | `/api/v1/orders/{id}` | Retrieve an order | 200 | 401, 403, 404 |
| PATCH | `/api/v1/orders/{id}/status` | Update an order's status | 200 | 401, 403, 404, 409 |
| DELETE | `/api/v1/orders/{id}` | Cancel/delete an order | 204 | 401, 403, 404, 409 |
| POST | `/api/v1/auth/login` | Authenticate and issue a token | 200 | 400, 401 |

For the broader route table, `500 Internal Server Error` may also occur for unexpected failures. The slide's listed failure codes focus on expected endpoint-specific failures.

---

## 7. Controller and Swagger implementation checklist

The exercise asks you to apply the agreed changes to your controllers and confirm that every endpoint still works in Swagger.

Use this checklist while working in your own project:

- [ ] Keep `GET /api/v1/restaurants` as the collection endpoint.
- [ ] Keep `GET /api/v1/restaurants/{id}` for one restaurant.
- [ ] Move search/filter behavior onto `GET /api/v1/restaurants` using `[FromQuery] RestaurantQuery query`.
- [ ] Remove the separate `/search` route after moving its behavior, avoiding duplicate GET routes.
- [ ] Confirm an existing ID returns `200`.
- [ ] Confirm a missing ID returns `404`.
- [ ] Confirm a search with no matches returns `200` and `[]`.
- [ ] Confirm invalid query input returns a client error such as `400`, not `500`.
- [ ] Confirm Swagger shows the correct routes, parameters, and response types.
- [ ] Add the agreed error catalogue to this README and the partner's README.

**Swagger test cases for the existing restaurant endpoints**

| Test | Request | Expected result |
|---|---|---|
| List restaurants | `GET /api/v1/restaurants` | 200 |
| Filter restaurants | `GET /api/v1/restaurants?area=Bole` | 200, matching results |
| No filter matches | `GET /api/v1/restaurants?area=NoSuchArea` | 200, empty collection |
| Existing restaurant | `GET /api/v1/restaurants/14` | 200, if ID 14 exists |
| Missing restaurant | `GET /api/v1/restaurants/999999` | 404, if ID does not exist |

> The actual response depends on your current data and implementation. A Swagger test is only confirmed after you run it in your project. This document records the design and test plan; it does not claim that your local controllers have already been modified or tested.

---

## 8. What is complete and what remains

- [x] Explain and design the route table from the known Day 56 controller actions.
- [x] Classify identifiers and filters and correct the filter placement.
- [x] Compare all three Slide 14 cancellation designs and choose one.
- [x] Prepare an error catalogue with more than six codes.
- [x] Prepare the broader Day 57 target route table.
- [ ] Complete the real peer review with a class partner.
- [ ] Apply the route changes in the local C# project.
- [ ] Run the Swagger tests and record actual results.
- [ ] Add the agreed catalogue to both actual README files.

**Main design decision:** Use resource-based routes, put identifiers in paths, put filters in query strings, choose HTTP methods based on the operation, and return status codes that accurately describe the result.
