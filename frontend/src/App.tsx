import { Route, Routes } from 'react-router-dom';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layout/MainLayout';
import { lazy, Suspense } from 'react';
import { Loader } from 'lucide-react';

// Carga diferida (lazy loading)
const AuthCallbackPage = lazy(() => import('./pages/auth-callback/AuthCallbackPage'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/404/NotFoundPage'));
const HomePage = lazy(() => import('./pages/home/HomePage'));
const ChatPage = lazy(() => import('./pages/chat/ChatPage'));
const AlbumPage = lazy(() => import('./pages/album/AlbumPage'));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin' />
          </div>
        }
      >
        <Routes>
          <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />

          <Route path='/auth-callback' element={<AuthCallbackPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/albums/:albumId' element={<AlbumPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
