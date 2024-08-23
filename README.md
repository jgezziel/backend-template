# TODO

- Login y logout routes
- Middleware y servicio de **jsonwebtoken**
- Retornar el jwt con **cookie-parser**
- Crear y retornar las sesiones

```javascript
//Crear un servidor https
//packages npm fs and https
//https://web.dev/articles/how-to-use-local-https?hl=es
https
  .createServer(
    {
      key: fs.readFileSync("keys-private/localhost-key.pem"),
      cert: fs.readFileSync("keys-private/localhost.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(
      colors.black.bgGreen.bold(
        `✔️ Server is listening on: ${APP_URL}:${API_URL}`
      )
    );
  });
```
