# Task Manager Web

Application web moderne de gestion de tâches (Task Manager) développée avec React, Vite et une architecture frontend performante.

---

## 1.  Fonctionnalités principales

* **Gestion intuitive des tâches** : Création, suivi et organisation simplifiée de vos projets et tâches quotidiennes.
* **Interface rapide et réactive** : Propulsée par **Vite** pour un développement fluide et des performances de production optimisées.
* **Architecture modulaire** : Utilisation de composants modernes (React / ReactDOM).
* **Communication API centralisée** : Configuration dynamique via les variables d'environnement (`axios`).

---

## 2.  Technologies utilisées

* **Frontend** : React, React DOM
* **Outil de build** : Vite
* **Gestion des requêtes HTTP** : Axios
* **Qualité de code & Linter** : ESLint

---

## 3.  Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :
* **Node.js** (recommandé : version 18 ou supérieure)
* **npm** (inclus avec Node.js) ou **yarn**

---

## 4.  Installation et Configuration

1. **Cloner le dépôt** (si ce n'est pas déjà fait) ou se placer dans le dossier du projet :
   ```bash
      git clone https://github.com/thier32/taskmanager-web.git
   ```

   ```bash
   cd taskmanager-web
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Le projet utilise un fichier `.env` à la racine pour configurer l'URL de l'API backend :
   ```env
   VITE_API_BASE_URL=http://localhost:6001
   ```
   *Modifiez cette valeur si votre serveur backend tourne sur un autre port ou une autre URL.*

---

## 5.  Lancement de l'application

### 5.1. Mode Développement
Pour lancer le serveur de développement local avec rechargement à chaud (Hot Module Replacement) :
```bash
npm run dev
```
L'application sera généralement accessible sur `http://localhost:5173` (ou le port indiqué dans votre terminal).

### 5.2. Build pour la Production
Pour générer les fichiers optimisés pour la production (dans le dossier `dist/`) :
```bash
npm run build
```

### 5.3. Prévisualisation de la Production
Pour tester localement le build de production :
```bash
npm run preview
```

---

## 6.  Structure du Projet

```text
taskmanager-web/
├── dist/                # Fichiers compilés pour la production
├── node_modules/        # Dépendances du projet
├── public/              # Ressources statiques (icônes, favicons)
├── src/                 # Code source de l'application React
├── .env                 # Variables d'environnement (API URL)
├── Dockerfile           # Configuration pour la conteneurisation
├── eslint.config.js     # Configuration du linter ESLint
├── index.html           # Page HTML principale
├── package.json         # Dépendances et scripts npm
└── vite.config.js       # Configuration de l'outil Vite
```

---

## Optionnel.  Docker & Déploiement

Un fichier `Dockerfile` est présent à la racine pour conteneuriser l'application si vous souhaitez l'exécuter dans un conteneur.

Pour construire et lancer l'image Docker :
```bash
docker build -t taskmanager-web .
docker run -p 80:80 taskmanager-web
```

---
