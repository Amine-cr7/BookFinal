import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { logout } from "./features/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from "./pages/User/Dashboard";
import ShowBook from "./pages/User/ShowBook";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/Admin/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import CreateBook from "./pages/User/CreateBook";
import UpdateBook from "./pages/User/UpdateBook";
import ShowUser from "./pages/Admin/ShowUser";
import CreateUser from "./pages/Admin/CreateUser";
import UpdateUser from "./pages/Admin/UpdateUser";
import Favorite from "./pages/Favorite/Favorite";

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
            <Route path="/favorites" element={<Favorite />} />
          </Route>

          {/* Admin-Only Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/admin/create-book" element={<CreateBook/>}/>
            <Route path="/admin/update-book/:_id" element={<UpdateBook/>}/>
            <Route path="/admin/users/:_id" element={<ShowUser/>}/>
            <Route path="/admin/users/create-user" element={<CreateUser/>}/>
            <Route path="/admin/users/update-user/:id" element={<UpdateUser/>}/>
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<Unauthorized/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}