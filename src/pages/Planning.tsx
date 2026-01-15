import { useState } from 'react';
import './Planning.css';

type Status = 'suite_impr' | 'activation' | 'a_faire' | 'en_cours' | 'termine' | 'en_attente';
type Tab = 'cabinet' | 'production';

interface PlanningItem {
    id: string;
    patient: string;
    travail: string;
    etape: Status;
    commentaires: string;
    prochaines: string;
    bib: string;
    facture: boolean;
    dateEcheance: string;
    praticien: string;
    type: string;
    imprime: boolean;
}

// Demo data for Cabinet
const demoCabinetItems: PlanningItem[] = [
    { id: '1', patient: 'DE MOUSTIER Mael', travail: 'Pose appareil', etape: 'a_faire', commentaires: 'Attendre production', prochaines: 'janv. 20', bib: 'BAMBILAB', facture: false, dateEcheance: '2026-01-20', praticien: 'RD', type: 'Contrôle', imprime: false },
    { id: '2', patient: 'DUPUY Mathilde', travail: 'Activation', etape: 'en_cours', commentaires: '', prochaines: 'janv. 22', bib: 'ELEGOO J', facture: false, dateEcheance: '2026-01-22', praticien: 'RD', type: 'Suivi', imprime: true },
    { id: '3', patient: 'MARTIN Lucas', travail: 'Contrôle final', etape: 'termine', commentaires: 'RAS', prochaines: 'janv. 25', bib: 'BAMBILAB', facture: true, dateEcheance: '2026-01-25', praticien: 'RD', type: 'Contrôle', imprime: true },
];

// Demo data for Production
const demoProductionItems: PlanningItem[] = [
    { id: '1', patient: 'BELCASTRO Gianni', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '8 à 11', prochaines: 'janv. 7', bib: 'BAMBILAB', facture: false, dateEcheance: '2026-01-15', praticien: 'RD', type: '', imprime: false },
    { id: '2', patient: 'BELCASTRO Theo', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '8 à 11', prochaines: 'janv. 7', bib: '', facture: false, dateEcheance: '2026-01-16', praticien: 'RD', type: '', imprime: false },
    { id: '3', patient: 'KHEMALA Kawther', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '14 à 16', prochaines: 'janv. 7', bib: '', facture: false, dateEcheance: '2026-01-17', praticien: 'RD', type: '', imprime: false },
    { id: '4', patient: 'TOURTET Lily', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '8 à 12', prochaines: 'janv. 14', bib: 'ELEGOO J', facture: false, dateEcheance: '2026-01-18', praticien: 'RD', type: 'En cours', imprime: false },
    { id: '5', patient: 'PETIT Kamil', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '11 à 18', prochaines: 'janv. 7', bib: 'ELEGOO J', facture: false, dateEcheance: '2026-01-19', praticien: 'RD', type: '', imprime: false },
    { id: '6', patient: "M'NASRI Célila", travail: 'Suite à impr', etape: 'suite_impr', commentaires: '19 à 24', prochaines: 'janv. 7', bib: '', facture: false, dateEcheance: '2026-01-20', praticien: 'RD', type: 'Finition', imprime: false },
    { id: '7', patient: 'LEVI-VALENSI Alissa', travail: 'Suite à impr', etape: 'a_faire', commentaires: '', prochaines: 'janv. 7', bib: '', facture: false, dateEcheance: '2026-01-21', praticien: 'RD', type: '', imprime: false },
    { id: '8', patient: 'ACHOTIAN Missio', travail: 'Activation attelle', etape: 'activation', commentaires: '7 à 15', prochaines: 'janv. 22', bib: 'ELEGOO J', facture: false, dateEcheance: '2026-01-22', praticien: 'RD', type: 'A faire', imprime: true },
    { id: '9', patient: 'MANIER Lucas', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '24 à 210', prochaines: 'janv. 20', bib: '', facture: false, dateEcheance: '2026-01-23', praticien: 'RD', type: '', imprime: false },
    { id: '10', patient: 'MARC Jacky', travail: 'Suite à impr', etape: 'suite_impr', commentaires: '19 à 24', prochaines: 'janv. 14', bib: 'BAMBILAB', facture: true, dateEcheance: '2026-01-24', praticien: 'RD', type: '21', imprime: true },
];

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
    suite_impr: { label: 'Suite à impr', color: '#fff', bg: '#00c875' },
    activation: { label: 'Activation attelle', color: '#fff', bg: '#fdab3d' },
    a_faire: { label: 'À faire', color: '#fff', bg: '#e2445c' },
    en_cours: { label: 'En cours', color: '#fff', bg: '#0086c0' },
    termine: { label: 'Terminé', color: '#fff', bg: '#9cd326' },
    en_attente: { label: 'En attente', color: '#323338', bg: '#c4c4c4' },
};

const Planning = () => {
    const [activeTab, setActiveTab] = useState<Tab>('cabinet');
    const [searchQuery, setSearchQuery] = useState('');

    const items = activeTab === 'cabinet' ? demoCabinetItems : demoProductionItems;

    const filteredItems = items.filter(item =>
        item.patient.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="planning-container">
            {/* Header */}
            <div className="planning-header">
                <div className="planning-title">
                    <h2>Organisation {activeTab === 'cabinet' ? 'Cabinet' : 'Production'}</h2>
                    <span className="planning-subtitle">▼ JANVIER 2026</span>
                </div>
                <div className="planning-actions">
                    <button className="btn-add-item">
                        <span>+ Ajouter élément</span>
                    </button>
                    <div className="search-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="planning-tabs">
                <button
                    className={`planning-tab ${activeTab === 'cabinet' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cabinet')}
                >
                    🏥 Cabinet
                </button>
                <button
                    className={`planning-tab ${activeTab === 'production' ? 'active' : ''}`}
                    onClick={() => setActiveTab('production')}
                >
                    🔧 Production
                </button>
            </div>

            {/* Table */}
            <div className="planning-table-wrapper">
                <table className="planning-table">
                    <thead>
                        <tr>
                            <th className="col-patient">Élément</th>
                            <th className="col-travail">Travail à réaliser</th>
                            <th className="col-etape">Étape</th>
                            <th className="col-commentaires">Commentaires</th>
                            <th className="col-prochaines">Prochaines</th>
                            <th className="col-bib">Bib</th>
                            <th className="col-facture">Facturé</th>
                            <th className="col-echeance">Échéance</th>
                            <th className="col-praticien">Praticien</th>
                            {activeTab === 'production' && <th className="col-imprime">Imprimé</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td className="col-patient">
                                    <span className="patient-name">{item.patient}</span>
                                </td>
                                <td className="col-travail">{item.travail}</td>
                                <td className="col-etape">
                                    <span
                                        className="status-badge"
                                        style={{
                                            backgroundColor: statusConfig[item.etape].bg,
                                            color: statusConfig[item.etape].color
                                        }}
                                    >
                                        {statusConfig[item.etape].label}
                                    </span>
                                </td>
                                <td className="col-commentaires">{item.commentaires || '-'}</td>
                                <td className="col-prochaines">
                                    <span className="date-badge">{item.prochaines}</span>
                                </td>
                                <td className="col-bib">
                                    {item.bib && (
                                        <span className={`bib-badge ${item.bib.toLowerCase().replace(' ', '-')}`}>
                                            {item.bib}
                                        </span>
                                    )}
                                </td>
                                <td className="col-facture">
                                    <span className={`facture-badge ${item.facture ? 'oui' : 'non'}`}>
                                        {item.facture ? '✓' : ''}
                                    </span>
                                </td>
                                <td className="col-echeance">{item.dateEcheance}</td>
                                <td className="col-praticien">{item.praticien}</td>
                                {activeTab === 'production' && (
                                    <td className="col-imprime">
                                        <span className={`imprime-badge ${item.imprime ? 'oui' : 'non'}`}>
                                            {item.imprime ? '✓' : ''}
                                        </span>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Planning;
