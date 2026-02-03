import './FollowUps.css';

interface FollowUp {
    id: string;
    patientName: string;
    type: string;
    lastContact: string;
    status: 'A faire' | 'En cours' | 'Relancé';
}

const mockFollowUps: FollowUp[] = [
    { id: '1', patientName: 'Marie Durand', type: 'Relance Impayé', lastContact: '10/01/2026', status: 'A faire' },
    { id: '2', patientName: 'Jean Dupont', type: 'Rappel RDV', lastContact: '15/01/2026', status: 'En cours' },
    { id: '3', patientName: 'Alice Martin', type: 'Suivi Post-op', lastContact: '02/02/2026', status: 'Relancé' },
];

const FollowUps = () => {
    return (
        <div className="followups-page">
            <div className="followups-header">
                <h2>Relances</h2>
            </div>

            <div className="followups-list">
                {mockFollowUps.map(fu => (
                    <div key={fu.id} className="followup-card">
                        <div className="fu-info">
                            <h4>{fu.patientName}</h4>
                            <p>{fu.type}</p>
                            <span>Dernier contact: {fu.lastContact}</span>
                        </div>
                        <div className={`fu-status ${fu.status.toLowerCase().replace(' ', '-')}`}>
                            {fu.status}
                        </div>
                        <button className="fu-action">Relancer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowUps;
