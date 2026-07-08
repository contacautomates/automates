import { Automaton } from './ClosureOperations';
import { getUsefulStates } from './StateIdentification';

export function trimAutomaton(automaton: Automaton): Automaton {
  const usefulStates = getUsefulStates(automaton);
  const trimmed = new Automaton();
  automaton.states.forEach(s => { if (usefulStates.has(s)) trimmed.addState(s, automaton.initialStates.has(s), automaton.finalStates.has(s)); });
  automaton.transitions.forEach((targetsMap, src) => {
    if (usefulStates.has(src)) targetsMap.forEach((targets, sym) => targets.forEach(target => {
      if (usefulStates.has(target)) trimmed.addTransition(src, sym, target);
    }));
  });
  return trimmed;
}
