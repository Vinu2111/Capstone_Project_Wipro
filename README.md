🏦 Capstone Project - Banking Microservices (Wipro)

A complete Banking Microservices Project built with Spring Boot 3, Java 17, MySQL, Kafka, Angular 17, and a microservices architecture as part of the Wipro Capstone Project.

🚀 Features

Centralized Config Server

Eureka Server for service discovery

Spring Security + JWT authentication (with refresh tokens)

Role-based access control (Admin, User, Customer)

Inter-service communication via REST + OpenFeign

Event-driven communication with Kafka (Audit, Notification, Reporting)

Swagger/OpenAPI documentation for all services

Unit & Integration Tests

Postman Collection for API testing

Angular 17 Frontend with standalone components

🛠️ Tech Stack

Backend: Spring Boot 3, Java 17

Database: MySQL

Security: Spring Security, JWT

Service Discovery: Eureka

Configuration: Spring Cloud Config

Messaging: Apache Kafka

Monitoring: Prometheus, Zipkin

Frontend: Angular 17

Documentation: Swagger / OpenAPI

📂 Project Structure
Capstone_Project_Wipro/
│── config-server/
│── eureka-server/
│── auth-service/
│── customer-service/
│── account-service/
│── transaction-service/
│── payment-service/
│── notification-service/
│── reporting-service/
│── audit-service/
│── api-gateway/
│── frontend-angular/
│── postman-collection/
│── README.md

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/Vinu2111/Capstone_Project_Wipro.git
cd Capstone_Project_Wipro

2️⃣ Start Config Server
cd config-server
mvn spring-boot:run

3️⃣ Start Eureka Server
cd eureka-server
mvn spring-boot:run

4️⃣ Start Auth + Other Services
cd auth-service
mvn spring-boot:run


Repeat for customer-service, account-service, transaction-service, etc.

5️⃣ Start API Gateway
cd api-gateway
mvn spring-boot:run

6️⃣ Run Angular Frontend
cd frontend-angular
npm install
ng serve --open

🔐 Authentication Flow

Register a new user → /api/v1/auth/register

Login → /api/v1/auth/authenticate

Copy JWT token → use it in Authorization: Bearer <token> for secured endpoints

📊 Monitoring & Tracing

Prometheus → http://localhost:9090

Zipkin → http://localhost:9411

Kafka → Producer/Consumer logs in terminal

🧪 Testing

Run unit tests:

mvn test


Import postman-collection/BankingApp.postman_collection.json into Postman for API testing.

🎨 Frontend Screens

Login Page

Customer Onboarding

Account Management

Fund Transfer

Transaction History

Notifications

👨‍💻 Author

Vinayak Santosh Gote
📧 vinayakgote2111@gmail.com

📌 Batch 2 | BE Computer Engineering | CGPA 9.30

🔗 GitHub: Vinu2111
