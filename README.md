To run this project - in the project directory, you can run:
### `npm start`

### Deployment
1. Build React app
This creates a build/ folder containing optimized production files.

Run this command in  project root:
### `npm run build`


2. Install Firebase CLI
If you haven’t installed it before:
### `npm install -g firebase-tools`


Then log in: firebase login

A browser window will open, sign in using the same Google account linked to your Firebase project.

3. Initialize Firebase in your project
Inside  React project folder, run:
### `firebase init`


When prompted:
Hosting: choose Hosting: Configure files for Firebase Hosting
Select Firebase project: choose the project you created in the Firebase console

Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

==> Press Space on Hosting & Firestore


What do you want to use as your public directory? => build

Configure as a single-page app (rewrite all URLs to /index.html)? => y

Set up automatic builds and deploys with GitHub? => n

This creates two files:
.firebaserc
firebase.json

4. Deploy to Firebase
Run:
### `firebase deploy`


After a few seconds, we'll see a URL like:

Project Console: https://console.firebase.google.com/project/my-chat-app-4b43e/overview
Hosting URL: https://my-chat-app-4b43e.web.app


That’s our live deployed chat app 🎉


### Re - Deployment
Whenever you make new updates:
### `npm run build`
### `firebase deploy`

Common Mistakes to Avoid
1. Don’t deploy npm start — always deploy after npm run build.
2. Ensure your firebase.json has "public": "build".
3. Don’t delete the firebase.json or .firebaserc files.