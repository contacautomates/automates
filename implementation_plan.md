# Plan d'implémentation : Application Web "Les Automates" (TP3 INF342)

## 1. Structure du Site (16 Pages)

Chaque page sera dédiée à une fonctionnalité spécifique pour respecter la consigne "exactement 16 pages".

| Page # | Titre | Fonctionnalité | Statut Core |
| :--- | :--- | :--- | :--- |
| 1 | **Résolution d'Équations** | Systèmes d'équations (Arden) $\rightarrow$ Regex | `EquationParser.ts` |
| 2 | **Conversion AFN $\rightarrow$ AFD** | Déterminisation par sous-ensembles | `Operations.ts` |
| 3 | **Extraction de Regex** | Automate $\rightarrow$ Expression Régulière | `Extractor.ts` |
| 4 | **Complétion d'Automate** | AFD $\rightarrow$ AFDC (Ajout état puits) | `Operations.ts` |
| 5 | **Analyse des États** | Identification (Accessibles, Co-acc, Utiles) | À implémenter |
| 6 | **Émondage** | Suppression des états non-utiles | `Operations.ts` |
| 7 | **Conversion AFD $\rightarrow$ AFN** | Conversion structurelle simple | `Operations.ts` |
| 8 | **Gestion des $\epsilon$-transitions** | NFA $\leftrightarrow$ $\epsilon$-NFA | `ClosureOperations.ts` |
| 9 | **$\epsilon$-Fermeture** | Calcul des fermetures pour chaque état | `ClosureOperations.ts` |
| 10 | **$\epsilon$-AFN $\rightarrow$ AFD** | Conversion directe en automate déterministe | `Operations.ts` |
| 11 | **AFD $\rightarrow$ $\epsilon$-AFN** | Ajout optionnel de transitions vides | `Operations.ts` |
| 12 | **Construction de Thompson** | Regex $\rightarrow$ $\epsilon$-AFN (Pure) | `Thompson.ts` |
| 13 | **Minimisation** | Algorithme de Moore / Hopcroft | `Moore.ts` |
| 14 | **Algorithme de Gloushkov** | Regex $\rightarrow$ AFN (sans $\epsilon$) | À implémenter |
| 15 | **Canonisation** | Renommage des états en $q_0, q_1, \dots$ | `ClosureOperations.ts` |
| 16 | **Opérations de Clôture** | Union, Inter., Complément, Concat., Etoile | `ClosureOperations.ts` |

## 2. Design & Esthétique

*   **Palette de Couleurs** : Dark mode premium (Deep Slate #0f172a / Indigo #6366f1 / Emerald #10b981).
*   **Composants** :
    *   `Sidebar` : Navigation latérale structurée avec les 16 liens.
    *   `AutomatonCanvas` : Visualisation interactive via `reactflow`.
    *   `ControlPanel` : Interface de saisie (Regex, États, Transitions).
    *   `ResultPanel` : Affichage des résultats (Regex, Tables de transitions).
*   **Animations** : Transitions de pages fluides (Framer Motion), micro-interactions sur les boutons.

## 3. Architecture Technique

*   **Frontend** : React 19, Vite, TypeScript.
*   **Visualisation** : React Flow + Dagre pour le layout automatique.
*   **Routing** : Redéfinition du système de navigation pour gérer les 16 vues.

## 4. Prochaines Étapes Immédiates

1.  **Installer les dépendances** : `react-router-dom`, `framer-motion`, `lucide-react`.
2.  **Mettre à jour le Core** : Implémenter Gloushkov et l'analyse fine des états.
3.  **Refactoriser `App.tsx`** : Intégrer un routeur et une sidebar complète.
4.  **Générer les 16 Pages** : Création systématique des composants de page.
