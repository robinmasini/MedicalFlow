import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Patients from './Patients';
import Planning from './Planning';
import Calls from './Calls';
import FollowUps from './FollowUps';
import avatarDesouches from '../assets/avatar-desouches.png';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [aiInput, setAiInput] = useState('');
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAISubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (aiInput.trim()) {
            // Future: Handle AI request
            console.log('AI Request:', aiInput);
            setAiInput('');
        }
    };

    const currentDate = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const upcomingAppointments = [
        { id: 1, time: '09:00', patient: 'Sophie Dubois', type: 'Contrôle annuel' },
        { id: 2, time: '10:30', patient: 'Marc Laurent', type: 'Détartrage' },
        { id: 3, time: '14:00', patient: 'Emma Petit', type: 'Pose appareil' },
    ];

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <Logo />
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('dashboard')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>Tableau de bord</span>
                    </button>

                    <button
                        className={`nav-item ${activeMenu === 'calls' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('calls')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Appels</span>
                    </button>

                    <button
                        className={`nav-item ${activeMenu === 'relances' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('relances')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span>Relances</span>
                    </button>

                    <button
                        className={`nav-item ${activeMenu === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('patients')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>Patients</span>
                    </button>

                    <button
                        className={`nav-item ${activeMenu === 'planning' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('planning')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Planning</span>
                    </button>

                    <button
                        className={`nav-item ${activeMenu === 'ai' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('ai')}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                            <circle cx="9" cy="13" r="1" />
                            <circle cx="15" cy="13" r="1" />
                            <path d="M9 17h6" />
                        </svg>
                        <span>Assistant IA</span>
                    </button>
                </nav>

                {/* Practitioner Card */}
                <div className="sidebar-practitioner">
                    <div className="practitioner-avatar">
                        <img src={avatarDesouches} alt={user?.name || 'Praticien'} />
                    </div>
                    <div className="practitioner-info">
                        <h4>{user?.name || 'Dr. Praticien'}</h4>
                        <p className="practitioner-rpps">RPPS: {user?.rpps || '00000000000'}</p>
                        <p className="practitioner-profession">{user?.profession || 'Praticien'}</p>
                        <p className="practitioner-specialty">{user?.specialty || 'Spécialité'}</p>
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Déconnexion">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Search Bar */}
                <div className="dashboard-search">
                    <div className="search-wrapper">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Nom du patient, Diagnostics, Synthèse, RDV, Suivi, Administratif, Commentaires..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                {/* Dashboard Content */}
                {activeMenu === 'patients' ? (
                    <Patients />
                ) : activeMenu === 'planning' ? (
                    <Planning />
                ) : activeMenu === 'calls' ? (
                    <Calls />
                ) : activeMenu === 'relances' ? (
                    <FollowUps />
                ) : activeMenu === 'ai' ? (
                    <div className="dashboard-content">
                        {/* AI Assistant Card - Original AI tab content */}
                        <div className="dashboard-card ai-card">
                            <div className="ai-header">
                                <Logo size="small" variant="white" />
                                <div className="ai-title">
                                    <h3>ASSISTANT IA MEDICALFLOW</h3>
                                    <p>Posez vos questions, dictez vos notes, gérez vos tâches</p>
                                </div>
                            </div>

                            <form className="ai-input-area" onSubmit={handleAISubmit}>
                                <div className="ai-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Décrivez vos besoins..."
                                        value={aiInput}
                                        onChange={(e) => setAiInput(e.target.value)}
                                    />
                                    <div className="ai-input-actions">
                                        <button type="button" className="ai-action-btn" title="Ajouter un document">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                            </svg>
                                        </button>
                                        <button type="button" className="ai-action-btn voice-btn-ai" title="Commande vocale">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                <line x1="12" y1="19" x2="12" y2="23" />
                                                <line x1="8" y1="23" x2="16" y2="23" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="ai-submit-btn" disabled={!aiInput.trim()}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="dashboard-content stats-view">
                        <div className="stats-header">
                            <h2>Bonjour Cabinet {user?.name || 'MedicalFlow'}</h2>
                            <div className="stats-filters">
                                <select defaultValue="30">
                                    <option value="30">30 derniers jours</option>
                                </select>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stats-main-card">
                                <div className="card-top">
                                    <h3>Statistiques globales (30 jours)</h3>
                                    <div className="legend">
                                        <span className="dot hours-in"></span> Appels - heures ouvrées
                                        <span className="dot hours-off"></span> Appels - Heures non ouvrées
                                        <span className="dot duration"></span> Durée (min)
                                    </div>
                                </div>
                                <div className="mock-chart">
                                    <div className="chart-bar" style={{ height: '60%' }}></div>
                                    <div className="chart-bar" style={{ height: '40%' }}></div>
                                    <div className="chart-bar" style={{ height: '80%' }}></div>
                                    <div className="chart-bar" style={{ height: '50%' }}></div>
                                    <div className="chart-bar" style={{ height: '90%' }}></div>
                                    <div className="chart-bar" style={{ height: '30%' }}></div>
                                    <div className="chart-bar" style={{ height: '70%' }}></div>
                                </div>
                            </div>

                            <div className="stats-side-panel">
                                <div className="forfait-card">
                                    <h4>Forfait en cours</h4>
                                    <p className="forfait-period">Période : 06/01/2026 → 06/02/2026</p>
                                    <div className="forfait-metrics">
                                        <div className="metric">
                                            <span className="label">INCLUS</span>
                                            <span className="value">120 min</span>
                                        </div>
                                        <div className="metric">
                                            <span className="label">UTILISES</span>
                                            <span className="value used">76 min</span>
                                        </div>
                                        <div className="metric">
                                            <span className="label">EXCÈS</span>
                                            <span className="value">0 min</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="classifications-card">
                                    <h4>Classifications (30 derniers jours)</h4>
                                    <div className="pie-chart-placeholder">
                                        <div className="pie-slice" style={{ background: '#3b82f6', transform: 'rotate(0deg)' }}></div>
                                        <div className="pie-center"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Original welcome cards row */}
                        <div className="dashboard-cards-row" style={{ marginTop: '24px' }}>
                            <div className="dashboard-card welcome-card">
                                <div className="welcome-icon">👋</div>
                                <div className="welcome-text">
                                    <h2>Bonjour, {user?.name?.split(' ')[1] || 'Docteur'}</h2>
                                    <p>Bienvenue sur votre Espace Praticien MedicalFlow</p>
                                </div>
                            </div>

                            <div className="dashboard-card date-card">
                                <div className="date-icon">📅</div>
                                <div className="date-text">
                                    <p className="date-label">Aujourd'hui</p>
                                    <p className="date-value">{currentDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
