# mars’up — Fiches orateurs

Présentation INSEEC Marseille · Business project · plan Klaxoon (Slides 0 à 4 + démo hors slide).
Durée cible : **9 à 10 minutes** (5 min de slides + 4 min de démo), puis questions.

| Moment | Qui | Durée |
|---|---|---|
| Slide 0 · Équipe et solution | Orateur 1 | 0:45 |
| Slide 1 · Problèmes terrain | Orateur 1 | 1:30 |
| Slide 2 · Persona + problématique | Orateur 1 | 1:00 |
| Slide 3 · Notre solution | Orateur 2 | 1:30 |
| Hors slide · Démo de l’appli | **Tahar** | 4:00 |
| Slide 4 · Retours terrain | Orateur 2 | 1:30 |

Lien de la démo : **https://marsup.vercel.app** (QR code sur la slide « Démo » et dans `qr-marsup.png`).
Deck : https://claude.ai/artifact/8YMN3JRUAY2cELuFn1wYKp

**Équipe** : Tahar Hajji, Jeanne Reversat, Mohamed Benai, Maeliss Manuelle, Darine Sahi, Abdou Salima Andjeli.
**Répartition** : Orateur 1 = [prénom], Orateur 2 = [prénom], démo = Tahar.

> Les éléments entre crochets `[…]` sont à remplacer par vos vraies données (prénoms, nombre d’entretiens, verbatims, chiffres de tests). Ne pas inventer de chiffres à l’oral.

---

## Fiche Orateur 1 — Ouverture, terrain, persona (≈ 3 min 15)

### Slide 0 · Équipe et solution (0:45)

**À dire**
> Bonjour à tous. Nous sommes Tahar, Jeanne, Mohamed, Maeliss, Darine et Salima, et nous vous présentons **mars’up**.
> mars’up, c’est une application sociale et sportive pour les étudiants et les jeunes adultes qui arrivent à Marseille : trouver une activité, un groupe et les personnes qui nous correspondent, en quelques minutes.
> Notre promesse tient en une phrase : **Bouge. Rencontre. Vis Marseille autrement.**
> On va vous raconter ce qu’on a vu sur le terrain, pour qui on a construit la solution, comment elle fonctionne, et ce que les premiers testeurs nous ont dit. Tahar vous fera ensuite une démonstration en direct.

**Points clés** : nom + promesse en une phrase, annoncer le plan, annoncer la démo.

### Slide 1 · Les problèmes rencontrés sur le terrain (1:30)

**À dire**
> Avant de construire quoi que ce soit, on est allés sur le terrain : [n] entretiens avec des étudiants et des jeunes actifs, sur les campus, au Prado et sur les terrains en accès libre. Quatre problèmes reviennent tout le temps.
> **Un, arriver seul.** Quand on débarque, on connaît sa promo et c’est tout. Rencontrer des gens en dehors, c’est le hasard.
> **Deux, trouver des partenaires de sport.** Les gens veulent courir, jouer au beach-volley, au basket, mais ne trouvent personne au bon niveau et au bon créneau. L’info est dispersée dans des groupes WhatsApp et Facebook jamais à jour.
> **Trois, la méfiance.** Les applis existantes sont perçues comme des applis de rencontre déguisées, avec des faux profils. Les jeunes femmes nous l’ont dit clairement : sans vérification, elles ne rejoignent pas un inconnu.
> **Quatre, une offre invisible.** Marseille a tout, playgrounds, plages, calanques, événements gratuits, mais rien n’est centralisé ni pensé pour quelqu’un qui vient d’arriver.
> [Citer ici un verbatim marquant d’un entretien.]

**Points clés** : 4 problèmes, dans cet ordre, un mot-clé chacun : *seul · niveau/créneau · méfiance · invisible*.

### Slide 2 · Persona et problématique (1:00)

**À dire**
> Pour rendre tout ça concret, voici **Lola**. 25 ans, parisienne, étudiante à Marseille, en résidence étudiante. Elle vit seule et ne connaît personne ici.
> Elle est timide, sort peu en dehors des cours, et elle a laissé tomber le handball, sa passion à Paris. Son emploi du temps est chargé, les activités sont loin, et elle ne sait pas où chercher.
> Sa phrase : **« J’aime bien quand les choses se font naturellement. »**
> Notre problématique : **comment aider Lola à reprendre le sport et à rencontrer des gens à Marseille, sans avoir à faire le premier pas seule ?**
> Trois exigences : au bon niveau, au bon créneau, en confiance.
> Je passe la parole à [Orateur 2] pour la solution.

**Transition** : regarder Orateur 2, lui tendre la télécommande.

### Questions probables pour Orateur 1
- *Combien d’entretiens ?* → [n], réalisés [où/quand], profils [âges/écoles].
- *Pourquoi Marseille ?* → ville étudiante en forte croissance, offre sportive de plein air unique, communauté très dispersée ; c’est aussi là qu’on a pu tester.
- *En quoi est-ce différent de Meetup ou des groupes Facebook ?* → vérification d’identité, matching par niveau et créneau, chat ouvert automatiquement ; Meetup n’est ni local ni sportif ni vérifié.

---

## Fiche Orateur 2 — Solution, passage de relais, retours (≈ 3 min)

### Slide 3 · Notre solution (1:30)

**À dire**
> Notre réponse, c’est mars’up, en trois étapes.
> **Étape un, le profil.** Lola renseigne ses sports, son niveau dans chacun, son quartier, ses créneaux, ses centres d’intérêt. Et elle **vérifie son identité** : pièce d’identité plus selfie, via un prestataire spécialisé. mars’up ne stocke aucun document, uniquement le statut « vérifié ». C’est notre réponse à la méfiance.
> **Étape deux, le matching.** L’app lui propose des personnes, des activités, des groupes et des événements selon la distance, le niveau, les disponibilités, l’âge et les intérêts. **C’est du matching sportif, pas une appli de rencontre** : chaque proposition explique pourquoi elle correspond.
> **Étape trois, l’activité.** Un tap pour rejoindre le hand loisir du jeudi ou le Sunset Run à Borély, le chat du groupe s’ouvre, on se met d’accord sur le rendez-vous, et on se retrouve. Autour : la carte de Marseille, les événements mars’up et partenaires, l’IA mars’up qui répond à « je suis libre mardi soir, je fais quoi ? », et un espace administrateur pour la modération.
> Tout ça existe en prototype fonctionnel : Tahar vous le montre en direct.

**Transition** : passer à la slide « Démo » (QR code) et laisser l’écran dessus pendant toute la démo.

### Pendant la démo (4:00)
Rester visible, ne pas parler. Si la connexion lâche : les trois captures de la slide 3 servent de secours, et le deck contient le QR code pour que le jury teste lui-même.

### Slide 4 · Retours terrain principaux (1:30)

**À dire**
> On a fait tester le prototype à [n] personnes, [où/quand]. Trois enseignements.
> **Ce qui a convaincu** : le badge « Profil vérifié », qui lève le frein principal, surtout chez les jeunes femmes. Le niveau et les créneaux visibles partout. Le chat de groupe ouvert dès l’inscription. Et la carte des terrains en accès libre.
> **Ce qui a interrogé** : le swipe, qui fait penser à une appli de rencontre. « Et si personne ne vient ? ». La peur de partager sa localisation. Et le démarrage : comment avoir des activités dès le premier jour ?
> **Ce qu’on en a fait** : chaque proposition affiche pourquoi elle correspond, avec la mention « sport et rencontres sociales uniquement ». Chaque activité a un organisateur vérifié et un rappel deux heures avant. La localisation est approximative par défaut. Et pour lancer la communauté, mars’up crée elle-même les premiers événements avec des partenaires : Run Club du mercredi, Beach Day aux Catalans, tournoi 3x3 au Prado.
> Merci pour votre attention, on est disponibles pour vos questions.

### Questions probables pour Orateur 2
- *Modèle économique ?* → gratuit pour les membres ; revenus via événements partenaires (salles, clubs, marques sport), places payantes sur certains événements, offre « ville / campus » pour les écoles.
- *RGPD et vérification ?* → prestataire certifié (type Ubble / Onfido), documents supprimés sous 24 h côté prestataire, mars’up ne conserve que le statut ; consentements, export et suppression dans l’app.
- *Comment éviter la dérive « appli de drague » ?* → positionnement explicite, matching centré activité, signalement en deux taps, modération humaine sous 24 h, suspension des comptes.
- *Et si l’activité n’a pas assez de monde ?* → organisateur vérifié, liste d’attente, rappel, et événements mars’up garantis au lancement.

---

## Fiche Démo — Tahar (≈ 4 min)

**Préparation** : ouvrir https://marsup.vercel.app sur ton téléphone **avant** la présentation, mode avion désactivé, luminosité au max. Option : partager l’écran du téléphone, ou faire la démo sur l’ordinateur en version mobile (fenêtre étroite). Garder la slide « Démo » (QR code) affichée au vidéoprojecteur.

**Phrase d’ouverture**
> Tout ce que [Orateur 2] vient de décrire existe. Je prends le téléphone de Lola.

**Parcours (dans cet ordre)**

1. **Inscription + vérification (1:00)** — Landing app → « Créer mon profil ». Faire défiler : étape sports + niveau, étape disponibilités (montrer la grille), étape préférences. « Vérifier mon identité » → pièce d’identité → selfie → badge « Profil vérifié ».
   > Aucun document ne passe par nos serveurs : seul le statut « vérifié » est conservé.
2. **Matching (0:50)** — « Entrer dans mars’up » → Accueil « Salut Lola ». Onglet **Découvrir** : carte de Yanis, score 92 %, les raisons (1,8 km, même niveau, dispo mardi soir). Swiper à droite → « C’est un match sportif ».
   > Pas de rencontre amoureuse : on matche sur un sport, un niveau, un créneau.
3. **Activité + chat (0:50)** — Onglet **Activités** → « Sunset Run » → « Rejoindre l’activité » → « Ouvrir le chat ». Taper « On se retrouve à 18h15 ? », montrer la réponse.
4. **Carte + IA (0:40)** — Icône carte : toucher le marqueur **Parc Borély**, les activités du lieu apparaissent. Depuis l’accueil, carte **IA mars’up** : taper « je suis libre mardi soir » → trois propositions avec bouton Rejoindre.
5. **Sécurité + admin (0:40)** — Profil → roue crantée : visibilité, localisation approximative, export et suppression des données. Sur l’ordinateur : section **Espace administration** en bas de la page : valider une vérification, traiter un signalement, envoyer une notification.

**Phrase de clôture**
> Tout est en ligne sur marsup.vercel.app : scannez le QR code, c’est à vous.

**Si ça plante** : recharger la page ; sinon s’appuyer sur les captures de la slide 3 et décrire le parcours. Le prototype est aussi disponible hors connexion dans `index.html` du dépôt GitHub.

**Astuces** : parler en décrivant ce que tu tapes (« je rejoins le Sunset Run ») ; ne jamais s’excuser pour un détail visuel ; laisser 2 secondes sur chaque écran-clé (badge vérifié, match, chat).
