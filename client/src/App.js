import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Models from "./pages/Models";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import MyCart from "./pages/ProfilePages/MyCart";
import Wishlist from "./pages/ProfilePages/Wishlist";
import AdminMenu from "./pages/AdminMenu";
import DeleteAdmin from "./pages/AdminPages/DeleteAdmin";
import DeleteMobile from "./pages/AdminPages/DeleteMobile";
import SeeComments from "./pages/AdminPages/SeeComments";
import Overview from "./pages/ProfilePages/Overview";
import SeeOrders from "./pages/AdminPages/SeeOrders";
import Orders from "./pages/ProfilePages/Orders";
import ProfileData from "./pages/ProfilePages/ProfileData";
import ChangePassword from "./pages/ProfilePages/ChangePassword";
import EditProfile from "./pages/ProfilePages/EditProfile";
import AuthRequired from "./helpers/AuthRequired";
import AdminAuthRequired from "./helpers/AdminAuthRequired";
import UserRequired from "./helpers/UserRequired";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/AppLayout";
import BrandModels from "./components/BrandModels";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

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
            path: "edit-profile",
            element: <EditProfile />,
            children: [
              {
                path: "",
                element: <ProfileData />,
              },
              {
                path: "change-password",
                element: <ChangePassword />,
              },
            ],
          },
          {
            path: "my-cart",
            element: <MyCart />,
            loader: UserRequired,
          },
          {
            path: "orders",
            element: <Orders />,
            loader: UserRequired,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
            loader: UserRequired,
          },
        ],
      },
      {
        path: "admin-menu",
        element: <AdminMenu />,
        loader: AdminAuthRequired,
        children: [
          {
            path: "admins-menu",
            element: <DeleteAdmin />,
          },
          {
            path: "mobiles-menu",
            element: <DeleteMobile />,
          },
          {
            path: "comments-menu",
            element: <SeeComments />,
          },
          {
            path: "orders-menu",
            element: <SeeOrders />,
          },
        ],
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
      <ReactQueryDevtools initialIsOpen />
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
