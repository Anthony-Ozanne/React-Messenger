import { useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "./style.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Layout = () => {
    return (
      <div>
        <Home sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
