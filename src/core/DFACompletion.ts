import { Automaton } from './ClosureOperations';

export function completeAutomaton(automaton: Automaton): Automaton {
  const completed = automaton.clone();
  const puitsId = "Puits";
  let needsPuits = false;
  completed.states.forEach(state => {
    completed.alphabet.forEach(symbol => {
      const trans = completed.transitions.get(state)?.get(symbol);
      if (!trans || trans.size === 0) {
        needsPuits = true;
        completed.addTransition(state, symbol, puitsId);
      }
    });
  });
  if (needsPuits) {
    completed.addState(puitsId, false, false);
    completed.alphabet.forEach(symbol => completed.addTransition(puitsId, symbol, puitsId));
  }
  return completed;
}
