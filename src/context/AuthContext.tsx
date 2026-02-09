import { createContext, useContext, useState, ReactNode } from 'react';
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
    name: 'Cabinet Médical',
    email: 'contact@medicalflow.fr',
    rpps: '00000000000',
    profession: 'Pluridisciplinaire',
    specialty: 'Général',
    photo: '',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('medicalflow_auth') === 'true';
    });
    const [user, setUser] = useState<Practitioner | null>(() => {
        const saved = localStorage.getItem('medicalflow_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email: string, _password: string): Promise<boolean> => {
        // Simulated authentication - in production, this would call an API
        if (email.includes('@')) {
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
