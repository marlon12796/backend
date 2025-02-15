import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />

        <Route path='/auth-callback' element={<AuthCallbackPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
