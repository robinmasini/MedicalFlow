import { createContext, useContext, useState, ReactNode } from 'react';
import avatarDesouches from '../assets/avatar-desouches.png';

interface Practitioner {
    id: string;
    name: string;
    email: string;
    rpps: string;
    profession: string;
    specialty: string;
    photo?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: Practitioner | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo practitioner data
const demoPractitioner: Practitioner = {
    id: '1',
    name: 'Dr. Renaud DESOUCHES',
    email: 'praticien@desouches.com',
    rpps: '10101234567',
    profession: 'Chirurgien-Dentiste',
    specialty: 'Orthodontie',
    photo: avatarDesouches,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('medicalflow_auth') === 'true';
    });
    const [user, setUser] = useState<Practitioner | null>(() => {
        const saved = localStorage.getItem('medicalflow_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulated authentication - in production, this would call an API
        if (email === 'praticien@desouches.com' && password === '1234') {
            setIsAuthenticated(true);
            setUser(demoPractitioner);
            localStorage.setItem('medicalflow_auth', 'true');
            localStorage.setItem('medicalflow_user', JSON.stringify(demoPractitioner));
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('medicalflow_auth');
        localStorage.removeItem('medicalflow_user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export type { Practitioner };
