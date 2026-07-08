import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { minimizeDFA } from '../core/Minimization';
import { nfaToDfa } from '../core/NFAToDFA';
//;

export const MinimizationPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleMinimize = () => {
    if (input) {
      // Moore nécessite un AFD. On déterminise d'abord par précaution.
      const dfa = nfaToDfa(input);
      setOutput(minimizeDFA(dfa));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C13" title="Minimisation d'Automate" 
      description="Appliquez l'algorithme de Moore pour obtenir l'AFD minimal équivalent (nombre d'états minimal)."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Original</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Minimal</h3>
          <button className="btn btn-primary" onClick={handleMinimize} disabled={!input}>
             Minimiser (Moore)
          </button>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
