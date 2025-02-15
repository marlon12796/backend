import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import { lazy } from "react";

// Carga diferida (lazy loading)
const AuthCallbackPage = lazy(() => import("./pages/auth-callback/AuthCallbackPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/404/NotFoundPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const ChatPage = lazy(() => import("./pages/chat/ChatPage"));
const AlbumPage = lazy(() => import("./pages/album/AlbumPage"));
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
          <Route path='/' element={<HomePage />} />

          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
