import { Automaton, EPSILON, type State } from './ClosureOperations';

export function epsilonClosure(automaton: Automaton, states: Set<State>): Set<State> {
  const closure = new Set<State>(states), stack = Array.from(states);
  while (stack.length > 0) {
    const current = stack.pop()!;
    automaton.transitions.get(current)?.get(EPSILON)?.forEach(next => {
      if (!closure.has(next)) { closure.add(next); stack.push(next); }
    });
  }
  return closure;
}
