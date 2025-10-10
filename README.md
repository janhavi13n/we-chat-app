# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

🚀 Step-by-Step Firebase Deployment Guide
1. Build your React app

Run this command in your project root:

npm run build


👉 This creates a build/ folder containing your optimized production files.

2. Install Firebase CLI

If you haven’t installed it before:

npm install -g firebase-tools


Then log in:

firebase login


➡️ A browser window will open — sign in using the same Google account linked to your Firebase project.

3. Initialize Firebase in your project

Inside your React project folder, run:

firebase init


When prompted:

Hosting: choose Hosting: Configure files for Firebase Hosting

Select Firebase project: choose the project you created in the Firebase console

? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

==> Press Space on Hosting & Firestore ✅


What do you want to use as your public directory?
👉 type: build

Configure as a single-page app (rewrite all URLs to /index.html)?
👉 type: y (yes)

Set up automatic builds and deploys with GitHub?
👉 type: n (no, for now)

This creates two files:

.firebaserc

firebase.json

4. Deploy to Firebase

Now just run:

firebase deploy


✅ After a few seconds, you’ll see a URL like:

Project Console: https://console.firebase.google.com/project/my-chat-app-4b43e/overview
Hosting URL: https://my-chat-app-4b43e.web.app


That’s your live deployed chat app 🎉



### Re - Deployment

Redeploy after changes

Whenever you make new updates:

npm run build
firebase deploy

Common Mistakes to Avoid

Don’t deploy npm start — always deploy after npm run build.

Ensure your firebase.json has "public": "build".

Don’t delete the firebase.json or .firebaserc files.


