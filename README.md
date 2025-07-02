# Movie Watchlist

A modern, secure, and responsive full-stack web app for managing your favorite movies. Easily add, update, search, and delete movies from your personal watchlist — all in a beautiful dark-themed interface.


## Preview

> _Add a screenshot or gif of your app here to give users a quick visual idea of what to expect._

## Features

 **User Authentication**
  . Register and log in securely using JWT (token-based authentication).
  . Routes like dashboard and movie management are protected for authorized users only.

 **Watchlist Management**
  . Add movies with title, genre, and release year.
  . Edit or delete any movie easily.

 **Smart Search**
  . Real-time search for movies by title, genre, or release year.

 **Sleek UI/UX**
  . Clean, responsive design with Tailwind CSS and Lucide icons.
  . Dark mode layout optimized for readability and aesthetics.

 **Persistent Session**
  . Remembers your login with secure localStorage token handling.

 **RESTful API Integration**
  . Fully connected with a backend API for all CRUD operations on movies and authentication.

 **Toast Notifications**
  . Real-time success and error feedback using `react-hot-toast`.


## Tech Stack

### Frontend:
. React
. React Router DOM
. Tailwind CSS
. Lucide Icons
. React Hot Toast

### Backend:
. Node.js
. Express.js
. MongoDB with Mongoose
. JWT Authentication

## 📂 Folder Structure
movie-watchlist/
│
├── src/
│ ├── components/ # Reusable components (Navbar, MovieCard, etc.)
│ ├── contexts/ # AuthContext for global authentication state
│ ├── pages/ # Main app pages (Login, Register, Dashboard, etc.)
│ ├── services/ # API service layer using Axios
│ ├── App.jsx # Main App component with routing
│ ├── main.jsx # Entry point
│ └── index.css # Global styles (Tailwind)

