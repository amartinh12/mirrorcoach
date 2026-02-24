import { Link } from 'react-router-dom';

function Dashboard() {
  // Mock data
  const stats = {
    totalClients: 5,
    sessionsThisWeek: 12,
    avgMoodScore: 7.2,
    aiInteractions: 156,
  };

  const clients = [
    { id: 1, name: 'Sarah Mitchell', lastSession: '2 days ago', mood: 'improving', nextSession: 'Tomorrow, 2pm', alerts: 1 },
    { id: 2, name: 'Emma Rodriguez', lastSession: '1 week ago', mood: 'needs attention', nextSession: 'Jan 29, 3pm', alerts: 2 },
  ];

  const upcomingSessions = [
    { id: 1, name: 'Sarah Mitchell', time: 'Tomorrow, 2pm' },
    { id: 2, name: 'James Chen', time: 'Jan 28, 10am' },
    { id: 3, name: 'Emma Rodriguez', time: 'Jan 29, 3pm' },
  ];

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  const getMoodClass = (mood) => {
    switch (mood) {
      case 'excellent': return 'mood-excellent';
      case 'improving': return 'mood-improving';
      case 'stable': return 'mood-stable';
      case 'needs attention': return 'mood-attention';
      default: return 'mood-stable';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          Good morning, Dr. Thompson
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          Here's how your practice is doing today
        </p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '30px' }}>
        <div className="card">
          <div className="stat-number">{stats.totalClients}</div>
          <div className="stat-label">Active Clients</div>
        </div>
        <div className="card">
          <div className="stat-number">{stats.sessionsThisWeek}</div>
          <div className="stat-label">Sessions This Week</div>
        </div>
        <div className="card">
          <div className="stat-number">{stats.avgMoodScore}</div>
          <div className="stat-label">Avg. Mood Score</div>
        </div>
        <div className="card">
          <div className="stat-number">{stats.aiInteractions}</div>
          <div className="stat-label">AI Interactions</div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Clients needing attention */}
        <div className="card">
          <div className="card-title">Clients Needing Attention</div>
          
          {clients.map((client) => (
            <div key={client.id} className="client-row">
              <div style={{ position: 'relative', marginRight: '16px' }}>
                <div className="avatar">{getInitials(client.name)}</div>
                {client.alerts > 0 && (
                  <div className="alert-badge">{client.alerts}</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '17px', fontWeight: '500', color: '#2c3e50' }}>
                  {client.name}
                </div>
                <div style={{ fontSize: '13px', color: '#8fa3b5' }}>
                  Last session: {client.lastSession}
                </div>
              </div>
              <div className={`mood-badge ${getMoodClass(client.mood)}`}>
                {client.mood}
              </div>
            </div>
          ))}

          <Link to="/coach/clients">
            <button className="btn btn-outline" style={{ marginTop: '12px' }}>
              View All Clients →
            </button>
          </Link>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Upcoming sessions */}
          <div className="card">
            <div className="card-title">Upcoming Sessions</div>
            {upcomingSessions.map((session) => (
              <div key={session.id} style={{ 
                padding: '12px 0', 
                borderBottom: '1px solid rgba(0,0,0,0.05)' 
              }}>
                <div style={{ fontSize: '15px', fontWeight: '500', color: '#2c3e50' }}>
                  {session.name}
                </div>
                <div style={{ fontSize: '13px', color: '#c9a227' }}>
                  {session.time}
                </div>
              </div>
            ))}
          </div>

          {/* AI Clone status */}
          <div className="card card-gold">
            <div className="card-title">Your AI Clone</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#2ecc71',
                marginRight: '10px',
              }}></div>
              <span style={{ fontSize: '15px', color: '#2c3e50' }}>
                Active & Learning
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#8fa3b5', marginBottom: '16px' }}>
              {stats.aiInteractions} client interactions this week
            </div>
            <Link to="/coach/ai-config">
              <button className="btn btn-gold">Configure AI</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;