# Members Only

## Features

- Passportjs authentication (login, and register)
- Users can send messages
- Non-members can only see the title and content
- Members can see the author and date
- Admin can delete messages

## Built with:

- Pug
- Tailwind
- Node / Express
- MongoDB / Mongoose

View Live @ [Render Free Hosting](https://members-0rr4.onrender.com/)

## How to run the application:

Step 1: Install npm dependencies

```
npm install
```

Step 2: Create an .env file on root and add your MongoDB URI and Secret code

```
// inside .env file
MONGODB_URI="YOUR_MONGODB_URI"
SECRET="YOUR SECRET CODE"
```

Step 3: Run the application

```
npm run start
```

Step 4: Run tailwind watch (Optional)

```
npm run tailwind-watch
```

## Mongoose Schema:

<img src="https://i.imgur.com/SlIoQBL.jpg">

## Screenshots:

Homepage (logged out)
<img src="https://i.imgur.com/UMSvkK2.png">
Homepage (logged in + member)
<img src="https://i.imgur.com/pkL86tC.png">
Login
<img src="https://i.imgur.com/AlEwVue.png">
