import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { AutomatonBuilder } from '../components/AutomatonBuilder';
import { AutomatonViewer } from '../components/AutomatonViewer';
import { Automaton, EPSILON } from '../core/ClosureOperations';
import { removeEpsilons } from '../core/EpsilonManager';
//;

export const EpsilonManagerPage: React.FC = () => {
  const [input, setInput] = useState<Automaton | null>(null);
  const [output, setOutput] = useState<Automaton | null>(null);

  const handleRemove = () => {
    if (input) {
      setOutput(removeEpsilons(input));
    }
  };

  const handleAddIdentity = () => {
    if (input) {
      // Pour AFN vers epsilon-AFN, on clone juste (notre modèle gère déjà les deux)
      // Ou on pourrait rajouter des transitions epsilon triviales pour la démo
      const clone = input.clone();
      // On rajoute une epsilon de q0 vers lui même (trivial) pour montrer qu'on est en epsilon-AFN
      const firstInit = Array.from(clone.initialStates)[0];
      if (firstInit) {
        clone.addTransition(firstInit, EPSILON, firstInit);
      }
      setOutput(clone);
    }
  };

  return (
    <PageLayout moduleCode="MODULE C8" title="Gestion des ε-transitions" 
      description="Convertissez un ε-AFN en AFN classique en supprimant les transitions vides, ou vice-versa."
    >
      <div className="responsive-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Automate d'Entrée</h3>
          <AutomatonBuilder onBuild={setInput} />
          {input && <AutomatonViewer automaton={input} />}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Actions & Résultat</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleRemove} disabled={!input}>
               Supprimer les ε
            </button>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--accent)' }} onClick={handleAddIdentity} disabled={!input}>
               AFN → ε-AFN (ajout ε)
            </button>
          </div>
          {output && <AutomatonViewer automaton={output} />}
        </div>
      </div>
    </PageLayout>
  );
};
