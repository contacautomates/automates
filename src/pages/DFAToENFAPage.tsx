import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
//;

export const DFAToENFAPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleConvert = () => {
    if (input) {
      setOutput(input.clone());
    }
  };

  return (
    <PageLayout moduleCode="MODULE C11" title="Conversion AFD vers ε-AFN" 
      description="Inclut un AFD dans l'ensemble des ε-AFN pour la complétude de la plateforme."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>AFD d'Entrée</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>ε-AFN Résultant</h3>
          <button className="btn btn-primary" onClick={handleConvert} disabled={!input}>
             Convertir
          </button>
          {output && (
            <>
              <AutomatonViewer automaton={output} />
              <div className="card" style={{ marginTop: '20px' }}>
                <p>Opération effectuée avec succès.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
