import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { canonize } from '../core/Canonization';
import { nfaToDfa } from '../core/NFAToDFA';
//;

export const CanonizationPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleCanonize = () => {
    if (input) {
      const dfa = nfaToDfa(input);
      setOutput(canonize(dfa));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C15" title="Canonisation d'Automate" 
      description="Génère l'automate canonique (équivalent à l'automate minimal) où les états conservent les noms de leurs sous-états sous forme d'ensembles, par exemple {q0, q1}."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Original</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate Canonisé</h3>
          <button className="btn btn-primary" onClick={handleCanonize} disabled={!input}>
             Canoniser les états
          </button>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
