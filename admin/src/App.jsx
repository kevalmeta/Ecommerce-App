import { Navigate, Route, Routes } from "react-router";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardLayout from "./layout/DashboardLayout";

import PageLoader from "./components/PageLoader";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) { return (<PageLoader />) }

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = isSignedIn && userEmail === ADMIN_EMAIL;

  if (isSignedIn && !isAdmin) {
    signOut();
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Access Denied — this account is not authorized for the admin panel.
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={isAdmin ? <Navigate to="/dashboard" /> : <LoginPage />} />

      <Route path="/" element={isAdmin ? <DashboardLayout /> : <Navigate to="/login" />} >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
}

export default App;