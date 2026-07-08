import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { nfaToDfa } from '../core/NFAToDFA';
//;

export const NFAToDFAPage: React.FC = () => {
  const [nfa, setNfa] = useState<Automaton | null>(null);
  const [dfa, setDfa] = useState<Automaton | null>(null);

  const handleConvert = () => {
    if (nfa) {
      setDfa(nfaToDfa(nfa));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C2" title="Conversion AFN vers AFD" 
      description="Transformez un automate non-déterministe en un automate déterministe équivalent via la construction par sous-ensembles."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Étape 1 : Définir l'AFN</h3>
          <AutomatonBuilder onBuild={setNfa} />
          {nfa && (
            <>
              <h3>Visualisation AFN</h3>
              <AutomatonViewer automaton={nfa} />
            </>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Étape 2 : Résultat AFD</h3>
          <button 
            className="btn btn-primary" 
            onClick={handleConvert} 
            disabled={!nfa}
            style={{ alignSelf: 'flex-start' }}
          >
            Lancer la conversion 
          </button>
          {dfa && (
            <>
              <AutomatonViewer automaton={dfa} />
              <div className="card" style={{ marginTop: '20px' }}>
                <h4>Statistiques</h4>
                <p>Anciens états : {nfa?.states.size}</p>
                <p>Nouveaux états : {dfa?.states.size}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
