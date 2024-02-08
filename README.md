# CarCar
CarCar is an application that handles both the services and sales aspect of an automotive service and sales center. CarCar manages the aspects of Automobile Inventory (Including Make, Model, and VIN) as well as the Service Appointments, Technicians, Customers, Sales, Salespeople, and the Customers who purchased vehicles.

Team:

* Gabe Wickert - Sales
* Yutong Ye - Services

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>

3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/images/CarCarWebsite.png)

## Design

CarCar is composed of 3 microservices that interact with each other.

- Inventory
- Services
- Sales

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
