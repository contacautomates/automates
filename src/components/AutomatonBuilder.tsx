import React, { useState } from 'react';
import { Automaton } from '../core/ClosureOperations';
//;

interface AutomatonBuilderProps {
  onBuild: (automaton: Automaton) => void;
}

export const AutomatonBuilder: React.FC<AutomatonBuilderProps> = ({ onBuild }) => {
  const [states, setStates] = useState<string>('q0, q1');
  const [initialStates, setInitialStates] = useState<string>('q0');
  const [finalStates, setFinalStates] = useState<string>('q1');
  const [transitions, setTransitions] = useState<string>('q0, a, q1\nq1, b, q1');

  const handleBuild = () => {
    const aut = new Automaton();
    const stateList = states.split(',').map(s => s.trim()).filter(s => s !== '');
    const initList = initialStates.split(',').map(s => s.trim()).filter(s => s !== '');
    const finalList = finalStates.split(',').map(s => s.trim()).filter(s => s !== '');

    stateList.forEach(s => {
      aut.addState(s, initList.includes(s), finalList.includes(s));
    });

    transitions.split('\n').forEach(line => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length === 3) {
        aut.addTransition(parts[0], parts[1], parts[2]);
      }
    });

    onBuild(aut);
  };

  return (
    <div className="card" style={{ display: 'grid', gap: '20px' }}>
      <div className="input-group">
        <label>États (séparés par des virgules)</label>
        <input value={states} onChange={(e) => setStates(e.target.value)} placeholder="q0, q1, q2..." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="input-group">
          <label>États Initiaux</label>
          <input value={initialStates} onChange={(e) => setInitialStates(e.target.value)} placeholder="q0" />
        </div>
        <div className="input-group">
          <label>États Finaux</label>
          <input value={finalStates} onChange={(e) => setFinalStates(e.target.value)} placeholder="q1" />
        </div>
      </div>
      <div className="input-group">
        <label>Transitions (Source, Symbole, Cible - une par ligne)</label>
        <textarea 
          value={transitions} 
          onChange={(e) => setTransitions(e.target.value)} 
          placeholder="q0, a, q1"
          rows={4}
          style={{ resize: 'vertical' }}
        />
      </div>
      <button className="btn btn-primary" onClick={handleBuild}>
        ➕ Appliquer l'Automate
      </button>
    </div>
  );
};
