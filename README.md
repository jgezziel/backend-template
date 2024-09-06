# Instrucciones

1. Cambiar a la rama **dev** y ejecutar en la terminal **docker compose -f docker-compose.dev.yml up**
2. Se puede cerrar la terminal luego de ejecutar el comando, luego de que se terminen los logs, en el docker se puede pausar o eliminar el servicio.
3. en caso de problemas de cors se agrega en "src/config/index.ts"
4. problemas de cookies en "src/controllers/auth.controllers.ts" ajustar los parametros de respuesta

```javascript
cookie("access_token", login.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: config.cookieExpiration,
      })
```

API_URL: <http://localhost:3000/api/v1/>
POSTGRESS_ADMIN:<http://localhost:8080>

- Credenciales: <jgezziel@gmail.com> | 635jgezziel131

## auth

- POST: API_URL/auth/login
- POST: API_URL/auth/logout

### JSON auth login

```json
{
  "username": "",
  "password":""
  }
```

## categories

- GET: API_URL/categories
- GET: API_URL/categories/**id**
- POST: API_URL/categories

### JSON categories

```json
{
  "name": "",
  "description": "",
  "message":""
  }
```

## users

- GET: API_URL/users
- GET: API_URL/users/**id**
  - Se necesita auntenticacion
- POST: API_URL/users

### JSON users

```json
{
  "name": "",
  "firstLastName": "",
  "secondLastName":"",
  "username": "",
  "email": "",
  "password":"",
  }
```
