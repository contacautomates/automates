/**
 * Résolution directe d'un système d'équations de Arden par élimination algébrique.
 * Lemme d'Arden : X = AX + B  ⟹  X = A*B
 *
 * CRITIQUE: le split est fait sur les + de TOP NIVEAU uniquement (pas dans les parenthèses)
 */

type Coeff = string | null; // null = ∅, '' = ε

// ── Utilitaires symboliques ──────────────────────────────────────────────────

/** Split RHS par '+' en respectant les parenthèses. */
function splitTopLevel(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const c of s) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === '+' && depth === 0) {
      const t = current.trim();
      if (t) parts.push(t);
      current = '';
    } else {
      current += c;
    }
  }
  const t = current.trim();
  if (t) parts.push(t);
  return parts;
}

/** Vérifie si l'expression est atomique pour l'étoile (ne nécessite pas de parens). */
function isAtomicForStar(s: string): boolean {
  if (s.length === 1) return true;
  if (s[0] === '(' && s[s.length - 1] === ')') {
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++;
      if (s[i] === ')') depth--;
      if (depth === 0 && i < s.length - 1) return false;
    }
    return true;
  }
  return false;
}

/** Vérifie si l'expression a un '+' au niveau top (nécessite parens pour concat). */
function hasTopLevelUnion(s: string): boolean {
  let depth = 0;
  for (const c of s) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === '+' && depth === 0) return true;
  }
  return false;
}

function concat(a: Coeff, b: Coeff): Coeff {
  if (a === null || b === null) return null;
  if (a === '') return b;
  if (b === '') return a;
  const pa = hasTopLevelUnion(a) ? `(${a})` : a;
  const pb = hasTopLevelUnion(b) ? `(${b})` : b;
  return pa + pb;
}

function star(a: Coeff): string {
  if (a === null || a === '') return '';
  return isAtomicForStar(a) ? `${a}*` : `(${a})*`;
}

function union(a: Coeff, b: Coeff): Coeff {
  if (a === null) return b;
  if (b === null) return a;
  if (a === b)    return a;
  return `${a}+${b}`;
}

// ── Parser d'une ligne ───────────────────────────────────────────────────────

/**
 * Extrait le coefficient de `v` dans `term` (ex: "(a+b) L1" → "(a+b)").
 * Retourne null si v n'apparaît pas dans term.
 */
function extractCoeffFor(term: string, v: string): Coeff | undefined {
  // Cas: le terme est exactement la variable seule → ε·v
  if (term === v) return '';

  // Cas: le terme se termine par " v" → le préfixe est le coefficient
  const suffix = ' ' + v;
  if (term.endsWith(suffix)) {
    const coeff = term.slice(0, term.length - suffix.length).trim();
    return coeff === '' ? '' : coeff;
  }

  return undefined; // terme non lié à v
}

function parseLine(
  line: string,
  varNames: string[]
): { lhs: string; coeffs: Map<string, Coeff>; constant: Coeff } {
  const eqIdx = line.indexOf('=');
  const lhs = line.slice(0, eqIdx).trim();
  const rhs = line.slice(eqIdx + 1).trim();

  const terms = splitTopLevel(rhs);
  const coeffs = new Map<string, Coeff>();
  let constant: Coeff = null;

  for (const term of terms) {
    // ε constant
    if (term === 'ε' || term === 'eps' || term === '1') {
      constant = union(constant, '');
      continue;
    }

    let matched = false;
    for (const v of varNames) {
      const coeff = extractCoeffFor(term, v);
      if (coeff !== undefined) {
        coeffs.set(v, union(coeffs.get(v) ?? null, coeff));
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Terme constant pur (symbole ou expression constante)
      constant = union(constant, term);
    }
  }

  return { lhs, coeffs, constant };
}

// ── Résolution principale ────────────────────────────────────────────────────

export function solveEquationSystem(text: string): string {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && l.includes('='));

  if (lines.length === 0) return '';

  const varNames = lines.map(l => l.slice(0, l.indexOf('=')).trim());
  const n = varNames.length;

  const matrix: Array<Map<string, Coeff>> = [];
  const constants: Coeff[] = [];

  for (const line of lines) {
    const { coeffs, constant } = parseLine(line, varNames);
    matrix.push(coeffs);
    constants.push(constant);
  }

  // Élimination de la DERNIÈRE variable vers la PREMIÈRE (backward)
  // Cela produit le résultat compact factorisé.
  for (let i = n - 1; i >= 0; i--) {
    const vi = varNames[i];

    // Appliquer Arden : éliminer la boucle propre de Li
    const selfCoeff = matrix[i].get(vi) ?? null;
    const aStar = star(selfCoeff);
    matrix[i].delete(vi);

    for (const [vj, cij] of matrix[i]) {
      matrix[i].set(vj, concat(aStar, cij));
    }
    constants[i] = concat(aStar, constants[i]);

    // Substituer Li dans toutes les autres équations
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const cki = matrix[k].get(vi) ?? null;
      if (cki === null) continue;
      matrix[k].delete(vi);

      for (const [vj, cij] of matrix[i]) {
        matrix[k].set(vj, union(matrix[k].get(vj) ?? null, concat(cki, cij)));
      }
      constants[k] = union(constants[k], concat(cki, constants[i]));
    }
  }

  const result = constants[0];
  return result === null ? '∅' : result === '' ? 'ε' : result;
}
