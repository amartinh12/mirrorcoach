function CancelSessionDialog({ isOpen, sessionDate, onConfirm, onDismiss }) {
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
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Icon */}
        <div style={{
          fontSize: '48px',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          ⚠️
        </div>

        {/* Title */}
        <h2 style={{
          margin: '0 0 12px 0',
          color: '#2c3e50',
          fontSize: '22px',
          fontWeight: '700',
          textAlign: 'center',
        }}>
          Cancel Session?
        </h2>

        {/* Message */}
        <p style={{
          margin: '0 0 28px 0',
          color: '#8fa3b5',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '1.6',
        }}>
          Are you sure you want to cancel your session on <strong>{sessionDate}</strong>?
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onDismiss}
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
            Keep Session
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
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
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Cancel Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelSessionDialog;
