import { useState } from 'react';

function MyJourney() {
  const [selectedMonth, setSelectedMonth] = useState('current');

  const journeyHighlights = [
    {
      id: 1,
      date: 'Feb 20, 2026',
      milestone: 'Completed 7-day meditation streak',
      status: '✅',
      type: 'achievement',
    },
    {
      id: 2,
      date: 'Feb 18, 2026',
      milestone: 'Had first productive session with coach',
      status: '💪',
      type: 'session',
    },
    {
      id: 3,
      date: 'Feb 15, 2026',
      milestone: 'Started therapy journey',
      status: '🎯',
      type: 'milestone',
    },
  ];

  const journeyStats = [
    { label: 'Sessions Completed', value: '8', icon: '💬' },
    { label: 'Streak Days', value: '7', icon: '🔥' },
    { label: 'Resources Read', value: '12', icon: '📚' },
    { label: 'Exercises Done', value: '24', icon: '💪' },
  ];

  const moodHistory = [
    { day: 'Mon', mood: '😐', score: 5 },
    { day: 'Tue', mood: '😊', score: 6 },
    { day: 'Wed', mood: '😊', score: 7 },
    { day: 'Thu', mood: '😐', score: 5 },
    { day: 'Fri', mood: '😊', score: 7 },
    { day: 'Sat', mood: '😄', score: 8 },
    { day: 'Sun', mood: '😄', score: 8 },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          My Journey
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          Track your progress and celebrate your growth
        </p>
      </div>

      {/* Stats Grid */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-title">Progress Overview</div>
        <div className="grid-2" style={{ gap: '12px' }}>
          {journeyStats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.8)',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#2c3e50', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Mood Chart */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-title">Mood This Week</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', gap: '8px' }}>
          {moodHistory.map((entry, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>
                {entry.mood}
              </div>
              <div
                style={{
                  width: '100%',
                  height: `${entry.score * 12}px`,
                  background: 'linear-gradient(to top, rgba(201, 162, 39, 0.3), rgba(201, 162, 39, 0.6))',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                }}
              />
              <div style={{ fontSize: '12px', color: '#8fa3b5', marginTop: '8px' }}>
                {entry.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="card">
        <div className="card-title">Recent Milestones</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {journeyHighlights.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '24px', minWidth: '32px', textAlign: 'center' }}>
                {item.status}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>
                  {item.milestone}
                </div>
                <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Section */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-title">Current Goals</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px' }}>🎯</div>
              <div style={{ fontWeight: '600', color: '#2c3e50', flex: 1 }}>
                Maintain 14-day meditation streak
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>7/14</div>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(to right, #c9a227, #ddb94d)',
                }}
              />
            </div>
          </div>

          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px' }}>📖</div>
              <div style={{ fontWeight: '600', color: '#2c3e50', flex: 1 }}>
                Read 5 articles on mental health
              </div>
              <div style={{ fontSize: '12px', color: '#8fa3b5' }}>3/5</div>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div
                style={{
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(to right, #3498db, #5dade2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyJourney;
