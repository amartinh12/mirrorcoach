import { useState } from 'react';

function Library() {
  const coachContent = [
    {
      id: 1,
      title: 'Article: Understanding Anxiety Spirals',
      author: 'Dr. Thompson',
      type: 'article',
      duration: '8 min read',
      icon: '📄',
      sharedDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Meditation: Anxiety Release',
      author: 'Dr. Thompson',
      type: 'meditation',
      duration: '10 min',
      icon: '🧘',
      sharedDate: '1 week ago',
    },
  ];

  const meditations = [
    {
      id: 1,
      title: 'Body Scan Relaxation',
      duration: '12 min',
      level: 'Beginner',
      icon: '🧘‍♀️',
    },
    {
      id: 2,
      title: 'Breath Awareness',
      duration: '8 min',
      level: 'Beginner',
      icon: '🫁',
    },
    {
      id: 3,
      title: 'Loving Kindness',
      duration: '15 min',
      level: 'Intermediate',
      icon: '💖',
    },
    {
      id: 4,
      title: 'Calm Sleep',
      duration: '20 min',
      level: 'Beginner',
      icon: '😴',
    },
  ];

  const learningContent = [
    {
      id: 1,
      title: 'What is Cognitive Behavioral Therapy?',
      icon: '💡',
      duration: '6 min read',
    },
    {
      id: 2,
      title: 'Understanding Attachment Styles',
      icon: '🔗',
      duration: '10 min read',
    },
    {
      id: 3,
      title: 'The Window of Tolerance',
      icon: '📊',
      duration: '7 min read',
    },
    {
      id: 4,
      title: 'Grounding Techniques Explained',
      icon: '🌱',
      duration: '8 min read',
    },
    {
      id: 5,
      title: 'Nervous System Regulation',
      icon: '🧠',
      duration: '12 min read',
    },
    {
      id: 6,
      title: 'Self-Compassion Practices',
      icon: '🤍',
      duration: '9 min read',
    },
  ];

  const ContentCard = ({ item, type }) => (
    <div
      className="card"
      style={{
        marginBottom: '0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: '28px',
          minWidth: '50px',
          textAlign: 'center',
        }}>
          {item.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '6px',
            fontSize: '15px',
          }}>
            {item.title}
          </div>
          {type === 'coach' && (
            <>
              <div style={{
                fontSize: '13px',
                color: '#8fa3b5',
                marginBottom: '4px',
              }}>
                From {item.author}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a8b9c5',
              }}>
                {item.duration} • {item.sharedDate}
              </div>
            </>
          )}
          {type === 'meditation' && (
            <div style={{
              fontSize: '13px',
              color: '#8fa3b5',
            }}>
              <span>{item.duration}</span>
              <span style={{ margin: '0 8px', opacity: 0.5 }}>•</span>
              <span>{item.level}</span>
            </div>
          )}
          {type === 'learn' && (
            <div style={{
              fontSize: '13px',
              color: '#8fa3b5',
            }}>
              {item.duration}
            </div>
          )}
        </div>
        <div style={{
          fontSize: '16px',
          color: '#c9a227',
          opacity: 0.6,
        }}>
          →
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          Library
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          Articles, meditations, and resources to support your journey
        </p>
      </div>

      {/* From Your Coach Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '20px' }}>📌</span>
          <div className="card-title" style={{ margin: 0 }}>From Your Coach</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {coachContent.length > 0 ? (
            coachContent.map((item) => (
              <ContentCard key={item.id} item={item} type="coach" />
            ))
          ) : (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              color: '#8fa3b5',
              fontSize: '14px',
            }}>
              Your coach hasn't shared any content yet
            </div>
          )}
        </div>
      </div>

      {/* Meditations Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '20px' }}>🧘</span>
          <div className="card-title" style={{ margin: 0 }}>Meditations</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {meditations.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                marginBottom: '0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                padding: '20px 16px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                {item.icon}
              </div>
              <div style={{
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '6px',
                fontSize: '14px',
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8fa3b5',
                marginBottom: '4px',
              }}>
                {item.duration}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#a8b9c5',
                background: 'rgba(201, 162, 39, 0.1)',
                borderRadius: '12px',
                padding: '4px 8px',
                display: 'inline-block',
              }}>
                {item.level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learn Section */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '20px' }}>📚</span>
          <div className="card-title" style={{ margin: 0 }}>Learn</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {learningContent.map((item) => (
            <ContentCard key={item.id} item={item} type="learn" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;
