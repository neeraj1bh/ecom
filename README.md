# Project: E-Commerce Dashboard

## Overview

This project is an E-Commerce Dashboard built using Next.js with various features such as user authentication, email verification using OTP, protected routes, and a dashboard for updating users' liked categories. The backend is powered by a Neon PostgreSQL database and utilizes Gmail OAuth API for sending emails and Nodemailer for email handling.

### Live Demo

[Click here to see it live](https://ecom.nb9t7.app/)

<img alt="E-commerce Dashboard" src="https://github.com/neeraj1bh/ecom/assets/55753068/c290e465-6bc7-4edf-9286-232214c5dd53">

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Email Verification using OTP**: Users are required to verify their email addresses using a one-time password (OTP) sent to their registered email.
- **Protected Routes**: Certain routes are protected and can only be accessed by authenticated users.
- **Dashboard**: Provides a user-friendly interface for updating users' liked categories.
- **Hosted on Vercel**: The application is hosted on the Vercel platform for easy deployment and scalability.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Neon PostgreSQL, Prisma
- **Authentication**: NextAuth.js
- **API Integration**: tRPC
- **Email Handling**: Gmail OAuth API, Nodemailer

## Installation and Usage

```bash
git clone https://github.com/neeraj1bh/ecom.git
cd ecom
yarn
yarn dev
```

## Project Structure

```
.
├── README.md
├── commitlint.config.cjs
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.cjs
├── prettier.config.js
├── prisma
│   ├── initialize.js
│   ├── migrations
│   │   ├── 20240331050856_users
│   │   │   └── migration.sql
│   │   ├── 20240402024946_verified
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   └── favicon.ico
├── src
│   ├── assets
│   │   ├── CaretLeftIcon.tsx
│   │   ├── CaretRightIcon.tsx
│   │   ├── CartIcon.tsx
│   │   ├── LogoutIcon.tsx
│   │   ├── SearchIcon.tsx
│   │   ├── SpinnerIcon.tsx
│   │   └── index.ts
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Navbar.tsx
│   │   ├── TextLink.tsx
│   │   └── WithAuth.tsx
│   ├── env.js
│   ├── forms
│   │   ├── useLoginForm.ts
│   │   └── useSignupForm.ts
│   ├── hooks
│   │   └── useAuthenticated.ts
│   ├── interfaces
│   │   └── dashboard.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── api
│   │   │   ├── category
│   │   │   │   └── route.ts
│   │   │   ├── email
│   │   │   │   ├── send
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify
│   │   │   │       └── route.ts
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── selected-category
│   │   │   │   ├── [id]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── trpc
│   │   │       └── [trpc].ts
│   │   ├── coming-soon
│   │   │   └── index.tsx
│   │   ├── dashboard
│   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   ├── signup
│   │   │   └── index.tsx
│   │   └── verify-email
│   │       └── index.tsx
│   ├── server
│   │   ├── api
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   └── db.ts
│   ├── styles
│   │   └── globals.css
│   ├── utils
│   │   └── api.ts
│   └── views
│       ├── Dashboard
│       │   ├── CategoriesList.tsx
│       │   ├── Items.tsx
│       │   └── index.tsx
│       ├── Login
│       │   └── index.tsx
│       └── Signup
│           ├── Verify.tsx
│           └── index.tsx
├── start-database.sh
├── tailwind.config.ts
├── tree_output.txt
├── tsconfig.json
└── yarn.lock

33 directories, 59 files

```

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `yarn`.
3. Run the development server using `yarn dev`.
4. Access the application in your browser at `http://localhost:3000`.

## Learn More

For more information about the project and its components, please refer to the documentation and learning resources provided in the project's README file.

## Deployment

Follow the deployment guides provided in the project's documentation for deploying the application on Vercel.
