import { Automaton } from './ClosureOperations';
import { nfaToDfa } from './NFAToDFA';

export function enfaToDfa(enfa: Automaton): Automaton {
  return nfaToDfa(enfa);
}
