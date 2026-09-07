import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import DestinationsPage from "../pages/DestinationsPage.jsx";
import DestinationDetailsPage from "../pages/DestinationDetailsPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import MyTripsPage from "../pages/MyTripsPage.jsx";
import TripFormPage from "../pages/TripFormPage.jsx";
import TripDetailsPage from "../pages/TripDetailsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="destinations/:id" element={<DestinationDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-trips"
          element={
            <ProtectedRoute>
              <MyTripsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-trips/new"
          element={
            <ProtectedRoute>
              <TripFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-trips/:id"
          element={
            <ProtectedRoute>
              <TripDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-trips/:id/edit"
          element={
            <ProtectedRoute>
              <TripFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
