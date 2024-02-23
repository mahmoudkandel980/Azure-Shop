# Azure Shop

You can go to project live [Azure Shop](https://azure-shop.netlify.app/), [API](https://documenter.getpostman.com/view/20256803/2s93sW9Fnz) and [APK](https://expo.dev/accounts/mahmoudkandel/projects/mobile/builds/8c9f3a8b-5fd6-4386-b67c-31ff7156935e).

**Azure Shop is a full stack realtime E-commerce mobile and web application using**

-   React - TypeScript.
-   Redux - Context API.
-   TailwindCss.
-   React Natvie (Expo) - TypeScript.
-   Redux Toolkit - Context API.
-   Node.js - Express.js.
-   MongoDB - Mongoose.
-   Socket.IO.
-   Rest API.
-   Stripe - Cloudinary.

<br/>

**Special features in Azure shop application**

-   When create, edit or remove user, product, review or even order. it will render in all application screens in realtime by Socket.IO.
-   There are a five several roles everyone has his own restrictions. Roles are user, seller, moderator, sub admin and admin.
-   There is a dashboard available only for moderators, sub admins and admin.
-   **Non authenticated user** can add or remove product from wish list or cart, product will be stored in localStorage, when user signup or login node.js server will implement functions for adding those products to his wish list and his cart. He can't make an order without creating an account.
-   **All users** with any role can add or remove product from his wish list or cart, make an order and pay for the order.
-   **User** Can ask to be a seller.
-   **Sellers, Moderators, Sub admins and Admin** Can create a product, edit or remove himself products.
-   **Moderators, Sub admins and Admin** Can mark any order as delivered.
-   **Moderator** Can edit seller's products except product's price, discount and the count in stock. Can edit users and sellers account's data. Can set user as a seller or set seller as a user.
-   **Sub admin** Can edit seller's and moderator's products except product's price, discount and the count in stock. Can edit users, sellers and moderators account's data. Can convert user as a seller or moderator. Can convert seller as a user or moderator. Can convert moderator as a user or seller. Can remove users, sellers and moderators accounts.
-   **Admin** Can edit seller's, moderator's and sub admin's products except product's price, discount and the count in stock. Can edit users, sellers, moderators and sub admins account's data. Can convert user as a seller, moderator or sub admin. Can convert seller as a user, moderator or sub admin. Can convert moderator as a user, seller or sub admin. Can convert sub admin as a user, seller or moderator. Can remove users, sellers, moderators and sub admins accounts.

<br/>

**Others features Azure shop application**

-   You can create an account, edit your data like your image, name and email, change password, you can reset your password when you forgot password, inactivate your account. If you sell products, those products will be hidden when you are inactive, when you activate your account products will be displayed again.
-   Any user with any role when make an order and pay for it when the order marked as delivered. User can create review for the product, edit or remove the review. User can only make one review for the product he received.
-   There is only one admin in application.
-   There is light mode and dark mode.
-   Payment done by Stripe company.
-   In development images will store in node.js server images folder, but in production images will store in cloudinary.
-   There are more logic than i mentioned here you will find there. check it [Azure Shop](https://azure-shop.netlify.app/).
