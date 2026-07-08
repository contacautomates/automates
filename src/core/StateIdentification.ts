import { Automaton, type State } from './ClosureOperations';

export function getReachableStates(automaton: Automaton): Set<State> {
  const reachable = new Set<State>(automaton.initialStates);
  const stack = Array.from(automaton.initialStates);
  while (stack.length > 0) {
    const current = stack.pop()!;
    const trans = automaton.transitions.get(current);
    if (trans) trans.forEach(targets => targets.forEach(target => {
      if (!reachable.has(target)) { reachable.add(target); stack.push(target); }
    }));
  }
  return reachable;
}

export function getCoReachableStates(automaton: Automaton): Set<State> {
  const reverseTransitions = new Map<State, Set<State>>();
  automaton.states.forEach(s => reverseTransitions.set(s, new Set()));
  automaton.transitions.forEach((targetsMap, src) => targetsMap.forEach(targets => 
    targets.forEach(target => reverseTransitions.get(target)!.add(src))));
  const coreachable = new Set<State>(automaton.finalStates);
  const stack = Array.from(automaton.finalStates);
  while (stack.length > 0) {
    const current = stack.pop()!;
    reverseTransitions.get(current)!.forEach(prev => {
      if (!coreachable.has(prev)) { coreachable.add(prev); stack.push(prev); }
    });
  }
  return coreachable;
}

export function getUsefulStates(automaton: Automaton): Set<State> {
  const reachable = getReachableStates(automaton), coreachable = getCoReachableStates(automaton);
  return new Set([...reachable].filter(x => coreachable.has(x)));
}
