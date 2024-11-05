import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Models from "./pages/Models";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./components/User/Profile";
import MyCart from "./pages/ProfilePages/MyCart";
import Wishlist from "./pages/ProfilePages/Wishlist";
import AdminMenu from "./components/Admin/AdminMenu";
import MobilesOverview from "./pages/AdminPages/Mobile/MobilesOverview";
import Overview from "./pages/ProfilePages/Overview";
import SeeOrders from "./pages/AdminPages/SeeOrders";
import Orders from "./pages/ProfilePages/Orders";
import ProfileData from "./pages/ProfilePages/ProfileData";
import ChangePassword from "./pages/ProfilePages/ChangePassword";
import EditProfileLayout from "./components/Layout/EditProfileLayout";
import AuthRequired from "./helpers/AuthRequired";
import AdminAuthRequired from "./helpers/AdminAuthRequired";
import UserRequired from "./helpers/UserRequired";
import { AuthProvider } from "./context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/Layout/AppLayout";
import BrandModels from "./components/Mobile/BrandModels";
import AdminMenuLayout from "./components/Layout/AdminMenuLayout";
import AdminOverview from "./pages/AdminPages/Admin/AdminOverview";
import AddAdmin from "./pages/AdminPages/Admin/AddAdmin";
import MobileMenuLayout from "./components/Layout/MobileMenuLayout";
import AddMobile from "./pages/AdminPages/Mobile/AddMobile";
import EditMobile from "./pages/AdminPages/Mobile/EditMobile";
import AddBrand from "./pages/AdminPages/Mobile/AddBrand";
import MobileDetails from "./pages/MobileDetails";
import BrandsOverview from "./pages/AdminPages/Mobile/BrandsOverview";
import CommentsOverview from "./pages/AdminPages/Comments/CommentsOverview";
import { CartProvider } from "./context/CartContext";
import OrderCartItem from "./pages/Order/OrderCartItem";
import OrderMobile from "./pages/Order/OrderMobile";
import { queryClient } from "./queryClient";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignuUp";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "",
        loader: () => {
          let res = AuthRequired();
          if (!res) return redirect("/");
          return null;
        },
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "models",
        element: <Models />,
        children: [
          {
            path: ":brandId",
            element: <BrandModels />,
          },
        ],
      },
      {
        path: "/mobile/:mobileId/:mobileName",
        element: <MobileDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: AuthRequired,
        children: [
          {
            path: "",
            element: <Overview />,
          },
          {
            path: "",
            element: <EditProfileLayout />,
            children: [
              {
                path: "edit-profile",
                element: <ProfileData />,
              },
              {
                path: "change-password",
                element: <ChangePassword />,
              },
            ],
          },
          {
            path: "",
            loader: UserRequired,
            children: [
              {
                path: "my-cart",
                element: <MyCart />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "wishlist",
                element: <Wishlist />,
              },
            ],
          },
        ],
      },
      {
        path: "admin-menu",
        element: <AdminMenu />,
        loader: AdminAuthRequired,
        children: [
          {
            path: "",
            element: <AdminMenuLayout />,
            children: [
              {
                path: "",
                element: <AdminOverview />,
              },
              {
                path: "add-admin",
                element: <AddAdmin />,
              },
            ],
          },
          {
            path: "mobiles",
            element: <MobileMenuLayout />,
            children: [
              {
                path: "",
                element: <MobilesOverview />,
                children: [
                  {
                    path: "edit/:mobileId",
                    element: <EditMobile />,
                  },
                ],
              },
              {
                path: "brands",
                element: <BrandsOverview />,
              },
              {
                path: "add-mobile",
                element: <AddMobile />,
              },
              {
                path: "add-brand",
                element: <AddBrand />,
              },
            ],
          },
          {
            path: "comments",
            element: <CommentsOverview />,
          },
          {
            path: "orders",
            element: <SeeOrders />,
          },
        ],
      },
      {
        path: "order/cart-item/:itemId",
        element: <OrderCartItem />,
        loader: UserRequired,
      },
      {
        path: "order/mobile/:mobileId",
        element: <OrderMobile />,
        loader: UserRequired,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={routes} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
