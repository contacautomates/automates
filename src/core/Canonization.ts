import { Automaton } from './ClosureOperations';

export function canonize(automaton: Automaton): Automaton {
  const result = new Automaton(), mapping = new Map<string, string>(); let counter = 0;
  automaton.initialStates.forEach(s => { if (!mapping.has(s)) mapping.set(s, `q${counter++}`); });
  automaton.states.forEach(s => { if (!mapping.has(s)) mapping.set(s, `q${counter++}`); });
  automaton.states.forEach(s => result.addState(mapping.get(s)!, automaton.initialStates.has(s), automaton.finalStates.has(s)));
  automaton.transitions.forEach((targetsMap, src) => targetsMap.forEach((targets, sym) => targets.forEach(t => 
    result.addTransition(mapping.get(src)!, sym, mapping.get(t)!))));
  return result;
}
