import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CoachOnboarding from './pages/coach/Onboarding';
import CoachClients from './pages/coach/Clients';
import CoachClientDetail from './pages/coach/ClientDetail';
import CoachAIConfig from './pages/coach/AIConfig';
import ClientChat from './pages/client/Therapy';
import ClientLibrary from './pages/client/Library';
import ClientMyJourney from './pages/client/MyJourney';
import ClientSettings from './pages/client/Settings';
import ClientOnboarding from './pages/client/Onboarding';
import Login from './pages/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mirrorcoach_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('mirrorcoach_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mirrorcoach_user');
  };

  const completeOnboarding = () => {
    const updatedUser = { ...user, onboardingComplete: true };
    setUser(updatedUser);
    localStorage.setItem('mirrorcoach_user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Determine where to redirect coaches based on onboarding status
  const getCoachRedirect = () => {
    if (!user) return '/login';
    if (user.role !== 'coach') return '/client/chat';
    if (!user.onboardingComplete) return '/coach/onboarding';
    return '/coach/clients';
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          user ? (
            user.role === 'coach' 
              ? <Navigate to={user.onboardingComplete ? '/coach/clients' : '/coach/onboarding'} />
              : <Navigate to={user.onboardingComplete ? '/client/chat' : '/client/onboarding'} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        } />

        {/* Coach routes */}
        <Route path="/coach" element={
          user?.role === 'coach' 
            ? (user.onboardingComplete 
                ? <Layout user={user} onLogout={handleLogout} /> 
                : <Navigate to="/coach/onboarding" />)
            : <Navigate to="/login" />
        }>
          <Route index element={<Navigate to="/coach/clients" />} />
          <Route path="clients" element={<CoachClients user={user} />} />
          <Route path="clients/:clientId" element={<CoachClientDetail />} />
          <Route path="ai-config" element={<CoachAIConfig />} />
        </Route>

        {/* Coach onboarding - outside of layout for full-screen experience */}
        <Route path="/coach/onboarding" element={
          user?.role === 'coach' 
            ? <CoachOnboarding user={user} onComplete={completeOnboarding} onLogout={handleLogout} />
            : <Navigate to="/login" />
        } />

        {/* Client routes */}
        <Route path="/client" element={
          user?.role === 'client' 
            ? (user.onboardingComplete
                ? <Layout user={user} onLogout={handleLogout} isClient />
                : <Navigate to="/client/onboarding" />)
            : <Navigate to="/login" />
        }>
          <Route index element={<Navigate to="/client/chat" />} />
          <Route path="chat" element={<ClientChat />} />
          <Route path="library" element={<ClientLibrary />} />
          <Route path="my-journey" element={<ClientMyJourney />} />
          <Route path="settings" element={<ClientSettings onLogout={handleLogout} />} />
        </Route>

        {/* Client onboarding - outside of layout */}
        <Route path="/client/onboarding" element={
          user?.role === 'client'
            ? <ClientOnboarding user={user} onComplete={completeOnboarding} onLogout={handleLogout} />
            : <Navigate to="/login" />
        } />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;