# Ecomms - Next.js E-commerce Website 🛍️

Ecomms is an imaginary e-commerce platform based in **Bulgaria**, where users can browse and purchase products. It also supports a **partnership program** that enables users to list their own products. The platform is built with Next.js for seamless performance and scalability.

---

## 🌟 Features

### **General**

- **User Authentication**: Users can **sign in** or **sign up** to access features.
- **Product Browsing**: Explore and filter products with ease.

### **Users' Capabilities**

1. **Search and Filter Products**:
   - Use advanced filters (category, price, etc.) for precise searches.
2. **Place Orders**:
   - Provide delivery details (address, phone, etc.) during checkout.
3. **Track Orders**:
   - Monitor order statuses directly in user accounts.
4. **Track Purchases**:
   - View purchase history at any time.
5. **Partner Program**:
   - Partnered users can list their own products with details like variations (color, size, etc.).

---

## 🔧 Currently Working On

- **User-Based Personalization Features**
  - Implementing tailored product recommendations based on user activity, preferences, and browsing history.
  - Developing a "For You" section that highlights products based on the user's recent views, cart additions, and purchases.
  - Adding dynamic discounts personalized to user behavior, including similar product suggestions and activity-based promotions.

---

## ✨ Latest Changes

- **Minor fixes throughout the app**

  - Fixed product price calculation to include discount, quantity, and shipping fee

  - Components sorted for improved comprehension
  - Code refactoring for /account for proper use of server/client components
  - Code refactoring for /browse to minimize amount of API requests
  - Code refactoring for /browse/product/[id] to minimize props passed down to child components
  - General code cleanup

  - Added pagination for PaginatedProductList when displaying all products

  - /browse/[category] replaced by search params-based category search

- **Responsive Design**:
  - Pages `/browse/product/post` and `/browse/product/edit` are being optimized for responsiveness.
- **Product Variations**:
  - Partners can now list products with variations (e.g., color, size) and include pictures.
- **Responsive Design**:
  - Fully optimized for both **phones** and **laptops**.
- **URL-Based Filtering**:
  - Added URL parameter-based sorting, searching, and category filtering.
- **User Account Updates**:
  - Users can update their **username**, **email**, or **password** with verification.
- **Partnership Program**:
  - Approved users can list, edit, or delete their own products.
- **Route Protection**:
  - Secured routes for browsing and account management.

---

## 🚀 Upcoming Features

- **Admin Application**:
  - Admins will manage and validate user orders (confirm/reject).

---

## 📋 Summary of Functionality

| Feature                      | Status         |
| ---------------------------- | -------------- |
| User Authentication          | ✅ Completed   |
| Product Browsing & Filtering | ✅ Completed   |
| Placing and Tracking Orders  | ✅ Completed   |
| Partnership Program          | ✅ Completed   |
| Responsive Design            | 🚧 In Progress |
| Google Sign-In               | 🚧 In Progress |
| Admin Order Management       | 🛠️ Planned     |
