import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { trimAutomaton } from '../core/AutomatonPruning';
//;

export const PruningPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handlePrune = () => {
    if (input) {
      setOutput(trimAutomaton(input));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C6" title="Émondage d'Automate" 
      description="Supprimez tous les états qui ne sont pas à la fois accessibles et co-accessibles."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Original</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Émondé</h3>
          <button className="btn btn-primary" onClick={handlePrune} disabled={!input}>
             Émonder l'automate
          </button>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
