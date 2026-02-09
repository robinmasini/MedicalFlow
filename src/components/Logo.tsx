import logoNew from '../assets/MEDICALFLOW-new.svg';
import logoWhite from '../assets/MEDICALFLOW-white.png';
import './Logo.css';

interface LogoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'white' | 'new';
}

const Logo = ({ className = '', size = 'medium', variant = 'default' }: LogoProps) => {
    const sizeClass = `logo-${size}`;
    const logoSrc = variant === 'white' ? logoWhite : (variant === 'new' ? logoNew : logoNew);
    
    return (
        <div className={`logo ${sizeClass} ${className}`}>
            <img src={logoSrc} alt="MedicalFlow" className="logo-image" />
        </div>
    );
};

export default Logo;
