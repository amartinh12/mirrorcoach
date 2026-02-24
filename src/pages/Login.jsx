import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('coach');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  // Handle Google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Get user info from Google using the access token
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return res.json();
        })
        .then((data) => {
          const userData = {
            id: data.id,
            email: data.email,
            name: data.name,
            picture: data.picture,
            role: role,
            onboardingComplete: false,
            googleAuth: true,
          };
          onLogin(userData);
        })
        .catch((err) => {
          setError(`Google authentication failed: ${err.message}`);
          console.error('Google login error:', err);
        });
    },
    onError: (error) => {
      setError('Failed to sign in with Google');
      console.error('Google OAuth error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && !formData.name) {
      setError('Please enter your name');
      return;
    }

    // Create user data
    // For Sign Up: onboardingComplete = false (will go to onboarding)
    // For Sign In: onboardingComplete = true (will go to dashboard)
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: role,
      onboardingComplete: !isSignUp, // Sign In = complete, Sign Up = incomplete
    };

    onLogin(userData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      background: 'linear-gradient(180deg, #e8f4fc 0%, #d4e9f7 30%, #c5dff2 60%, #b8d4eb 100%)',
    }}>
      {/* Decorative orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo & Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '48px',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: '600',
            color: '#2c3e50',
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            Mirror<span style={{ color: '#c9a227' }}>Coach</span>
          </h1>
          <p style={{ 
            color: '#8fa3b5', 
            fontSize: '15px',
            lineHeight: '1.6',
            marginBottom: '4px',
          }}>
            Your AI companion between sessions
          </p>
          <p style={{ 
            color: '#a0b3c5', 
            fontSize: '14px',
            fontWeight: '400',
          }}>
            Supporting your clients when you can't
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{
          padding: '40px 32px',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#2c3e50', fontSize: '24px' }}>
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '32px', color: '#8fa3b5', fontSize: '14px' }}>
            {isSignUp 
              ? "Let's get you set up with your personalized AI companion" 
              : 'Sign in to continue to your dashboard'}
          </p>

          {/* Role Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '28px',
            gap: '4px',
          }}>
            <button
              type="button"
              onClick={() => setRole('coach')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: role === 'coach' 
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)' 
                  : 'transparent',
                color: role === 'coach' ? '#fff' : '#5a6c7d',
              }}
            >
              Coach
            </button>
            <button
              type="button"
              onClick={() => setRole('client')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: role === 'client' 
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)' 
                  : 'transparent',
                color: role === 'client' ? '#fff' : '#5a6c7d',
              }}
            >
              Client
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder={role === 'coach' ? 'Dr. Sarah Thompson' : 'Your name'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px',
                background: 'rgba(231, 76, 60, 0.1)',
                borderRadius: '8px',
                color: '#c0392b',
                fontSize: '14px',
                marginBottom: '20px',
              }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-gold" style={{ width: '100%', marginBottom: '16px' }}>
              {isSignUp ? 'Create Account & Start Setup' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '24px 0',
            gap: '12px',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e0e8f0' }}></div>
            <span style={{ color: '#8fa3b5', fontSize: '13px' }}>Or continue with</span>
            <div style={{ flex: 1, height: '1px', background: '#e0e8f0' }}></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e0e8f0',
              borderRadius: '8px',
              background: '#fff',
              color: '#2c3e50',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              marginBottom: '20px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.borderColor = '#c9a227';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e0e8f0';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          {/* Toggle sign up/in */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#8fa3b5', fontSize: '14px' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#c9a227',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '6px',
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>

        {/* Info box */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '12px',
          fontSize: '13px',
          color: '#8fa3b5',
          textAlign: 'center',
        }}>
          {isSignUp ? (
            <>
              <strong>New here?</strong> After signing up, you'll complete a quick onboarding 
              to personalize your {role === 'coach' ? 'AI clone' : 'experience'}.
            </>
          ) : (
            <>
              <strong>Demo mode:</strong> Enter any email/password to explore the app.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;