# 🛍️ E-commerce REST API

A simple REST API built with **Node.js**, **Express.js**, and **Prisma ORM** (connected to MongoDB).  
This API manages **Employees** and **Products**, with **role-based access control**, **pagination**, **search**, and **authentication**.

---

## 🚀 Features
- Employee and Product Management (CRUD)
- Role-based Access Control (Admin / Super Admin / Employee)
- Authentication with JWT
- Pagination and Search for Products
- Error Handling (Invalid ID, Missing Fields)
- Request Logging Middleware
- Deployed on Vercel

---

## 📁 Project Structure
src/
├── app/
│ ├── modules/
│ │ ├── employee/
│ │ ├── product/
│ │ └── auth/
│ ├── middlewares/
│ ├── utils/
│ └── app.ts
├── prisma/
│ └── schema.prisma
└── server.ts


---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env

# 4️⃣ Run Prisma migrations
npx prisma generate

npx prisma db push

# 5️⃣ Start development server
npm run dev

🔑 Environment Variables
| Variable         | Description                 |
| ---------------- | --------------------------- |
| `DATABASE_URL`   | MongoDB connection URL      |
| `PORT`           | Server port (default: 5000) |
| `JWT_SECRET`     | Secret key for JWT          |
| `JWT_EXPIRES_IN` | JWT token expiry time       |


🧠 API Documentation
🧩 Auth Routes
| Method   | Endpoint                | Description              | Access        |
| -------- | ----------------------- | ------------------------ | ------------- |
| **POST** | `/auth/login`           | Login a user             | Public        |
| **POST** | `/auth/logout`          | Logout a user            | Authenticated |
| **PUT**  | `/auth/change-password` | Change password          | Authenticated |
| **POST** | `/auth/forgot-password` | Send reset password link | Public        |
| **POST** | `/auth/reset-password`  | Reset password           | Public        |

👨‍💼 Employee Routes
| Method     | Endpoint           | Description         | Access              |
| ---------- | ------------------ | ------------------- | ------------------- |
| **POST**   | `/employees`       | Create new employee | Admin / Super Admin |
| **POST**   | `/employees/admin` | Create new admin    | Super Admin         |
| **GET**    | `/employees`       | Get all employees   | Authenticated       |
| **GET**    | `/employees/:id`   | Get employee by ID  | Authenticated       |
| **PUT**    | `/employees/:id`   | Update employee     | Authenticated       |
| **DELETE** | `/employees/:id`   | Delete employee     | Admin / Super Admin |

🧱 Employee Fields
{
  "name": "John Doe",
  "salary": 5000,
  "role": "ADMIN",
  "image": "https://example.com/image.jpg"
}

🛒 Product Routes
| Method     | Endpoint        | Description                                     | Access              |
| ---------- | --------------- | ----------------------------------------------- | ------------------- |
| **POST**   | `/products`     | Create new product                              | Admin / Super Admin |
| **GET**    | `/products`     | Get all products (supports pagination & search) | Public              |
| **GET**    | `/products/:id` | Get product by ID                               | Public              |
| **PUT**    | `/products/:id` | Update product                                  | Authenticated       |
| **DELETE** | `/products/:id` | Delete product                                  | Admin / Super Admin |

🧱 Product Fields
{
  "name": "Wireless Mouse",
  "price": 25.99,
  "category": "Electronics",
  "image": "https://example.com/mouse.jpg"
}

🔍 Pagination & Search Example
GET /products?page=2&limit=10&search=mouse

🧩 Middleware
Request Logger

Logs method, URL, and timestamp for every incoming request.

export const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

🔐 Role-based Access Control

SUPER_ADMIN → Can create/delete Admins and Employees.

ADMIN → Can manage Products and Employees.

EMPLOYEE → Can view Products and own profile only.

🧪 Example Product JSON Data
{
  "name": "Laptop",
  "price": 899.99,
  "category": "Electronics",
  "image": "https://example.com/laptop.jpg"
}

🧪 Example Employee JSON Data
{
  "name": "Alice Smith",
  "salary": 3500,
  "role": "EMPLOYEE",
  "permission": ["READ"],
  "image": "https://example.com/alice.png"
}

🧰 Technologies Used

Node.js

Express.js

Prisma ORM

MongoDB

TypeScript

JWT Authentication

Swagger / Postman Collection for API Docs

🌐 Deployment

You can deploy easily using Vercel:

npm install -g vercel
vercel


Then follow CLI prompts and your API will be live on a URL like:

https://ecommerce-api.vercel.app/
