# Addis Eats API

A RESTful Web API for managing Addis Eats restaurant menu items, built with ASP.NET Core.

## Features

- Retrieve all menu items.
- Filter menu items by category.
- Retrieve a menu item by ID.
- Add new menu items.
- Validate menu prices.
- Dependency Injection using `IMenuService`.
- Configuration using `MenuOptions`.

## API Endpoints

Base URL: `/api/v1/menu`

| Method | Endpoint                     | Description         | Success     | Failure         |
| ------ | ---------------------------- | ------------------- | ----------- | --------------- |
| GET    | `/api/v1/menu`               | Get all menu items  | 200 OK      | —               |
| GET    | `/api/v1/menu?category=Main` | Filter by category  | 200 OK      | —               |
| GET    | `/api/v1/menu/{id}`          | Get menu item by ID | 200 OK      | 404 Not Found   |
| POST   | `/api/v1/menu`               | Create a menu item  | 201 Created | 400 Bad Request |

## Example POST Request

```json
{
  "id": 7,
  "name": "Firfir",
  "category": "Breakfast",
  "price": 250
}
```

The price must be greater than zero.

## Technology

- C#
- ASP.NET Core Web API
- Dependency Injection
- Swagger / OpenAPI
- LINQ

## Run the Project

```bash
dotnet restore
dotnet run
```

Open the Swagger URL displayed in the terminal to explore and test the endpoints.

## Project Structure

```text
AddisEats.Api/
├── Controllers/
│   └── MenuController.cs
├── Models/
│   └── MenuItem.cs
├── Services/
│   ├── IMenuService.cs
│   └── MenuService.cs
├── Options/
│   └── MenuOptions.cs
├── Program.cs
├── appsettings.json
└── README.md
```

## Author

Addis Eats API — CodeOps Student Mini-Project, Day 55.
