import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AIConfig() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personality');
  const [regeneratePrompt, setRegeneratePrompt] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewChanges, setPreviewChanges] = useState(null);

  // Editable state for personality
  const [editedPersonality, setEditedPersonality] = useState({
    summary: "Your AI companion has been trained to embody your warm, gentle, and curious therapeutic style. It uses IFS language, emphasizes somatic awareness, and prioritizes safety and nervous system regulation.",
    traits: [
      "Warm and nurturing tone",
      "Uses parts language (IFS-informed)",
      "Emphasizes body awareness and somatic cues",
      "Non-directive, follows the client's lead",
      "Focuses on safety and grounding first",
    ],
    phrases: [
      "What do you notice in your body right now?",
      "That makes so much sense given...",
      "I'm curious about...",
      "Is there a part of you that...",
      "Let's slow down and stay with that",
    ],
    sampleResponses: [
      {
        trigger: "Client says they're anxious",
        response: "I hear that anxiety is present right now. Before we explore what's bringing it up, I'm curious - what do you notice in your body? Where does that anxiety live?",
      },
      {
        trigger: "Client needs grounding",
        response: "Let's slow down together. Can you feel your feet on the floor? Take a breath with me... Notice where you feel most supported right now.",
      },
    ],
  });

  // Track editing mode and changes
  const [editingMode, setEditingMode] = useState({
    summary: false,
    traits: false,
    phrases: false,
    responses: false,
  });

  const [newTrait, setNewTrait] = useState('');
  const [newPhrase, setNewPhrase] = useState('');
  const [newResponse, setNewResponse] = useState({ trigger: '', response: '' });

  // Check if any changes have been made
  const [hasChanges, setHasChanges] = useState(false);

  const aiPersonality = {
    toneWords: ['Warm', 'Gentle', 'Curious', 'Grounded', 'Intuitive'],
  };

  const clientOnboarding = {
    phases: [
      {
        title: "Your Current Chapter",
        questions: [
          "What made you decide to start this work right now?",
          "If your life had chapters, what chapter are you currently in?",
          "What feels most alive, confusing, or heavy for you at this moment?",
        ],
      },
      {
        title: "Patterns & Protection",
        questions: [
          "Are there patterns in your life that you notice repeating?",
          "When things feel hard, what do you tend to do automatically to cope?",
          "Is there a part of you that tends to take over when you're stressed?",
        ],
      },
      {
        title: "Body & Nervous System",
        questions: [
          "How do you usually know when you're overwhelmed?",
          "Where in your body do you tend to feel stress or anxiety?",
          "What helps your nervous system settle when you're activated?",
        ],
      },
    ],
  };

  // Handler functions
  const updatePersonalitySummary = (newSummary) => {
    setEditedPersonality({ ...editedPersonality, summary: newSummary });
    setHasChanges(true);
  };

  const removeTrait = (index) => {
    const newTraits = editedPersonality.traits.filter((_, i) => i !== index);
    setEditedPersonality({ ...editedPersonality, traits: newTraits });
    setHasChanges(true);
  };

  const addTrait = () => {
    if (newTrait.trim()) {
      setEditedPersonality({
        ...editedPersonality,
        traits: [...editedPersonality.traits, newTrait],
      });
      setNewTrait('');
      setHasChanges(true);
    }
  };

  const removePhrase = (index) => {
    const newPhrases = editedPersonality.phrases.filter((_, i) => i !== index);
    setEditedPersonality({ ...editedPersonality, phrases: newPhrases });
    setHasChanges(true);
  };

  const addPhrase = () => {
    if (newPhrase.trim()) {
      setEditedPersonality({
        ...editedPersonality,
        phrases: [...editedPersonality.phrases, newPhrase],
      });
      setNewPhrase('');
      setHasChanges(true);
    }
  };

  const removeResponse = (index) => {
    const newResponses = editedPersonality.sampleResponses.filter((_, i) => i !== index);
    setEditedPersonality({ ...editedPersonality, sampleResponses: newResponses });
    setHasChanges(true);
  };

  const updateResponse = (index, field, value) => {
    const newResponses = [...editedPersonality.sampleResponses];
    newResponses[index] = { ...newResponses[index], [field]: value };
    setEditedPersonality({ ...editedPersonality, sampleResponses: newResponses });
    setHasChanges(true);
  };

  const addResponse = () => {
    if (newResponse.trigger.trim() && newResponse.response.trim()) {
      setEditedPersonality({
        ...editedPersonality,
        sampleResponses: [...editedPersonality.sampleResponses, newResponse],
      });
      setNewResponse({ trigger: '', response: '' });
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    alert('AI configuration saved! Changes: \n' + JSON.stringify(editedPersonality, null, 2));
    setHasChanges(false);
  };

  const handleApplyChanges = () => {
    if (!regeneratePrompt.trim()) {
      alert('Please describe the changes you\'d like to make');
      return;
    }

    // Simulate generating changes based on the prompt
    const mockChanges = {
      before: {
        summary: editedPersonality.summary,
        traits: editedPersonality.traits.slice(0, 2),
        phrase: editedPersonality.phrases[0],
      },
      after: {
        summary: "Your AI companion has been refined to " + regeneratePrompt.toLowerCase() + ". It maintains warmth and curiosity while being more responsive to your specific needs.",
        traits: [
          ...editedPersonality.traits.slice(0, 2),
          "More responsive to stated preferences",
        ],
        phrase: "I noticed you said you wanted me to " + regeneratePrompt.toLowerCase().split(' ').slice(0, 3).join(' ') + ". Let me adjust how I approach that.",
      },
    };

    setPreviewChanges(mockChanges);
    setShowPreview(true);
  };

  const handleApproveChanges = () => {
    // Apply the changes to the personality
    alert('Changes applied! Your AI has been updated with: ' + regeneratePrompt);
    setShowPreview(false);
    setRegeneratePrompt('');
  };

  const handleRevertChanges = () => {
    setShowPreview(false);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
          Your AI Setup
        </h1>
        <p style={{ fontSize: '16px', color: '#8fa3b5' }}>
          Customize how your AI companion thinks, speaks, and supports your clients.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
        {['personality', 'onboarding', 'preview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              borderRadius: '40px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              textTransform: 'capitalize',
              background: activeTab === tab
                ? 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)'
                : 'rgba(255,255,255,0.6)',
              color: activeTab === tab ? '#fff' : '#5a6c7d',
            }}
          >
            {tab === 'personality' ? 'Personality & Style' : tab === 'onboarding' ? 'Client Defaults' : 'Test Chat'}
          </button>
        ))}
      </div>

      {/* Personality Tab */}
      {activeTab === 'personality' && (
        <div className="grid-2">
          {/* Save Changes Button */}
          {hasChanges && (
            <div style={{
              gridColumn: 'span 2',
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #c9a227 0%, #ddb94d 100%)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>You have unsaved changes</span>
              <button
                onClick={handleSaveChanges}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                💾 Save Changes
              </button>
            </div>
          )}

          {/* AI Personality Summary - Editable */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-title">AI Personality Summary</div>
            {editingMode.summary ? (
              <div>
                <textarea
                  value={editedPersonality.summary}
                  onChange={(e) => updatePersonalitySummary(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '12px',
                    border: '1px solid #c9a227',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    marginBottom: '12px',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  onClick={() => setEditingMode({ ...editingMode, summary: false })}
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
                  Done Editing
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEditingMode({ ...editingMode, summary: true })}
                style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#2c3e50',
                  lineHeight: '1.7',
                }}
              >
                {editedPersonality.summary}
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#8fa3b5' }}>
                  ✏️ Click to edit
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {aiPersonality.toneWords.map((word) => (
                <span key={word} className="tag">{word}</span>
              ))}
            </div>
          </div>

          {/* Core Traits - Editable */}
          <div className="card">
            <div className="card-title">Core Traits</div>
            {editedPersonality.traits.map((trait, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: i < editedPersonality.traits.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a227' }} />
                  <span style={{ fontSize: '15px', color: '#2c3e50' }}>{trait}</span>
                </div>
                <button
                  onClick={() => removeTrait(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e74c3c',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                  title="Remove trait"
                >
                  ✕
                </button>
              </div>
            ))}
            <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  value={newTrait}
                  onChange={(e) => setNewTrait(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTrait()}
                  placeholder="Add new trait..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #e0e8f0',
                    borderRadius: '6px',
                    fontSize: '13px',
                  }}
                />
                <button
                  onClick={addTrait}
                  style={{
                    padding: '8px 16px',
                    background: '#c9a227',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Signature Phrases - Editable */}
          <div className="card">
            <div className="card-title">Signature Phrases</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {editedPersonality.phrases.map((phrase, i) => (
                <div key={i} style={{
                  padding: '10px 16px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.7)',
                  color: '#2c3e50',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  "{phrase}"
                  <button
                    onClick={() => removePhrase(i)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e74c3c',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: '4px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPhrase()}
                placeholder="Add new phrase..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #e0e8f0',
                  borderRadius: '6px',
                  fontSize: '13px',
                }}
              />
              <button
                onClick={addPhrase}
                style={{
                  padding: '8px 16px',
                  background: '#c9a227',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Sample AI Responses - Editable */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-title">Sample AI Responses</div>
            <p style={{ fontSize: '14px', color: '#8fa3b5', marginBottom: '20px' }}>
              Here's how your AI companion will respond based on your training
            </p>
            {editedPersonality.sampleResponses.map((sample, i) => (
              <div key={i} style={{
                marginBottom: '20px',
                padding: '20px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '16px',
                position: 'relative',
              }}>
                <button
                  onClick={() => removeResponse(i)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#e74c3c',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                  title="Remove response"
                >
                  ✕
                </button>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '6px' }}>
                    Trigger Scenario:
                  </label>
                  <input
                    value={sample.trigger}
                    onChange={(e) => updateResponse(i, 'trigger', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e0e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '6px' }}>
                    AI Response:
                  </label>
                  <textarea
                    value={sample.response}
                    onChange={(e) => updateResponse(i, 'response', e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '80px',
                      padding: '8px 12px',
                      border: '1px solid #e0e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Add New Response */}
            <div style={{
              padding: '20px',
              background: 'rgba(52, 152, 219, 0.05)',
              borderRadius: '16px',
              border: '2px dashed #3498db',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', marginBottom: '16px' }}>
                + Add New Response
              </h4>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '6px' }}>
                  Trigger Scenario:
                </label>
                <input
                  value={newResponse.trigger}
                  onChange={(e) => setNewResponse({ ...newResponse, trigger: e.target.value })}
                  placeholder="e.g., Client says they feel numb..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e0e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#8fa3b5', marginBottom: '6px' }}>
                  AI Response:
                </label>
                <textarea
                  value={newResponse.response}
                  onChange={(e) => setNewResponse({ ...newResponse, response: e.target.value })}
                  placeholder="Type the AI's response..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '8px 12px',
                    border: '1px solid #e0e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                onClick={addResponse}
                style={{
                  padding: '10px 20px',
                  background: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                + Add Response
              </button>
            </div>
          </div>

          <div className="card card-gold" style={{ gridColumn: 'span 2' }}>
            <div className="card-title">Quick Adjust</div>
            <p style={{ fontSize: '14px', color: '#5a6c7d', marginBottom: '16px' }}>
              Tell your AI how to change. Be as specific as you'd like.
            </p>
            <textarea
              className="textarea"
              style={{ minHeight: '80px', marginBottom: '16px' }}
              placeholder="Tell your AI how to change, e.g. 'Be more direct when clients avoid tough topics' or 'Ask about sleep and exercise more often'"
              value={regeneratePrompt}
              onChange={(e) => setRegeneratePrompt(e.target.value)}
            />
            <button className="btn btn-gold" onClick={handleApplyChanges}>Apply Changes</button>
          </div>
        </div>
      )}

      {/* Onboarding Tab */}
      {activeTab === 'onboarding' && (
        <div>
          <div className="card card-gold" style={{ marginBottom: '24px' }}>
            <div className="card-title">Client Welcome Message</div>
            <p style={{ fontSize: '16px', color: '#2c3e50', lineHeight: '1.7' }}>
              "Before we begin working together, I'd love to learn more about you. This process will help me understand your world - your experiences, patterns, and what you're hoping for. There are no right or wrong answers. Take your time, and know that everything you share is held with care."
            </p>
            <div style={{ marginTop: '16px' }}>
              <span className="tag tag-success">Adapted to match your warm, gentle tone</span>
            </div>
          </div>

          {clientOnboarding.phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px' }}>
                  {phaseIndex === 0 ? '1' : phaseIndex === 1 ? '2' : '3'}
                </div>
                <div>
                  <h3 style={{ color: '#2c3e50', marginBottom: '4px' }}>
                    Phase {phaseIndex + 1}: {phase.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#8fa3b5' }}>
                    {phase.questions.length} questions
                  </p>
                </div>
              </div>

              {phase.questions.map((question, qIndex) => (
                <div key={qIndex} style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#8fa3b5', marginRight: '8px' }}>
                      Q{qIndex + 1}
                    </span>
                    <span style={{ fontSize: '15px', color: '#2c3e50' }}>{question}</span>
                  </div>
                  <button style={{
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#5a6c7d',
                    cursor: 'pointer',
                  }}>
                    ✏️ Edit
                  </button>
                </div>
              ))}
            </div>
          ))}

          <div className="card card-gold">
            <div className="card-title">Regenerate Client Onboarding</div>
            <p style={{ fontSize: '14px', color: '#5a6c7d', marginBottom: '16px' }}>
              Describe what you'd like to change about the client onboarding flow.
            </p>
            <textarea
              className="textarea"
              style={{ minHeight: '80px', marginBottom: '16px' }}
              placeholder="E.g., Add more questions about childhood experiences. Make questions shorter..."
            />
            <button className="btn btn-gold">Regenerate Onboarding</button>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {/* Mobile Preview */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '4px' }}>Client Mobile Experience</h3>
              <p style={{ fontSize: '14px', color: '#8fa3b5' }}>How clients will see the onboarding</p>
            </div>
            <div style={{
              width: '375px',
              height: '667px',
              borderRadius: '40px',
              background: 'linear-gradient(180deg, #e8f4fc 0%, #d4e9f7 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              border: '8px solid #1a1a1a',
              padding: '50px 20px 20px',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>#</div>
                <h3 style={{ color: '#2c3e50', marginBottom: '4px' }}>Your Current Chapter</h3>
                <p style={{ fontSize: '14px', color: '#8fa3b5' }}>Understanding where you are</p>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
              }}>
                <div className="avatar avatar-sm" style={{ fontSize: '14px' }}>✦</div>
                <div style={{
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '18px 18px 18px 4px',
                  padding: '14px',
                  fontSize: '14px',
                  color: '#2c3e50',
                  lineHeight: '1.5',
                }}>
                  What made you decide to start this work right now?
                </div>
              </div>

              <textarea
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '14px',
                  background: 'rgba(255,255,255,0.8)',
                  minHeight: '100px',
                  resize: 'none',
                  fontFamily: 'inherit',
                }}
                placeholder="Take your time..."
              />

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '12px' }}>Back</button>
                <button className="btn btn-gold" style={{ flex: 2, padding: '12px' }}>Continue</button>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div style={{ width: '280px' }}>
            <div className="card">
              <div className="card-title">Quick Stats</div>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div>
                  <div className="stat-number" style={{ fontSize: '28px' }}>3</div>
                  <div className="stat-label">Phases</div>
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '28px' }}>9</div>
                  <div className="stat-label">Questions</div>
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '28px' }}>~10</div>
                  <div className="stat-label">Min to complete</div>
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '28px', color: '#27ae60' }}>3</div>
                  <div className="stat-label">AI-generated</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Actions</div>
              <button className="btn btn-gold" style={{ width: '100%', marginBottom: '12px' }}>
                Send Test to My Phone
              </button>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', marginBottom: '12px' }}
                onClick={() => navigate('/coach/clients')}
              >
                + View Clients
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%' }}
                onClick={() => navigate('/coach/clients')}
              >
                Go to Clients
              </button>
            </div>

            <div className="card card-gold">
              <div style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '8px' }}>
                <strong>You're all set!</strong>
              </div>
              <div style={{ fontSize: '13px', color: '#5a6c7d', lineHeight: '1.5' }}>
                Your AI clone is ready to support your clients. Add your first client to get started!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Before/After Preview Modal */}
      {showPreview && previewChanges && (
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
            maxWidth: '900px',
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
                <h1 style={{ marginBottom: '4px', color: '#2c3e50' }}>Review Changes</h1>
                <p style={{ fontSize: '14px', color: '#8fa3b5', marginBottom: 0 }}>
                  Here's how your AI personality will change
                </p>
              </div>
              <button
                onClick={handleRevertChanges}
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
              <div style={{
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(255,255,255,0.5) 100%)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '30px',
                borderLeft: '4px solid #3498db',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#2980b9', marginBottom: '12px' }}>
                  YOUR REQUEST
                </div>
                <div style={{ fontSize: '15px', color: '#2c3e50' }}>
                  {regeneratePrompt}
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="grid-2" style={{ gap: '30px', marginBottom: '30px' }}>
                {/* Before */}
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#8fa3b5',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '16px',
                  }}>
                    Before
                  </div>

                  <div className="card" style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '12px' }}>
                      Summary
                    </div>
                    <p style={{ fontSize: '13px', color: '#5a6c7d', lineHeight: '1.6', marginBottom: '16px' }}>
                      {previewChanges.before.summary}
                    </p>

                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '12px' }}>
                      Key Traits
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {previewChanges.before.traits.map((trait, i) => (
                        <span key={i} className="tag" style={{ background: 'rgba(149, 165, 166, 0.15)', color: '#7f8c8d' }}>
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '8px' }}>
                      Sample Phrase
                    </div>
                    <div style={{
                      padding: '12px',
                      background: 'rgba(0,0,0,0.05)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#2c3e50',
                      fontStyle: 'italic',
                    }}>
                      "{previewChanges.before.phrase}"
                    </div>
                  </div>
                </div>

                {/* After */}
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#27ae60',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '16px',
                  }}>
                    ✓ After
                  </div>

                  <div className="card" style={{
                    marginBottom: 0,
                    background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(255,255,255,0.9) 100%)',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '12px' }}>
                      Summary
                    </div>
                    <p style={{ fontSize: '13px', color: '#5a6c7d', lineHeight: '1.6', marginBottom: '16px' }}>
                      {previewChanges.after.summary}
                    </p>

                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '12px' }}>
                      Key Traits
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {previewChanges.after.traits.map((trait, i) => (
                        <span key={i} className="tag" style={{ background: 'rgba(39, 174, 96, 0.15)', color: '#27ae60' }}>
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#5a6c7d', marginBottom: '8px' }}>
                      Sample Phrase
                    </div>
                    <div style={{
                      padding: '12px',
                      background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(255,255,255,0.8) 100%)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#2c3e50',
                      fontStyle: 'italic',
                      border: '1px solid rgba(39, 174, 96, 0.2)',
                    }}>
                      "{previewChanges.after.phrase}"
                    </div>
                  </div>
                </div>
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
                  onClick={handleRevertChanges}
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
                  onClick={handleApproveChanges}
                  style={{
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
                  ✓ Approve & Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIConfig;