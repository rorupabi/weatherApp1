# 🌤️ WeatherAPI

A full-stack Weather API application built with **Nuxt.js**, **TailwindCSS v4**, **JavaScript**, **Node.js**, and **SQLite**. It provides real-time weather data with a clean and responsive frontend interface and a simple, lightweight backend.

---

## 🚀 Features

- 🌐 Search weather by city or coordinates
- 🌡️ Display temperature, humidity, wind speed, and more
- 🌙 Dynamic icons based on current weather
- 🧾 Local caching with SQLite for quick responses
- 🎨 TailwindCSS v4 for fast, mobile-first styling
- 🗂️ Modular architecture using Nuxt.js

---

## 🛠️ Tech Stack

| Frontend  | Backend   | Database | Styling         |
|-----------|-----------|----------|------------------|
| Nuxt.js   | Node.js   | SQLite   | TailwindCSS v4   |
| JavaScript | Express.js (optional) |       |                |

---

## 📂 Project Structure

/weather-api/
├── client/ # Nuxt.js frontend
│ ├── pages/ # UI pages
│ ├── components/ # Vue components
│ └── assets/ # Styles, icons, etc.
├── server/ # Node.js backend
│ ├── routes/ # API routes
│ ├── db/ # SQLite DB and queries
│ └── app.js # Entry point
├── .env # Environment variables
├── package.json
└── README.md

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/weather-api.git
cd weather-api

# Install backend dependencies
cd server
npm install

# Setup SQLite
# (Preconfigured or run migration if available)

# Start the backend
node app.js

# Setup frontend
cd ../client
npm install

# Run frontend
npm run dev

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/weather/:city	Get weather by city name
GET	/api/weather/coords?lat=...&lon=...	Get weather by coordinates

License
MIT

TailwindCSS is customized using the tailwind.config.js in the client/ directory.

Uses SQLite for quick local data access and caching.
