import { Automaton } from './ClosureOperations';

export function extractRegex(automaton: Automaton): string {
  const auto = automaton.clone();
  const qI = "qI_Start", qF = "qF_End";
  auto.addState(qI, true, false);
  auto.addState(qF, false, true);
  auto.initialStates.forEach(s => { if (s !== qI) auto.addTransition(qI, "ε", s); });
  auto.initialStates.clear(); auto.initialStates.add(qI);
  auto.finalStates.forEach(s => { if (s !== qF) auto.addTransition(s, "ε", qF); });
  auto.finalStates.clear(); auto.finalStates.add(qF);
  const eqMatrix = new Map<string, Map<string, string>>();
  auto.states.forEach(s => eqMatrix.set(s, new Map()));
  auto.transitions.forEach((targetsMap, src) => {
    targetsMap.forEach((targets, sym) => {
      targets.forEach(t => {
        const currentRegex = eqMatrix.get(src)!.get(t);
        const newRegex = sym === 'ε' ? '' : sym;
        if (currentRegex) {
          if (newRegex === '') eqMatrix.get(src)!.set(t, currentRegex + '|ε');
          else eqMatrix.get(src)!.set(t, `${currentRegex}|${newRegex}`);
        } else eqMatrix.get(src)!.set(t, newRegex === '' ? 'ε' : newRegex);
      });
    });
  });
  const statesToRemove = Array.from(auto.states).filter(s => s !== qI && s !== qF);
  for (const qi of statesToRemove) {
    const e_ii = eqMatrix.get(qi)?.get(qi) || null;
    const starEii = e_ii ? (e_ii.length > 1 ? `(${e_ii})*` : `${e_ii}*`) : '';
    const incoming: string[] = [];
    auto.states.forEach(qj => { if (qj !== qi && eqMatrix.get(qj)?.has(qi)) incoming.push(qj); });
    const outgoing = Array.from(eqMatrix.get(qi)?.keys() || []).filter(qk => qk !== qi);
    for (const qj of incoming) {
      for (const qk of outgoing) {
        const e_ji = eqMatrix.get(qj)!.get(qi)!, e_ik = eqMatrix.get(qi)!.get(qk)!;
        let path = (e_ji === 'ε' ? '' : e_ji) + (starEii === 'ε*' ? '' : starEii) + (e_ik === 'ε' ? '' : e_ik);
        if (path === '') path = 'ε';
        const e_jk = eqMatrix.get(qj)!.get(qk);
        eqMatrix.get(qj)!.set(qk, e_jk ? `(${e_jk})|(${path})` : path);
      }
    }
    eqMatrix.delete(qi); eqMatrix.forEach(targets => targets.delete(qi));
  }
  return eqMatrix.get(qI)?.get(qF) || '∅';
}
