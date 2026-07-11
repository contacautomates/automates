import { Automaton } from './ClosureOperations';

type ASTNode =
    | { type: 'symbol', symbol: string, position: number, nullable: boolean, firstpos: Set<number>, lastpos: Set<number> }
    | { type: 'concat', left: ASTNode, right: ASTNode, nullable: boolean, firstpos: Set<number>, lastpos: Set<number> }
    | { type: 'union', left: ASTNode, right: ASTNode, nullable: boolean, firstpos: Set<number>, lastpos: Set<number> }
    | { type: 'star', child: ASTNode, nullable: boolean, firstpos: Set<number>, lastpos: Set<number> }
    | { type: 'epsilon', nullable: true, firstpos: Set<number>, lastpos: Set<number> };

export function buildGloushkov(regex: string): Automaton {
    const automaton = new Automaton();
    if (!regex || regex.trim() === '') return automaton;

    let posCounter = 1;
    const positionsMap = new Map<number, string>();
    const followpos = new Map<number, Set<number>>();

    const formatted = insertExplicitConcatenation(regex);
    const postfix = toPostfix(formatted);

    const stack: ASTNode[] = [];
    for (const char of postfix) {
        if (char === '*') {
            const child = stack.pop()!;
            const node: ASTNode = {
                type: 'star', child,
                nullable: true,
                firstpos: new Set(child.firstpos),
                lastpos: new Set(child.lastpos)
            };
            for (const i of child.lastpos) {
                if (!followpos.has(i)) followpos.set(i, new Set());
                for (const j of child.firstpos) followpos.get(i)!.add(j);
            }
            stack.push(node);
        } else if (char === '.') {
            const right = stack.pop()!;
            const left = stack.pop()!;
            const nullable = left.nullable && right.nullable;
            const firstpos = new Set(left.firstpos);
            if (left.nullable) right.firstpos.forEach(p => firstpos.add(p));
            const lastpos = new Set(right.lastpos);
            if (right.nullable) left.lastpos.forEach(p => lastpos.add(p));
            
            const node: ASTNode = { type: 'concat', left, right, nullable, firstpos, lastpos };
            
            for (const i of left.lastpos) {
                if (!followpos.has(i)) followpos.set(i, new Set());
                for (const j of right.firstpos) followpos.get(i)!.add(j);
            }
            stack.push(node);
        } else if (char === '|' || char === '+') {
            const right = stack.pop()!;
            const left = stack.pop()!;
            const node: ASTNode = {
                type: 'union', left, right,
                nullable: left.nullable || right.nullable,
                firstpos: new Set([...left.firstpos, ...right.firstpos]),
                lastpos: new Set([...left.lastpos, ...right.lastpos])
            };
            stack.push(node);
        } else if (char === 'ε') {
            const node: ASTNode = {
                type: 'epsilon',
                nullable: true,
                firstpos: new Set(),
                lastpos: new Set()
            };
            stack.push(node);
        } else {
            const pos = posCounter++;
            positionsMap.set(pos, char);
            const node: ASTNode = {
                type: 'symbol', symbol: char, position: pos,
                nullable: false,
                firstpos: new Set([pos]),
                lastpos: new Set([pos])
            };
            stack.push(node);
        }
    }

    const root = stack[0];
    if (!root) return automaton;

    const startState = "q0";
    automaton.addState(startState, true, root.nullable);

    for (const [pos, sym] of positionsMap.entries()) {
        const stateName = `q${pos}`;
        const isFinal = root.lastpos.has(pos);
        automaton.addState(stateName, false, isFinal);
    }

    for (const p of root.firstpos) {
        const targetState = `q${p}`;
        const sym = positionsMap.get(p)!;
        automaton.addTransition(startState, sym, targetState);
    }

    for (const [pos, sym] of positionsMap.entries()) {
        const sourceState = `q${pos}`;
        const follows = followpos.get(pos) || new Set();
        for (const targetPos of follows) {
            const targetState = `q${targetPos}`;
            const targetSym = positionsMap.get(targetPos)!;
            automaton.addTransition(sourceState, targetSym, targetState);
        }
    }

    return automaton;
}

function insertExplicitConcatenation(regex: string): string {
    let formatted = "";
    const isSymbol = (c: string) => !'()|*+.'.includes(c);
    const cleanRegex = regex.replace(/\s+/g, '');
    for (let i = 0; i < cleanRegex.length; i++) {
        formatted += cleanRegex[i];
        if (i + 1 < cleanRegex.length) {
            const c1 = cleanRegex[i], c2 = cleanRegex[i+1];
            if ((isSymbol(c1) || c1 === '*' || c1 === ')') && (isSymbol(c2) || c2 === '(')) {
                formatted += '.';
            }
        }
    }
    return formatted;
}

function toPostfix(formatted: string): string {
    let result = "", stack: string[] = [];
    const precedence = (op: string) => op === '*' ? 3 : (op === '.' ? 2 : (op === '|' || op === '+' ? 1 : 0));
    for (const char of formatted) {
        if (char === '(') stack.push(char);
        else if (char === ')') { 
            while (stack.length && stack[stack.length-1] !== '(') result += stack.pop(); 
            stack.pop(); 
        }
        else if ('*|.+'.includes(char)) { 
            while (stack.length && stack[stack.length-1] !== '(' && precedence(stack[stack.length-1]) >= precedence(char)) result += stack.pop(); 
            stack.push(char); 
        }
        else result += char;
    }
    while (stack.length) result += stack.pop();
    return result;
}
