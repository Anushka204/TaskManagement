import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Home.jsx"
import Success from "./Success.jsx"
import AppContextProvider from "./context/AppContext.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import CycleView from "./CycleView.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cycle",
    element: (
      <PrivateRoute>
        <CycleView />
      </PrivateRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
)
