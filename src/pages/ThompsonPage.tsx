import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { buildThompson } from '../core/ThompsonConstruction';
import { Automaton } from '../core/ClosureOperations';
//;

export const ThompsonPage: React.FC = () => {
  const [regex, setRegex] = useState<string>('(a|b)*abb');
  const [automaton, setAutomaton] = useState<Automaton | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = () => {
    try {
      setError(null);
      const aut = buildThompson(regex);
      setAutomaton(aut);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <PageLayout moduleCode="MODULE C12" title="Construction de Thompson" 
      description="Générez un ε-AFN à partir d'une expression régulière en suivant la méthode inductive de Thompson."
    >
      <div className="responsive-grid">
        <div className="card" style={{ height: 'fit-content' }}>
          <h3>Saisie Regex</h3>
          <input 
            value={regex} 
            onChange={(e) => setRegex(e.target.value)} 
            placeholder="(a|b)*"
            style={{ fontSize: '18px', margin: '20px 0' }}
          />
          <button className="btn btn-primary" onClick={handleBuild}>
             Construire l'Automate
          </button>
          {error && <p style={{ color: 'var(--error)', marginTop: '10px' }}>{error}</p>}
          
          <div className="card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.02)' }}>
            <h4>Règles Thompson</h4>
            <ul style={{ fontSize: '12px', color: 'var(--text-muted)', paddingLeft: '16px', marginTop: '8px' }}>
              <li>Concaténation : AB</li>
              <li>Union : A|B ou A+B</li>
              <li>Étoile : A*</li>
              <li>Parenthèses : (A)</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3>Automate Résultant (ε-AFN)</h3>
          {automaton ? (
            <AutomatonViewer automaton={automaton} />
          ) : (
            <div className="card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              L'automate s'affichera ici.
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
