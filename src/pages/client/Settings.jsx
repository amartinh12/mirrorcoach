import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings({ onLogout }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    sessions: true,
    reminders: true,
    progress: true,
    emails: true,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          Settings
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          Manage your preferences and account
        </p>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="card-title">Notifications</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>
                Session Reminders
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                Get notified before your sessions
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.sessions}
              onChange={() => handleToggle('sessions')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>
                Daily Reminders
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                Receive daily check-in reminders
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.reminders}
              onChange={() => handleToggle('reminders')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>
                Progress Updates
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                Celebrate milestones and achievements
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.progress}
              onChange={() => handleToggle('progress')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>
                Email Notifications
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                Receive important updates via email
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.emails}
              onChange={() => handleToggle('emails')}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card">
        <div className="card-title">Privacy & Security</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#5a6c7d',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            🔒 Change Password
          </button>
          <button
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#5a6c7d',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            🔐 Manage Sessions
          </button>
        </div>
      </div>

      {/* About & Support */}
      <div className="card">
        <div className="card-title">About & Support</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#5a6c7d',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            ❓ Help & Support
          </button>
          <button
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#5a6c7d',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            📋 Privacy Policy
          </button>
          <button
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#5a6c7d',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            📄 Terms of Service
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: 'rgba(231, 76, 60, 0.3)', background: 'rgba(231, 76, 60, 0.05)' }}>
        <div className="card-title">Danger Zone</div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            color: '#e74c3c',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(231, 76, 60, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(231, 76, 60, 0.3)';
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
