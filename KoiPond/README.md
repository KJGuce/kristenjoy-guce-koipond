# KoiPond App

KoiPond is my BrainStation capstone project designed to foster community support and connection. Inspired by the concept of 'koinonia'—fellowship and shared purpose—this app connects those in need with resources and volunteers who can help.

---

## Features

### Main Sections

1. **Alms**: A hub for resource sharing, allowing users to post, browse, and claim available resources.
2. **Acts**: A space for volunteer opportunities, enabling users to browse, volunteer, and organize community acts.

### Key Functionalities

- Viewing and Posting Alms (resources) and Acts (volunteer)
- Search and Filter Capabilities
- Tailored Themes for Light and Dark Modes
- Mobile-First Design Using React Native

---

## Tech Stack

### Frontend

- **React Native with Expo**
- **TypeScript** for type safety

### Backend

- **Node.js** with Express.js
- **SQL** database for structured data storage

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Expo CLI**
- **Xcode (iOS Simulator)**

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd koi-pond
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and include:

   ```
   API_URL = "http://localhost:8080"
   ```

4. **Start the App**:
   ```bash
   expo start
   ```

---

## Running the Backend Server

1. Install backend dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   npm start
   ```

---
