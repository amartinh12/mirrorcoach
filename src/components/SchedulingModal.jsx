import { useState } from 'react';

function SchedulingModal({ coachName, isOpen, onClose, onConfirm, mode = 'new', currentSessionDate = null, currentSessionType = 'video' }) {
  const [step, setStep] = useState('date'); // 'date' | 'time' | 'type' | 'confirm'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(currentSessionType); // 'video' | 'in-person'

  // Mock data
  const availableDates = [
    { date: '2025-01-28', label: 'Tuesday, Jan 28', available: true },
    { date: '2025-01-29', label: 'Wednesday, Jan 29', available: true },
    { date: '2025-01-30', label: 'Thursday, Jan 30', available: true },
    { date: '2025-01-31', label: 'Friday, Jan 31', available: false },
    { date: '2025-02-03', label: 'Monday, Feb 3', available: true },
  ];

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  const handleDateSelect = (date) => {
    if (date.available) {
      setSelectedDate(date);
      setStep('time');
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep('type');
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleFinalConfirm = () => {
    onConfirm({
      date: selectedDate.label,
      time: selectedTime,
      type: selectedType,
      mode: mode,
      oldDate: mode === 'reschedule' ? currentSessionDate : null,
    });
    resetModal();
  };

  const resetModal = () => {
    setStep('date');
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedType(currentSessionType);
    onClose();
  };

  const handleBackClick = () => {
    if (step === 'confirm') {
      setStep('type');
    } else if (step === 'type') {
      setStep('time');
    } else if (step === 'time') {
      setStep('date');
    }
  };

  if (!isOpen) return null;

  return (
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
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          {mode === 'reschedule' && (
            <div style={{
              background: 'rgba(52, 152, 219, 0.1)',
              border: '1px solid rgba(52, 152, 219, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#2c3e50',
            }}>
              Rescheduling your <strong>{currentSessionDate}</strong> session
            </div>
          )}
          <h2 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '24px', fontWeight: '700' }}>
            {mode === 'reschedule' ? 'Reschedule Session' : 'Schedule a Session'}
          </h2>
          <p style={{ margin: 0, color: '#8fa3b5', fontSize: '14px' }}>
            with {coachName}
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {['date', 'time', 'type', 'confirm'].map((stepName, index) => (
            <div
              key={stepName}
              style={{
                flex: 1,
                height: '4px',
                background: ['date', 'time', 'type'].includes(step) && ['date', 'time', 'type'].indexOf(step) >= index
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                  : step === 'confirm' && index < 4
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                  : '#e0e8f0',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Date Selection Step */}
        {step === 'date' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px', fontWeight: '600' }}>
              Select a date
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {availableDates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => handleDateSelect(dateOption)}
                  disabled={!dateOption.available}
                  style={{
                    padding: '12px 16px',
                    background: selectedDate?.date === dateOption.date
                      ? 'linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(255, 255, 255, 0.9) 100%)'
                      : '#f8f9fa',
                    border: selectedDate?.date === dateOption.date
                      ? '2px solid #c9a227'
                      : '1px solid #e0e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: dateOption.available ? '#2c3e50' : '#a8b9c5',
                    cursor: dateOption.available ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    opacity: dateOption.available ? 1 : 0.6,
                  }}
                  onMouseEnter={(e) => {
                    if (dateOption.available && selectedDate?.date !== dateOption.date) {
                      e.currentTarget.style.background = '#f0f4f8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDate?.date !== dateOption.date) {
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                >
                  {dateOption.label}
                  {!dateOption.available && <span style={{ marginLeft: '8px' }}>Unavailable</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Time Selection Step */}
        {step === 'time' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '16px', fontWeight: '600' }}>
              Select a time
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#8fa3b5', fontSize: '13px' }}>
              {selectedDate?.label}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  style={{
                    padding: '12px 16px',
                    background: selectedTime === time
                      ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                      : '#f8f9fa',
                    border: selectedTime === time
                      ? 'none'
                      : '1px solid #e0e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: selectedTime === time ? '#fff' : '#2c3e50',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTime !== time) {
                      e.currentTarget.style.background = '#f0f4f8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTime !== time) {
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Session Type Selection Step */}
        {step === 'type' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: '16px', fontWeight: '600' }}>
              Select session type
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {/* Video Call Card */}
              <button
                onClick={() => handleTypeSelect('video')}
                style={{
                  padding: '20px 16px',
                  background: selectedType === 'video'
                    ? 'rgba(201, 162, 39, 0.12)'
                    : '#f8f9fa',
                  border: selectedType === 'video'
                    ? '2px solid #c9a227'
                    : '1px solid #e0e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  if (selectedType !== 'video') {
                    e.currentTarget.style.background = '#f0f4f8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== 'video') {
                    e.currentTarget.style.background = '#f8f9fa';
                  }
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📹</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                  Video Call
                </div>
                <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                  Join from anywhere
                </div>
              </button>

              {/* In Person Card */}
              <button
                onClick={() => handleTypeSelect('in-person')}
                style={{
                  padding: '20px 16px',
                  background: selectedType === 'in-person'
                    ? 'rgba(201, 162, 39, 0.12)'
                    : '#f8f9fa',
                  border: selectedType === 'in-person'
                    ? '2px solid #c9a227'
                    : '1px solid #e0e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  if (selectedType !== 'in-person') {
                    e.currentTarget.style.background = '#f0f4f8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== 'in-person') {
                    e.currentTarget.style.background = '#f8f9fa';
                  }
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                  In Person
                </div>
                <div style={{ fontSize: '12px', color: '#8fa3b5' }}>
                  At the office
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirm' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '16px', fontWeight: '600' }}>
              {mode === 'reschedule' ? 'Confirm your reschedule' : 'Confirm your booking'}
            </h3>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e0e8f0',
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Date & Time
                </div>
                <div style={{ fontSize: '15px', fontWeight: '500', color: '#2c3e50' }}>
                  {selectedDate?.label} • {selectedTime}
                </div>
              </div>
              <div style={{
                height: '1px',
                background: '#e0e8f0',
                marginBottom: '16px',
              }}></div>
              <div style={{ marginBottom: '0' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Session Type
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '18px' }}>
                    {selectedType === 'video' ? '📹' : '📍'}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: '500', color: '#2c3e50' }}>
                    {selectedType === 'video' ? 'Video Call' : 'In Person'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Footer Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          {step !== 'date' && (
            <button
              onClick={handleBackClick}
              style={{
                flex: 1,
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
                e.currentTarget.style.color = '#2c3e50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#8fa3b5';
              }}
            >
              Back
            </button>
          )}
          {step !== 'confirm' && (
            <button
              onClick={() => step === 'type' ? handleConfirm() : null}
              disabled={!selectedDate || !selectedTime || !selectedType}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: (step !== 'type' || (selectedDate && selectedTime && selectedType))
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                  : '#e0e8f0',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: (step !== 'type' || (selectedDate && selectedTime && selectedType)) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              {step === 'type' ? 'Review Booking' : 'Next'}
            </button>
          )}
          {step === 'confirm' && (
            <button
              onClick={handleFinalConfirm}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
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
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {mode === 'reschedule' ? '✓ Confirm Reschedule' : '✓ Confirm Booking'}
            </button>
          )}
          <button
            onClick={resetModal}
            style={{
              flex: 1,
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
              e.currentTarget.style.color = '#2c3e50';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#8fa3b5';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchedulingModal;
