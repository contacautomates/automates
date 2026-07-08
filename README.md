# Les Automates

Bienvenue sur la plateforme **Les Automates** ! 
Il s'agit d'un outil pédagogique et interactif de conception, d'analyse et de manipulation d'automates finis (déterministes, non-déterministes, avec et sans epsilon-transitions).

**Projet Académique - Université de Yaoundé I**
Développé au sein du Département d'Informatique, Faculté des Sciences, en tant que projet d'excellence sur la Théorie des Langages et des Automates.

## Fonctionnalités

L'application propose une multitude d'outils via un menu latéral interactif :
- **Arden Solver** : Résolution de systèmes d'équations de langages rationnels.
- **AFN ➔ AFD** : Déterminisation d'un automate fini non-déterministe.
- **Complétion AFD** : Rendre un automate complètement défini.
- **Analyse États** : Identification des états accessibles, co-accessibles et utiles.
- **Émondage** : Suppression des états inutiles d'un automate.
- **AFD ➔ AFN & AFD ➔ epsilon-AFN** : Conversions diverses entre types d'automates.
- **Gestion epsilon & epsilon-Fermeture** : Analyse et élimination des transitions spontanées.
- **Thompson & Gloushkov** : Constructions algorithmiques classiques à partir d'expressions régulières.
- **Minimisation** : Algorithme de minimisation des états d'un automate déterministe.
- **Canonisation & Opérations** : Opérations de fermeture et transformations formelles.
- **Extraction Regex** : Extraction de l'expression régulière reconnaissant le langage de l'automate.

## Fonctionnalités Visuelles
- **Visualisation dynamique** propulsée par React Flow et Dagre pour un arrangement ordonné.
- **Transitions colorées** associées univoquement aux symboles de l'alphabet pour une lecture immédiate.
- **Regroupement des arêtes** pour prévenir le chevauchement et garder un affichage clair.
- **Menu adaptatif** : Menu repliable (pour les écrans larges) et tiroir (pour mobile).
- **Mode Sombre / Mode Clair**.

## Lancement en local

Assurez-vous d'avoir Node.js installé, puis lancez les commandes suivantes :

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev
```

L'application sera alors accessible sur `http://localhost:5173`.

## Crédits & Réalisation

Ce projet a été conçu et développé dans un cadre académique :

- **Conception & Code** : **N. NASAIRE** (Étudiant Licence 3 - Informatique, passionné par l'UI/UX et les solveurs mathématiques)
- **Superviseur Académique** : **Dr KOUAKAM E.** (Docteur en Informatique, Université de Yaoundé I, Spécialiste en Algorithmique Formelle)

© 2026 LES AUTOMATES - Tous droits réservés.
