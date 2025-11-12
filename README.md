# 🍔 FoodWagen Web App

A responsive and user-friendly Food Management web application built with **Next.js** and **TypeScript**.  
The app allows users to **view, search, add, edit, and delete food items** while connecting to a **mock REST API**.  

This project was developed as part of the **A2SV Technical Interview Challenge**, following the provided **Figma design** and coding standards.

---

## 🚀 Live Demo
👉 **[View Deployed App](https://your-vercel-deployment-link.vercel.app/)**  
*(Replace with your actual deployed link on Vercel)*

---

## 🧩 Features
- Fetch and display food items from mock API  
- Add new food items with validation  
- Edit and delete existing food items  
- Search foods by name  
- Loading indicators during API actions  
- Responsive UI (Mobile, Tablet, Desktop)  
- Accessible forms and descriptive error handling  
- Entry (slide-up) and hover animations  
- Organized component structure and semantic HTML  
- Integration with [MockAPI.io](https://mockapi.io/)  

---

## 🧠 Tech Stack
- **Framework:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS (with custom `food-` prefixed classes)
- **State Management:** React Hooks / useState / useEffect
- **API Handling:** Axios / Fetch
- **Testing:** Jest + React Testing Library (mocked API)
- **Deployment:** Vercel

---

## 🔗 API Endpoints
Base URL: `https://6852821e0594059b23cdd834.mockapi.io/Food`

| Action | Method | Endpoint | Description |
|--------|--------|-----------|-------------|
| Get All Foods | GET | `/Food` | Retrieve list of foods |
| Create Food | POST | `/Food` | Add a new food item |
| Update Food | PUT | `/Food/:id` | Update a food item |
| Delete Food | DELETE | `/Food/:id` | Remove a food item |
| Filter Foods | GET | `/Food?name=[searchParam]` | Search foods by name |

---

## 🧾 Form Input Naming & Validation
| Field | Input Name | Validation |
|--------|-------------|------------|
| Food Name | `food_name` | Required |
| Food Rating | `food_rating` (number) | Must be between 1–5 |
| Food Image URL | `food_image` | Required, must be valid URL |
| Restaurant Name | `restaurant_name` | Required |
| Restaurant Logo URL | `restaurant_logo` | Required |
| Restaurant Status | `restaurant_status` | Must be “Open Now” or “Closed” |

Error messages follow strict naming conventions (e.g., `id="food-name-error"`, `id="restaurant-logo-error"`).

---

## ⚙️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/foodwagen-nextjs-typescript.git
cd foodwagen-nextjs-typescript
