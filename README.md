# MovieScreen Pro

Movie Explorer is a sleek and fast movie browsing web app built using **React + Vite** and styled with **Tailwind CSS**. It fetches real-time data from the **TMDB API**, allowing users to discover trending movies and search with an optimized, **Debounced search bar**.


## ✨ Features

- 🔍 **Optimized Search** with debounce using `useDebounce` from [`react-use`](https://github.com/streamich/react-use)
- 🎞️ Browse **Trending Movies** from The Movie Database (TMDB)
- 📃 View detailed information: title, overview, ratings, and more
- ⚡ Super-fast development with **Vite**
- 💅 Fully responsive and clean UI using **Tailwind CSS**


## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [`react-use`](https://github.com/streamich/react-use) for debounce optimization


## 💡 Debounced Search
To avoid excessive API calls while the user is typing in the search bar, the app uses the useDebounce hook from react-use. This improves performance and enhances the user experience.


## 📃 License
This project is licensed under the MIT License.
