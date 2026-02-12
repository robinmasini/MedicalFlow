import comingSoonImg from '../assets/coming-soon.png';
import './ComingSoonModal.css';

const ComingSoonModal = () => {
    return (
        <div className="coming-soon-overlay">
            <div className="coming-soon-modal">
                <img src={comingSoonImg} alt="Bientôt disponible" className="coming-soon-image" />
            </div>
        </div>
    );
};

export default ComingSoonModal;
