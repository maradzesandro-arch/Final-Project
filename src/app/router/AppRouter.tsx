import { Navigate, Route, Routes } from "react-router-dom";

import { EditorPage } from "../../pages/EditorPage";
import { LoginPage } from "../../pages/LoginPage";
import { PreviewPage } from "../../pages/PreviewPage/PreviewPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/editor"
        element={
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <PreviewPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/editor" replace />} />
      <Route path="*" element={<Navigate to="/editor" replace />} />
    </Routes>
  );
}
