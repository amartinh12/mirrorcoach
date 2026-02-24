import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding({ user, onComplete, onLogout }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = profile, 1-4 = phases, 5 = generating, 6 = complete
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    credentials: '',
    pronouns: '',
    practiceName: '',
    location: '',
    licenseType: '',
    licenseNumber: '',
    issuingBoard: '',
    yearsExperience: '',
    languages: '',
    website: '',
  });
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [generatingStep, setGeneratingStep] = useState(0);

  const allModalities = [
    { id: 'ifs', name: 'Internal Family Systems (IFS)', category: 'Parts Work' },
    { id: 'cbt', name: 'Cognitive Behavioral Therapy (CBT)', category: 'Cognitive' },
    { id: 'dbt', name: 'Dialectical Behavior Therapy (DBT)', category: 'Cognitive' },
    { id: 'act', name: 'Acceptance & Commitment Therapy (ACT)', category: 'Cognitive' },
    { id: 'somatic', name: 'Somatic Experiencing', category: 'Body-Based' },
    { id: 'emdr', name: 'EMDR', category: 'Trauma' },
    { id: 'attachment', name: 'Attachment-Based Therapy', category: 'Relational' },
    { id: 'psychodynamic', name: 'Psychodynamic Therapy', category: 'Depth' },
    { id: 'mindfulness', name: 'Mindfulness-Based Therapy', category: 'Contemplative' },
    { id: 'humandesign', name: 'Human Design', category: 'Integrative' },
    { id: 'polyvagal', name: 'Polyvagal-Informed Therapy', category: 'Nervous System' },
    { id: 'other', name: 'Other', category: 'Other' },
  ];

  const clientTypes = [
    'Anxiety & Stress', 'Depression', 'Trauma & PTSD', 'Grief & Loss',
    'Relationship Issues', 'Life Transitions', 'Self-Esteem & Identity',
    'Career & Purpose', 'Addiction & Recovery', 'Spiritual Growth',
  ];

  const toneWords = [
    'Warm', 'Direct', 'Gentle', 'Challenging', 'Curious', 'Playful',
    'Grounded', 'Nurturing', 'Practical', 'Spiritual', 'Analytical', 'Intuitive',
  ];

  const phases = {
    1: {
      title: 'Methodology & Modalities',
      description: 'Help us understand your therapeutic approach',
      questions: [
        {
          id: 'modalities',
          type: 'multiselect',
          question: 'What therapeutic modalities do you primarily use?',
          subtext: 'Select all that apply',
          options: allModalities,
        },
        {
          id: 'clientTypes',
          type: 'tags',
          question: 'What types of clients do you specialize in?',
          options: clientTypes,
        },
        {
          id: 'philosophy',
          type: 'textarea',
          question: 'How would you describe your core philosophy or approach?',
          placeholder: 'I believe healing happens through...',
        },
      ],
    },
    2: {
      title: 'Session Structure & Flow',
      description: 'Help us understand how you run your sessions',
      questions: [
        {
          id: 'sessionOpen',
          type: 'textarea',
          question: 'How do you typically open a session?',
          placeholder: 'I start by checking in with how they\'re arriving...',
        },
        {
          id: 'sessionStructure',
          type: 'radio',
          question: 'How structured are your sessions typically?',
          options: [
            { value: 'highly', label: 'Highly structured', desc: 'I follow a consistent format' },
            { value: 'semi', label: 'Semi-structured', desc: 'Loose framework, adapt to what emerges' },
            { value: 'client-led', label: 'Client-led', desc: 'I follow where the client takes us' },
          ],
        },
        {
          id: 'sessionClose',
          type: 'textarea',
          question: 'How do you typically close a session?',
          placeholder: 'I leave time to help them land...',
        },
      ],
    },
    3: {
      title: 'Communication Style',
      description: 'Let\'s learn how you respond in different situations',
      questions: [
        {
          id: 'scenarioStuck',
          type: 'scenario',
          scenario: 'A client says: "I feel stuck. Nothing is changing. I don\'t know if this is working."',
          question: 'How would you typically respond?',
        },
        {
          id: 'scenarioAvoiding',
          type: 'scenario',
          scenario: 'You notice a client keeps steering away from a topic that seems important.',
          question: 'How do you typically handle this?',
        },
        {
          id: 'toneWords',
          type: 'tags',
          question: 'Which words best describe your communication style?',
          subtext: 'Select up to 5',
          options: toneWords,
          maxSelect: 5,
        },
        {
          id: 'commonPhrases',
          type: 'textarea',
          question: 'What phrases or questions do you find yourself using often?',
          placeholder: '"What do you notice in your body?", "That makes sense given..."',
        },
      ],
    },
    4: {
      title: 'Client Journey & Tools',
      description: 'Help us understand the full client experience',
      questions: [
        {
          id: 'homeworkFrequency',
          type: 'radio',
          question: 'How often do you assign homework or practices?',
          options: [
            { value: 'always', label: 'Almost always' },
            { value: 'often', label: 'Often' },
            { value: 'sometimes', label: 'Sometimes' },
            { value: 'rarely', label: 'Rarely' },
          ],
        },
        {
          id: 'aiRole',
          type: 'textarea',
          question: 'What would you want the AI companion to help your clients with?',
          placeholder: 'Help them process sessions, guide grounding exercises...',
        },
        {
          id: 'escalationTriggers',
          type: 'tags',
          question: 'What should the AI flag for your immediate attention?',
          options: [
            'Self-harm mentions', 'Crisis situations', 'Missed sessions',
            'Frustration with therapy', 'Significant life events', 'Breakthroughs',
          ],
        },
      ],
    },
  };

  const generatingSteps = [
    { label: 'Analyzing your therapeutic approach...' },
    { label: 'Learning your communication style...' },
    { label: 'Adapting questions to your modalities...' },
    { label: 'Calibrating AI companion personality...' },
    { label: 'Generating client onboarding flow...' },
    { label: 'Finalizing your personalized experience...' },
  ];

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const toggleArrayAnswer = (questionId, value, maxSelect = null) => {
    const current = answers[questionId] || [];
    if (current.includes(value)) {
      setAnswers({ ...answers, [questionId]: current.filter(v => v !== value) });
    } else {
      if (maxSelect && current.length >= maxSelect) return;
      setAnswers({ ...answers, [questionId]: [...current, value] });
    }
  };

  const nextStep = () => {
    if (step === 0) {
      setStep(1);
      setCurrentQuestion(0);
    } else if (step <= 4) {
      const phase = phases[step];
      if (currentQuestion < phase.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (step < 4) {
        setStep(step + 1);
        setCurrentQuestion(0);
      } else {
        // Start generating
        setStep(5);
        startGenerating();
      }
    }
  };

  const prevStep = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (step > 1) {
      setStep(step - 1);
      setCurrentQuestion(phases[step - 1].questions.length - 1);
    } else if (step === 1) {
      setStep(0);
    }
  };

  const skipQuestion = () => {
    nextStep();
  };

  const finishLater = () => {
    // Save progress and go to dashboard with partial completion
    // For now, just complete onboarding and go to AI config
    onComplete();
    navigate('/coach/ai-config');
  };

  const skipToEnd = () => {
    // Skip directly to generating
    setStep(5);
    startGenerating();
  };

  const startGenerating = () => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setGeneratingStep(currentStep);
      if (currentStep >= generatingSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStep(6);
        }, 800);
      }
    }, 1200);
  };

  const finishOnboarding = () => {
    onComplete();
    navigate('/coach/ai-config');
  };

  // Skip/Finish Later Bar Component
  const SkipBar = ({ showSkipQuestion = true }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(0,0,0,0.05)',
    }}>
      {showSkipQuestion && (
        <button
          onClick={skipQuestion}
          style={{
            background: 'none',
            border: 'none',
            color: '#8fa3b5',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Skip this question →
        </button>
      )}
      <button
        onClick={finishLater}
        style={{
          background: 'none',
          border: 'none',
          color: '#8fa3b5',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        Save & finish later
      </button>
      <button
        onClick={skipToEnd}
        style={{
          background: 'none',
          border: 'none',
          color: '#c9a227',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        ⚡ Skip to AI generation
      </button>
    </div>
  );

  // Profile Form
  const ProfileForm = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '12px' }}>
          Welcome to <span style={{ color: '#c9a227' }}>MirrorCoach</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#8fa3b5' }}>
          Let's set up your practice profile
        </p>
      </div>

      <div className="card">
        <div className="card-title">Professional Information</div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              className="input"
              placeholder="As clients will see it"
              value={profileData.fullName}
              onChange={(e) => handleProfileChange('fullName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Credentials / Title *</label>
            <input
              className="input"
              placeholder="e.g., PhD, LCSW, LMFT, Coach"
              value={profileData.credentials}
              onChange={(e) => handleProfileChange('credentials', e.target.value)}
            />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Pronouns</label>
            <input
              className="input"
              placeholder="Optional"
              value={profileData.pronouns}
              onChange={(e) => handleProfileChange('pronouns', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Practice Name</label>
            <input
              className="input"
              placeholder="Optional"
              value={profileData.practiceName}
              onChange={(e) => handleProfileChange('practiceName', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location + Jurisdictions *</label>
          <input
            className="input"
            placeholder="States/countries where you practice"
            value={profileData.location}
            onChange={(e) => handleProfileChange('location', e.target.value)}
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Years of Experience *</label>
            <input
              className="input"
              type="number"
              placeholder="e.g., 8"
              value={profileData.yearsExperience}
              onChange={(e) => handleProfileChange('yearsExperience', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Languages Offered *</label>
            <input
              className="input"
              placeholder="e.g., English, Spanish"
              value={profileData.languages}
              onChange={(e) => handleProfileChange('languages', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Website / Social Links</label>
          <input
            className="input"
            placeholder="Optional"
            value={profileData.website}
            onChange={(e) => handleProfileChange('website', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button className="btn btn-outline" onClick={finishLater}>
          Finish Later
        </button>
        <button className="btn btn-gold" onClick={nextStep}>
          Continue →
        </button>
      </div>
    </div>
  );

  // Phase Questions
  const PhaseQuestions = () => {
    const phase = phases[step];
    const question = phase.questions[currentQuestion];

    const renderQuestion = () => {
      switch (question.type) {
        case 'textarea':
          return (
            <textarea
              className="textarea"
              placeholder={question.placeholder}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            />
          );

        case 'radio':
          return (
            <div>
              {question.options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handleAnswer(question.id, opt.value)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: answers[question.id] === opt.value
                      ? 'rgba(201,162,39,0.15)'
                      : 'rgba(255,255,255,0.5)',
                    border: answers[question.id] === opt.value
                      ? '2px solid rgba(201,162,39,0.5)'
                      : '2px solid transparent',
                    cursor: 'pointer',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: '500', color: '#2c3e50' }}>
                    {opt.label}
                  </div>
                  {opt.desc && (
                    <div style={{ fontSize: '13px', color: '#8fa3b5', marginTop: '4px' }}>
                      {opt.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );

        case 'multiselect':
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {question.options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => toggleArrayAnswer(question.id, opt.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '25px',
                    background: (answers[question.id] || []).includes(opt.id)
                      ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                      : 'rgba(255,255,255,0.7)',
                    color: (answers[question.id] || []).includes(opt.id) ? '#fff' : '#5a6c7d',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {opt.name}
                </div>
              ))}
            </div>
          );

        case 'tags':
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {question.options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => toggleArrayAnswer(question.id, opt, question.maxSelect)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '25px',
                    background: (answers[question.id] || []).includes(opt)
                      ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                      : 'rgba(255,255,255,0.7)',
                    color: (answers[question.id] || []).includes(opt) ? '#fff' : '#5a6c7d',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          );

        case 'scenario':
          return (
            <div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(201,162,39,0.1) 0%, rgba(255,255,255,0.5) 100%)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                borderLeft: '4px solid #c9a227',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#a68b1f', marginBottom: '8px' }}>
                  SCENARIO
                </div>
                <div style={{ fontSize: '16px', color: '#2c3e50', fontStyle: 'italic' }}>
                  "{question.scenario}"
                </div>
              </div>
              <textarea
                className="textarea"
                placeholder="Write how you'd actually respond..."
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
              />
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Phase Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontSize: '13px',
            color: '#c9a227',
            fontWeight: '700',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            Phase {step} of 4
          </div>
          <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>{phase.title}</h2>
          <p style={{ fontSize: '16px', color: '#8fa3b5' }}>{phase.description}</p>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          {[1, 2, 3, 4].map((p) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: p === step ? '14px' : '10px',
                height: p === step ? '14px' : '10px',
                borderRadius: '50%',
                background: p < step ? '#27ae60' : p === step
                  ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                  : 'rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
              }} />
              {p < 4 && (
                <div style={{
                  width: '40px',
                  height: '2px',
                  background: p < step ? '#27ae60' : 'rgba(0,0,0,0.1)',
                  marginLeft: '8px',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* AI Message */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div className="avatar" style={{ fontSize: '20px' }}>✦</div>
          <div className="card" style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ fontSize: '16px', color: '#2c3e50', marginBottom: question.subtext ? '8px' : 0 }}>
              {question.question}
            </div>
            {question.subtext && (
              <div style={{ fontSize: '14px', color: '#8fa3b5' }}>{question.subtext}</div>
            )}
          </div>
        </div>

        {/* Question Input */}
        <div className="card">
          {renderQuestion()}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#8fa3b5' }}>
              Question {currentQuestion + 1} of {phase.questions.length}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / phase.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-outline" onClick={prevStep}>
            ← Back
          </button>
          <button className="btn btn-gold" onClick={nextStep}>
            {step === 4 && currentQuestion === phase.questions.length - 1
              ? 'Generate AI Clone'
              : 'Continue →'}
          </button>
        </div>

        {/* Skip/Finish Later options */}
        <SkipBar showSkipQuestion={true} />
      </div>
    );
  };

  // Generating Screen
  const GeneratingScreen = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '64px', marginBottom: '30px' }}>*</div>
        <h1 style={{ color: '#2c3e50', marginBottom: '12px' }}>
          Creating Your AI Clone
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5', marginBottom: '40px' }}>
          We're personalizing everything based on your unique approach
        </p>

        <div style={{ textAlign: 'left' }}>
          {generatingSteps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '12px',
                marginBottom: '8px',
                background: i <= generatingStep ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                opacity: i <= generatingStep ? 1 : 0.5,
                transition: 'all 0.5s ease',
              }}
            >
              <div style={{ fontSize: '24px' }}>{s.icon}</div>
              <div style={{ flex: 1, fontSize: '15px', color: '#2c3e50' }}>{s.label}</div>
              {i < generatingStep && <div style={{ color: '#27ae60', fontSize: '18px' }}>✓</div>}
              {i === generatingStep && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #c9a227',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(generatingStep / generatingSteps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // Complete Screen
  const CompleteScreen = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>()</div>
        <h1 style={{ color: '#2c3e50', marginBottom: '12px' }}>
          Your AI Clone is Ready!
        </h1>
        <p style={{ fontSize: '18px', color: '#8fa3b5', marginBottom: '40px', lineHeight: '1.6' }}>
          We've created a personalized AI companion that reflects your unique approach,
          and a custom client onboarding experience based on your methodology.
        </p>

        <div className="grid-2" style={{ marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤖</div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>AI Clone</div>
            <div style={{ fontSize: '13px', color: '#8fa3b5' }}>Trained on your style</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>Client Onboarding</div>
            <div style={{ fontSize: '13px', color: '#8fa3b5' }}>Personalized questions</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(201,162,39,0.1)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '30px',
          maxWidth: '400px',
          margin: '0 auto 30px',
        }}>
          <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '8px' }}>
            <strong>Next Steps:</strong>
          </div>
          <div style={{ fontSize: '14px', color: '#5a6c7d', lineHeight: '1.6' }}>
            1. Review your AI personality & client onboarding<br />
            2. Make any adjustments you'd like<br />
            3. Add your first client
          </div>
        </div>

        <button className="btn btn-gold" onClick={finishOnboarding}>
          Review Your AI Setup →
        </button>
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
          fontFamily: "'Cormorant Garamond', serif",
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
        {step === 0 && <ProfileForm />}
        {step >= 1 && step <= 4 && <PhaseQuestions />}
        {step === 5 && <GeneratingScreen />}
        {step === 6 && <CompleteScreen />}
      </main>
    </div>
  );
}

export default Onboarding;