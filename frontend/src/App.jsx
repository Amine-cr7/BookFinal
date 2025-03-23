import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { logout } from "./features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from "./pages/Dashboard";
import ShowBook from "./pages/ShowBook";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected User Route */}
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book/:_id" element={<ShowBook />} />
          </Route>

          {/* Admin-Only Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/admin/create-book" element={<CreateBook/>}/>
            <Route path="/admin/update-book/:_id" element={<UpdateBook/>}/>
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<Unauthorized/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}