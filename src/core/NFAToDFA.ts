import { Automaton, type State } from './ClosureOperations';
import { epsilonClosure } from './EpsilonClosure';

export function nfaToDfa(nfa: Automaton): Automaton {
  const dfa = new Automaton();
  const getStateId = (statesSet: Set<State>) => Array.from(statesSet).sort().join(',');
  const initialClosure = epsilonClosure(nfa, nfa.initialStates);
  const initialDfaState = getStateId(initialClosure);
  dfa.addState(initialDfaState, true, Array.from(initialClosure).some(s => nfa.finalStates.has(s)));
  const unmarkedStates = [initialClosure];
  const dfaStatesMap = new Map<string, Set<State>>();
  dfaStatesMap.set(initialDfaState, initialClosure);
  while (unmarkedStates.length > 0) {
    const currentSet = unmarkedStates.shift()!;
    const currentId = getStateId(currentSet);
    nfa.alphabet.forEach(symbol => {
      let nextSet = new Set<State>();
      currentSet.forEach(state => {
        const trans = nfa.transitions.get(state)?.get(symbol);
        if (trans) trans.forEach(t => nextSet.add(t));
      });
      nextSet = epsilonClosure(nfa, nextSet);
      if (nextSet.size > 0) {
        const nextId = getStateId(nextSet);
        if (!dfaStatesMap.has(nextId)) {
          dfaStatesMap.set(nextId, nextSet);
          unmarkedStates.push(nextSet);
          dfa.addState(nextId, false, Array.from(nextSet).some(s => nfa.finalStates.has(s)));
        }
        dfa.addTransition(currentId, symbol, nextId);
      }
    });
  }
  return dfa;
}
