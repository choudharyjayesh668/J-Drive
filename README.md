# J-Drive

J-Drive is a personal file storage and organization system built for people who want to store a large number of files without relying on expensive cloud storage.

The idea is simple: **J-Drive provides the interface and organization layer, while the user's own Telegram channel is used as the file storage layer.**

Instead of searching through hundreds of files in a Telegram chat, users can use J-Drive to create folders, upload multiple files, preview them, download them, rename folders, and manage their files through a structured interface.

---

## Why J-Drive?

Cloud storage is convenient, but storage limits and subscription costs can become a problem when a user wants to keep a large collection of files for a long time.

Telegram can be useful as a personal storage backend, but using Telegram directly for file storage becomes difficult to manage when the number of files grows.

For example, a user might have hundreds of files stored in a Telegram channel. Finding one specific file later can become difficult if the user does not remember when it was uploaded.

J-Drive solves the organization problem by providing a dedicated file-management interface on top of the user's Telegram storage.

### The problem

Without J-Drive:

- Files can become difficult to organize.
- Finding an old file in a large Telegram collection can be frustrating.
- Files are mixed together instead of being organized by purpose.
- Managing hundreds of files through a chat interface is inconvenient.
- Accessing personal storage directly through Telegram on multiple devices may expose other Telegram conversations and content.

### The J-Drive approach

J-Drive provides:

- Folder-based organization
- Multiple-file uploads
- File preview
- File downloads
- File deletion
- Folder renaming
- Folder deletion
- JWT-based authentication
- Password hashing
- A dedicated web interface for managing stored files

The actual files are stored in the user's own Telegram channel rather than being stored on J-Drive's database.

---

# How J-Drive Works

J-Drive uses three main components:

```text
                    J-Drive
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
       React +                  Node + Express
       Tailwind                     │
          │                         │
          └──────────────┬──────────┘
                         │
                    MongoDB
                 User + Folder +
                  File Metadata
                         │
                         │
                  Telegram Bot API
                         │
                         ▼
                User's Telegram Channel
                    Actual Files
```

The important part of this architecture is that **MongoDB does not store the uploaded files themselves.**

MongoDB stores the information required by J-Drive to identify users, folders, and the Telegram files associated with those folders.

The actual file is uploaded through the Telegram Bot API to the user's configured Telegram channel.

---

# User Flow

## 1. Create an Account

A user creates a J-Drive account using:

- Username
- Email
- Password

The password is never stored as plain text.

J-Drive uses `bcryptjs` to hash the password before storing it in MongoDB.

---

## 2. Configure Telegram Storage

After creating an account, the user can configure their Telegram storage connection.

The user provides:

- Telegram Bot API Token
- Telegram Channel ID

These credentials allow J-Drive to communicate with the user's Telegram channel through the Telegram Bot API.

The user is responsible for creating their own Telegram bot and personal/private channel.

A guide for creating the bot and obtaining the required Telegram credentials will be provided on the hosted J-Drive website.

> **Important:** Telegram Bot API tokens and channel IDs are private credentials. Users should never share them with other people.

---

# 3. Create a Folder

Once logged in, users can create folders inside J-Drive.

For example:

```text
J-Drive
│
├── College
├── Projects
├── Documents
├── Photos
├── Videos
└── Work
```

The folder information is stored in MongoDB.

Folders provide the organization layer that Telegram itself does not provide for this use case.

---

# 4. Upload Files

The user opens a folder and selects one or multiple files.

J-Drive sends the files to the backend.

The backend uploads the files to the user's configured Telegram channel through the Telegram Bot API.

The backend then stores the required Telegram file information in MongoDB.

Conceptually:

```text
User
 │
 │ Selects files
 ▼
J-Drive Frontend
 │
 │ Upload request
 ▼
J-Drive Backend
 │
 ├──────────────► Telegram Bot API
 │                       │
 │                       ▼
 │              User's Telegram Channel
 │
 ▼
MongoDB
```

MongoDB stores metadata and the relationship between:

```text
User
  ↓
Folder
  ↓
File
  ↓
Telegram File ID
```

The actual uploaded file is not stored in MongoDB.

---

# 5. Multiple File Uploads

J-Drive supports uploading multiple files at once.

This makes it possible to quickly organize a large collection of files into a specific folder.

For example:

```text
Projects/
├── project-report.pdf
├── presentation.pptx
├── source-code.zip
├── screenshots.zip
└── documentation.pdf
```

---

# 6. File Preview

Users can preview supported files directly through J-Drive before downloading them.

This is useful when a user has many files and wants to identify the correct file without downloading every file first.

---

# 7. Download Files

When a user chooses to download a file, J-Drive retrieves the corresponding file through Telegram and sends it back to the user.

The user does not need to manually search through their Telegram channel.

---

# 8. Delete Files

When a file is deleted from J-Drive, the corresponding Telegram message/file is also deleted from the configured Telegram channel.

This keeps J-Drive and the user's Telegram storage synchronized.

---

# 9. Rename Folders

Users can rename their J-Drive folders without affecting the files stored inside them.

For example:

```text
Old:

College Files

New:

BCA Final Year
```

The folder metadata is updated in MongoDB.

---

# 10. Delete Folders

Deleting a folder also removes the files belonging to that folder.

The deletion flow is:

```text
Delete Folder
      │
      ├── Find files belonging to folder
      │
      ├── Delete corresponding Telegram files
      │
      ├── Delete file records
      │
      └── Delete folder record
```

This prevents orphaned files from remaining in the Telegram storage when the corresponding J-Drive folder is deleted.

---

# Authentication & Security

J-Drive uses several mechanisms to protect user accounts and application routes.

## Password Hashing

Passwords are hashed using `bcryptjs`.

Passwords are not stored as plain text in MongoDB.

```text
User Password
      │
      ▼
   bcrypt
      │
      ▼
Hashed Password
      │
      ▼
   MongoDB
```

---

## JWT Authentication

J-Drive uses JSON Web Tokens (JWT) for authentication.

After successful login, the user receives an authenticated session through the application's JWT-based authentication system.

Protected requests require valid authentication.

---

## Protected Routes

Public routes include areas such as:

- Landing page
- Signup
- Login

Authenticated users can access protected functionality such as:

- Homepage
- Folders
- Files
- File preview
- File download
- File deletion
- Folder creation
- Folder renaming
- Folder deletion
- Settings

This prevents unauthenticated users from directly accessing private file-management functionality.

---

# Data Storage Architecture

One of the important design decisions in J-Drive is separating **application data** from **file storage**.

### MongoDB

MongoDB stores application information such as:

- User accounts
- Hashed passwords
- User information
- Folder information
- File metadata
- Telegram file identifiers
- Relationships between users, folders, and files

MongoDB does **not** act as the primary storage location for the uploaded files.

### Telegram

Telegram is used as the file storage backend.

Files uploaded through J-Drive are sent to the user's configured Telegram channel.

This means the application does not need to maintain a large file-storage server of its own.

---

# Privacy Model

J-Drive is designed around a user-controlled storage model.

Each user connects their own Telegram bot and channel to J-Drive.

The intention is that the user's files remain in their own Telegram storage rather than being collected into one central J-Drive storage account.

The J-Drive backend primarily handles:

```text
Authentication
      +
Folder organization
      +
File metadata
      +
Telegram API communication
```

The actual file storage is handled by the user's Telegram channel.

### Important

Users should treat their Telegram Bot API token and channel credentials as private secrets.

**Never share your Bot API token with another person.**

Anyone who obtains sensitive Telegram credentials may be able to interact with the associated bot or storage configuration.

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Motion
- Phosphor Icons

### Frontend dependencies

```text
React
React DOM
React Router DOM
Tailwind CSS
Axios
Motion
Phosphor Icons
```

---

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Telegram Bot API

### Backend dependencies

```text
Express
Mongoose
MongoDB
JWT
bcryptjs
Multer
Axios
node-telegram-bot-api
cookie-parser
CORS
dotenv
form-data
```

---

# Architecture

```text
┌───────────────────────────────┐
│          J-Drive UI           │
│                               │
│ React + Tailwind + Vite       │
└───────────────┬───────────────┘
                │
                │ HTTP / API
                ▼
┌───────────────────────────────┐
│        J-Drive Backend        │
│                               │
│ Node.js + Express             │
│ JWT Authentication            │
│ bcrypt Password Hashing       │
│ File Handling                 │
└───────┬───────────────┬───────┘
        │               │
        │               │ Telegram Bot API
        ▼               ▼
┌───────────────┐   ┌──────────────────────┐
│   MongoDB     │   │ User's Telegram      │
│               │   │ Personal/Private     │
│ Users         │   │ Channel              │
│ Folders       │   │                      │
│ File Metadata │   │ Actual Files         │
└───────────────┘   └──────────────────────┘
```

---

# Deployment

J-Drive is deployed using separate frontend and backend services.

### Frontend

**Vercel**

The React/Vite frontend is deployed on Vercel.

### Backend

**Render**

The Node.js/Express backend is deployed on Render.

### Database

**MongoDB**

MongoDB stores application and user metadata.

It is not used as the main file-storage system.

---

# Current Features

- User signup
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Telegram Bot API integration
- User-configured Telegram storage
- Folder creation
- Folder listing
- Folder navigation
- Folder renaming
- Folder deletion
- Multiple-file upload
- File metadata management
- File preview
- File download
- File deletion
- Telegram file deletion
- Folder/file relationship management
- User settings for Telegram configuration

---

# Current Scope

J-Drive currently focuses on personal file storage and organization.

The application currently supports:

```text
Upload
Preview
Download
Delete
Create Folder
Rename Folder
Delete Folder
Multiple File Upload
Telegram Storage
```

The project is intentionally focused on keeping the storage experience simple rather than trying to become a full enterprise cloud-storage platform.

---

# Setup

## Clone the repository

```bash
git clone <repository-url>
cd J-Drive
```

The project contains a frontend and backend application.

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env` file with the required backend configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_port
```

Do not commit `.env` files or secret credentials to GitHub.

---

# Telegram Setup

To use J-Drive's Telegram storage functionality, the user needs:

1. A Telegram account
2. A Telegram bot
3. A private/personal Telegram channel
4. The Bot API token
5. The Telegram channel ID
6. The bot configured with the required permissions

J-Drive will provide a guide on the hosted website explaining how to create the bot and configure the Telegram channel.

---

# Project Philosophy

J-Drive is built around a simple idea:

> **Give users a clean file-management interface without requiring the application itself to become their file-storage provider.**

Telegram provides the underlying storage location, while J-Drive provides the organization and usability layer.

Instead of:

```text
Hundreds of files
       ↓
Telegram chat
       ↓
Search manually
```

J-Drive provides:

```text
J-Drive
   │
   ├── Documents
   ├── College
   ├── Projects
   ├── Photos
   └── Personal
        │
        ├── File 1
        ├── File 2
        ├── File 3
        └── File 4
```

The result is a personal file-management system that combines **Telegram's file-storage capability with a dedicated folder-based interface.**

---

# Disclaimer

J-Drive is a personal project and is not affiliated with Telegram, Google Drive, Google, or any other cloud-storage provider.

Users are responsible for securing their Telegram account, bot token, channel, and other credentials.

J-Drive does not guarantee unlimited storage, permanent availability, or a particular Telegram storage policy. Storage availability and limits are ultimately subject to the services used by the user.

---

# Author

**Jayesh Choudhary**

J-Drive was built as a personal project to explore full-stack development, authentication, file handling, database design, Telegram Bot API integration, and deployment.
