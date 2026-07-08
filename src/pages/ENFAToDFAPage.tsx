import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { nfaToDfa } from '../core/NFAToDFA';
//;

export const ENFAToDFAPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleConvert = () => {
    if (input) {
      // Notre implementation nfaToDfa gère déjà les epsilon (en utilisant epsilonClosure en interne)
      setOutput(nfaToDfa(input));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C10" title="Conversion ε-AFN vers AFD" 
      description="Convertissez directement un automate non-déterministe avec transitions vides en un AFD."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>ε-AFN d'entrée</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>AFD Résultant</h3>
          <button className="btn btn-primary" onClick={handleConvert} disabled={!input}>
             Déterminiser
          </button>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
