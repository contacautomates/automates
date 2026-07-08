import { Automaton, EPSILON } from './ClosureOperations';
import { epsilonClosure } from './EpsilonClosure';

export function removeEpsilons(automaton: Automaton): Automaton {
  const result = new Automaton();
  automaton.states.forEach(s => result.addState(s, automaton.initialStates.has(s), false));
  automaton.states.forEach(src => {
    const closure = epsilonClosure(automaton, new Set([src]));
    let isFinal = false; closure.forEach(c => { if (automaton.finalStates.has(c)) isFinal = true; });
    if (isFinal) result.finalStates.add(src);
    closure.forEach(c => automaton.transitions.get(c)?.forEach((targets, sym) => {
      if (sym !== EPSILON) targets.forEach(t => result.addTransition(src, sym, t));
    }));
  });
  return result;
}

export function nfaToEnfa(nfa: Automaton): Automaton { return nfa.clone(); }
