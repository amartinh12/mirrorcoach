import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [expandedNotes, setExpandedNotes] = useState(null);
  const [editingNotes, setEditingNotes] = useState({});
  const [savedNotes, setSavedNotes] = useState({
    1: 'Client discussing family patterns from childhood',
    2: 'Great progress on anxiety management techniques',
    3: 'Follow up on meditation practice resistance',
  });
  const [isPlanning, setIsPlanning] = useState(false);
  const [sessionPlanNotes, setSessionPlanNotes] = useState('');

  // Mock client data
  const client = {
    id: clientId,
    name: 'Sarah Mitchell',
    email: 'sarah@email.com',
    mood: 'improving',
    nextSession: 'Tomorrow, 2pm',
    lastSession: '2 days ago',
    progress: 72,
    sessions: 12,
  };

  // Mock AI interaction data
  const aiHighlights = [
    { topic: 'Grounding techniques', mentions: 5, sentiment: 'positive' },
    { topic: 'Family dynamics', mentions: 3, sentiment: 'neutral' },
    { topic: 'Sleep improvement', mentions: 4, sentiment: 'positive' },
  ];

  // Mock mood trend
  const moodTrend = [
    { date: 'Jan 22', score: 5.5 },
    { date: 'Jan 25', score: 6.2 },
    { date: 'Jan 28', score: 7.1 },
    { date: 'Jan 31', score: 7.5 },
    { date: 'Feb 3', score: 7.8 },
  ];

  // Mock session history
  const sessionHistory = [
    {
      id: 1,
      date: 'Jan 31, 2pm',
      duration: '50 min',
      summary: 'Explored family patterns and how they influence current relationships. Practiced grounding techniques for anxiety.',
      notes: savedNotes[1] || '',
    },
    {
      id: 2,
      date: 'Jan 24, 3pm',
      duration: '45 min',
      summary: 'Discussed progress on daily meditation practice. Addressed resistance and barriers to consistency.',
      notes: savedNotes[2] || '',
    },
    {
      id: 3,
      date: 'Jan 17, 2pm',
      duration: '50 min',
      summary: 'Initial assessment. Client presented with anxiety around work transitions and relationship concerns.',
      notes: savedNotes[3] || '',
    },
  ];

  // Suggested focus areas based on recent interactions
  const suggestedFocusAreas = [
    { area: 'Continue grounding technique practice', reason: 'Client mentioned using them 5 times since last session with positive results' },
    { area: 'Explore family patterns more deeply', reason: 'This topic came up frequently in AI conversations, shows readiness to process' },
    { area: 'Address sleep barriers', reason: 'Recent mood boost correlates with better sleep, maintain momentum' },
    { area: 'Work boundaries check-in', reason: 'Work-life balance is 58% complete, client may be ready for deeper work' },
  ];

  // Mock progress data
  const recurringThemes = [
    { theme: 'Anxiety & Worry', progress: 65, description: 'Developing better coping mechanisms' },
    { theme: 'Sleep Quality', progress: 72, description: 'Improved sleep hygiene and routine' },
    { theme: 'Work-Life Balance', progress: 58, description: 'Setting boundaries at work' },
    { theme: 'Relationship Communication', progress: 80, description: 'More open and honest dialogue' },
  ];

  const goals = [
    { goal: 'Practice daily grounding for 21 days', completed: 18, total: 21, status: 'in-progress' },
    { goal: 'Meditate 3x per week', completed: 8, total: 12, status: 'in-progress' },
    { goal: 'Sleep before 11pm 5x/week', completed: 11, total: 15, status: 'in-progress' },
    { goal: 'Complete anxiety workbook exercises', completed: 4, total: 5, status: 'in-progress' },
  ];

  const handleNotesChange = (sessionId, value) => {
    setEditingNotes({ ...editingNotes, [sessionId]: value });
  };

  const handleSaveNotes = (sessionId) => {
    setSavedNotes({ ...savedNotes, [sessionId]: editingNotes[sessionId] });
    setEditingNotes({ ...editingNotes, [sessionId]: undefined });
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'excellent':
        return '#2ecc71';
      case 'improving':
        return '#3498db';
      case 'stable':
        return '#f39c12';
      case 'needs attention':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '0 20px',
      width: '100%',
    }}>
      {/* Header with back button */}
      <div style={{ marginBottom: '40px' }}>
        <button
          onClick={() => navigate('/coach/clients')}
          style={{
            background: 'none',
            border: 'none',
            color: '#c9a227',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px',
            padding: 0,
          }}
        >
          ← Back to Clients
        </button>

        {/* Client Header Card */}
        <div className="card" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '30px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flex: 1 }}>
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '600',
              flexShrink: 0,
            }}>
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Client Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '12px', color: '#2c3e50' }}>{client.name}</h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}>
                <span
                  style={{
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  {client.mood.charAt(0).toUpperCase() + client.mood.slice(1)}
                </span>
                <span style={{ fontSize: '14px', color: '#8fa3b5' }}>
                  Next session: {client.nextSession}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#8fa3b5' }}>
                {client.email} • {client.sessions} sessions total
              </p>
            </div>
          </div>

          {/* Plan Next Session Button */}
          <button
            onClick={() => setIsPlanning(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 162, 39, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Plan Next Session
          </button>
        </div>
      </div>

      {/* Since Last Session Section */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '24px', color: '#2c3e50' }}>Since Last Session</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* AI Interaction Highlights */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
              AI Companion Interactions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aiHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    background: highlight.sentiment === 'positive' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(149, 165, 166, 0.1)',
                    borderLeft: `4px solid ${highlight.sentiment === 'positive' ? '#2ecc71' : '#95a5a6'}`,
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                    {highlight.topic}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8fa3b5' }}>
                    {highlight.mentions} interactions • {highlight.sentiment} sentiment
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Trend */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
              Mood Trend
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {moodTrend.map((entry, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#8fa3b5', minWidth: '50px' }}>{entry.date}</span>
                  <div style={{
                    flex: 1,
                    height: '30px',
                    background: '#f0f2f5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(entry.score / 10) * 100}%`,
                      background: `linear-gradient(135deg, ${getMoodColor(entry.score > 7 ? 'excellent' : 'improving')} 0%, ${getMoodColor(entry.score > 7 ? 'excellent' : 'improving')}dd 100%)`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#5a6c7d', minWidth: '30px' }}>{entry.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session History Section */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '24px', color: '#2c3e50' }}>Session History</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sessionHistory.map((session) => (
            <div
              key={session.id}
              style={{
                padding: '16px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '8px',
                background: expandedNotes === session.id ? 'rgb(248, 249, 250)' : 'transparent',
              }}
            >
              {/* Session Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedNotes(expandedNotes === session.id ? null : session.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                      {session.date}
                    </span>
                    <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
                      {session.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#5a6c7d', marginBottom: 0 }}>
                    {session.summary}
                  </p>
                </div>
                <span style={{
                  fontSize: '20px',
                  transition: 'transform 0.2s ease',
                  transform: expandedNotes === session.id ? 'rotate(180deg)' : 'rotate(0)',
                  marginLeft: '16px',
                }}>
                  ▼
                </span>
              </div>

              {/* Expandable Notes Section */}
              {expandedNotes === session.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <h4 style={{ marginBottom: '12px', fontSize: '13px', fontWeight: '600', color: '#5a6c7d' }}>
                    Coach's Private Notes
                  </h4>
                  {editingNotes[session.id] !== undefined ? (
                    <div>
                      <textarea
                        value={editingNotes[session.id]}
                        onChange={(e) => handleNotesChange(session.id, e.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '100px',
                          padding: '12px',
                          border: '1px solid #c9a227',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                          marginBottom: '12px',
                          boxSizing: 'border-box',
                        }}
                        placeholder="Enter your notes..."
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleSaveNotes(session.id)}
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          Save Notes
                        </button>
                        <button
                          onClick={() => setEditingNotes({ ...editingNotes, [session.id]: undefined })}
                          style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            color: '#8fa3b5',
                            border: '1px solid #e0e8f0',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {savedNotes[session.id] ? (
                        <div
                          style={{
                            padding: '12px',
                            background: 'rgba(201, 162, 39, 0.05)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#5a6c7d',
                            marginBottom: '12px',
                          }}
                        >
                          {savedNotes[session.id]}
                        </div>
                      ) : (
                        <p style={{ fontSize: '13px', color: '#8fa3b5', marginBottom: '12px' }}>
                          No notes yet
                        </p>
                      )}
                      <button
                        onClick={() => setEditingNotes({ ...editingNotes, [session.id]: savedNotes[session.id] || '' })}
                        style={{
                          padding: '8px 16px',
                          background: 'transparent',
                          color: '#c9a227',
                          border: '1px solid #c9a227',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        {savedNotes[session.id] ? '✏️ Edit Notes' : '+ Add Notes'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="card">
        <h2 style={{ marginBottom: '24px', color: '#2c3e50' }}>Progress Tracking</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Recurring Themes */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
              Recurring Themes & Goals
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recurringThemes.map((item, idx) => (
                <div key={idx}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                      {item.theme}
                    </span>
                    <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
                      {item.progress}%
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#f0f2f5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '6px',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${item.progress}%`,
                      background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
                      borderRadius: '4px',
                    }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#8fa3b5', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Tracking */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
              Client Goals
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {goals.map((goalItem, idx) => (
                <div key={idx}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50' }}>
                      {goalItem.goal}
                    </span>
                    <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
                      {goalItem.completed}/{goalItem.total}
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#f0f2f5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(goalItem.completed / goalItem.total) * 100}%`,
                      background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session Planning Modal */}
      {isPlanning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            maxWidth: '960px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '30px',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              background: '#fff',
              zIndex: 10,
            }}>
              <div>
                <h1 style={{ marginBottom: '4px', color: '#2c3e50' }}>Session Preparation</h1>
                <p style={{ fontSize: '14px', color: '#8fa3b5', marginBottom: 0 }}>
                  {client.name} • {client.nextSession}
                </p>
              </div>
              <button
                onClick={() => setIsPlanning(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#8fa3b5',
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
                {/* AI Conversation Summary */}
                <div>
                  <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
                    AI Companion Summary
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {aiHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 16px',
                          background: highlight.sentiment === 'positive' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(149, 165, 166, 0.1)',
                          borderLeft: `4px solid ${highlight.sentiment === 'positive' ? '#2ecc71' : '#95a5a6'}`,
                          borderRadius: '6px',
                        }}
                      >
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                          {highlight.topic}
                        </div>
                        <div style={{ fontSize: '13px', color: '#8fa3b5' }}>
                          {highlight.mentions} interactions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood Trend */}
                <div>
                  <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
                    Mood Progression
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {moodTrend.map((entry, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#8fa3b5', minWidth: '60px' }}>{entry.date}</span>
                        <div style={{
                          flex: 1,
                          height: '24px',
                          background: '#f0f2f5',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(entry.score / 10) * 100}%`,
                            background: `linear-gradient(135deg, ${getMoodColor('improving')} 0%, ${getMoodColor('improving')}dd 100%)`,
                          }} />
                        </div>
                        <span style={{ fontSize: '13px', color: '#5a6c7d', minWidth: '35px' }}>{entry.score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Last Session Notes */}
              <div style={{
                padding: '16px',
                background: 'rgba(201, 162, 39, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(201, 162, 39, 0.2)',
                marginBottom: '30px',
              }}>
                <h3 style={{ marginBottom: '12px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
                  Your Last Session Notes
                </h3>
                <p style={{ fontSize: '14px', color: '#5a6c7d', marginBottom: 0 }}>
                  {sessionHistory[0]?.notes || 'No notes from previous session'}
                </p>
              </div>

              {/* Suggested Focus Areas */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '15px', fontWeight: '600', color: '#5a6c7d' }}>
                  Suggested Focus Areas
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {suggestedFocusAreas.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(52, 152, 219, 0.1)',
                        borderLeft: '4px solid #3498db',
                        borderRadius: '6px',
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                        {item.area}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8fa3b5' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Plan Notes */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#5a6c7d', marginBottom: '12px' }}>
                  ✍️ Your Session Plan
                </label>
                <textarea
                  value={sessionPlanNotes}
                  onChange={(e) => setSessionPlanNotes(e.target.value)}
                  placeholder="Write your session plan notes here... What will you focus on? What techniques will you introduce? Any follow-up items from previous sessions?"
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '16px',
                    border: '1px solid #e0e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    color: '#5a6c7d',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                paddingTop: '20px',
                borderTop: '1px solid rgba(0,0,0,0.08)',
              }}>
                <button
                  onClick={() => setIsPlanning(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    color: '#8fa3b5',
                    border: '1px solid #e0e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Session plan saved! \n\n' + sessionPlanNotes);
                    setIsPlanning(false);
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 162, 39, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Save Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetail;
