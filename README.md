# Node Initial Project

### Project Structure

Main structure of node.js project. Folders / files:

- <b>front</b>:
  - <b>js</b>
    - <b>jquery.min.js</b>
    - <b>routesFile.js</b>
    - <b>script.js</b>
  - <b>styles</b>
    - <b>styles.css</b>
  - <b>index.html</b>Entry point
- <b>server</b>
  - <b>src</b>
    - <b>database</b>
      - <b>db.js</b>
    - <b>models</b>
      - <b>associations.js</b>
      - <b>Car.js</b>
      - <b>Order.js</b>
      - <b>OrdersProductionDay.js</b>
      - <b>ProductionDay.js</b>
    - <b>routes</b>
      - <b>cars.js</b>
      - <b>orders.js</b>
      - <b>ordersProductionDays.js</b>
      - <b>predefineValues.js</b>
      - <b>productionDays.js</b>
    - <b>app.js</b>Entry point
  - <b>.eslintrc</b>. Linter JS, static code analyzer. See [EsLint Docs](https://eslint.org/docs/user-guide/configuring/configuration-files).
  - <b>.gitignore</b>
  - <b>.ecosystem.config.js</b>
  - <b>package.json</b>.
- <b>README</b>

### Inicialización del Proyecto

1. Instalar los modulos de Node.js `node_modules`:

```
npm install
```

2. Asegurarse de tener instalado Microsoft SQL Server y tener los protocolos habilitados:
   ![Open project](img/mssqlServer.png)

3. Run the command line to init the project:

```
npm run dev
```

5. Be sure you have installed Postman for http requests. Import the http requests from the file: `postmanTest`:

   ![Open project](img/importPostman.png)

6. Now you are able to make http requests by Postman

   ![Open project](img/httpRequests.png)

Follow the steps below:

- Clone the project from the Github Platform. Execute:
  ```
  git clone [url project]
  ```
- Open the project downloaded.
  ![Open Project](img/webstorm_open.png)

### Import project for use with Visual Studio Code

Follow the steps below:

- Clone the project from the Github Platform. Execute:
  ```
  git clone [url project]
  ```
- Open the project downloaded.
  ![Open Project](img/VSC_open.png)

### Utilities

- [Node Developers Guide](https://nodejs.dev/learn)
- **.gitignore file** configuration. See [Official Docs](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files).
- **Git branches**. See [Official Docs](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
