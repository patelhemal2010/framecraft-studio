import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { TemplateDetailPage } from './pages/TemplateDetailPage.js';
import { EditorPage } from './pages/EditorPage.js';
import { MyProjectsPage } from './pages/MyProjectsPage.js';
import { SignInPage } from './pages/SignInPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { RequireAuth } from './components/auth/RequireAuth.js';
import { useAuthStore } from './stores/authStore.js';

export const App: React.FC = () => {
  const location = useLocation();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isEditor = location.pathname.startsWith('/editor');
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup';

  // While checking session on protected routes, RequireAuth shows its own spinner.
  // On auth pages, wait briefly so we can bounce already-signed-in users home.
  if (isLoading && isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isEditor && !isAuthPage && user && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route
            path="/signin"
            element={user ? <Navigate to="/" replace /> : <SignInPage />}
          />
          <Route path="/signup" element={<Navigate to="/signin" replace />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/templates"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/templates/:slug"
            element={
              <RequireAuth>
                <TemplateDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/editor/:slug"
            element={
              <RequireAuth>
                <EditorPage />
              </RequireAuth>
            }
          />
          <Route
            path="/my-projects"
            element={
              <RequireAuth>
                <MyProjectsPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isEditor && !isAuthPage && user && <Footer />}
    </div>
  );
};
