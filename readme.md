## Ticketing

A simple API service that allows users to create tickets. The project splits the users into the three catgories below

### Admin

The admin user who is seeded by default is in charge of the following key functions
* Adding of agents
* Assigning tickts to agents
* Viewing reports of all tickets created

### User

The user has th following key functions
* Create tickets
* View status of tickets
* Add comments to tickets

### AGENT

The agent user has the following key functions
* Fetch assigned tickets
* Update the status of an assigned ticket
* Comment on a ticket

## Authentication
All users are required to be authenticated before using any of the functionalities except signup and login.
On authentication, a token which is supposed to be set in the header as `Authorization` or `authorization` for every request sent, is returned in the response.

## Requirements
* Yarn
* MYSQL
* Node v6+

## Installation
After cloning the repo,
* cd into the project directory
* Run the command in your terminal `yarn install`
* Create a .env and add the values to the following keys
```
NODE_ENV=`Your current environment e.g test, development or production`
DB_USERNAME=`username to your DB e.g root`
DB_PASSWORD=`Password if any`
DEV_DB=`Name of your development database`
TEST_DB=`Name of your test database`
SECRET_KEY=`Any group of random keys`
PORT=`Your desired port number`
```
* Run the command `yarn run seed`
* Run the command `yarn run dev` for development enviroment or `yarn start` for production

## Endpoints
All endpoints can be found in the postman collection below
`https://www.getpostman.com/collections/abd87b045bd6776a78f0`
<p/>
NB: `baseUrl` example = `127.0.0.1/api/v1`
