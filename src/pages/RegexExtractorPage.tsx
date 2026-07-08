import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { extractRegex } from '../core/RegexExtraction';
//;

export const RegexExtractorPage: React.FC = () => {
  const [automaton, setAutomaton] = useState<Automaton | null>(null);
  const [regex, setRegex] = useState<string>('');

  const handleExtract = () => {
    if (automaton) {
      try {
        const result = extractRegex(automaton);
        setRegex(result);
      } catch (e) {
        setRegex("Impossible d'extraire la regex.");
      }
    }
  };

  return (
    <PageLayout moduleCode="MODULE C3" title="Extraction d'Expression Régulière" 
      description="Générez l'expression régulière équivalente à partir d'un automate (AFN ou AFD) en utilisant l'algorithme d'élimination d'états."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate d'Entrée</h3>
          <AutomatonBuilder onBuild={setAutomaton} />
          {automaton && <AutomatonViewer automaton={automaton} />}
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Expression Régulière</h3>
          <button className="btn btn-primary" onClick={handleExtract} disabled={!automaton}>
             Extraire la Regex
          </button>
          {regex && (
            <div style={{ 
              marginTop: '20px', 
              padding: '20px', 
              background: 'var(--bg-dark)', 
              borderRadius: '12px', 
              fontSize: '20px', 
              fontWeight: '700',
              color: 'var(--accent)',
              wordBreak: 'break-all'
            }}>
              {regex}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
