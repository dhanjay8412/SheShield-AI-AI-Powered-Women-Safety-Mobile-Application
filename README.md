# SheShield AI - Backend Core Service

This directory contains the production-ready, highly scalable, and modular **Express.js + Node.js** backend core server for the **SheShield AI** Women Safety Mobile Application.

---

## 🚀 Features Implemented

1. **Custom & Federated Authentication**: Seamless synchronization of Firebase Authentication profiles and complete Emergency Contact registry management.
2. **Emergency SOS System**: Handles active triggers, logs incidents, dispatches Twilio SMS alerts to contacts with live location mappings, and fires multicast FCM push notifications.
3. **AI Voice Guardian & Speech Analytics**: Continuous verbal transcript threat intent evaluation using OpenAI models, and automated panic SOS triggers upon danger detection.
4. **Location Telemetry & Safety Indexes**: Logs continuous GPS coordinates history logs and queries nearby safety landmarks (hospitals, police stations) and location safety indexes.
5. **Covert Evidence Recording Log**: Registers background audio/video recording links securely synced from Firebase Cloud Storage.
6. **Administrative Portal Control**: Platform metric compilation, comprehensive user and emergency incident history tables, and global push notification broadcasts.
7. **Resilient Local Sandboxed Mode**: Graceful fallbacks for Twilio, OpenAI, and Firebase Admin SDK when local environment variables are unconfigured.

---

## 📂 Project Directory Structure

```
backend/
 ├── config/
 │    └── firebase.js          # Firebase Admin SDK bootstrap & Sandbox fallback mocks
 ├── middleware/
 │    ├── auth.js              # Token decrypter & admin validation
 │    └── error.js             # Runtime exception handler & 404 router fallback
 ├── controllers/
 │    ├── authController.js    # User profiles & emergency contact controllers
 │    ├── sosController.js     # SOS triggers, cancels, and telemetry mappings
 │    ├── chatController.js    # AI chatbot queries & Voice Guardian transcript intent check
 │    ├── trackingController.js# Path history & safe spot mapping
 │    ├── recordingsController.js # Covert recording registries
 │    └── adminController.js   # Analytics overview & regional notification broadcasts
 ├── routes/
 │    ├── auth.js              # Sync, contacts, and custom token URI bindings
 │    ├── sos.js               # Trigger & cancel incident bindings
 │    ├── chat.js              # Chatbot and Speech analyzer bindings
 │    ├── tracking.js          # Telemetry and safe spaces bindings
 │    ├── recordings.js        # Secure file registries bindings
 │    └── admin.js             # Auth-guarded diagnostic overview bindings
 ├── services/
 │    ├── twilioService.js     # Twilio SMS API integrations
 │    ├── aiService.js         # OpenAI models & danger heuristic evaluations
 │    └── fcmService.js        # Firebase Cloud Messaging pushes
 ├── models/
 │    └── documentSchemas.js   # Firestore collection models & validators documentation
 ├── .env.example              # Key configurations template
 ├── server.js                 # App server bootstrapping
 └── package.json              # Library declarations
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `backend` folder and populate it with details matching `.env.example`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-app-bucket.appspot.com

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🛠️ Installation & Execution

### 1. Install Dependencies
Run npm install in this folder to fetch core dependencies:
```bash
npm install
```

### 2. Run the Development Server
Execute the server using nodemon for automatic reloads on local adjustments:
```bash
npm run dev
```

### 3. Run in Production
Build and boot direct node listener executions:
```bash
npm start
```

---

## 📡 REST API Documentation

### **Authentication & Contacts** (`/api/auth`)
* `POST /token` - Generate custom identity verification payloads.
* `POST /sync` - Register/synchronize client metadata profiles in database.
* `POST /contacts` - Append a trusted contact to user alert lists.
* `GET /contacts` - Return list of emergency contacts.
* `DELETE /contacts/:id` - Delete an emergency contact.

### **Emergency SOS Service** (`/api/sos`)
* `POST /trigger` - Activate urgent SOS. Fires Twilio SMS alerts and triggers FCM push notifications containing telemetry details.
* `POST /cancel` - Resolve an active SOS incident log.
* `GET /incident/:id` - Fetch coordinate mapping logs for a specific emergency.

### **AI Assistant & Voice Guardian** (`/api/chat`)
* `POST /converse` - Exchange contextual safety chatbot responses.
* `POST /voice-guardian` - Verify voice transcripts for panic triggers to auto-activate emergency SOS.

### **GPS Telemetry Tracking** (`/api/tracking`)
* `POST /telemetry` - Store current coordinate log point in history database.
* `GET /safety-metrics` - Query safety indices and nearby support spots (police, hospital).
* `GET /path/:userUid` - Return active telemetry path trace logs.

### **Administrative Dashboard** (`/api/admin`) (Requires Admin JWT/Token)
* `GET /metrics` - Aggregate active incidents and platform health numbers.
* `POST /broadcast` - Send platform-wide emergency warnings to all nodes.
* `GET /users` - Return complete list of app users.
* `GET /incidents` - Compile detailed list of all system emergency logs.
