# NassRiviera.com — Landing Page Design

## Overview

Site vitrine personnel pour Nass, créateur de contenu et entrepreneur. Site Astro hébergé sur Vercel, avec sous-domaine formation redirigé vers Systeme.io.

## Stack & Hébergement

- **Stack** : Astro + HTML/CSS/JS
- **Hébergement** : Vercel (nassriviera.com) + Systeme.io (formation.nassriviera.com)
- **Responsive** : Mobile first

## Palette

- Fond sombre (dark)
- Cyan (~#00D4FF) — accent principal
- Orange (~#FF6B00) — CTA / accent secondaire

## Pages

### Landing page (`index.astro`)

**Hero :**
- Photo background (plein/demi écran)
- Nom / slogan
- Sous-titre (créateur + entrepreneur)
- 1 CTA orange "Formation gratuite" → ouvre popup

**Section "Qui suis-je" (`#qui-suis-je`) :**
- Photo + texte de présentation court
- Mobile : photo au-dessus, texte en dessous
- Desktop : photo à côté du texte

### Page Contact (`contact.astro`)

- Titre "Me contacter"
- Liens directs : email, réseaux sociaux
- Pas de formulaire (simple, sans backend)

## Navbar

- **Mobile** : hamburger menu
- **Desktop** : navbar horizontale fixe
- **Liens** : Accueil, Qui suis-je (ancre #qui-suis-je), Contact (/contact), Formation gratuite (popup)

## Popup "Formation gratuite"

- Overlay sombre semi-transparent
- Modale centrée :
  - Titre accrocheur
  - 2-3 lignes de teaser / bénéfices
  - Bouton orange "J'y accède" → formation.nassriviera.com
  - Bouton fermer (croix)
- Contenu à affiner plus tard

## Footer

- Liens réseaux sociaux (YouTube, Instagram, TikTok, X, LinkedIn)
- Liens vers produits / formations
