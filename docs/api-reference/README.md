# API Reference

This section provides detailed information about the API endpoints available on the MVO Rewards Server.

---

A Postman collection (`MVO.postman_collection`) has been uploaded, and the Postman documentation is available [Here](https://documenter.getpostman.com/view/40053537/2sB3HooypU). Feel free to explore both.

Most endpoints require a JSON Web Token (JWT) for authentication. The token must be included in the `Authorization` header of your request.

**Format:** `Authorization: Bearer <your_jwt_token>`

Tokens are obtained via the `/api/login` endpoint.

## Table of Contents


*   [Authentication](./auth.md)
*   [Admin](./admin.md)
*   [Spinning Wheel](./wheel.md)
*   [Event Shop](./shop.md)
*   [Achievements](./achievements.md)
*   [Daily Playtime](./daily-playtime.md)
