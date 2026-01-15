import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Message, ConversationState } from '../types';
import { createMessage, createInitialState, getNextStep, extractPatientInfo } from '../services/conversation';
import { speechService } from '../services/speech';
import './Chatbot.css';

const Chatbot = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<ConversationState>(createInitialState());
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.messages]);

    // Speak assistant messages
    useEffect(() => {
        if (voiceEnabled && state.messages.length > 0) {
            const lastMessage = state.messages[state.messages.length - 1];
            if (lastMessage.role === 'assistant' && !isTyping) {
                setIsSpeaking(true);
                speechService.speak(lastMessage.content, () => {
                    setIsSpeaking(false);
                });
            }
        }
    }, [state.messages, voiceEnabled, isTyping]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMessage = createMessage('user', text);
        const updatedMessages = [...state.messages, userMessage];

        // Extract patient info
        const patientInfo = extractPatientInfo(text);
        const updatedPatient = { ...state.patient, ...patientInfo };

        // Show typing indicator
        setIsTyping(true);
        setInputValue('');

        // Simulate delay for natural feel
        setTimeout(() => {
            // Get next step and response
            const { nextStep, response } = getNextStep(state.step, text, {
                ...state,
                patient: updatedPatient,
                messages: updatedMessages,
            });

            const assistantMessage = createMessage('assistant', response);

            setState(prev => ({
                ...prev,
                step: nextStep,
                patient: updatedPatient,
                messages: [...updatedMessages, assistantMessage],
            }));

            setIsTyping(false);

            // Navigate to summary if completed
            if (nextStep === 'summary' || nextStep === 'completed') {
                setTimeout(() => {
                    navigate('/summary', {
                        state: {
                            patient: updatedPatient,
                            request: state.request,
                            messages: [...updatedMessages, assistantMessage],
                        }
                    });
                }, 3000);
            }
        }, 1000 + Math.random() * 500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    const handleVoiceInput = () => {
        if (isListening) {
            speechService.stopListening();
            setIsListening(false);
            return;
        }

        setError(null);
        setIsListening(true);

        speechService.startListening(
            (text) => {
                setIsListening(false);
                handleSendMessage(text);
            },
            (err) => {
                setIsListening(false);
                setError(err);
            }
        );
    };

    const toggleVoice = () => {
        if (isSpeaking) {
            speechService.stopSpeaking();
            setIsSpeaking(false);
        }
        setVoiceEnabled(!voiceEnabled);
    };

    const formatMessage = (content: string) => {
        // Simple markdown-like formatting
        return content
            .split('\n')
            .map((line, i) => {
                // Bold
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                // List items
                if (line.startsWith('•') || line.startsWith('-')) {
                    return `<li key=${i}>${line.substring(1).trim()}</li>`;
                }
                // Numbered items
                if (/^[1-9]/.test(line)) {
                    return `<div key=${i} class="list-item">${line}</div>`;
                }
                return line;
            })
            .join('<br/>');
    };

    return (
        <div className="chatbot-page">
            {/* Header */}
            <header className="chatbot-header">
                <Link to="/" className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Retour
                </Link>
                <div className="header-title">
                    <span className="logo-icon">🩺</span>
                    <span>Medical<span className="logo-accent">Flow</span></span>
                </div>
                <button
                    className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
                    onClick={toggleVoice}
                    title={voiceEnabled ? 'Désactiver la voix' : 'Activer la voix'}
                >
                    {voiceEnabled ? '🔊' : '🔇'}
                </button>
            </header>

            {/* Chat Container */}
            <div className="chat-wrapper">
                <div className="chat-container">
                    {/* Avatar Section */}
                    <div className="avatar-section">
                        <div className={`avatar ${isSpeaking ? 'avatar-speaking' : ''}`}>
                            🦷
                        </div>
                        <div className="avatar-info">
                            <h3>Dr. Martin</h3>
                            <p>Assistant Dentaire IA</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {state.messages.map((message: Message) => (
                            <div
                                key={message.id}
                                className={`message message-${message.role}`}
                                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                            />
                        ))}

                        {isTyping && (
                            <div className="message message-assistant typing">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-banner">
                            ⚠️ {error}
                            <button onClick={() => setError(null)}>✕</button>
                        </div>
                    )}

                    {/* Input Area */}
                    <form className="chat-input-area" onSubmit={handleSubmit}>
                        <button
                            type="button"
                            className={`voice-btn ${isListening ? 'active' : ''}`}
                            onClick={handleVoiceInput}
                            disabled={!speechService.isSupported}
                            title={speechService.isSupported ? 'Activer le micro' : 'Micro non supporté'}
                        >
                            {isListening ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="6" width="12" height="12" rx="2" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                    <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            )}
                        </button>

                        <input
                            type="text"
                            className="input chat-input"
                            placeholder={isListening ? 'Parlez maintenant...' : 'Écrivez votre message...'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isListening}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary send-btn"
                            disabled={!inputValue.trim() || isTyping}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="disclaimer">
                <p>
                    ⚠️ Cet assistant ne remplace pas une consultation médicale.
                    En cas d'urgence, appelez le 15 ou rendez-vous aux urgences.
                </p>
            </div>
        </div>
    );
};

export default Chatbot;
