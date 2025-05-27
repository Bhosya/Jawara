# Jawara — Disaster Management Platform

**Jawara** is an integrated web-based disaster management platform designed to assist with disaster response in a fast, structured, and efficient manner. This system enables public users to access disaster information while providing admin users with tools to manage disaster-related data, logistics, volunteers, and donations.

## Features

### For Public Users (Guest)
- View ongoing disaster events.
- Track the logistics and urgent needs of each disaster.
- Access emergency contact information and evacuation center data.
- View missing victims and victim impact data.
- Submit donations.

### For Admin Users
- Admin dashboard login.
- Full CRUD capabilities for disaster data, logistics needs, donations, evacuation centers, volunteers, and more.
- Accessible only for authenticated users with the `admin` or `super_admin` role.

### For Super Admin
- Super admin account is seeded initially.
- Responsible for approving admin registration requests.
- Full access to user management and system data.

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Fetch API (REST)
- JWT-based Authentication

### Backend
- Express.js (TypeScript)
- Prisma ORM + PostgreSQL
- JWT Authentication
- Modular feature-based structure
- Role-based access control
- Seeding support for initial super admin account


## Authentication & Roles

- **JWT** is used for login authentication and route protection.
- **User roles**:
  - `guest`: Unauthenticated users.
  - `admin`: Authenticated users with dashboard access.
  - `super_admin`: Highest-level access, can approve admin users.

### Auth Endpoints
- `POST /api/auth/register`: Register a new admin account (pending approval).
- `POST /api/auth/login`: Login for approved admin users.
- `GET /api/users/pending`: View unapproved admin accounts (super_admin only).
- `PATCH /api/users/:id/approve`: Approve admin registration (super_admin only).

## Login Account
- email: superadmin@jawara.my.id
- password: admin123
