import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton } from '../core/ClosureOperations';
import { unionRegex, intersection, complementation } from '../core/ClosureOperations';
import { nfaToDfa } from '../core/NFAToDFA'; import { completeAutomaton } from '../core/DFACompletion';
//;

export const ClosureOpsPage: React.FC = () => {
  const [autA, setAutA] = useState<Automaton | null>(null);
  const [autB, setAutB] = useState<Automaton | null>(null);
  const [result, setResult] = useState<Automaton | null>(null);

  const handleUnion = () => {
    if (autA && autB) setResult(unionRegex(autA, autB));
  };

  const handleIntersection = () => {
    if (autA && autB) setResult(intersection(autA, autB));
  };

  const handleComplement = () => {
    if (autA) {
      // Complement nécessite un DFA Complet
      const dfa = nfaToDfa(autA);
      const cdfa = completeAutomaton(dfa);
      setResult(complementation(cdfa));
    }
  };

  return (
    <PageLayout moduleCode="MODULE C16" title="Opérations de Clôture" 
      description="Réalisez des opérations complexes sur un ou deux automates (Union, Intersection, Complémentation)."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate A</h3>
          <AutomatonBuilder onBuild={setAutA} />
          {autA && <AutomatonViewer automaton={autA} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate B (si nécessaire)</h3>
          <AutomatonBuilder onBuild={setAutB} />
          {autB && <AutomatonViewer automaton={autB} />}
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3>Opérations</h3>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={handleUnion} disabled={!autA || !autB}>
             Union (A | B)
          </button>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--accent)' }} onClick={handleIntersection} disabled={!autA || !autB}>
             Intersection (A & B)
          </button>
          <button className="btn btn-primary" style={{ backgroundColor: '#8b5cf6' }} onClick={handleComplement} disabled={!autA}>
             Complémentation (¬A)
          </button>
        </div>
      </div>

      {result && (
        <div style={{ marginTop: '24px' }}>
          <h3>Résultat</h3>
          <AutomatonViewer automaton={result} />
        </div>
      )}
    </PageLayout>
  );
};
