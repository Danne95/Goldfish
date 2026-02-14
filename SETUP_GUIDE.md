# 🚀 Task & Events Manager - Setup Guide

Congratulations! Your Task & Events Manager app is ready. Here's how to get it running:

## Step 1: Set Up Firebase (Required)

### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Name it anything you like (e.g., "TaskEventsManager")
4. Follow the setup prompts

### Get Your Firebase Config
1. In Firebase Console, go to Project Settings (gear icon) 
2. Scroll down to "Your apps"
3. Click "Add app" → select "Web"
4. Copy the Firebase config values

### Create `.env.local` File
1. In the project root, copy `.env.example` to `.env.local`
2. Fill in your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=yourproject
   VITE_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_number
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Step 2: Enable Firebase Services

### Enable Authentication
1. Go to **Authentication** in Firebase Console
2. Click "Sign-in method"
3. Enable **Google**
4. Set up consent screen if prompted

### Enable Firestore Database
1. Go to **Firestore Database**
2. Click "Create Database"
3. Select **Production mode**
4. Choose a region and create

### Set Security Rules
1. In Firestore, go to **Rules** tab
2. Replace with these rules (copy from SETUP_SIMPLE_RULES.md file)
3. Click "Publish"

## Step 3: Run the App

```bash
npm install  # if not already done
npm run dev
```

The app will open at `http://localhost:5173`

## Step 4: Test Everything

1. Click "Sign in with Google"
2. Add a task, plan, birthday, anime, or manga
3. View it on the home page
4. Edit and delete it

## 📱 Access from Your Phone

On the same WiFi:
1. Get your PC's IP address (in terminal: `ipconfig`)
2. On your phone browser, go to: `http://YOUR_IP:5173`
3. Sign in with the same Google account

**All data syncs automatically across devices!**

## 🆘 Troubleshooting

**"Firebase not initialized" error?**
- Check your `.env.local` file has all values filled in
- Reload the page

**"Permission denied" when adding items?**
- Check Firestore security rules are published
- Try clearing browser cache

**Google login doesn't work?**
- Make sure Google authentication is enabled in Firebase
- Check authorized domains in Firebase > Authentication > Settings

**Data not showing on phone?**
- Make sure you're on the same WiFi
- Sign in with the same Google account
- Wait a moment for data to sync

## 📞 Support

For Firebase help: [Firebase Documentation](https://firebase.google.com/docs)
For React help: [React Documentation](https://react.dev)

## ✨ Next Steps

Your app has the following features ready:
- ✅ Google sign-in
- ✅ Plans & appointments
- ✅ Birthday tracker
- ✅ Anime tracking
- ✅ Manga tracking
- ✅ Tasks with priorities
- ✅ Dashboard with alerts

Enjoy! 🎉
