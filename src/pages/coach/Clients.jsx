import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Clients({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const clients = [
    { id: 1, name: 'Sarah Mitchell', email: 'sarah@email.com', lastSession: '2 days ago', mood: 'improving', nextSession: 'Tomorrow, 2pm', alerts: 1, progress: 72, sessions: 12 },
    { id: 2, name: 'James Chen', email: 'james@email.com', lastSession: '5 days ago', mood: 'stable', nextSession: 'Jan 28, 10am', alerts: 0, progress: 58, sessions: 8 },
    { id: 3, name: 'Emma Rodriguez', email: 'emma@email.com', lastSession: '1 week ago', mood: 'needs attention', nextSession: 'Jan 29, 3pm', alerts: 2, progress: 45, sessions: 15 },
    { id: 4, name: 'Michael Foster', email: 'michael@email.com', lastSession: 'Yesterday', mood: 'excellent', nextSession: 'Feb 2, 11am', alerts: 0, progress: 89, sessions: 20 },
    { id: 5, name: 'Lisa Park', email: 'lisa@email.com', lastSession: '3 days ago', mood: 'improving', nextSession: 'Jan 30, 4pm', alerts: 0, progress: 67, sessions: 10 },
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.mood === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Get upcoming sessions today (for demo, showing all sessions)
  const upcomingSessions = clients.filter(client => client.nextSession).length;
  const clientsNeedingAttention = clients.filter(client => client.mood === 'needs attention').length;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>Your Clients</h1>
          <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
            {clients.length} active clients
          </p>
        </div>
        {user?.onboardingComplete ? (
          <button className="btn btn-gold">+ Add New Client</button>
        ) : (
          <Link to="/coach/onboarding" className="btn btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Complete Setup First
          </Link>
        )}
      </div>

      {/* Onboarding prompt if not completed */}
      {!user?.onboardingComplete && (
        <div style={{
          padding: '20px',
          background: 'rgba(201, 162, 39, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(201, 162, 39, 0.3)',
          marginBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h3 style={{ marginBottom: '6px', color: '#2c3e50' }}>Complete Your Setup</h3>
            <p style={{ fontSize: '14px', color: '#8fa3b5', marginBottom: 0 }}>
              Finish your onboarding to configure your AI assistant and start adding clients.
            </p>
          </div>
          <Link to="/coach/onboarding" style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            marginLeft: '20px',
          }}>
            Go to Setup
          </Link>
        </div>
      )}

      {/* Upcoming Sessions Banner */}
      {upcomingSessions > 0 && (
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(46, 204, 113, 0.2)',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#2c3e50' }}>
              You have {upcomingSessions} upcoming session{upcomingSessions !== 1 ? 's' : ''} today
            </span>
            <span style={{ fontSize: '13px', color: '#8fa3b5', marginLeft: '8px' }}>
              Check the list below for times and details
            </span>
          </div>
        </div>
      )}

      {/* Clients Needing Attention Alert */}
      {clientsNeedingAttention > 0 && (
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(231, 76, 60, 0.05) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(231, 76, 60, 0.2)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#c0392b' }}>
              {clientsNeedingAttention} client{clientsNeedingAttention !== 1 ? 's need' : ' needs'} attention
            </span>
            <span style={{ fontSize: '13px', color: '#8fa3b5', marginLeft: '8px' }}>
              Consider reaching out or scheduling a session
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <input
            className="input"
            placeholder="Search clients..."
            style={{ flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select"
            style={{ width: '200px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Clients</option>
            <option value="needs attention">Needs Attention</option>
            <option value="improving">Improving</option>
            <option value="stable">Stable</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
          gap: '16px',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          marginBottom: '8px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#8fa3b5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Client
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#8fa3b5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Last Session
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#8fa3b5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Status
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#8fa3b5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Progress
          </div>
          <div></div>
        </div>

        {/* Client Rows */}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="client-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
              gap: '16px',
              alignItems: 'center',
            }}
          >
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', marginRight: '16px' }}>
                <div className="avatar" style={client.alerts > 0 ? {
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: '#fff',
                  boxShadow: '0 0 0 2px rgba(231, 76, 60, 0.3)',
                } : {}}>{getInitials(client.name)}</div>
                {client.alerts > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#e74c3c',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    boxShadow: '0 2px 8px rgba(231, 76, 60, 0.4)',
                  }}>
                    {client.alerts}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                  {client.name}
                </div>
                <div style={{ fontSize: '13px', color: '#8fa3b5' }}>
                  Next: {client.nextSession}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#5a6c7d' }}>
              {client.lastSession}
            </div>

            <div>
              <span className={`mood-badge ${getMoodClass(client.mood)}`} style={client.mood === 'needs attention' ? {
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                color: '#fff',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)',
                padding: '8px 12px',
              } : {}}>
                {client.mood}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '13px', color: '#5a6c7d', marginBottom: '6px' }}>
                {client.progress}%
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${client.progress}%` }} />
              </div>
            </div>

            <button 
              onClick={() => navigate(`/coach/clients/${client.id}`)}
              className="btn btn-outline" 
              style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer' }}
            >
              View
            </button>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#8fa3b5' }}>
            No clients found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default Clients;