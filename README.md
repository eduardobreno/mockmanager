# Mock Manager

The idea of this app is to manager a mock (Restfull) with a simple interface

Two projects in one: Nodejs to serve API and client to manager (React + Bootstrap)

Backend: NodeJs, Express, MongoDB with mongoose.
Frontend: React with Bootstrap

## Setup

In `admin` folder use the command `npm install` to install dependencies.
`npm start` to build and watch modifications in file for development mode.

`npm run-script build` to build for production.

Restore database from folder `dump` with the following command: `mongorestore -d mockManager dump/<date of dump>`.

The built will be placed in the path: `server/public`.

In `server` folder use the command `npm install` to install dependencies.
`npm start` to start server.


The `admin` folder is the client, you can access on browser with adress:  `http://localhost:3000/admin`


You can change the routes in file `server/app.js`.


## Additional Information

There is a cronjob running at 7h and 19h that executes a `mongodump` in folder `dump` for backup purpose with the patter `YYYY-mm-dd_hh-ii`.
