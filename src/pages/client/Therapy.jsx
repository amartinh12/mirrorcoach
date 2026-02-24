import { useState, useEffect } from 'react';
import SessionBanner from '../../components/SessionBanner';
import SchedulingModal from '../../components/SchedulingModal';
import CancelSessionDialog from '../../components/CancelSessionDialog';

function Therapy() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: "Hi Sarah! I'm here whenever you're ready to talk. What's on your mind today?",
      time: '2:30 PM',
    },
    {
      id: 2,
      role: 'user',
      content: "I've been feeling anxious about work lately. There's a big presentation coming up.",
      time: '2:32 PM',
    },
    {
      id: 3,
      role: 'ai',
      content: "I hear that anxiety is present around this presentation. That makes so much sense - presentations can bring up a lot. I'm curious, what do you notice in your body right now when you think about it?",
      time: '2:32 PM',
    },
  ]);

  const [, setMoodCheckedToday] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [rescheduleMode, setRescheduleMode] = useState(false);

  // Session data - state based for updates
  const [sessionData, setSessionData] = useState({
    coachName: 'Dr. Thompson',
    nextSession: 'Tomorrow • 2:00 PM',
    fullDate: 'Tuesday, January 28, 2025 • 2:00 PM',
    sessionType: 'video',
    sessionAddress: '123 Wellness Ave, Suite 200',
    hasSession: true,
  });

  const moodOptions = [
    { emoji: '😊', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Not Great', value: 'not_great' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
  ];

  // Check if mood was already logged today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastMoodDate = localStorage.getItem('mood_check_date');
    
    if (lastMoodDate !== today) {
      setShowMoodCheckIn(true);
    } else {
      setMoodCheckedToday(true);
    }
  }, []);

  const moodResponses = {
    good: "That's wonderful to hear! I'm glad you're feeling good today. Let's explore what's contributing to that positive feeling.",
    okay: "Thanks for checking in honestly. Sometimes okay is exactly where we are, and that's valid. What's on your mind today?",
    not_great: "I appreciate you sharing that. Let's take some time to work through what's troubling you. What would help most right now?",
    anxious: "I hear you. Anxiety can be overwhelming. Let's slow down together and work through what's coming up for you.",
    tired: "Exhaustion is real, and it's important to honor that. Let's talk gently about what's happening for you right now.",
  };

  const handleMoodSelect = (moodValue, emoji) => {
    const today = new Date().toDateString();
    localStorage.setItem('mood_check_date', today);

    // Add mood to messages
    const moodMessage = {
      id: messages.length + 1,
      role: 'user',
      content: emoji,
      isMoodCheck: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, moodMessage]);
    setShowMoodCheckIn(false);
    setMoodCheckedToday(true);

    // AI acknowledges mood
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai',
        content: moodResponses[moodValue],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      role: 'user',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai',
        content: "Thank you for sharing that with me. Let's slow down and stay with what you're noticing. Is there a part of you that wants to be heard right now?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleScheduleSession = () => {
    setRescheduleMode(false);
    setShowSchedulingModal(true);
  };

  const handleSessionDetails = () => {
    alert('Opening session details panel...');
  };

  const handleRescheduleSession = () => {
    setRescheduleMode(true);
    setShowSchedulingModal(true);
  };

  const handleCancelSession = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setSessionData(prev => ({
      ...prev,
      hasSession: false,
    }));
    setShowCancelDialog(false);
    alert('Session cancelled');
  };

  const handleBookingConfirm = (bookingData) => {
    if (bookingData.mode === 'reschedule') {
      // Extract date label for nextSession (e.g., "Tuesday, Jan 28" from "Tuesday, Jan 28, 2025")
      const dateParts = bookingData.date.split(',');
      const nextSessionDate = `${dateParts[0]}, ${dateParts[1].trim()}`;
      
      setSessionData(prev => ({
        ...prev,
        nextSession: `${nextSessionDate} • ${bookingData.time}`,
        fullDate: `${bookingData.date} • ${bookingData.time}`,
        sessionType: bookingData.type,
      }));
      alert(`Session rescheduled! ${bookingData.date} at ${bookingData.time} - ${bookingData.type === 'video' ? 'Video Call' : 'In Person'}`);
    } else {
      alert(`Booking confirmed! ${bookingData.date} at ${bookingData.time} - ${bookingData.type === 'video' ? 'Video Call' : 'In Person'}`);
    }
    setShowSchedulingModal(false);
    setRescheduleMode(false);
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto',
      height: 'calc(100vh - 140px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Session Banner */}
      <SessionBanner
        coachName={sessionData.coachName}
        nextSession={sessionData.nextSession}
        fullDate={sessionData.fullDate}
        sessionType={sessionData.sessionType}
        sessionAddress={sessionData.sessionAddress}
        hasSession={sessionData.hasSession}
        onSchedule={handleScheduleSession}
        onDetails={handleSessionDetails}
        onReschedule={handleRescheduleSession}
        onCancel={handleCancelSession}
      />

      {/* Scheduling Modal */}
      <SchedulingModal
        coachName={sessionData.coachName}
        isOpen={showSchedulingModal}
        onClose={() => setShowSchedulingModal(false)}
        onConfirm={handleBookingConfirm}
        mode={rescheduleMode ? 'reschedule' : 'new'}
        currentSessionDate={sessionData.fullDate}
        currentSessionType={sessionData.sessionType}
      />

      {/* Cancel Dialog */}
      <CancelSessionDialog
        isOpen={showCancelDialog}
        sessionDate={sessionData.fullDate}
        onConfirm={handleConfirmCancel}
        onDismiss={() => setShowCancelDialog(false)}
      />

      {/* Daily Mood Check-in Modal */}
      {showMoodCheckIn && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px',
              }}>
                🌟
              </div>
              <h2 style={{
                fontSize: '24px',
                color: '#2c3e50',
                marginBottom: '8px',
                fontFamily: "'Cormorant Garamond', serif",
              }}>
                How are you feeling today?
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#8fa3b5',
              }}>
                Let's start by checking in with yourself
              </p>
            </div>

            {/* Mood Options */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value, mood.emoji)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '2px solid transparent',
                    borderRadius: '16px',
                    padding: '16px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '70px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 39, 0.15)';
                    e.currentTarget.style.borderColor = '#c9a227';
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{mood.emoji}</span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#2c3e50',
                  }}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="card" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: '20px',
        overflow: 'hidden',
      }}>
        {/* Messages */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          marginBottom: '20px',
          paddingRight: '10px',
        }}>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                justifyContent: msg.isMoodCheck ? 'center' : 'flex-start',
              }}
            >
              {msg.role === 'ai' && !msg.isMoodCheck && (
                <div className="avatar avatar-sm" style={{ flexShrink: 0, fontSize: '14px' }}>
                  ✦
                </div>
              )}
              {msg.isMoodCheck ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: '32px',
                    opacity: 0.8,
                  }}>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div style={{
                  maxWidth: '70%',
                  padding: '14px 18px',
                  borderRadius: msg.role === 'user' 
                    ? '18px 18px 4px 18px' 
                    : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                    : 'rgba(255,255,255,0.8)',
                  color: msg.role === 'user' ? '#fff' : '#2c3e50',
                }}>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                    {msg.content}
                  </p>
                  <div style={{ 
                    fontSize: '11px', 
                    marginTop: '8px',
                    opacity: 0.7,
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                  }}>
                    {msg.time}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.1)',
              fontSize: '15px',
              background: 'rgba(255,255,255,0.7)',
              resize: 'none',
              minHeight: '50px',
              maxHeight: '120px',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button 
            onClick={handleSend}
            className="btn btn-gold"
            style={{ 
              padding: '14px 24px',
              alignSelf: 'flex-end',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Therapy;