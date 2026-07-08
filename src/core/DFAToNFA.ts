import { Automaton } from './ClosureOperations';

export function dfaToNfa(dfa: Automaton): Automaton {
  return dfa.clone();
}
