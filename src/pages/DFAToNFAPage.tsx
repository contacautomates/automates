import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
//;

export const DFAToNFAPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleConvert = () => {
    if (input) {
      // AFD est déjà un AFN structurellement dans notre modèle
      setOutput(input.clone());
    }
  };

  return (
    <PageLayout moduleCode="MODULE C7" title="Conversion AFD vers AFN" 
      description="Convertissez un AFD en AFN (cette opération est triviale car tout AFD est un AFN)."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>AFD d'Entrée</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>AFN Résultant</h3>
          <button className="btn btn-primary" onClick={handleConvert} disabled={!input}>
            🔁 Convertir en AFN
          </button>
          {output && (
            <>
              <AutomatonViewer automaton={output} />
              <div className="card" style={{ marginTop: '20px' }}>
                <p>L'automate a été converti structurellement.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
