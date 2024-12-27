login-app/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/   (optional for assets)
├── views/
│   ├── login.html
│   ├── dashboard.html
│   └── register.html
├── app.js
└── package.json


for api?
my-nodejs-app/
├── public/              # For static files like CSS, JS, and images
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/          # Optional
├── routes/              # For route handlers
│   └── index.js
├── views/               # For HTML files or templates (if using a templating engine)
│   └── index.html
├── app.js               # Main application file
└── package.json         # Project configuration


nodejs setup:
    npm init -y (creates a default package.json file)
    npm install express
    npm install --save-dev nodemon
    create app.js file
    update scripts to
    "scripts": {
    "dev": "node server.js",
    "devstart": "nodemon server.js"
  },
    npm run devstart
    create routes#   S R U _ P O R T A L 
 
 
