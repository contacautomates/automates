import { Automaton } from './ClosureOperations';

interface LinearizedSymbol { symbol: string; position: number; }

export function buildGloushkov(regex: string): Automaton {
    const automaton = new Automaton(), positions: LinearizedSymbol[] = []; let pos = 1;
    for (const char of regex) if (/[a-z0-9]/.test(char)) positions.push({ symbol: char, position: pos++ });
    if (positions.length === 0) return automaton;
    const startState = "q0"; automaton.addState(startState, true, false);
    positions.forEach(p => automaton.addState(`q${p.position}`, false, false));
    positions.forEach((p, i) => {
        if (i === 0) automaton.addTransition(startState, p.symbol, `q${p.position}`);
        if (i < positions.length - 1) automaton.addTransition(`q${p.position}`, positions[i+1].symbol, `q${positions[i+1].position}`);
        else automaton.finalStates.add(`q${p.position}`);
    });
    return automaton;
}
