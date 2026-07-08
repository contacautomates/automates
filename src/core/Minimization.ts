import { Automaton, type State } from './ClosureOperations';

export function minimizeDFA(dfa: Automaton): Automaton {
  if (dfa.states.size === 0) return dfa;
  let partitions: Set<State>[] = [new Set(Array.from(dfa.states).filter(s => !dfa.finalStates.has(s))), new Set(dfa.finalStates)].filter(p => p.size > 0);
  let changed = true;
  while (changed) {
    changed = false; const nextPartitions: Set<State>[] = [];
    for (const group of partitions) {
      if (group.size <= 1) { nextPartitions.push(group); continue; }
      const subGroups: Map<string, Set<State>> = new Map();
      for (const state of group) {
        let signature = "";
        dfa.alphabet.forEach(sym => {
          const target = Array.from(dfa.transitions.get(state)?.get(sym) || [])[0];
          signature += `${sym}:${partitions.findIndex(p => p.has(target))},`;
        });
        if (!subGroups.has(signature)) subGroups.set(signature, new Set());
        subGroups.get(signature)!.add(state);
      }
      if (subGroups.size > 1) changed = true;
      subGroups.forEach(sg => nextPartitions.push(sg));
    }
    partitions = nextPartitions;
  }
  const result = new Automaton(), getRep = (s: State) => Array.from(partitions.find(p => p.has(s)) || [])[0];
  partitions.forEach(group => { const rep = Array.from(group)[0]; result.addState(rep, Array.from(group).some(s => dfa.initialStates.has(s)), dfa.finalStates.has(rep)); });
  partitions.forEach(group => { const rep = Array.from(group)[0]; dfa.alphabet.forEach(sym => {
    const target = Array.from(dfa.transitions.get(rep)?.get(sym) || [])[0];
    if (target) result.addTransition(rep, sym, getRep(target));
  }); });
  return result;
}
