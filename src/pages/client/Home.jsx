import { Link } from 'react-router-dom';

function Home() {
  const userData = {
    name: 'Sarah',
    streak: 7,
    nextSession: 'Tomorrow, 2pm',
    coachName: 'Dr. Thompson',
    weeklyCheckInDue: true,
  };

  const quickActions = [
    { icon: '', label: 'Talk to AI', path: '/client/therapy', color: '#c9a227' },
    { icon: '', label: 'Journal', path: '/client/therapy', color: '#3498db' },
    { icon: '', label: 'Meditate', path: '/client/therapy', color: '#9b59b6' },
    { icon: '', label: 'Progress', path: '/client/therapy', color: '#27ae60' },
  ];

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      {/* Welcome */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          Welcome back, {userData.name}
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          How are you feeling today?
        </p>
      </div>

      {/* Streak Card */}
      <div className="card card-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '14px', color: '#a68b1f', fontWeight: '600', marginBottom: '4px' }}>
            Current Streak
          </div>
          <div style={{ fontSize: '32px', fontFamily: "'Cormorant Garamond', serif", color: '#2c3e50' }}>
            {userData.streak} days
          </div>
        </div>
        <div style={{ fontSize: '48px' }}></div>
      </div>

      {/* Weekly Check-in Alert */}
      {userData.weeklyCheckInDue && (
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(52,152,219,0.1) 0%, rgba(255,255,255,0.9) 100%)',
          border: '1px solid rgba(52,152,219,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                Weekly Check-in Ready
              </div>
              <div style={{ fontSize: '14px', color: '#8fa3b5' }}>
                Take 2 minutes to reflect on your week
              </div>
            </div>
            <button className="btn btn-gold" style={{ padding: '10px 20px' }}>
              Start
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <div className="card-title">Quick Actions</div>
        <div className="grid-2" style={{ gap: '12px' }}>
          {quickActions.map((action, i) => (
            <Link key={i} to={action.path} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid transparent',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{action.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                  {action.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Chat Preview */}
      <div className="card">
        <div className="card-title">Your AI Companion</div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div className="avatar" style={{ fontSize: '20px' }}>✦</div>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '18px 18px 18px 4px',
            padding: '16px',
            flex: 1,
          }}>
            <p style={{ fontSize: '15px', color: '#2c3e50', lineHeight: '1.6', margin: 0 }}>
              Hi {userData.name}! I noticed it's been a couple of days since we last checked in. 
              How have you been feeling since your session with {userData.coachName}?
            </p>
          </div>
        </div>
        <Link to="/client/therapy">
          <button className="btn btn-gold" style={{ width: '100%' }}>
            Continue Conversation →
          </button>
        </Link>
      </div>

      {/* Upcoming Session */}
      <div className="card">
        <div className="card-title">Upcoming Session</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="avatar">{userData.coachName.split(' ').map(n => n[0]).join('')}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
              {userData.coachName}
            </div>
            <div style={{ fontSize: '14px', color: '#c9a227' }}>
              {userData.nextSession}
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Prepare
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;