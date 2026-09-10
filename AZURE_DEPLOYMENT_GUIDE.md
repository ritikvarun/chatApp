# 🚀 Microsoft Azure Deployment Guide - Fullstack Chat App (MERN + Socket.IO)

Yeh guide aapke Chat App ko **Microsoft Azure App Service (Linux)** par deploy karne ka complete step-by-step process explain karti hai.

---

## 📌 Architecture Overview

Aapke project me **Socket.IO (WebSockets)** aur **HTTP-only Cookies (JWT)** use ho rahe hain. Isliye sabse best, fast aur zero-issue method hai **Single-Service Monolith Deployment on Azure App Service**:
- **Backend (Express + Socket.IO)** server port par run karega.
- Production me backend automatically `frontend/dist` ki static files ko serve karega (`/`).
- Same origin hone ki wajah se:
  - ❌ Koi CORS error nahi aayegi.
  - ❌ Third-party cookies block nahi hongi (Safari/Chrome me problem nahi aayegi).
  - ✅ Socket.IO connections 100% reliably connect honge.

---

## 🛠️ Step 0: Prerequisites (Pehle Yeh Ready Rakhein)

1. **GitHub Account**:
   - Code ko GitHub repository me push karein.
2. **MongoDB Atlas Account**:
   - Cluster bana kar Connection String ready rakhein.
   - **Crucial**: MongoDB Atlas me **Network Access** me jakar IP Access List me `0.0.0.0/0` (Allow Access from Anywhere) add karein taaki Azure servers connect ho sakein.
3. **Cloudinary Account**:
   - Cloud Name, API Key, API Secret ready rakhein.
4. **Microsoft Azure Account**:
   - Azure Portal ([portal.azure.com](https://portal.azure.com)) par login karein. (Students ko Azure for Students me $100 free credits milte hain).

---

## 🌐 Step 1: Code ko GitHub par Push Karein

Aapke root folder me humne already root `package.json` aur `server.js` me production static serving add kar di hai.

Terminal me execute karein:
```bash
git add .
git commit -m "Prepare for Azure deployment"
git push origin main
```

---

## ☁️ Step 2: Azure App Service Create Karein

1. **Azure Portal** me login karein: [portal.azure.com](https://portal.azure.com).
2. Top search bar me search karein **"App Services"** aur click karein.
3. **Create** -> **Web App** par click karein.
4. Form me ye details bharein:
   - **Subscription**: Apna subscription select karein.
   - **Resource Group**: **Create new** par click karke name dein (e.g., `chatapp-rg`).
   - **Name**: Ek unique name dein (e.g., `my-chatapp-live`). Aapka URL banega: `https://my-chatapp-live.azurewebsites.net`.
   - **Publish**: `Code`
   - **Runtime stack**: `Node 20 LTS` (ya `Node 18 LTS`)
   - **Operating System**: `Linux`
   - **Region**: Apne paas ka region select karein (e.g., `Central India` ya `Southeast Asia`).
   - **Pricing Plan**:
     - Testing/Free ke liye: **Free F1** select kar sakte hain.
     - *Note*: Production/Always On aur high-performance WebSockets ke liye **Basic B1** recommend kiya jata hai.
5. **Review + create** -> **Create** par click karein. (2-3 minute wait karein deployment finish hone tak).

---

## ⚡ Step 3: WebSockets Enable Karein (CRITICAL for Socket.IO!)

Azure App Service me WebSockets by default disable hote hain. Ise enable karna zaroori hai:

1. Apne Web App ke page par jayein.
2. Left sidebar me **Settings** section ke andar **Configuration** par click karein.
3. Top tabs me **General settings** select karein.
4. Scroll karein aur **Web sockets** toggle ko **On** karein.
5. Agar plan Basic B1 ya higher hai, toh **Always on** ko bhi **On** karein (taaki app sleep mode me na jaye).
6. Top par **Save** button dabayein aur confirm karein.

---

## 🔐 Step 4: Environment Variables (App Settings) Set Karein

1. Left sidebar me **Settings** -> **Environment variables** (ya **Configuration** -> **Application settings**) par click karein.
2. **+ Add** button par click karke ye key-value pairs add karein:

| Key (Name) | Value (Example) | Description |
|---|---|---|
| `NODE_ENV` | `production` | Production mode activate karega |
| `PORT` | `8080` | Azure App Service default internal port |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster...` | Aapka MongoDB Atlas connection string |
| `JWT_SECRET` | `your_super_secret_jwt_key_123` | JWT signing secret |
| `CLOUDINARY_CLOUD_NAME` | `your_cloudinary_name` | Cloudinary name |
| `CLOUDINARY_API_KEY` | `your_cloudinary_key` | Cloudinary key |
| `CLOUDINARY_API_SECRET` | `your_cloudinary_secret` | Cloudinary secret |
| `CLIENT_URL` | `https://my-chatapp-live.azurewebsites.net` | Aapka Azure app URL |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `true` | Azure Oryx automated build ke liye |

3. Sab add karne ke baad **Apply** / **Save** par click karein.

---

## 🚀 Step 5: GitHub Actions CI/CD Connect Karein

1. Left sidebar me **Deployment** section ke andar **Deployment Center** par click karein.
2. **Source**: Select karein **GitHub**.
3. Apne GitHub account ko authorize karein.
4. **Organization**, **Repository** (apna chat app repo), aur **Branch** (`main`) select karein.
5. Azure automatically ek GitHub Actions workflow file generate karega.
6. Top par **Save** par click karein.
7. GitHub par jayein -> Apne repo ke **Actions** tab me dekhein; deployment automatically build aur deploy hona start ho jayegi!

---

## 🔧 Step 6: Custom Startup Command (Agar Build ke baad App Start na ho)

Agar app start hone me issue aaye, toh:
1. Azure Portal me apne App Service par jayein.
2. **Configuration** -> **General settings** par jayein.
3. **Startup Command** box me enter karein:
   ```bash
   node backend/src/server.js
   ```
4. Click **Save** aur app ko **Restart** karein.

---

## 📋 Step 7: Live Test & Verification

1. App URL open karein: `https://<your-app-name>.azurewebsites.net`.
2. **Test Signup/Login**:
   - New account create karein.
   - Profile picture upload karke verify karein Cloudinary connection.
3. **Realtime Chat & Socket Test**:
   - Do alag browsers (e.g., Chrome aur Edge/Incognito) me do alag accounts login karein.
   - Dono me online green indicator test karein.
   - Ek user se message bhejein aur dusre me bina page refresh kiye instant message aana confirm karein!

---

## 🛠️ Troubleshooting & Common Fixes

1. **Application Error (502 / 503)**:
   - Left sidebar me **Monitoring** -> **Log stream** open karein. Realtime console logs check karein (e.g., MongoDB connection error ya missing env variable).
2. **MongoDB Connection Failed**:
   - MongoDB Atlas me Network Access check karein; IP whitelist me `0.0.0.0/0` hona chahiye.
3. **WebSockets Not Connecting**:
   - Verify karein ki **Configuration -> General settings -> Web sockets** "On" hai ya nahi.
