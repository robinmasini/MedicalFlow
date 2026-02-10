import logoCross from '../assets/logo-cross.svg';
import logoNew from '../assets/MEDICALFLOW-new.svg';
import logoWhite from '../assets/MEDICALFLOW-white.png';
import './Logo.css';

interface LogoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'white' | 'cross' | 'new';
}

const Logo = ({ className = '', size = 'medium', variant = 'default' }: LogoProps) => {
    const sizeClass = `logo-${size}`;
    let logoSrc = logoNew; // Default to full logo
    if (variant === 'white') logoSrc = logoWhite;
    else if (variant === 'cross') logoSrc = logoCross;
    else if (variant === 'new') logoSrc = logoNew;

    return (
        <div className={`logo ${sizeClass} ${className}`}>
            <img src={logoSrc} alt="MedicalFlow" className="logo-image" />
        </div>
    );
};

export default Logo;
