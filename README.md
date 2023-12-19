# YogaClass

Welcome to YogaClass, a web application designed to manage yoga class subscriptions. This project utilizes a tech stack composed of React, Material UI, TailwindCSS, Node.js, SQLite3, Express.js, and the Context API for state management.

## Tech Stack

- **Frontend:**
  - React
  - Material UI
  - TailwindCSS

- **Backend:**
  - Node.js
  - SQLite3
  - Express.js

- **State Management:**
  - Context API

## Database Design

The application's database design consists of four tables:

1. **UserTable:**
   - Columns: `user_id`, `name`, `age`, `email`, `password`
   - Purpose: Stores user data.

2. **BatchTable:**
   - Columns: `batch_id`, `Batch_Time`
   - Purpose: Stores information about different batches.

3. **SubscriptionTable:**
   - Columns: `user_id`, `batch_id`, `subscription_id`, `start_date`, `end_date`
   - Purpose: Manages user subscriptions, including start and end dates, and keeps track of the last payment history.

4. **PaymentTable:**
   - Columns: `payment_id`, `user_id`, `batch_id`, `status`
   - Purpose: Records payment history for users and displays payment status.

### Entity-Relationship (ER) Diagram

![Untitled Diagram  MConverter eu](https://github.com/maheshpatil132/Yoga-Class/assets/92781925/2a797e10-827e-40dc-9d37-257c70ad7641)



## Project Logic

1. If the user is not logged in, the application displays the login/register page.
2. After a successful login, the user is redirected to the user profile page.
3. If the user hasn't purchased any subscription, a 'BUY Now' button is displayed.
4. If the user has bought a subscription and the subscription has expired, a 'Renew' button is displayed.
5. Clicking the 'Renew' button opens a payment pop-up where the user can initiate the payment process.

## Features

- **Payment History:**
  - A feature to be added soon, allowing users to view their payment history and subscription purchase times.


