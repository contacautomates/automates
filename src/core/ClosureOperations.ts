export type State = string;
export type Symbol = string;
export const EPSILON: Symbol = "ε";

export class Automaton {
  public states: Set<State> = new Set();
  public alphabet: Set<Symbol> = new Set();
  public initialStates: Set<State> = new Set();
  public finalStates: Set<State> = new Set();
  public transitions: Map<State, Map<Symbol, Set<State>>> = new Map();

  public addState(state: State, isInitial: boolean = false, isFinal: boolean = false): void {
    this.states.add(state);
    if (!this.transitions.has(state)) this.transitions.set(state, new Map());
    if (isInitial) this.initialStates.add(state);
    if (isFinal) this.finalStates.add(state);
  }

  public addTransition(source: State, symbol: Symbol, target: State): void {
    if (!this.states.has(source)) this.addState(source);
    if (!this.states.has(target)) this.addState(target);
    if (symbol !== EPSILON) this.alphabet.add(symbol);
    const stateTransitions = this.transitions.get(source)!;
    if (!stateTransitions.has(symbol)) stateTransitions.set(symbol, new Set());
    stateTransitions.get(symbol)!.add(target);
  }

  public clone(): Automaton {
    const cloned = new Automaton();
    this.states.forEach(s => cloned.states.add(s));
    this.alphabet.forEach(a => cloned.alphabet.add(a));
    this.initialStates.forEach(i => cloned.initialStates.add(i));
    this.finalStates.forEach(f => cloned.finalStates.add(f));
    this.transitions.forEach((symbolsMap, sourceState) => {
      const clonedSymbolsMap = new Map<Symbol, Set<State>>();
      symbolsMap.forEach((targetStates, symbol) => clonedSymbolsMap.set(symbol, new Set(targetStates)));
      cloned.transitions.set(sourceState, clonedSymbolsMap);
    });
    return cloned;
  }
}

export function complementation(dfa: Automaton): Automaton {
  const result = dfa.clone();
  const newFinals = new Set<string>();
  result.states.forEach(state => { if (!result.finalStates.has(state)) newFinals.add(state); });
  result.finalStates = newFinals;
  return result;
}

export function unionRegex(a: Automaton, b: Automaton): Automaton {
  const result = new Automaton(), prefixA = "U1_", prefixB = "U2_";
  a.states.forEach(s => result.addState(prefixA + s)); b.states.forEach(s => result.addState(prefixB + s));
  a.transitions.forEach((targetsMap, src) => targetsMap.forEach((targets, sym) => targets.forEach(t => result.addTransition(prefixA + src, sym, prefixA + t))));
  b.transitions.forEach((targetsMap, src) => targetsMap.forEach((targets, sym) => targets.forEach(t => result.addTransition(prefixB + src, sym, prefixB + t))));
  const start = "U_Start"; result.addState(start, true, false);
  a.initialStates.forEach(i => result.addTransition(start, "ε", prefixA + i));
  b.initialStates.forEach(i => result.addTransition(start, "ε", prefixB + i));
  a.finalStates.forEach(f => result.addState(prefixA + f, false, true));
  b.finalStates.forEach(b_f => result.addState(prefixB + b_f, false, true));
  return result;
}

export function intersection(a: Automaton, b: Automaton): Automaton {
  const result = new Automaton(), stack: [string, string][] = [], stateId = (s1: string, s2: string) => `${s1},${s2}`;
  a.initialStates.forEach(iA => b.initialStates.forEach(iB => { const id = stateId(iA, iB); result.addState(id, true, a.finalStates.has(iA) && b.finalStates.has(iB)); stack.push([iA, iB]); }));
  const visited = new Set<string>(stack.map(s => stateId(s[0], s[1])));
  while (stack.length > 0) {
    const [qA, qB] = stack.pop()!, currentId = stateId(qA, qB), alphabet = new Set([...a.alphabet, ...b.alphabet]);
    alphabet.forEach(sym => {
      const targetsA = a.transitions.get(qA)?.get(sym) || new Set(), targetsB = b.transitions.get(qB)?.get(sym) || new Set();
      targetsA.forEach(tA => targetsB.forEach(tB => {
        const nextId = stateId(tA, tB);
        if (!visited.has(nextId)) { visited.add(nextId); result.addState(nextId, false, a.finalStates.has(tA) && b.finalStates.has(tB)); stack.push([tA, tB]); }
        result.addTransition(currentId, sym, nextId);
      }));
    });
  }
  return result;
}
