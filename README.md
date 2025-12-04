# ImmoRoom
Mini app immobilière sur les biens à vendre ou à louer

- Backend : → API Fastify + TypeScript + MySQL
- Frontend : → React + TypeScript + Axios
- DataBase : → immoroomFichier :  SQL pour importer la base

# Installation de la base donnees
- Lancer MySql : CREATE DATABASE immoroom;
- Importe le fichier SQL fourni : immoroom.sql

# Installation du Backend
- Se rendre dans le dossier backend : cd backend
- Installer les dépendances : npm install
- Lancer le serveur en mode développement : npm run dev
- Le backend tourne sur : http://localhost:3000

# Installation du Frontend
- Aller dans le dossier frontend :cd frontend
- Installer les dépendances : npm install
- Lancer l'application : npm run dev

# Architecture choisie
J'ai choisi l'architecture feature-based pour sa scalabilité, solide, code propre et son intégration continue des fonctionnalités. Cette architecture tourne sur les fonctionnalités du projet.

# Ce que tu aurais ajouté si tu avais plus de temps
- Je mets en place une barre de recherche pour les annonces de biens, en les triant par ville et code postal.
- Je vais mettre en place un dossier dans SRC : Hooks pour établir ma logique métier et la séparer du service et de l'UI.
- Je vais mettre en place mes tests en utilisant Vitest.





