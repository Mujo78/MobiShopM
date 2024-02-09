import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import AddAdmin from "./pages/AdminPages/AddAdmin";
import DeleteAdmin from "./pages/AdminPages/DeleteAdmin";
import AddMobile from "./pages/AdminPages/AddMobile";
import EditMobile from "./pages/AdminPages/EditMobile";
import DeleteMobile from "./pages/AdminPages/DeleteMobile";
import AddBrand from "./pages/AdminPages/AddBrand";
import SeeComments from "./pages/AdminPages/SeeComments";
import Overview from "./pages/ProfilePages/Overview";
import SeeOrders from "./pages/AdminPages/SeeOrders";
import Orders from "./pages/ProfilePages/Orders";
import Info from "./pages/ProfilePages/Info";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="models" element={<Models />}>
                <Route path=":brandId" element={<BrandModels />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              <Route
                path="/profile"
                element={<Profile />}
                loader={AuthRequired}
              >
                <Route index element={<Overview />} />
                <Route path="edit-profile" element={<EditProfile />}>
                  <Route index element={<Info />} />
                  <Route path="profile-data" element={<ProfileData />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>
                <Route element={<UserRequired />}>
                  <Route path="my-cart" element={<MyCart />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="wishlist" element={<Wishlist />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />

              <Route element={<AdminAuthRequired />}>
                <Route path="admin-menu" element={<AdminMenu />}>
                  <Route path="add-admin" element={<AddAdmin />} />
                  <Route path="delete-admin" element={<DeleteAdmin />} />
                  <Route path="add-mobile" element={<AddMobile />} />
                  <Route path="edit-mobile" element={<EditMobile />} />
                  <Route path="delete-mobile" element={<DeleteMobile />} />
                  <Route path="add-brand" element={<AddBrand />} />
                  <Route path="see-comments" element={<SeeComments />} />
                  <Route path="orders" element={<SeeOrders />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
