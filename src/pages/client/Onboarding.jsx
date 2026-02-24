import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientOnboarding({ user, onComplete, onLogout }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);

  const phases = [
    {
      title: "Your Current Chapter",
      description: "Understanding where you are right now",
      icon: "1",
      questions: [
        {
          id: 'q1_1',
          question: "What made you decide to start this work right now?",
          subtext: "There's often a moment or feeling that brings us to seek support.",
        },
        {
          id: 'q1_2',
          question: "If your life had chapters, what chapter are you currently in?",
          subtext: "You might give it a title, or describe what this phase feels like.",
        },
        {
          id: 'q1_3',
          question: "What feels most alive, confusing, or heavy for you at this moment?",
        },
      ],
    },
    {
      title: "Patterns & Protection",
      description: "Exploring what keeps repeating",
      icon: "2",
      questions: [
        {
          id: 'q2_1',
          question: "Are there patterns in your life or relationships that you notice repeating?",
          subtext: "These might show up in how you relate to others, yourself, or life's challenges.",
        },
        {
          id: 'q2_2',
          question: "When things feel hard, what do you tend to do automatically to cope or protect yourself?",
          subtext: "This isn't about judgment - these patterns usually started for good reason.",
        },
        {
          id: 'q2_3',
          question: "Is there a part of you that tends to take over when you're stressed or overwhelmed?",
          subtext: "You might notice a critical voice, a people-pleasing urge, or a desire to shut down.",
        },
      ],
    },
    {
      title: "Body & Nervous System",
      description: "Connecting with your physical experience",
      icon: "3",
      questions: [
        {
          id: 'q3_1',
          question: "How do you usually know when you're overwhelmed or dysregulated?",
          subtext: "This might show up in your body, emotions, thoughts, or behaviors.",
        },
        {
          id: 'q3_2',
          question: "Where in your body do you tend to feel stress, anxiety, or difficult emotions?",
          subtext: "Some people feel it in their chest, stomach, throat, shoulders - there's no wrong answer.",
        },
        {
          id: 'q3_3',
          question: "What helps your nervous system settle when you're activated or anxious?",
          subtext: "This might be movement, nature, connection, solitude, or something unique to you.",
        },
      ],
    },
    {
      title: "Relationships & Connection",
      description: "How you relate to others",
      icon: "4",
      questions: [
        {
          id: 'q4_1',
          question: "What tends to be most important to you in close relationships?",
        },
        {
          id: 'q4_2',
          question: "When you feel disconnected from someone you care about, what happens inside you?",
          subtext: "Notice both the feelings and any urges or reactions.",
        },
        {
          id: 'q4_3',
          question: "What do you most long for others to understand about you?",
        },
      ],
    },
    {
      title: "Hopes & Intentions",
      description: "What you're moving toward",
      icon: "5",
      questions: [
        {
          id: 'q5_1',
          question: "What do you want more of in your life right now?",
        },
        {
          id: 'q5_2',
          question: "If this work were successful, what would feel different in your day-to-day life?",
        },
        {
          id: 'q5_3',
          question: "Is there anything important about you that you're afraid might be missed or misunderstood?",
        },
      ],
    },
  ];

  const currentPhase = phases[phase];
  const currentQ = currentPhase?.questions[currentQuestion];
  const totalQuestions = phases.reduce((acc, p) => acc + p.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < currentPhase.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (phase < phases.length - 1) {
      setPhase(phase + 1);
      setCurrentQuestion(0);
    } else {
      // Complete
      onComplete();
      navigate('/client');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (phase > 0) {
      setPhase(phase - 1);
      setCurrentQuestion(phases[phase - 1].questions.length - 1);
    }
  };

  const isFirstQuestion = phase === 0 && currentQuestion === 0;
  const isLastQuestion = phase === phases.length - 1 && currentQuestion === currentPhase.questions.length - 1;

  // Welcome Screen
  const WelcomeScreen = () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '70vh',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}></div>
        <h1 style={{ color: '#2c3e50', marginBottom: '16px' }}>
          Welcome, {user?.name?.split(' ')[0] || 'there'}
        </h1>
        <p style={{ fontSize: '18px', color: '#5a6c7d', lineHeight: '1.7', marginBottom: '16px' }}>
          Before we begin working together, I'd love to learn more about you.
        </p>
        <p style={{ fontSize: '16px', color: '#8fa3b5', lineHeight: '1.7', marginBottom: '40px' }}>
          This process will help me understand your world — your experiences, patterns, 
          and what you're hoping for. There are no right or wrong answers. Take your time, 
          and know that everything you share is held with care.
        </p>
        
        <div className="card" style={{ textAlign: 'left', marginBottom: '30px' }}>
          <div className="card-title">What we'll explore</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {phases.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{p.icon}</span>
                <span style={{ fontSize: '15px', color: '#2c3e50' }}>{p.title}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#8fa3b5', marginBottom: '24px' }}>
          ⏱️ This usually takes about 10-15 minutes
        </p>

        <button className="btn btn-gold" onClick={() => setShowWelcome(false)}>
          Begin Your Journey →
        </button>
      </div>
    </div>
  );

  // Questions Screen
  const QuestionsScreen = () => (
    <div style={{ maxWidth: '400px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Phase Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>{currentPhase.icon}</div>
        <div style={{
          fontSize: '12px',
          color: '#c9a227',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '8px',
        }}>
          Phase {phase + 1} of {phases.length}
        </div>
        <h1 style={{ color: '#2c3e50', marginBottom: '8px' }}>{currentPhase.title}</h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>{currentPhase.description}</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
            Question {currentQuestion + 1} of {currentPhase.questions.length}
          </span>
          <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
            Overall: {answeredQuestions}/{totalQuestions}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / currentPhase.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* AI Question Bubble */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div className="avatar" style={{ flexShrink: 0, fontSize: '20px' }}>✦</div>
        <div className="card" style={{ flex: 1, marginBottom: 0 }}>
          <p style={{ fontSize: '18px', color: '#2c3e50', lineHeight: '1.6', marginBottom: currentQ.subtext ? '12px' : 0 }}>
            {currentQ.question}
          </p>
          {currentQ.subtext && (
            <p style={{ fontSize: '14px', color: '#8fa3b5', lineHeight: '1.5' }}>
              {currentQ.subtext}
            </p>
          )}
        </div>
      </div>

      {/* Answer Input */}
      <div className="card">
        <textarea
          className="textarea"
          placeholder="Take your time... there's no wrong answer."
          value={answers[currentQ.id] || ''}
          onChange={(e) => handleAnswer(e.target.value)}
          style={{ minHeight: '150px' }}
        />
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        <button
          className="btn btn-outline"
          onClick={prevQuestion}
          disabled={isFirstQuestion}
          style={{ opacity: isFirstQuestion ? 0.5 : 1 }}
        >
          ← Back
        </button>
        <button
          className="btn btn-gold"
          onClick={nextQuestion}
        >
          {isLastQuestion ? 'Complete Journey →' : 'Continue →'}
        </button>
      </div>

      {/* Phase indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
        {phases.map((p, i) => (
          <div
            key={i}
            style={{
              width: i === phase ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i < phase ? '#27ae60' : i === phase
                ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                : 'rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #e8f4fc 0%, #d4e9f7 30%, #c5dff2 60%, #b8d4eb 100%)',
      position: 'relative',
    }}>
      {/* Decorative orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: '28px',
          fontFamily: "'Cormorant Gararand', serif",
          fontWeight: '600',
          color: '#2c3e50',
          letterSpacing: '2px',
        }}>
          Mirror<span style={{ color: '#c9a227' }}>Coach</span>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '13px',
            color: '#5a6c7d',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main style={{ padding: '20px 40px 60px', position: 'relative', zIndex: 1 }}>
        {showWelcome ? <WelcomeScreen /> : <QuestionsScreen />}
      </main>
    </div>
  );
}

export default ClientOnboarding;