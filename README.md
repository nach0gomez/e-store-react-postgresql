E-Store managed with react and Express.js

In the back-end folder, create a .env file with the database configuration, default configs will be:
(change name and password to your local settings)

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=database


todo list:
- create .env.example
- explain why migrations are not created
- explain future role implementation
- order confirmation database implementation
- upload dumb.sql for recovery and simple usage
- explain future update and insertion of new products and categories from interface 
- implement infinite scrolling (not actually infinite since there are limited products)