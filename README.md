Certainly! Here's the complete `README.md` content in Markdown format:

```markdown
# CrownWristwear Shopping Website

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

CrownWristwear is a web application built for online shopping, focusing on wristwear products. It provides users with an interface to browse products, add them to the cart, and proceed to checkout. This project is built using Node.js, Express.js, MongoDB, and EJS templates.

---

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Product Management**: Admin users can add, update, and delete products.
- **Shopping Cart**: Users can add products to their cart, adjust quantities, and remove items.
- **Checkout Process**: Users can proceed to checkout, view total amounts, and place orders.
- **Flash Messages**: Notification messages for success and error scenarios using Connect-Flash.
- **Sorting and Filtering**: Products can be sorted by price (low to high, high to low) and filtered by availability and discounts.

---

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   EXPRESS_SESSION_SECRET=your_express_session_secret
   MONGODB_URI=your_mongodb_uri
  

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Open your browser and navigate to `http://localhost:3000` to view the application.**

---

## Usage

Once the application is running:

- **Sign Up or Log In**: Create a new user account or use existing credentials to log in.
- **Explore Products**: Browse through different categories or view all products.
- **Add to Cart**: Click on products to view details and add them to your cart.
- **Manage Cart**: Adjust quantities, remove items, or proceed to checkout.
- **Place Order**: Complete the checkout process by entering shipping details and confirming the order.

---

## File Structure

The project structure is organized as follows:

```
├── config/
│   └── mongoose-connect.js     # MongoDB connection setup
├── middleware/
│   └── isLoggedIn.js           # Authentication middleware
├── models/
│   ├── products-model.js       # Product schema and model
│   └── user-model.js           # User schema and model
├── public/                     # Static assets (images, stylesheets, scripts)
│   ├── css/
│   ├── images/
│   └── js/
├── routes/
│   ├── admin.js                # Admin routes (product management)
│   ├── index.js                # Main routes (home, shop, cart)
│   ├── products.js             # Product routes (add, delete, update)
│   └── users.js                # User routes (authentication)
├── views/                      # EJS templates
│   ├── cart.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── partials/
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── shop.ejs
│   └── signup.ejs
├── .env                        # Environment variables (not included in repo)
├── app.js                      # Express application setup
├── package.json                # Dependencies and npm scripts
└── README.md                   # Project documentation
```
## Project Structure

-   `app.js`: Entry point of the application, sets up middleware and routes.
-   `routes/`: Contains route handlers for different parts of the application (index, users, products, admin).
-   `models/`: Mongoose models for defining MongoDB schema and interacting with the database.
-   `views/`: EJS templates for rendering HTML pages.
-   `public/`: Static assets such as CSS, images, and client-side JavaScript files.
-   `config/`: Configuration files managed by `config` module.


## Technologies Used

-   **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
-   **Frontend:** HTML, CSS, JavaScript (with EJS templates)
-   **Database:** MongoDB
-   **Authentication:** JWT (jsonwebtoken), bcrypt
-   **Session Management:** express-session
-   **File Uploads:** multer
-   **Environmental Variables:** dotenv
-   **Error Handling:** http-errors
-   **Logging:** morgan
-   **Configuration Management:** config



## Contributing

Contributions are welcome! Here's how you can contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## Author

-   **Vishal Kumar** - [GitHub](https://github.com/superuser-vishal)

## Contact

-   **LinkedIn:** [kwd-vishalkumar](https://linkedin.com/in/kwd-vishalkumar/)
-   **Email:** kwd.vishalkumar@gmail.com
