import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            {/* Header */}
            <header className="landing-header">
                <div className="container">
                    <div className="header-content">
                        <Logo />
                        <nav className="nav">
                            <a href="#features">Fonctionnalités</a>
                            <a href="#demo">Démo</a>
                            <a href="#contact">Contact</a>
                        </nav>
                        <Link to="/login" className="btn btn-primary">
                            Espace Praticien
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background-image"></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">✨ Nouveau : Assistance vocale disponible</div>
                        <h1>
                            L'assistant IA pour votre
                            <span className="text-gradient"> cabinet médical</span>
                        </h1>
                        <p className="hero-subtitle">
                            Automatisez la prise de rendez-vous, qualifiez les demandes patients
                            et générez des synthèses médicales. Disponible 24h/24.
                        </p>
                        <div className="hero-cta">
                            <Link to="/chat" className="btn btn-primary btn-lg">
                                <span>Lancer la démo</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <a href="#features" className="btn btn-secondary btn-lg">
                                En savoir plus
                            </a>
                        </div>
                        <div className="hero-trust">
                            <span className="trust-badge">🔒 RGPD</span>
                            <span className="trust-badge">🏥 Éthique médicale</span>
                            <span className="trust-badge">🇫🇷 Made in France</span>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="chat-preview">
                            <div className="chat-preview-header">
                                <div className="avatar-mini">🦷</div>
                                <div>
                                    <div className="preview-name">Dr. Martin</div>
                                    <div className="preview-status">Assistant dentaire IA</div>
                                </div>
                            </div>
                            <div className="chat-preview-messages">
                                <div className="preview-message assistant">
                                    Bonjour ! Comment puis-je vous aider aujourd'hui ?
                                </div>
                                <div className="preview-message user">
                                    J'ai une douleur dentaire depuis 2 jours
                                </div>
                                <div className="preview-message assistant">
                                    Je comprends. Pouvez-vous décrire l'intensité de votre douleur sur 10 ?
                                </div>
                            </div>
                            <div className="chat-preview-input">
                                <span>Écrivez votre message...</span>
                                <div className="input-icons">
                                    <span className="mic-icon">🎤</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Fonctionnalités</span>
                        <h2>Tout ce dont votre cabinet a besoin</h2>
                        <p>Une solution complète pour moderniser votre accueil patient</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>Chatbot IA</h3>
                            <p>
                                Conversation naturelle en français. Comprend les demandes,
                                pose les bonnes questions, rassure les patients.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎙️</div>
                            <h3>Mode vocal</h3>
                            <p>
                                Parlez directement à l'assistant. Reconnaissance vocale
                                avancée et synthèse vocale naturelle.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Prise de RDV</h3>
                            <p>
                                Qualification automatique des demandes. Proposition de
                                créneaux adaptés. Confirmation instantanée.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📋</div>
                            <h3>Synthèse médicale</h3>
                            <p>
                                Génération automatique d'une fiche patient.
                                Exportable en PDF, prête pour votre logiciel médical.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="demo-section">
                <div className="container">
                    <div className="demo-content">
                        <div className="demo-text">
                            <span className="section-badge">Démo interactive</span>
                            <h2>Essayez MedicalFlow maintenant</h2>
                            <p>
                                Testez notre assistant IA en conditions réelles.
                                Simulez une demande de rendez-vous et découvrez
                                comment MedicalFlow qualifie et accompagne vos patients.
                            </p>
                            <ul className="demo-list">
                                <li>✅ Aucune inscription requise</li>
                                <li>✅ Mode texte et vocal disponibles</li>
                                <li>✅ Scénarios médicaux réalistes</li>
                            </ul>
                            <Link to="/chat" className="btn btn-accent btn-lg">
                                Lancer la démo
                            </Link>
                        </div>
                        <div className="demo-visual">
                            <div className="demo-avatar">
                                <div className="avatar-large">🦷</div>
                                <div className="avatar-pulse"></div>
                            </div>
                            <div className="demo-name">Dr. Martin</div>
                            <div className="demo-specialty">Assistant Dentaire IA</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Prêt à transformer votre cabinet ?</h2>
                        <p>
                            Rejoignez les cabinets médicaux qui font confiance à MedicalFlow
                        </p>
                        <div className="cta-buttons">
                            <Link to="/chat" className="btn btn-primary btn-lg">
                                Démarrer maintenant
                            </Link>
                            <a href="#contact" className="btn btn-secondary btn-lg">
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Logo />
                            <p>L'intelligence artificielle au service de la santé</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Produit</h4>
                                <a href="#features">Fonctionnalités</a>
                                <a href="#demo">Démo</a>
                                <a href="#">Tarifs</a>
                            </div>
                            <div className="footer-column">
                                <h4>Légal</h4>
                                <a href="#">Mentions légales</a>
                                <a href="#">RGPD</a>
                                <a href="#">CGU</a>
                            </div>
                            <div className="footer-column">
                                <h4>Contact</h4>
                                <a href="mailto:contact@medicalflow.fr">contact@medicalflow.fr</a>
                                <a href="tel:+33100000000">01 00 00 00 00</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 MedicalFlow - Tous droits réservés</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
