import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Success from "./pages/Success.jsx"
import AppContextProvider from "./context/AppContext.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import Dashboard from "./pages/Dashboard.tsx"
import { CycleProvider } from "./context/CycleContext.jsx"
import { Toaster } from "@/components/ui/toaster.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <CycleProvider>
          <Dashboard />
        </CycleProvider>
      </PrivateRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
    </AppContextProvider>
  </React.StrictMode>
)
