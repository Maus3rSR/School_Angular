# Seance 5 sur 5 - Formulaires reactifs et consolidation

## 1) Objectifs pedagogiques

- Introduire un formulaire reactif dans le contexte WishFlix.
- Ajouter une recherche de films avec validation simple.
- Structurer le code pour rester maintenable apres 5 seances.
- Faire une recapitulation finale de la progression complete.

## 2) Prerequis concrets

- Avoir termine la seance 4.
- Fichiers a ouvrir selon l'etat atteint:
  - composant de recherche (a creer ou enrichir),
  - service catalogue,
  - template de la home.

## 3) Explication theorique vulgarisee (contexte mini Netflix)

Un formulaire reactif, c'est une facon robuste de gerer des champs utilisateur.
Dans WishFlix, il sert a filtrer rapidement le catalogue avec des regles claires (ex: longueur minimale).

L'objectif n'est pas de faire "beaucoup de champs", mais de bien relier:
- valeur saisie,
- validation,
- resultat visible dans l'interface.

## 4) Lien avec le code du projet

- Ajouter un controle de recherche relie a la liste affichee.
- Afficher un message d'aide si la saisie est trop courte.
- Reutiliser la logique de filtre deja presente pour ne pas dupliquer.

Extrait court autorise:
- `rechercheCtrl = new FormControl('', { nonNullable: true });`

## 5) Etapes de la demo formateur (recette)

### Demo A - Ajouter le controle de recherche

1. Creer le controle reactif.
2. Le connecter au champ dans le template.
3. Afficher la valeur de debug temporairement pour verifier.

### Demo B - Ajouter la validation minimale

1. Definir une regle simple (ex: 2 caracteres min).
2. Afficher un feedback utilisateur clair.
3. Verifier l'accessibilite du message.

### Demo C - Relier recherche et catalogue

1. Integrer la recherche dans l'etat derive des films visibles.
2. Tester plusieurs cas (vide, court, mot pertinent).
3. Nettoyer le code et supprimer le debug.

## 6) Enonce de l'exercice etudiant (version 2)

Objectif: enrichir la recherche avec un filtre par note minimale.

Contraintes:
- Utiliser Reactive Forms.
- Conserver un affichage simple et comprehensible.
- Eviter les calculs complexes directement dans le template.

Resultat attendu:
- on peut combiner recherche texte + note minimale,
- les films visibles se mettent a jour correctement,
- les validations restent lisibles.

## 7) Questions d'auto-evaluation

- Pourquoi prefere-t-on un formulaire reactif ici?
- Ou placer la logique de combinaison des filtres?
- Comment verifier que l'interface reste claire si aucun film ne correspond?

## 8) Pistes d'extension (bonus)

- Sauvegarder le dernier filtre applique dans le service.
- Ajouter un petit formulaire d'ajout de film (validation de base).
- Faire une retro globale: ce qui etait monolithique en seance 1 et ce qui est factorise en seance 5.
