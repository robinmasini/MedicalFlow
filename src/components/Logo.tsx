import logoImage from '../assets/MEDICALFLOW.png';
import logoWhite from '../assets/MEDICALFLOW-white.png';
import './Logo.css';

interface LogoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'white';
}

const Logo = ({ className = '', size = 'medium', variant = 'default' }: LogoProps) => {
    const sizeClass = `logo-${size}`;
    const logoSrc = variant === 'white' ? logoWhite : logoImage;
    
    return (
        <div className={`logo ${sizeClass} ${className}`}>
            <img src={logoSrc} alt="MedicalFlow" className="logo-image" />
        </div>
    );
};

export default Logo;
