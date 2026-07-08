import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { epsilonClosure } from '../core/EpsilonClosure';
//;

export const EpsilonClosurePage: React.FC = () => {
  const [automaton, setAutomaton] = useState<Automaton | null>(null);
  const [targetState, setTargetState] = useState<string>('q0');
  const [closureResult, setClosureResult] = useState<string[] | null>(null);

  const handleCompute = () => {
    if (automaton) {
      const set = new Set([targetState]);
      const result = epsilonClosure(automaton, set);
      setClosureResult(Array.from(result));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C9" title="Calcul des ε-fermetures" 
      description="Calculez l'ensemble des états atteignables depuis un état donné en n'empruntant que des ε-transitions."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate (ε-AFN)</h3>
          <AutomatonBuilder onBuild={setAutomaton} />
          {automaton && <AutomatonViewer automaton={automaton} />}
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Calcul de Fermeture</h3>
          <div className="input-group">
            <label>État cible</label>
            <input 
              value={targetState} 
              onChange={(e) => setTargetState(e.target.value)} 
              placeholder="ex: q0"
            />
          </div>
          <button className="btn btn-primary" onClick={handleCompute} disabled={!automaton}>
             Calculer la ε-fermeture
          </button>
          {closureResult && (
            <div className="card" style={{ background: 'var(--bg-dark)' }}>
              <h4 style={{ color: 'var(--primary)' }}>Résultat pour {targetState} :</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {'{ ' + closureResult.join(', ') + ' }'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
