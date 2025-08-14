# Chat App

A real-time chat application with **1-to-1 and group messaging**, built with **Node.js + Express + Socket.IO** (backend), **Vue.js + Vite** (frontend), and **PostgreSQL** (database).  
This project uses a **monorepo structure** with separate frontend and backend folders.

---

## **Project Structure**

```

chat-app/
│
├── backend/    # Node.js backend
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/   # Vue.js frontend
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md

````

---

## **Tech Stack**

**Backend:** Node.js, Express, Socket.IO, Prisma ORM, PostgreSQL  
**Frontend:** Vue.js 3, Vite, Pinia (state management), Socket.IO client, Axios  
**Database:** PostgreSQL (Supabase or local)  
**Hosting / CI/CD:**  
- Frontend → Vercel  
- Backend → Fly.io (or other free-tier hosting)  
- CI/CD → GitHub Actions

---

## **Getting Started**

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
````

---

### **2. Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/chatdb?schema=public"
```

* Start backend:

```bash
npx nodemon src/index.js
```

* Visit `http://localhost:5000` → Should show: `Backend is running`

---

### **3. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

* Visit `http://localhost:5173/` → Should show **"Vue + Socket.IO Test"**
* Check browser console → Should see **Connected to backend: <socket-id>**

---

## **Features (Planned)**

* User registration/login (JWT)
* 1-to-1 chat
* Group chat
* File sharing (images, docs)
* Typing indicators
* Read receipts
* Notifications (web push)
* Real-time WebSocket communication
* Optional mobile version in the future

---

## **CI/CD (Planned)**

* Frontend → Auto-deploy to **Vercel** on push/merge
* Backend → Auto-deploy to **Fly.io** or other free-tier hosting
* Database migrations → Prisma / Supabase CLI via GitHub Actions

---

## **License**

MIT License

---
