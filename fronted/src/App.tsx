import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import AdminPage from "./pages/admin/AdminPage";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./pages/404/NotFoundPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />

        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route element={<MainLayout />}>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
