import { Automaton } from './ClosureOperations';

export function dfaToEnfa(dfa: Automaton): Automaton {
  return dfa.clone();
}
