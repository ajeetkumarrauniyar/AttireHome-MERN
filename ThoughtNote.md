_Created with [AIPRM Prompt "Readme Generator | Markdown Format | GitHub."](https://www.aiprm.com/prompts/softwareengineering/text-editor/1794387468406222848/)_

````markdown
# AttireHome E-COMMERCE APPLICATION README

## Overview

Welcome to the AttireHome E-Commerce application! This README provides an overview of the features and functionalities of the application.

### Home Page

The home page features pagination to navigate through the products efficiently.

### User Signup

Upon successful user signup, a confirmation email is sent using Nodemailer.

### Admin Dashboard

- Admin can add, update, and delete products.
- Image uploading is facilitated using the Multer function.
- Products can be reviewed, and an average rating is displayed on product cards.
- User password reset functionality is available.
- Card badges are responsive to display product quantity.

#### Important Note for Admin Dashboard Access

To access the admin dashboard manually, set the `isAuth` attribute to true in the database for the desired user.

**Very Important Information:**
If you want to see the admin dashboard, you have to manually change the `isAuth` attribute of the USER to true through your database.

### Models

1. User Model
   - Name, address, phone, email, password, cart (reference)
2. Product Model
   - ProductName, Price, Rating, AvgRating, ImgUrl, Quantity, Category (reference)
3. Cart Model
   - Product reference, User reference
4. Order Model
   - Amount, Products, User reference, Date
5. Category Model
   - Name, Products reference
6. Review Model
   - Product reference, User reference

### Controllers and Routers

Separate folders for controllers and routers with APIs for each model.

#### User Controller APIs

- Register user
- Login user
- Get user by ID
- Update user
- Delete user (admin access only)
- Get all users (for admin)
- Reset password

#### Product Controller APIs

- Add product (admin)
- Update product (admin)
- Get products by user
- Get product by category
- Delete product (admin)
- Get all products
- Search navigation

#### Cart Controller APIs

- Add to cart
- Delete from cart
- Add quantity
- Minus quantity
- Empty cart
- Get cart by user ID
- Show cart

#### Category Controller APIs

- Add category
- Get by order ID
- Get category
- Update category
- Delete category
- Get products by name

#### Order Controller APIs

- Checkout to order
- Get user by ID
- Get all orders
- Delete orders

#### Review Controller APIs

- Add review
- Update review
- Review products
- Average rating
- All reviews
- Delete review

### Application Structure

- Welcome to the AttireHome: Navigation bar with signup, signin, and admin cart links.
- Sidebar: View products by category (DRESS, KIDS, etc.).
- Homepage: Display all products with pagination.
- Product Details: Click on an image to view details, add reviews, and add to cart.
- Review Order: Navigate through shipping address and payment method.
- Place Order: Confirm order with total quantity and amount; empty cart after ordering.
- Profile Dashboard: Update profile, reset password, view order history.

#### Admin Dashboard

Three dropdowns:

1. Manage Products: Add, delete, update products.
2. Manage Users: View, delete users.
3. Manage Orders: View all orders.

#### Search Bar

Results are related to the entered search query.

#### Sidebar

Results are related to the selected category.

# MongoDB Setup Guide for AttireHome E-Commerce Application

Follow these steps to set up MongoDB for the AttireHome E-Commerce application based on the provided schemas:

## Step 1: Install MongoDB

Visit the official MongoDB website (https://www.mongodb.com/try/download/community) and download the MongoDB Community Server for your operating system. Follow the installation instructions for your platform.

## Step 2: Create a Database

1. Open the MongoDB shell or a MongoDB GUI tool (e.g., MongoDB Compass).
2. Run the following command to create a new database:
   ```bash
   use AttireHome_ecommerce
   ```

## Step 3: Create Collections
    Cart Collection
```bash
    db.createCollection("carts")

    Category Collection
```bash
    db.createCollection("categories")

    Order Collection
```bash
    db.createCollection("orders")

    Product Collection
```bash
db.createCollection("products")

    Review Collection
```bash
db.createCollection("reviews")

    User Collection
```bash
db.createCollection("users")

## Step 4: Insert Sample Data 


db.users.insertOne({
  Name: "John Doe",
  Address: "123 Main St",
  Phone: 1234567890,
  Email: "john@example.com",
  Password: "hashedpassword",
  IsAuth: false,
  Cart: { Items: [] }
})

db.products.insertOne({
  Name: "Sample Product",
  Price: 19.99,
  AvgRating: 4.5,
  ImageUrl: "sample_image_url",
  Quantity: 50,
  Category: ObjectId("your_category_id")
})

## Step 5 Configure the .env variable

Url=mongodb://127.0.0.1:27017/database
JWT_Secret=ajeetnodejs

## Step 6: Start the Server
    cd client 
        npm start
    cd server
        npm start    