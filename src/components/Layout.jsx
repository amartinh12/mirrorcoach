import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Layout({ user, onLogout, isClient }) {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const coachNavItems = [
      { path: '/coach/clients', label: 'Clients', icon: '' },
      { path: '/coach/ai-config', label: 'AI Settings', icon: '' },
  ];

  const clientNavItems = [
    { path: '/client/chat', label: 'Chat', icon: '💬' },
    { path: '/client/library', label: 'Library', icon: '📚' },
    { path: '/client/my-journey', label: 'My Journey', icon: '🛤️' },
  ];

  const navItems = isClient ? clientNavItems : coachNavItems;

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Decorative orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 0',
        background: 'transparent',
      }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link to={isClient ? '/client/chat' : '/coach/clients'} style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '28px',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '600',
              color: '#2c3e50',
              letterSpacing: '2px',
            }}>
              Mirror<span style={{ color: '#c9a227' }}>Coach</span>
            </div>
          </Link>

          {/* Navigation - Coach only (top bar) */}
          {!isClient && (
            <nav style={{
              display: 'flex',
              gap: '8px',
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              padding: '6px',
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '40px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: location.pathname === item.path
                      ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                      : 'transparent',
                    color: location.pathname === item.path ? '#fff' : '#5a6c7d',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* User menu with profile dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
            {isClient ? (
              /* Client: Profile icon only */
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                  title="Profile"
                >
                  👤
                </button>
                
                {/* Profile dropdown menu */}
                {showProfileMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    minWidth: '200px',
                    zIndex: 100,
                  }}>
                    <div style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2c3e50',
                    }}>
                      {user?.name || user?.email}
                    </div>
                    <Link 
                      to="/client/settings" 
                      onClick={() => setShowProfileMenu(false)}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{
                        padding: '12px 16px',
                        color: '#5a6c7d',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(201, 162, 39, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        ⚙️ Settings
                      </div>
                    </Link>
                    <div
                      onClick={onLogout}
                      style={{
                        padding: '12px 16px',
                        color: '#e74c3c',
                        cursor: 'pointer',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      🚪 Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Coach: Name and logout button */
              <>
                <span style={{ fontSize: '14px', color: '#5a6c7d' }}>
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={onLogout}
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '50px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    color: '#5a6c7d',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content" style={{ flex: 1, paddingBottom: isClient ? '100px' : '0', display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>

      {/* Bottom Tab Bar - Client only */}
      {isClient && (
        <nav style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          padding: '8px',
          zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setShowProfileMenu(false)}
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 16px',
                textDecoration: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: location.pathname === item.path
                  ? 'linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(255, 255, 255, 0.9) 100%)'
                  : 'transparent',
                maxWidth: '100px',
              }}
            >
              <span style={{ 
                fontSize: '20px', 
                marginBottom: '4px',
              }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: location.pathname === item.path ? '600' : '500',
                color: location.pathname === item.path ? '#c9a227' : '#8fa3b5',
                textAlign: 'center',
              }}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export default Layout;