# NassRiviera Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first personal brand landing page for NassRiviera.com using Astro, with dark theme, cyan/orange accents, deployed on Vercel.

**Architecture:** Static Astro site with two pages (index + contact), a shared layout with navbar/footer, and a JS-driven popup modal. No backend, no database. CSS custom properties for theming. Mobile-first responsive design with a single breakpoint at 768px.

**Tech Stack:** Astro 5, vanilla CSS (custom properties), vanilla JS (popup + hamburger menu)

---

## File Structure

```
RivieraWebsite/
├── public/
│   └── images/           # Hero photo, profile photo, favicon
├── src/
│   ├── components/
│   │   ├── Navbar.astro       # Responsive navbar + hamburger
│   │   ├── Footer.astro       # Social links + product links
│   │   ├── Hero.astro         # Hero section with CTA
│   │   ├── AboutMe.astro      # "Qui suis-je" section
│   │   └── Popup.astro        # Formation gratuite modal
│   ├── layouts/
│   │   └── Layout.astro       # Base HTML layout (head, meta, navbar, footer, popup)
│   ├── pages/
│   │   ├── index.astro        # Landing page (Hero + AboutMe)
│   │   └── contact.astro      # Contact page
│   └── styles/
│       └── global.css         # CSS reset, custom properties, typography, utilities
├── astro.config.mjs
└── package.json
```

---

### Task 1: Project Setup — Init Astro + Git

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (auto-generated)
- Create: `src/pages/index.astro` (minimal placeholder)

- [ ] **Step 1: Initialize Astro project**

```bash
cd /c/Users/User/Desktop/RivieraWebsite
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
```

- [ ] **Step 2: Initialize git repo**

```bash
git init
git add -A
git commit -m "chore: init Astro project with minimal template"
```

- [ ] **Step 3: Verify dev server starts**

```bash
npx astro dev
```

Expected: Server starts on `localhost:4321`, shows minimal Astro page.

---

### Task 2: Global Styles + CSS Custom Properties

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with reset, custom properties, and typography**

```css
/* src/styles/global.css */

/* Reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --color-bg: #0a0a0a;
  --color-bg-card: #141414;
  --color-text: #f0f0f0;
  --color-text-muted: #a0a0a0;
  --color-cyan: #00d4ff;
  --color-orange: #ff6b00;
  --color-overlay: rgba(0, 0, 0, 0.7);

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 5rem;

  /* Breakpoint reference (used in media queries) */
  /* --bp-desktop: 768px */
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--color-cyan);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  color: inherit;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with theme custom properties and reset"
```

---

### Task 3: Base Layout

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create Layout.astro**

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Nass Riviera — Créateur de contenu & Entrepreneur" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 2: Update index.astro to use layout**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="Nass Riviera — Créateur & Entrepreneur">
  <main>
    <h1>NassRiviera.com</h1>
    <p>Coming soon...</p>
  </main>
</Layout>
```

- [ ] **Step 3: Verify in browser**

```bash
npx astro dev
```

Expected: Dark background, white Inter text, "NassRiviera.com" displayed.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add base Layout with global styles and Inter font"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `src/components/Navbar.astro`
- Modify: `src/layouts/Layout.astro` (add Navbar import)

- [ ] **Step 1: Create Navbar.astro**

```astro
---
// src/components/Navbar.astro
---

<nav class="navbar">
  <a href="/" class="navbar__logo">NassRiviera</a>

  <button class="navbar__toggle" aria-label="Menu" aria-expanded="false">
    <span class="navbar__hamburger"></span>
  </button>

  <ul class="navbar__menu">
    <li><a href="/">Accueil</a></li>
    <li><a href="/#qui-suis-je">Qui suis-je</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><button class="navbar__cta" data-open-popup>Formation gratuite</button></li>
  </ul>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    background-color: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(8px);
  }

  .navbar__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-cyan);
    text-decoration: none;
  }

  .navbar__toggle {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
  }

  .navbar__hamburger,
  .navbar__hamburger::before,
  .navbar__hamburger::after {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-text);
    transition: transform 0.3s, opacity 0.3s;
  }

  .navbar__hamburger {
    position: relative;
  }

  .navbar__hamburger::before,
  .navbar__hamburger::after {
    content: '';
    position: absolute;
    left: 0;
  }

  .navbar__hamburger::before {
    top: -7px;
  }

  .navbar__hamburger::after {
    top: 7px;
  }

  /* Hamburger open state */
  .navbar__toggle[aria-expanded='true'] .navbar__hamburger {
    background-color: transparent;
  }

  .navbar__toggle[aria-expanded='true'] .navbar__hamburger::before {
    top: 0;
    transform: rotate(45deg);
  }

  .navbar__toggle[aria-expanded='true'] .navbar__hamburger::after {
    top: 0;
    transform: rotate(-45deg);
  }

  .navbar__menu {
    display: none;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(10, 10, 10, 0.98);
    padding: var(--space-sm) 0;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .navbar__menu.is-open {
    display: flex;
  }

  .navbar__menu a {
    color: var(--color-text);
    font-weight: 600;
    padding: var(--space-xs) var(--space-sm);
  }

  .navbar__menu a:hover {
    color: var(--color-cyan);
    text-decoration: none;
  }

  .navbar__cta {
    background-color: var(--color-orange);
    color: white;
    font-weight: 700;
    padding: var(--space-xs) var(--space-md);
    border-radius: 6px;
    font-size: 0.95rem;
    transition: opacity 0.2s;
  }

  .navbar__cta:hover {
    opacity: 0.85;
  }

  /* Desktop */
  @media (min-width: 768px) {
    .navbar__toggle {
      display: none;
    }

    .navbar__menu {
      display: flex;
      position: static;
      flex-direction: row;
      background: none;
      padding: 0;
    }
  }
</style>

<script>
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('is-open');
  });

  // Close menu on link click (mobile)
  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
</script>
```

- [ ] **Step 2: Add Navbar to Layout.astro**

In `src/layouts/Layout.astro`, add `import Navbar from '../components/Navbar.astro';` in the frontmatter and `<Navbar />` right after the opening `<body>` tag. Add `padding-top: 60px;` to `body` in the global CSS to offset the fixed navbar.

- [ ] **Step 3: Verify on mobile and desktop**

```bash
npx astro dev
```

Expected: Mobile — hamburger toggles menu. Desktop (>768px) — horizontal navbar, no hamburger.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro src/layouts/Layout.astro src/styles/global.css
git commit -m "feat: add responsive Navbar with hamburger menu"
```

---

### Task 5: Hero Component

**Files:**
- Create: `src/components/Hero.astro`
- Create: `public/images/` (directory for placeholder)

- [ ] **Step 1: Create public/images directory and add a placeholder**

```bash
mkdir -p public/images
```

User will add their own hero photo later as `public/images/hero.jpg`.

- [ ] **Step 2: Create Hero.astro**

```astro
---
// src/components/Hero.astro
---

<section class="hero">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">Nass Riviera</h1>
    <p class="hero__subtitle">Créateur de contenu & Entrepreneur</p>
    <button class="hero__cta" data-open-popup>Formation gratuite</button>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/hero.jpg') center/cover no-repeat;
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.6),
      rgba(10, 10, 10, 0.9)
    );
  }

  .hero__content {
    position: relative;
    text-align: center;
    padding: var(--space-md);
    max-width: 600px;
  }

  .hero__title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 700;
    margin-bottom: var(--space-xs);
    background: linear-gradient(135deg, var(--color-cyan), var(--color-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero__subtitle {
    font-size: clamp(1rem, 3vw, 1.35rem);
    color: var(--color-text-muted);
    margin-bottom: var(--space-lg);
  }

  .hero__cta {
    background-color: var(--color-orange);
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .hero__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
  }
</style>
```

- [ ] **Step 3: Add Hero to index.astro**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="Nass Riviera — Créateur & Entrepreneur">
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 4: Verify in browser**

Expected: Full-viewport hero with dark gradient overlay, name in cyan gradient, subtitle muted, orange CTA button.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro public/images/
git commit -m "feat: add Hero section with CTA and background image support"
```

---

### Task 6: AboutMe Component

**Files:**
- Create: `src/components/AboutMe.astro`
- Modify: `src/pages/index.astro` (add AboutMe)

- [ ] **Step 1: Create AboutMe.astro**

```astro
---
// src/components/AboutMe.astro
---

<section class="about" id="qui-suis-je">
  <div class="about__container">
    <div class="about__image">
      <img src="/images/profile.jpg" alt="Nass Riviera" />
    </div>
    <div class="about__text">
      <h2 class="about__title">Qui suis-je ?</h2>
      <p class="about__description">
        <!-- User will customize this text -->
        Je suis Nass Riviera, créateur de contenu et entrepreneur.
        Je partage mon parcours et mes stratégies pour aider ceux qui veulent
        se lancer dans l'entrepreneuriat et la création de contenu.
      </p>
    </div>
  </div>
</section>

<style>
  .about {
    padding: var(--space-2xl) var(--space-md);
  }

  .about__container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }

  .about__image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--color-cyan);
    flex-shrink: 0;
  }

  .about__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about__title {
    font-size: 1.75rem;
    color: var(--color-cyan);
    margin-bottom: var(--space-sm);
  }

  .about__description {
    color: var(--color-text-muted);
    font-size: 1.05rem;
    line-height: 1.8;
  }

  /* Desktop */
  @media (min-width: 768px) {
    .about__container {
      flex-direction: row;
      text-align: left;
    }

    .about__image {
      width: 250px;
      height: 250px;
    }
  }
</style>
```

- [ ] **Step 2: Add AboutMe to index.astro**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import AboutMe from '../components/AboutMe.astro';
---

<Layout title="Nass Riviera — Créateur & Entrepreneur">
  <main>
    <Hero />
    <AboutMe />
  </main>
</Layout>
```

- [ ] **Step 3: Verify responsive behavior**

Expected: Mobile — photo centered above text. Desktop (>768px) — photo left, text right, side by side.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutMe.astro src/pages/index.astro
git commit -m "feat: add Qui suis-je section with responsive layout"
```

---

### Task 7: Popup Component

**Files:**
- Create: `src/components/Popup.astro`
- Modify: `src/layouts/Layout.astro` (add Popup import)

- [ ] **Step 1: Create Popup.astro**

```astro
---
// src/components/Popup.astro
---

<div class="popup" id="popup" aria-hidden="true">
  <div class="popup__overlay" data-close-popup></div>
  <div class="popup__modal">
    <button class="popup__close" data-close-popup aria-label="Fermer">&times;</button>
    <h2 class="popup__title">Accède à ma formation gratuite</h2>
    <p class="popup__text">
      Découvre les stratégies que j'utilise pour développer mon business
      et ma présence en ligne. Rejoins la communauté maintenant.
    </p>
    <a href="https://formation.nassriviera.com" target="_blank" rel="noopener" class="popup__cta">
      J'y accède
    </a>
  </div>
</div>

<style>
  .popup {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 200;
    align-items: center;
    justify-content: center;
  }

  .popup.is-open {
    display: flex;
  }

  .popup__overlay {
    position: absolute;
    inset: 0;
    background-color: var(--color-overlay);
  }

  .popup__modal {
    position: relative;
    background-color: var(--color-bg-card);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 12px;
    padding: var(--space-xl) var(--space-lg);
    max-width: 440px;
    width: calc(100% - var(--space-lg));
    text-align: center;
  }

  .popup__close {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    font-size: 1.5rem;
    color: var(--color-text-muted);
    transition: color 0.2s;
  }

  .popup__close:hover {
    color: var(--color-text);
  }

  .popup__title {
    font-size: 1.5rem;
    margin-bottom: var(--space-sm);
    color: var(--color-cyan);
  }

  .popup__text {
    color: var(--color-text-muted);
    margin-bottom: var(--space-lg);
    line-height: 1.7;
  }

  .popup__cta {
    display: inline-block;
    background-color: var(--color-orange);
    color: white;
    font-weight: 700;
    font-size: 1.05rem;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 8px;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .popup__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
    text-decoration: none;
  }
</style>

<script>
  const popup = document.getElementById('popup');

  // Open popup
  document.querySelectorAll('[data-open-popup]').forEach((btn) => {
    btn.addEventListener('click', () => {
      popup?.setAttribute('aria-hidden', 'false');
      popup?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close popup
  document.querySelectorAll('[data-close-popup]').forEach((btn) => {
    btn.addEventListener('click', () => {
      popup?.setAttribute('aria-hidden', 'true');
      popup?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup?.classList.contains('is-open')) {
      popup.setAttribute('aria-hidden', 'true');
      popup.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
</script>
```

- [ ] **Step 2: Add Popup to Layout.astro**

In `src/layouts/Layout.astro`, add `import Popup from '../components/Popup.astro';` in the frontmatter and `<Popup />` just before `</body>`.

- [ ] **Step 3: Verify popup behavior**

Expected: Click CTA (hero or navbar) → popup opens with overlay. Click overlay, X button, or Escape → popup closes. Body scroll locked when open.

- [ ] **Step 4: Commit**

```bash
git add src/components/Popup.astro src/layouts/Layout.astro
git commit -m "feat: add Formation gratuite popup modal"
```

---

### Task 8: Footer Component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/Layout.astro` (add Footer import)

- [ ] **Step 1: Create Footer.astro**

```astro
---
// src/components/Footer.astro
const socials = [
  { name: 'YouTube', url: '#', icon: '▶' },
  { name: 'Instagram', url: '#', icon: '📷' },
  { name: 'TikTok', url: '#', icon: '♪' },
  { name: 'X', url: '#', icon: '𝕏' },
  { name: 'LinkedIn', url: '#', icon: 'in' },
];
---

<footer class="footer">
  <div class="footer__container">
    <div class="footer__socials">
      {socials.map((s) => (
        <a href={s.url} target="_blank" rel="noopener" aria-label={s.name} class="footer__social-link">
          <span>{s.icon}</span>
        </a>
      ))}
    </div>
    <div class="footer__links">
      <a href="https://formation.nassriviera.com" target="_blank" rel="noopener">Formations</a>
    </div>
    <p class="footer__copy">&copy; {new Date().getFullYear()} Nass Riviera. Tous droits réservés.</p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--space-xl) var(--space-md);
    text-align: center;
  }

  .footer__container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: center;
  }

  .footer__socials {
    display: flex;
    gap: var(--space-sm);
  }

  .footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    color: var(--color-text);
    font-size: 1rem;
    transition: border-color 0.2s, color 0.2s;
    text-decoration: none;
  }

  .footer__social-link:hover {
    border-color: var(--color-cyan);
    color: var(--color-cyan);
    text-decoration: none;
  }

  .footer__links {
    display: flex;
    gap: var(--space-md);
  }

  .footer__links a {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .footer__links a:hover {
    color: var(--color-cyan);
  }

  .footer__copy {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }
</style>
```

- [ ] **Step 2: Add Footer to Layout.astro**

In `src/layouts/Layout.astro`, add `import Footer from '../components/Footer.astro';` in the frontmatter and `<Footer />` after `<slot />` and before `<Popup />`.

- [ ] **Step 3: Verify footer**

Expected: Centered social icons in circles, formation link, copyright. Icons highlight cyan on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/layouts/Layout.astro
git commit -m "feat: add Footer with social links"
```

---

### Task 9: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create contact.astro**

```astro
---
// src/pages/contact.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="Contact — Nass Riviera">
  <main class="contact">
    <div class="contact__container">
      <h1 class="contact__title">Me contacter</h1>
      <p class="contact__intro">
        Une question, une proposition ou juste envie d'échanger ? Retrouve-moi ici :
      </p>
      <ul class="contact__list">
        <li>
          <a href="mailto:contact@nassriviera.com">
            <span class="contact__label">Email</span>
            <span class="contact__value">contact@nassriviera.com</span>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/" target="_blank" rel="noopener">
            <span class="contact__label">Instagram</span>
            <span class="contact__value">@nassriviera</span>
          </a>
        </li>
        <li>
          <a href="https://youtube.com/" target="_blank" rel="noopener">
            <span class="contact__label">YouTube</span>
            <span class="contact__value">Nass Riviera</span>
          </a>
        </li>
      </ul>
    </div>
  </main>
</Layout>

<style>
  .contact {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xl) var(--space-md);
  }

  .contact__container {
    max-width: 600px;
    width: 100%;
  }

  .contact__title {
    font-size: clamp(2rem, 6vw, 3rem);
    color: var(--color-cyan);
    margin-bottom: var(--space-sm);
  }

  .contact__intro {
    color: var(--color-text-muted);
    margin-bottom: var(--space-xl);
    line-height: 1.7;
  }

  .contact__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .contact__list a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background-color: var(--color-bg-card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    text-decoration: none;
    transition: border-color 0.2s;
  }

  .contact__list a:hover {
    border-color: var(--color-cyan);
    text-decoration: none;
  }

  .contact__label {
    font-weight: 700;
    color: var(--color-text);
  }

  .contact__value {
    color: var(--color-cyan);
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 2: Verify contact page**

Navigate to `localhost:4321/contact`. Expected: Dark page, title cyan, list of contact links as cards.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page with social links"
```

---

### Task 10: Final Polish + Vercel Config

**Files:**
- Modify: `astro.config.mjs` (set site URL)
- Create: `public/favicon.svg` (simple placeholder)

- [ ] **Step 1: Update astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nassriviera.com',
});
```

- [ ] **Step 2: Create a simple favicon**

```svg
<!-- public/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a0a0a"/>
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="bold" font-size="20" fill="#00d4ff">N</text>
</svg>
```

Add `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` in Layout.astro `<head>`.

- [ ] **Step 3: Build and verify**

```bash
npx astro build
npx astro preview
```

Expected: Static build completes without errors. Preview shows full site working.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs public/favicon.svg src/layouts/Layout.astro
git commit -m "feat: add Vercel config, favicon, and site URL"
```

---

### Task 11: Deploy to Vercel

- [ ] **Step 1: Install Vercel adapter**

```bash
npx astro add vercel
```

- [ ] **Step 2: Push to GitHub**

Create a repo on GitHub (e.g., `nassriviera-website`) and push.

```bash
git remote add origin https://github.com/<username>/nassriviera-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Connect Vercel**

Import the repo on vercel.com. Vercel auto-detects Astro. Deploy.

- [ ] **Step 4: Connect custom domain**

In Vercel dashboard: Settings → Domains → add `nassriviera.com`. Update DNS A/CNAME records at domain registrar.

- [ ] **Step 5: Final commit**

```bash
git add astro.config.mjs package.json
git commit -m "chore: add Vercel adapter for deployment"
```
