import { Automaton, EPSILON } from './ClosureOperations';

export function createBaseAutomaton(symbol: string): Automaton {
  const a = new Automaton();
  const q0 = "q" + Math.random().toString(36).substr(2, 5), q1 = "q" + Math.random().toString(36).substr(2, 5);
  a.addState(q0, true, false); a.addState(q1, false, true);
  a.addTransition(q0, symbol, q1);
  return a;
}

export function union(a: Automaton, b: Automaton): Automaton {
  const result = new Automaton(), start = "qS_" + Math.random().toString(36).substr(2, 5), end = "qE_" + Math.random().toString(36).substr(2, 5);
  result.addState(start, true, false); result.addState(end, false, true);
  [a, b].forEach(aut => {
    aut.states.forEach(s => result.states.add(s));
    aut.transitions.forEach((m, src) => result.transitions.set(src, m));
    aut.initialStates.forEach(i => result.addTransition(start, EPSILON, i));
    aut.finalStates.forEach(f => result.addTransition(f, EPSILON, end));
  });
  return result;
}

export function concatenate(a: Automaton, b: Automaton): Automaton {
  const result = a.clone(); b.states.forEach(s => result.states.add(s));
  b.transitions.forEach((m, src) => result.transitions.set(src, m));
  a.finalStates.forEach(f => b.initialStates.forEach(i => result.addTransition(f, EPSILON, i)));
  result.finalStates = new Set(b.finalStates);
  return result;
}

export function kleeneStar(a: Automaton): Automaton {
  const result = a.clone(), start = "qS_" + Math.random().toString(36).substr(2, 5), end = "qE_" + Math.random().toString(36).substr(2, 5);
  result.addState(start, true, false); result.addState(end, false, true);
  a.initialStates.forEach(i => result.addTransition(start, EPSILON, i));
  a.finalStates.forEach(f => { result.addTransition(f, EPSILON, end); a.initialStates.forEach(i => result.addTransition(f, EPSILON, i)); });
  result.addTransition(start, EPSILON, end);
  return result;
}

export function buildThompson(regex: string): Automaton {
  const postfix = toPostfix(regex);
  const stack: Automaton[] = [];
  for (const char of postfix) {
    if (char === '*') stack.push(kleeneStar(stack.pop()!));
    else if (char === '.' || char === ' ') { const b = stack.pop()!, a = stack.pop()!; stack.push(concatenate(a, b)); }
    else if (char === '|' || char === '+') { const b = stack.pop()!, a = stack.pop()!; stack.push(union(a, b)); }
    else stack.push(createBaseAutomaton(char));
  }
  return stack[0] || new Automaton();
}

function toPostfix(regex: string): string {
  let result = "", stack: string[] = [], formatted = "";
  const precedence = (op: string) => op === '*' ? 3 : (op === '.' ? 2 : 1);
  for (let i = 0; i < regex.length; i++) {
    formatted += regex[i];
    if (i + 1 < regex.length) {
      const c1 = regex[i], c2 = regex[i+1];
      if (/[a-z0-9\*\)]/.test(c1) && /[a-z0-9\(]/.test(c2) && !'|*+)'.includes(c2)) formatted += '.';
    }
  }
  for (const char of formatted) {
    if (char === '(') stack.push(char);
    else if (char === ')') { while (stack.length && stack[stack.length-1] !== '(') result += stack.pop(); stack.pop(); }
    else if ('*|.+'.includes(char)) { while (stack.length && precedence(stack[stack.length-1]) >= precedence(char)) result += stack.pop(); stack.push(char); }
    else result += char;
  }
  while (stack.length) result += stack.pop();
  return result;
}
