# E-Commerce Backend • [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Mock e-commerce backend application that interacts with a database upon calling a specific route. Sequelize.js employed as ORM for initial database setup. APIs tested using Insomnia.

## Video Demonstration of Application

- [Click Here]()

## Installation

- Required: LTS or latest version of Node.js
- Required: LTS or latest version of MySQL
- Required: API testing tool (Insomnia)

## Usage

- #### Clone the repository:

<img width="450px" src="" />

- #### Inside the repo, make a .env file and define the following process.env variables:

```
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='your_mysql_password'
```

- #### Open a terminal window and navigate to the repository directory. Connect to MySQL server and create a new database:

```
mysql -u root (-p for password)
SOURCE ./db/schema.sql;
```

<img width="750px" src="" />

- #### Exit MySQL command-line. Then, enter the following commands:

```
npm install
npm run seed
npm run watch
```

- #### The localhost server will be active on port 3001. Test the APIs by accessing the routes within the ./routes/api directory using the appropriate HTTP methods. Utilizing Postman in this example:

<img width="900px" src="" />

## Credits

- Coloegues at the UNC coding bootcamp, YouTube, and ChatGPT.

## License

This application is covered under the [MIT License](./LICENSE).
