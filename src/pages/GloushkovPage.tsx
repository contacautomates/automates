import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { buildGloushkov } from '../core/GloushkovAlgorithm';
import { Automaton } from '../core/ClosureOperations';
//;

export const GloushkovPage: React.FC = () => {
  const [regex, setRegex] = useState<string>('a(a|b)*b');
  const [automaton, setAutomaton] = useState<Automaton | null>(null);

  const handleBuild = () => {
    // Gloushkov implementation in core is a sketch, but we show the UI
    const aut = buildGloushkov(regex);
    setAutomaton(aut);
  };

  return (
    <PageLayout moduleCode="MODULE C14" title="Algorithme de Gloushkov" 
      description="Construisez un automate (position-based) à partir d'une expression régulière sans utiliser d'ε-transitions."
    >
      <div className="responsive-grid">
        <div className="card">
          <h3>Expression Régulière</h3>
          <input 
            value={regex} 
            onChange={(e) => setRegex(e.target.value)} 
            placeholder="ex: a(a|b)*b"
            style={{ fontSize: '18px', margin: '20px 0' }}
          />
          <button className="btn btn-primary" onClick={handleBuild}>
             Construire (Gloushkov)
          </button>
          
          <div className="card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Note : L'algorithme de Gloushkov produit un automate homogène où chaque état correspond à une position dans l'expression régulière linéarisée.
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Automate de Gloushkov</h3>
          {automaton ? (
            <AutomatonViewer automaton={automaton} />
          ) : (
            <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
