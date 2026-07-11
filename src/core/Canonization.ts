import { Automaton, type State } from './ClosureOperations';

export function canonize(dfa: Automaton): Automaton {
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
  const stateMapping = new Map<Set<State>, string>();
  partitions.forEach((group) => {
    const statesList = Array.from(group).sort().join(',');
    stateMapping.set(group, `{${statesList}}`);
  });

  const result = new Automaton();
  const getPName = (s: State) => {
    const p = partitions.find(p => p.has(s));
    return p ? stateMapping.get(p)! : s;
  };

  partitions.forEach(group => { 
    const pName = stateMapping.get(group)!;
    const isInit = Array.from(group).some(s => dfa.initialStates.has(s));
    const isFin = Array.from(group).some(s => dfa.finalStates.has(s));
    result.addState(pName, isInit, isFin); 
  });

  partitions.forEach(group => { 
    const rep = Array.from(group)[0]; 
    const pName = stateMapping.get(group)!;
    dfa.alphabet.forEach(sym => {
      const target = Array.from(dfa.transitions.get(rep)?.get(sym) || [])[0];
      if (target) result.addTransition(pName, sym, getPName(target));
    }); 
  });
  return result;
}
