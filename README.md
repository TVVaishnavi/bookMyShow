# bookMyShow (Backend)

## Description

This repository contains the backend for the BookMyShow application. The application is built using Express.js for the server, MongoDB for the database, and Jest for unit testing. Users can sign up and log in, browse movies and theatres, select seats, book tickets, and cancel bookings. Admins can directly log in to manage the system.

## Features

* **User Authentication** : Users can sign up and log in to their accounts.
* **Admin Authentication** : Admins can log in directly.
* **Movie and Theatre Listings** : Users can browse available movies and theatres.
* **Seat Selection and Ticket Booking** :
* Users can select available seats and book tickets for movies.
* There is a time limit for selecting seats. If the booking isn't completed within the time limit, the seat selection is undone.
* **Ticket Cancellation** : Users can cancel their booked tickets.

## Installation

To install and run this project locally:

1. Clone the repository:
   bash

```
git clonehttps://github.com/TVVaishnavi/bookMyShow.git
cdbookMyShow
```

    2.  Install dependencies:bash

```
npm install
```

    3. Set up environment variables:bash

```
cp.env.example .env
# Update .env with your database credentials and other settings
```

    4. Start the server:bash

```
npm start
```

## Usage

To run the application:

1. Ensure MongoDB is running.
2. User Postman or any API client to interact with the backend.
3. Example API requests:
   signup:
   bash

```
POST /api/signup
```

    Login:bash

```
POST /api/login
```

## Support

For support, you can reach out via:

* Issue tracker: GitHub Issues
* Email: vaishnavitvenkatesh@gmail.com

## Roadmap

### ✅ Phase 1: Initial Setup

* [X] Set up **Express.js** for backend
* [X] Configure **MongoDB** for data storage
* [X] Implement **User Authentication** (Signup/Login)
* [X] Implement **Admin Login**

### 🚀 Phase 2: Core Features

* [X] Fetch **Movies & Theatres**
* [X] Implement **Seat Selection with Timer**
* [X] Enable **Ticket Booking & Cancellation**

### 🔧 Phase 3: Enhancements & Testing

* [X] Implement **Seat Auto-Unselect After Timeout**
* [X] Write **Unit Tests with Jest**

## Contribution:

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature-name`.
6. Open a pull request.

## Author and Acknowledgment

* Vaishnavi - Initial work - [TVVaishnvai](https://github.com/TVVaishnavi)
