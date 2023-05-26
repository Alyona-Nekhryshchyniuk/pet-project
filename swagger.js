require('dotenv').config();
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

const swagger = {
    "openapi": "3.0.3",
    "info": {
        "version": "1.0.0",
        "title": "Pet project",
        "description": "restApi for pet project",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "consumes": [
        "application/json",
        "multipart/form-data"
    ],
    "produces": [
        "application/json"
    ],
    "servers": [
        {
            "url": serverUrl
        }
    ],
    "tags": [
        {
            "name": "Auth",
            "description": "Authorization endpoints"
        },
        {
            "name": "Notice",
            "description": "Notice endpoints"
        }
    ],
    "paths": {
        "/api/auth/register": {
            "post": {
                "tags": [
                    "Auth"
                ],
                "summary": "User registration",
                "parameters": [],
                "security": [],
                "requestBody": {
                    "description": "Registration's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegistrationRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegisterationResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)",
                        "content": {}
                    },
                    "409": {
                        "description": "Provided email already exists",
                        "content": {}
                    }
                }
            }
        },
        "/api/auth/login": {
            "post": {
                "tags": [
                    "Auth"
                ],
                "summary": "Authenticate user",
                "parameters": [],
                "security": [],
                "requestBody": {
                    "description": "Authenticates a user with the specified email and password",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/LoginRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Authenticates a user with the specified email and password",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LoginResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)",
                        "content": {}
                    },
                    "401": {
                        "description": "Invalid email or password"
                    },
                    "500": {
                        "description": "Internal server error"
                    }
                }
            }
        },
        "/api/auth/logout": {
            "post": {
                "tags": [
                    "Auth"
                ],
                "summary": "Logout user",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Successful operation",
                        "content": {}
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {}
                    }
                }
            }
        },
        "/api/auth/update": {
            "patch": {
                "tags": [
                    "Auth"
                ],
                "summary": "Update User information",
                "description": "Update user information",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "requestBody": {
                    "description": "Update user information",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "$ref": "#/components/schemas/userUpdateRequest"
                            }
                        }
                    }
                },
                "consumes": [
                    "multipart/form-data"
                ],
                "responses": {
                    "200": {
                        "description": "updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/userUpdateResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "User not found",
                        "content": {}
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/auth/current": {
            "get": {
                "tags": [
                    "Auth"
                ],
                "summary": "Get current user",
                "description": "Returns information about the currently authenticated user.",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string",
                                            "description": "The email address of the authenticated user"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            }
        },
        "/api/notice": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get all Notice",
                "description": "Get all Notice",
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "description": "Search query for pet title",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "gender",
                        "in": "query",
                        "description": "Filter Notice by gender",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/noticeResponse"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "post": {
                "tags": [
                    "Notice"
                ],
                "summary": "Add a new notice",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "$ref": "#/components/schemas/noticeRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Created",
                        "content": {
                            "schema": {
                                "$ref": "#/components/schemas/noticeResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/notice/sell": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get Notice for sale",
                "description": "Get Notice for sale",
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "description": "Search query for pet title",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "gender",
                        "in": "query",
                        "description": "Filter Notice by gender",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "description": "Page number for pagination",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 1
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "Number of pets per page",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 12
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/noticeResponse"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/notice/lost": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get lost/found Notice",
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "description": "Search query for pet title",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "gender",
                        "in": "query",
                        "description": "Filter Notice by gender",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "description": "Page number for pagination",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 1
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "Number of pets per page",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 12
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/noticeResponse"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/notice/inGoodHands": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get Notice available for adoption",
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "description": "Search query for pet title",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "gender",
                        "in": "query",
                        "description": "Filter Notice by gender",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "description": "Page number for pagination",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 1
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "Number of pets per page",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 12
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/noticeResponse"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/notice/{id}": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get a notice by ID",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the notice",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/noticeResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Pet not found"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Notice"
                ],
                "summary": "Delete notice by ID",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the notice",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/noticeResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/notice/myAdds": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get a list of the authenticated user's pet notices",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "description": "Search query for the add title",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "in": "query",
                        "name": "gender",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Filter adds by gender"
                    },
                    {
                        "in": "query",
                        "name": "limit",
                        "schema": {
                            "type": "integer",
                            "default": "12"
                        },
                        "description": "Number of adds per page"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "pets": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/noticeResponse"
                                        }
                                    },
                                    "total": {
                                        "type": "integer",
                                        "description": "Total number of adds"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            }
        },
        "/api/notice/favorites/list": {
            "get": {
                "tags": [
                    "Notice"
                ],
                "summary": "Get user's favorite notices",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "in": "query",
                        "name": "query",
                        "schema": {
                            "type": "string"
                        },
                        "description":"Search query for the favorite notice title"
                    },
                    {
                        "in": "query",
                        "name": "page",
                        "schema": {
                            "type": "integer",
                            "default": 1
                        },
                        "description": "Number of favorite notices per page"
                    },
                    {
                        "in": "query",
                        "name": "limit",
                        "schema": {
                            "type": "integer",
                            "default": 12
                        },
                        "description": "Number of items per page"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A list user's of favorite notices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/noticeResponse"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/notice/favorites/{id}": {
            "post": {
                "tags": [
                    "Notice"
                ],
                "summary": "Add a notice to favorites",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "The ID of the notice to be added to favorites"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Notice has been added to favorites",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Notice has already been added to favorites"
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            },
            "delete": {
                "summary": "Remove notice from favorites",
                "tags": [
                    "Notice"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "schema": {
                            "type": "string"
                        },
                        "required": true,
                        "description": "The ID of the notice to remove from favorites"
                    }
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The notice has been removed from favorites",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "description": "A message indicating that the notice has been removed from favorites"
                                        }
                                    },
                                    "example": {
                                        "message": "Notice with id=60a5c5c5d4f9b5a4c8a7b1c1 has been removed from favorites"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "404": {
                        "description": "Not found"
                    }
                }
            }
        },
        "/api/yourPets": {
            "get": {
                "summary": "get users pets",
                "tags": [
                    "Pets"
                ],
                "parameters": [
                    {
                        "in": "query",
                        "name": "page",
                        "schema": {
                            "type": "integer",
                            "minimum": 1,
                            "default": 1
                        },
                        "description": "The page number to retrieve"
                    },
                    {
                        "in": "query",
                        "name": "limit",
                        "schema": {
                            "type": "integer",
                            "minimum": 1,
                            "maximum": 100,
                            "default": 20
                        },
                        "description": "The maximum number of pets to retrieve per page"
                    }
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A list of your pets",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/petResponse"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            },
            "post": {
                "summary": "Add a new pet",
                "tags": [
                    "Pets"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "requestBody": {
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/petRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Pet created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "$ref": "#/components/schemas/petResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/yourPets/{id}": {
            "delete": {
                "summary": "Delete a pet",
                "tags": [
                    "Pets"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "The unique identifier of the pet",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Pet deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "description": "A success message indicating the pet has been deleted"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Pet not found"
                    }
                }
            }
        },
        "/api/news": {
            "get": {
                "summary": "Get all news",
                "tags": [
                    "News"
                ],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/newsResponse"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/friends": {
            "get": {
                "summary": "Get all friends",
                "tags": [
                    "Friends"
                ],
                "responses": {
                    "200": {
                        "description": "A list of friends",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/friendsResponse"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "RegistrationRequest": {
                "type": "object",
                "required": [
                    "email",
                    "password"
                ],
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password",
                        "example": "qwerty123"
                    }
                }
            },
            "RegisterationResponse": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "token": {
                        "type": "string",
                        "description": "Access token for authorized requests",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjA0NmRkMzFjY2Q2MjY1NTA3OTJhZiIsImlhdCI6MTYyMzQxNjM0NywiZXhwIjoxNjIzNTAxMTQ3fQ.CivKlNzEKhTGp01LxZlx0ObYgbKj6toQv0ksWLP6mS4"
                    }
                }
            },
            "LoginRequest": {
                "type": "object",
                "required": [
                    "email",
                    "password"
                ],
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password",
                        "example": "qwerty123"
                    }
                }
            },
            "LoginResponse": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "token": {
                        "type": "string",
                        "description": "Access token for authorized requests",
                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjA0NmRkMzFjY2Q2MjY1NTA3OTJhZiIsImlhdCI6MTYyMzQxNjM0NywiZXhwIjoxNjIzNTAxMTQ3fQ.CivKlNzEKhTGp01LxZlx0ObYgbKj6toQv0ksWLP6mS4"
                    }
                }
            },
            "userUpdateRequest": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "User email"
                    },
                    "avatar": {
                        "type": "string",
                        "format": "binary",
                        "description": "The updated avatar image file"
                    },
                    "name": {
                        "type": "string",
                        "description": "The updated user name"
                    },
                    "city": {
                        "type": "string",
                        "description": "Update user's city"
                    },
                    "birthday": {
                        "type": "string",
                        "format": "date",
                        "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.[0-1][0-9]\\.(20[0-1][0-9]|19[0-9][0-9])$",
                        "example": "01.01.1990"
                    },
                    "phone": {
                        "type": "string",
                        "pattern": "^[0-9]{10}$",
                        "description": "User phone number",
                        "example": "1234567890"
                    }
                }
            },
            "userUpdateResponse": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "name": {
                        "type": "string"
                    },
                    "birthday": {
                        "type": "string",
                        "format": "date"
                    },
                    "city": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string"
                    }
                }
            },
            "noticeRequest": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "enum": [
                            "pet",
                            "sell",
                            "lost/found",
                            "in good hands"
                        ],
                        "default": "sell"
                    },
                    "title": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16
                    },
                    "date": {
                        "type": "string",
                        "format": "date",
                        "example": "2023-05-20"
                    },
                    "breed": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16
                    },
                    "sex": {
                        "type": "string",
                        "enum": [
                            "male",
                            "female"
                        ]
                    },
                    "location": {
                        "type": "string"
                    },
                    "price": {
                        "type": "number",
                        "minimum": 0,
                        "nullable": true,
                        "format": "float"
                    },
                    "comments": {
                        "type": "string",
                        "minLength": 8,
                        "maxLength": 120
                    },
                    "image": {
                        "type": "string",
                        "format": "binary",
                        "x-example": "base64-encoded-image-string"
                    }
                },
                "required": [
                    "category",
                    "title",
                    "name",
                    "date",
                    "breed"
                ]
            },
            "noticeResponse": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string",
                        "description": "The unique identifier for the notice",
                        "format": "ObjectId",
                        "example": "60a7f734b3c8e207046c3e91"
                    },
                    "category": {
                        "type": "string",
                        "enum": [
                            "pet",
                            "sell",
                            "lost/found",
                            "in good hands"
                        ],
                        "default": "sell"
                    },
                    "title": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16,
                        "pattern": "/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,16}$/"
                    },
                    "date": {
                        "type": "sring",
                        "format": "date"
                    },
                    "breed": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16
                    },
                    "sex": {
                        "type": "string",
                        "enum": [
                            "male",
                            "female"
                        ]
                    },
                    "location": {
                        "type": "string"
                    },
                    "price": {
                        "type": "number",
                        "format": "float",
                        "minimum": 0,
                        "default": 0
                    },
                    "comments": {
                        "type": "sring"
                    },
                    "image": {
                        "type": "string",
                        "format": "uri"
                    },
                    "owner": {
                        "type": "string",
                        "format": "ObjectId",
                        "example": "60a7f734b3c8e207046c3e92"
                    },
                    "favoriteNotices": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "ObjectId"
                        },
                        "default": []
                    }
                }
            },
            "petRequest": {
                "type": "object",
                "properties": {
                    "petsAvatar": {
                        "type": "string",
                        "format": "binary",
                        "description": "The pet's avatar image"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16,
                        "pattern": "^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$",
                        "description": "The pet's name"
                    },
                    "birthDate": {
                        "type": "string",
                        "description": "The pet's birth date"
                    },
                    "breed": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 16,
                        "pattern": "^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-Zа-яА-ЯіІїЇґҐ]+)*$",
                        "description": "The pet's breed"
                    },
                    "comments": {
                        "type": "string",
                        "minLength": 8,
                        "maxLength": 120,
                        "description": "Additional comments about the pet"
                    }
                },
                "required": [
                    "name",
                    "birthDate",
                    "breed"
                ]
            },
            "petResponse": {
                "type": "object",
                "properties": {
                    "_id": {
                        "": "string",
                        "description": "The unique identifier for the pet"
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the pet"
                    },
                    "owner": {
                        "type": "object",
                        "properties": {
                            "_id": {
                                "type": "string",
                                "description": "The unique identifier for the owner"
                            }
                        },
                        "description": "The owner of the pet"
                    },
                    "birthDate": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The date the pet was born"
                    },
                    "breed": {
                        "type": "string",
                        "description": "The breed of the pet"
                    },
                    "comments": {
                        "type": "string",
                        "description": "Any comments about the pet"
                    },
                    "petsAvatar": {
                        "type": "string",
                        "description": "The URL of the pet's photo"
                    }
                }
            },
            "newsResponse": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title of the news"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL of the news"
                    },
                    "description": {
                        "type": "string",
                        "description": "A brief description of the news"
                    },
                    "date": {
                        "type": "string",
                        "description": "The date the news was published"
                    }
                }
            },
            "friendsResponse": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title of the friend"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL of the friend"
                    },
                    "addressUrl": {
                        "type": "string",
                        "description": "The address URL of the friend"
                    },
                    "imageUrl": {
                        "type": "string",
                        "description": "The image URL of the friend"
                    },
                    "address": {
                        "type": "string",
                        "description": "The address of the friend"
                    },
                    "workDays": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "description": "The work days of the friend"
                    },
                    "phone": {
                        "type": "string",
                        "description": "The phone number of the friend"
                    },
                    "email": {
                        "type": "string",
                        "description": "The email address of the friend"
                    }
                }
            }
        },
        "securitySchemes": {
            "Bearer": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    }
}

module.exports =swagger