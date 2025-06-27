#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🍼 Baby Recipe Generator Setup\n');

const questions = [
  {
    name: 'spoonacularKey',
    message: 'Enter your Spoonacular API key: ',
    required: true
  },
  {
    name: 'firebaseApiKey',
    message: 'Enter your Firebase API key: ',
    required: true
  },
  {
    name: 'firebaseAuthDomain',
    message: 'Enter your Firebase Auth Domain: ',
    required: true
  },
  {
    name: 'firebaseProjectId',
    message: 'Enter your Firebase Project ID: ',
    required: true
  },
  {
    name: 'firebaseStorageBucket',
    message: 'Enter your Firebase Storage Bucket: ',
    required: true
  },
  {
    name: 'firebaseMessagingSenderId',
    message: 'Enter your Firebase Messaging Sender ID: ',
    required: true
  },
  {
    name: 'firebaseAppId',
    message: 'Enter your Firebase App ID: ',
    required: true
  }
];

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.message, (answer) => {
      if (question.required && !answer.trim()) {
        console.log('This field is required. Please try again.');
        askQuestion(question).then(resolve);
      } else {
        resolve(answer.trim());
      }
    });
  });
}

async function runSetup() {
  try {
    const answers = {};
    
    for (const question of questions) {
      answers[question.name] = await askQuestion(question);
    }

    const envContent = `# Spoonacular API Configuration
VITE_SPOONACULAR_API_KEY=${answers.spoonacularKey}

# Firebase Configuration
VITE_FIREBASE_API_KEY=${answers.firebaseApiKey}
VITE_FIREBASE_AUTH_DOMAIN=${answers.firebaseAuthDomain}
VITE_FIREBASE_PROJECT_ID=${answers.firebaseProjectId}
VITE_FIREBASE_STORAGE_BUCKET=${answers.firebaseStorageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${answers.firebaseMessagingSenderId}
VITE_FIREBASE_APP_ID=${answers.firebaseAppId}

# Server Configuration
PORT=5000
NODE_ENV=development
`;

    fs.writeFileSync('.env', envContent);
    
    console.log('\n✅ Environment file created successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm install');
    console.log('2. Start the backend: npm start');
    console.log('3. In another terminal, start the frontend: npm run dev');
    console.log('\n🎉 Your Baby Recipe Generator is ready to use!');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

runSetup(); 