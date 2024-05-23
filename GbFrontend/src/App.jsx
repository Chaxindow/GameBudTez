import React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import StoreHome from "./pages/StoreHome"; // StoreHome bileşenini ekleyin
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 5 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
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
    {
      path: "/store", // Mağaza rotası
      element: (
        <QueryClientProvider client={queryClient}>
          {" "}
          <StoreHome />
        </QueryClientProvider>
      ),
    },
    {
      path: "/productlist", // Mağaza rotası
      element: (
        <QueryClientProvider client={queryClient}>
          {" "}
          <ProductList />
        </QueryClientProvider>
      ),
    },
    {
      path: "/product/:productId", // Mağaza rotası
      element: (
        <QueryClientProvider client={queryClient}>
          {" "}
          <Product />{" "}
        </QueryClientProvider>
      ),
    },
    {
      path: "/sepet", // Mağaza rotası
      element: (
        <QueryClientProvider client={queryClient}>
          {" "}
          <Cart />{" "}
        </QueryClientProvider>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
