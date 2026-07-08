import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { completeAutomaton } from '../core/DFACompletion';
//;

export const DFAToCDFAPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleComplete = () => {
    if (input) {
      setOutput(completeAutomaton(input));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C4" title="Complétion d'Automate (AFD → AFDC)" 
      description="Ajoutez un état puits à un AFD pour le rendre complet par rapport à son alphabet."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Original</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Complet</h3>
          <button className="btn btn-primary" onClick={handleComplete} disabled={!input}>
             Compléter l'automate
          </button>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
