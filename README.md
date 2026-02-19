# 🛒 Expo Ecommerce App

A full-stack, multi-platform eCommerce application with a **React Native mobile app**, **React.js admin dashboard**, and a **Node.js REST API backend**.

🔗 **Live Admin Demo:** [ecommerce-app-black-three-13.vercel.app](https://ecommerce-app-black-three-13.vercel.app)
📦 **GitHub:** [github.com/kevalmeta/Ecommerce-App](https://github.com/kevalmeta/Ecommerce-App)

---

## 📱 App Screenshots

### Mobile App

| Login | Shop | Product Detail |
|-------|------|----------------|
| ![Login](https://github.com/user-attachments/assets/8ac2ecb0-0665-417c-8259-ee4092430679) | ![Shop](https://github.com/user-attachments/assets/c1b136dc-c5ca-437f-81a7-a9e4c5f47c7b) | ![Detail](https://github.com/user-attachments/assets/b6d1f0de-535c-4b22-8db6-9a239fd6a51b) |

| Cart | Checkout | My Orders |
|------|----------|-----------|
| ![Cart](https://github.com/user-attachments/assets/030e7bfc-766e-450c-b257-c85cfc61e17a) | ![Checkout](https://github.com/user-attachments/assets/ac080e1b-305c-4764-940d-9eeab8e4ce0c) | ![Orders](https://github.com/user-attachments/assets/c69b63b1-155d-48df-b329-6c07b6902682) |

| Profile | Wishlist | Addresses |
|---------|----------|-----------|
| ![Profile](https://github.com/user-attachments/assets/7a30dafa-d018-474a-ba2d-04e6ba33fa69) | ![Wishlist](https://github.com/user-attachments/assets/bdf22e45-cb1d-4b14-a81d-a025d90fbe00) | ![Addresses](https://github.com/user-attachments/assets/54ca9443-01d7-40ba-a06b-e348f8191b23) |

### Admin Dashboard

| Dashboard | Products |
|-----------|----------|
| <img src="https://github.com/user-attachments/assets/e690f9e5-6cf2-444d-ab70-3f65f9cdc4ae" width="500"/> | <img src="https://github.com/user-attachments/assets/32b555b6-9e29-4ea9-934d-c2f11fe56be0" width="500"/> |

| Orders | Customers |
|--------|-----------|
| <img src="https://github.com/user-attachments/assets/e7b11d59-3186-465b-bbf8-7adccc391df8" width="500"/> | <img src="https://github.com/user-attachments/assets/f25a9b4d-85e2-4e77-9e4a-3a3dad7ef902" width="500"/> |

---

## ✨ Features

### 📱 Mobile App
- 🔐 **Authentication** — Google & Apple OAuth via Clerk
- 🛍️ **Product Browsing** — Grid layout with category filters & search
- 📄 **Product Detail** — Image slider, ratings, reviews, stock info
- 🛒 **Cart** — Add/remove items, quantity control, tax & shipping summary
- 💳 **Stripe Payment** — Secure card payment integration (test mode)
- 📦 **Order Tracking** — View order history with status (Pending / Delivered)
- ❤️ **Wishlist** — Save products for later
- 📍 **Address Management** — Add, edit, delete multiple delivery addresses
- 👤 **Profile** — View profile, orders, wishlist, notifications, privacy settings

### 🖥️ Admin Dashboard
- 🔐 **Secure Login** — Clerk authentication with Google & Apple OAuth
- 📊 **Dashboard** — Real-time stats: Total Revenue, Orders, Customers, Products
- 📦 **Product Management** — Add, edit, delete products with image upload (up to 3 images)
- 🧾 **Order Management** — View all orders, update order status (Pending → Delivered)
- 👥 **Customer Management** — View registered customers, addresses & wishlist count

---

## 🛠️ Tech Stack

### Mobile App
| Technology | Purpose |
|-----------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development toolchain & build system |
| **Clerk** | Authentication (Google & Apple OAuth) |
| **Stripe** | Payment gateway integration |
| **FlatList** | Product grid & order list rendering |
| **Bottom Tab Navigator** | App navigation (Shop / Cart / Profile) |
| **Modal** | Add to Cart popup, Address selector |
| **Image Slider** | Product image carousel on detail screen |

### Admin Dashboard
| Technology | Purpose |
|-----------|---------|
| **React.js** | Frontend UI framework |
| **Clerk** | Admin authentication |
| **Vercel** | Deployment & hosting |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Render** | Backend deployment & hosting |
| **REST API** | Communication between mobile, admin & server |

---

## 🗂️ Project Structure

```
Ecommerce-App/
├── mobile/          # React Native mobile app (Expo)
├── admin/           # React.js admin dashboard
├── backend/         # Node.js + Express REST API
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Clerk account → [clerk.com](https://clerk.com)
- Stripe account → [stripe.com](https://stripe.com)

### 1. Clone the repository

```bash
git clone https://github.com/kevalmeta/Ecommerce-App.git
cd Ecommerce-App
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
CLERK_SECRET_KEY=your_clerk_secret_key
```

Run the server:
```bash
npm start
```

### 3. Setup Admin Dashboard

```bash
cd admin
npm install
```

Create a `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

Run the admin panel:
```bash
npm run dev
```

### 4. Setup Mobile App

```bash
cd mobile
npm install
```

Create a `.env` file:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EXPO_PUBLIC_API_URL=http://localhost:5000
```

Run the app:
```bash
npx expo start
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `CLERK_SECRET_KEY` | Clerk backend secret key |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk public key for admin |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for mobile |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `EXPO_PUBLIC_API_URL` | Backend API base URL |

---

## 📦 Deployment

| Platform | URL |
|----------|-----|
| Admin (Vercel) | [ecommerce-app-black-three-13.vercel.app](https://ecommerce-app-black-three-13.vercel.app) |
| Backend (Render) | Deployed on Render |

---

## 👨‍💻 Author

**Keval Patel**
- GitHub: [@kevalmeta](https://github.com/kevalmeta)
- Email: kevalmetaliya7171@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> 🚀 Built with ❤️ by [Keval Metaliya](https://github.com/kevalmeta)
> ⭐ Star this repo if you found it helpful!
