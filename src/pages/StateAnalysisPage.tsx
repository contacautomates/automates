import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { getUsefulStates, getReachableStates, getCoReachableStates } from '../core/StateIdentification';
//;

export const StateAnalysisPage: React.FC = () => {
  const [automaton, setAutomaton] = useState<Automaton | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = () => {
    if (automaton) {
      setAnalysis({
        reachable: getReachableStates(automaton),
        coReachable: getCoReachableStates(automaton),
        useful: getUsefulStates(automaton)
      });
    }
  };

  return (
    <PageLayout moduleCode="MODULE C5" title="Analyse des États" 
      description="Identifiez les états accessibles, co-accessibles et utiles de votre automate."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate à Analyser</h3>
          <AutomatonBuilder onBuild={setAutomaton} />
          {automaton && <AutomatonViewer automaton={automaton} />}
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Résultats de l'Analyse</h3>
          <button className="btn btn-primary" onClick={handleAnalyze} disabled={!automaton}>
             Lancer l'analyse
          </button>
          {analysis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ background: 'var(--bg-dark)' }}>
                <h4 style={{ color: 'var(--primary)' }}>États Accessibles</h4>
                <p>{Array.from(analysis.reachable).join(', ') || 'Aucun'}</p>
              </div>
              <div className="card" style={{ background: 'var(--bg-dark)' }}>
                <h4 style={{ color: 'var(--accent)' }}>États Co-accessibles</h4>
                <p>{Array.from(analysis.coReachable).join(', ') || 'Aucun'}</p>
              </div>
              <div className="card" style={{ background: 'var(--bg-dark)' }}>
                <h4 style={{ color: '#f59e0b' }}>États Utiles</h4>
                <p>{Array.from(analysis.useful).join(', ') || 'Aucun'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
