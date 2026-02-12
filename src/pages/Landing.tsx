import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ComingSoonModal from '../components/ComingSoonModal';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            <ComingSoonModal />
            {/* Header */}
            <header className="landing-header">
                <div className="container">
                    <div className="header-content">
                        <Logo variant="new" />
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

            {/* Hero Section with Video Background */}
            <section className="hero">
                <div className="hero-video-container">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hero-video"
                    >
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge-warm">💙 Créé avec passion pour les soignants</div>
                        <h1>
                            Plus qu'une technologie,
                            <span className="text-gradient-warm"> une aide humaine</span>
                        </h1>
                        <p className="hero-subtitle-warm">
                            MedicalFlow vous libère du temps pour ce qui compte vraiment :
                            <strong> prendre soin de vos patients</strong>.
                            Nous nous occupons de l'administratif, vous gardez l'humain.
                        </p>
                        <div className="hero-cta">
                            <Link to="/chat" className="btn btn-warm btn-lg">
                                <span>Découvrir MedicalFlow</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <a href="#features" className="btn btn-secondary-warm btn-lg">
                                En savoir plus
                            </a>
                        </div>
                        <div className="hero-trust-warm">
                            <span className="trust-badge-warm">🔒 Données sécurisées</span>
                            <span className="trust-badge-warm">💚 Respectueux de l'éthique</span>
                            <span className="trust-badge-warm">🇫🇷 Conçu en France</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section - NEW: More Human Touch */}
            <section className="story-section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <span className="section-badge-warm">Notre histoire</span>
                            <h2>Parce que chaque minute compte</h2>
                            <p className="story-lead">
                                Nous avons créé MedicalFlow après avoir vu des médecins passionnés
                                perdre des heures précieuses dans des tâches administratives,
                                loin de leur véritable vocation : soigner.
                            </p>
                            <p className="story-description">
                                Notre mission est simple : redonner du temps aux soignants.
                                Avec MedicalFlow, l'IA s'occupe de la gestion quotidienne,
                                pour que vous puissiez vous concentrer sur l'essentiel –
                                <strong> l'attention portée à chaque patient</strong>.
                            </p>
                        </div>
                        <div className="story-stats">
                            <div className="stat-card">
                                <div className="stat-number">2h</div>
                                <div className="stat-label">économisées par jour</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">98%</div>
                                <div className="stat-label">de satisfaction</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">disponible pour vos patients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge-warm">Fonctionnalités</span>
                        <h2>Tout ce dont votre cabinet a besoin</h2>
                        <p>Une solution pensée pour simplifier votre quotidien</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card-warm">
                            <div className="feature-icon">💬</div>
                            <h3>Conversation naturelle</h3>
                            <p>
                                Un dialogue chaleureux et empathique avec vos patients.
                                L'IA comprend leurs besoins et les rassure avec bienveillance.
                            </p>
                        </div>
                        <div className="feature-card-warm">
                            <div className="feature-icon">🎙️</div>
                            <h3>Assistance vocale</h3>
                            <p>
                                Vos patients peuvent simplement parler à l'assistant.
                                Plus accessible, plus humain, plus intuitif.
                            </p>
                        </div>
                        <div className="feature-card-warm">
                            <div className="feature-icon">📅</div>
                            <h3>Gestion intelligente</h3>
                            <p>
                                Prise de rendez-vous automatique, rappels personnalisés,
                                organisation optimale de votre planning.
                            </p>
                        </div>
                        <div className="feature-card-warm">
                            <div className="feature-icon">📋</div>
                            <h3>Documentation simplifiée</h3>
                            <p>
                                Fiches patients générées automatiquement,
                                synthèses claires, intégration avec vos outils existants.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="demo-section-warm">
                <div className="container">
                    <div className="demo-content">
                        <div className="demo-text">
                            <span className="section-badge-warm">Essayez gratuitement</span>
                            <h2>Testez MedicalFlow dès maintenant</h2>
                            <p>
                                Découvrez comment MedicalFlow peut transformer votre pratique quotidienne.
                                Aucune installation requise, aucun engagement.
                            </p>
                            <ul className="demo-list">
                                <li>✅ Démo interactive immédiate</li>
                                <li>✅ Aucune carte bancaire demandée</li>
                                <li>✅ Scénarios médicaux réalistes</li>
                            </ul>
                            <Link to="/chat" className="btn btn-warm btn-lg">
                                Lancer la démo
                            </Link>
                        </div>
                        <div className="demo-visual">
                            <div className="testimonial-card">
                                <p className="testimonial-quote">
                                    "MedicalFlow m'a permis de retrouver du temps pour mes patients.
                                    Je ne me sens plus submergé par l'administratif."
                                </p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">��‍⚕️</div>
                                    <div>
                                        <div className="author-name">Dr. Martin</div>
                                        <div className="author-role">Chirurgien-dentiste</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section-warm">
                <div className="container">
                    <div className="cta-content">
                        <h2>Rejoignez les praticiens qui ont choisi MedicalFlow</h2>
                        <p>
                            Commencez dès aujourd'hui à offrir une meilleure expérience à vos patients
                        </p>
                        <div className="cta-buttons">
                            <Link to="/chat" className="btn btn-white btn-lg">
                                Démarrer gratuitement
                            </Link>
                            <a href="#contact" className="btn btn-secondary-warm btn-lg">
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
                            <Logo variant="white" />
                            <p>L'intelligence artificielle au service de l'humain</p>
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
