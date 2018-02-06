# Angular-Ninja

This project demonstrate the demo of MEAN stack application using latest Angular 5 version. This contain secured auth functionality allow transfering user data
only by encoding it over network and then decoding on client application and after auth a home component user can make three
attempt to guess the number on three continously wrong attempt user is forced logout and then needs to login again. 

## Prerequisite
Make sure you have installed all these:
* @angular/cli
* mongodb
* Node


## Setup

* Navigate to project directory.
* git clone https://github.com/akash-sethi/angular-ninja.git
* cd <project folder>
* npm install `This will take some time.`
* ng build
* start mongo process in other terminal by command `mongod db-path /data/db`
* npm start
* Navigate to `http://localhost:3000`

## Running unit tests

Run `ng test` to execute the unit tests. 
