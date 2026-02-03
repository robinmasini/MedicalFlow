import { useState } from 'react';
import './Calls.css';

interface Call {
    id: string;
    date: string;
    time: string;
    patientName: string;
    phone: string;
    classification: 'Annulation RDV' | 'Autre' | 'A rappeler' | 'Rendez-vous';
    practitioner: string;
    duration: string;
    isProcessed: boolean;
    assignedTo?: string;
}

const mockCalls: Call[] = [
    { id: '1', date: "Aujourd'hui", time: '08:36', patientName: 'Lucas Bastin Smith', phone: '09 72 42 23 36', classification: 'Annulation RDV', practitioner: '-', duration: '1 min 22 s', isProcessed: false },
    { id: '2', date: 'sam. 31/01/26', time: '12:14', patientName: '-', phone: '09 72 42 23 36', classification: 'Autre', practitioner: '-', duration: '1 min 7 s', isProcessed: false },
    { id: '3', date: 'lun. 26/01/26', time: '17:33', patientName: '-', phone: '09 72 42 23 36', classification: 'A rappeler', practitioner: '-', duration: '0 min 11 s', isProcessed: false },
    { id: '4', date: 'lun. 26/01/26', time: '17:04', patientName: '-', phone: '09 72 42 23 36', classification: 'A rappeler', practitioner: '-', duration: '0 min 3 s', isProcessed: false },
    { id: '5', date: 'lun. 26/01/26', time: '16:52', patientName: '-', phone: '09 72 42 23 36', classification: 'A rappeler', practitioner: '-', duration: '0 min 12 s', isProcessed: false },
    { id: '6', date: 'lun. 26/01/26', time: '16:46', patientName: '-', phone: '09 72 42 23 36', classification: 'Rendez-vous', practitioner: '-', duration: '0 min 25 s', isProcessed: false },
];

const Calls = () => {
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getClassificationClass = (cls: string) => {
        switch (cls) {
            case 'Annulation RDV': return 'cls-annul';
            case 'Autre': return 'cls-autre';
            case 'A rappeler': return 'cls-rappeler';
            case 'Rendez-vous': return 'cls-rdv';
            default: return '';
        }
    };

    if (selectedCall) {
        return (
            <div className="call-detail-view">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => setSelectedCall(null)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Retour
                    </button>
                    <div className="call-info-main">
                        <h2>Appel du {selectedCall.phone}</h2>
                        <h3>{selectedCall.patientName !== '-' ? selectedCall.patientName : 'Appelant inconnu'}</h3>
                    </div>
                </div>

                <div className="detail-content-grid">
                    <div className="detail-left-panel">
                        <section className="info-extracted">
                            <h4>Informations extraites par l'IA</h4>
                            <div className="info-item">
                                <label>Nom du patient:</label>
                                <span>{selectedCall.patientName !== '-' ? selectedCall.patientName : 'A identifier'}</span>
                            </div>
                            <div className="info-item">
                                <label>Demande du patient:</label>
                                <span>Annuler un rendez-vous prévu pour ce soir.</span>
                            </div>
                            <div className="info-item">
                                <label>RDV Initial:</label>
                                <span className="highlight-date">2026-02-02T17:00:00</span>
                            </div>
                        </section>

                        <section className="patient-file-link">
                            <h4>Fiche patient</h4>
                            <div className="empty-file-box">
                                Aucune fiche patient n'est associée à cet appel.
                            </div>
                        </section>
                    </div>

                    <div className="detail-center-panel">
                        <div className="summary-box">
                            <p>L'interlocuteur, Monsieur Bastin Smith, a confirmé son identité et a indiqué qu'il pouvait être recontacté sur le numéro utilisé pour l'appel.</p>
                            <p>L'assistante virtuelle a transmis la demande d'annulation à l'équipe du cabinet et a informé l'interlocuteur qu'il pourrait rappeler le cabinet aux horaires d'ouverture.</p>
                            <p>La conversation s'est conclue de manière professionnelle et courtoise.</p>
                        </div>

                        <div className="activity-section">
                            <h4>Ajouter une activité</h4>
                            <div className="activity-buttons">
                                <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> Ajouter un commentaire</button>
                                <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> Envoyer un SMS</button>
                                <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> Programmer un rappel</button>
                                <button><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> Envoyer un email</button>
                            </div>
                            <div className="note-input">
                                <textarea placeholder="Note interne... (@ pour mentionner un collègue)"></textarea>
                                <button className="add-note-btn">Ajouter commentaire</button>
                            </div>
                        </div>
                    </div>

                    <div className="detail-right-panel">
                        <div className="transcript-container">
                            <div className="msg ai">
                                <p>Bonjour, je suis Julie, l'assistante virtuelle du Cabinet d'Orthodontie du Docteur Renger. Le cabinet est actuellement fermé. En quoi puis-je vous aider aujourd'hui ?</p>
                            </div>
                            <div className="msg user">
                                <p>Je dois annuler un rendez-vous pour ce soir.</p>
                            </div>
                            <div className="msg ai">
                                <p>D'accord, je vais vous aider à annuler votre rendez-vous.</p>
                            </div>
                            <div className="msg ai">
                                <p>Pour commencer, pourriez-vous me donner votre nom ?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="calls-page">
            <div className="calls-header">
                <h2>20 derniers appels non traités</h2>
                <div className="calls-actions">
                    <button className="mute-btn" title="Muet">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93l-1.41 1.41M15.54 8.46l-1.41 1.41M15.54 15.54l-1.41 1.41M19.07 19.07l-1.41-1.41" />
                        </svg>
                    </button>
                    <div className="search-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher un patient..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="calls-table-container">
                <table className="calls-table">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>NOM / TÉLÉPHONE</th>
                            <th>CLASSIFICATION</th>
                            <th>PRATICIEN</th>
                            <th></th>
                            <th>DURÉE</th>
                            <th>TRAITÉ ?</th>
                            <th>AFFECTÉ</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCalls.map(call => (
                            <tr key={call.id}>
                                <td className="date-cell">
                                    <span className="time">{call.time}</span>
                                    <span className="date">{call.date}</span>
                                </td>
                                <td className="patient-cell">
                                    <div className="patient-avatar-mini">
                                        {call.patientName !== '-' ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> : null}
                                        <span>{call.patientName}</span>
                                    </div>
                                    <span className="phone">{call.phone}</span>
                                </td>
                                <td>
                                    <span className={`badge-classification ${getClassificationClass(call.classification)}`}>
                                        {call.classification}
                                    </span>
                                </td>
                                <td className="practitioner-cell">
                                    <select defaultValue={call.practitioner}>
                                        <option value="-">-</option>
                                    </select>
                                </td>
                                <td className="icons-cell">
                                    <div className="icon-group">
                                        <span className="icon">📄</span>
                                        <span className="icon">⏱️</span>
                                        <span className="icon">🔄</span>
                                        <span className="icon">✉️</span>
                                        <span className="icon">💬</span>
                                    </div>
                                </td>
                                <td>{call.duration}</td>
                                <td>
                                    <div className="toggle-switch">
                                        <input type="checkbox" id={`processed-${call.id}`} checked={call.isProcessed} readOnly />
                                        <label htmlFor={`processed-${call.id}`}></label>
                                    </div>
                                </td>
                                <td>
                                    <select defaultValue="Non affecté -">
                                        <option value="Non affecté -">Non affecté -</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="voir-btn" onClick={() => setSelectedCall(call)}>Voir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calls;
