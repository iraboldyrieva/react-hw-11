import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return element;
}
