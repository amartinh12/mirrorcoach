import { useState, useRef, useEffect } from 'react';

function SessionBanner({ coachName, nextSession, fullDate, sessionType, sessionAddress, hasSession = true, onSchedule, onDetails: onDetailsCallback, onReschedule, onCancel }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const getSessionBadgeStyle = () => {
    if (sessionType === 'video') {
      return {
        background: 'rgba(52, 152, 219, 0.15)',
        color: '#3498db',
        borderColor: 'rgba(52, 152, 219, 0.3)',
        icon: '📹',
      };
    } else if (sessionType === 'in-person') {
      return {
        background: 'rgba(39, 174, 96, 0.15)',
        color: '#27ae60',
        borderColor: 'rgba(39, 174, 96, 0.3)',
        icon: '📍',
      };
    }
    return {
      background: 'rgba(149, 165, 166, 0.15)',
      color: '#95a5a6',
      borderColor: 'rgba(149, 165, 166, 0.3)',
      icon: '•',
    };
  };

  const sessionTypeLabel = sessionType === 'video' ? 'Video Call' : sessionType === 'in-person' ? 'In Person' : '';
  const badge = getSessionBadgeStyle();

  const handleDetailsClick = () => {
    setIsExpanded(!isExpanded);
    if (onDetailsCallback) {
      onDetailsCallback();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded]);

  return (
    <div ref={dropdownRef}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(255, 255, 255, 0.9) 100%)',
        border: '1px solid rgba(201, 162, 39, 0.2)',
        borderRadius: isExpanded ? '12px 12px 0 0' : '12px',
        padding: '16px',
        marginBottom: isExpanded ? '0' : '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80px',
        fontSize: '13px',
        cursor: hasSession ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
      onClick={() => hasSession && handleDetailsClick()}
      >
        {/* Left Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span style={{ fontSize: '20px' }}>📅</span>
          <div>
            <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '14px', marginBottom: '4px' }}>
              {hasSession ? `Next session with ${coachName}` : 'No upcoming session'}
            </div>
            {hasSession && (
              <>
                <div style={{ color: '#8fa3b5', fontSize: '13px', marginBottom: '6px' }}>
                  {nextSession}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      background: badge.background,
                      color: badge.color,
                      borderRadius: '16px',
                      border: `1px solid ${badge.borderColor}`,
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {badge.icon} {sessionTypeLabel}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
          {hasSession && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDetailsClick();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8fa3b5',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '4px 8px',
                transition: 'color 0.2s ease',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transformOrigin: 'center',
                transitionProperty: 'transform, color',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2c3e50')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8fa3b5')}
            >
              Details ▾
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSchedule();
            }}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(201, 162, 39, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {hasSession ? 'Schedule New' : 'Schedule Session'}
          </button>
        </div>
      </div>

      {/* Dropdown Details Card */}
      {hasSession && isExpanded && (
        <div style={{
          background: '#fff',
          border: '1px solid rgba(201, 162, 39, 0.2)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '20px 16px',
          marginBottom: '16px',
          animation: 'slideDown 0.2s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Full Date and Time */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Date & Time
            </div>
            <div style={{ fontSize: '15px', fontWeight: '500', color: '#2c3e50' }}>
              {fullDate}
            </div>
          </div>

          {/* Session Type */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Session Type
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  background: badge.background,
                  color: badge.color,
                  borderRadius: '16px',
                  border: `1px solid ${badge.borderColor}`,
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                {badge.icon} {sessionTypeLabel}
              </span>
            </div>
          </div>

          {/* Location/Link Info */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {sessionType === 'in-person' ? 'Location' : 'Access'}
            </div>
            <div style={{ fontSize: '14px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {sessionType === 'in-person' ? (
                <>
                  <span>📍</span>
                  <span>{sessionAddress}</span>
                </>
              ) : (
                <>
                  <span>🔗</span>
                  <span>Link will be available 15 min before session</span>
                </>
              )}
            </div>
          </div>

          {/* Coach Name */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Coach
            </div>
            <div style={{ fontSize: '14px', color: '#2c3e50' }}>
              {coachName}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(0, 0, 0, 0.08)', marginBottom: '16px' }}></div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <button
              onClick={onReschedule}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'transparent',
                color: '#8fa3b5',
                border: '1px solid #e0e8f0',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.color = '#2c3e50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#8fa3b5';
              }}
            >
              Reschedule
            </button>
          </div>

          {/* Cancel Session Link */}
          <button
            onClick={onCancel}
            style={{
              width: '100%',
              padding: '8px 0',
              background: 'transparent',
              color: '#e74c3c',
              border: 'none',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c0392b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#e74c3c')}
          >
            Cancel Session
          </button>
        </div>
      )}
    </div>
  );
}

export default SessionBanner;
