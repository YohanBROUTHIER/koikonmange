# KoiKonMange
Ce repo contient tout les fichiers du projet de proposition de choix de recette

# Getting Started
1.	[Installer Postgresql](https://www.postgresql.org/download/linux/debian/)
2.  [Installer Node.js](https://nodejs.org/en/download/prebuilt-binaries)
3.  Installer git : `sudo apt update && sudo apt install git`
4.  Cloner le repo : `git clone <url>`
5.  Rendrer dans le repo : `cd <nom du repo>`
6.	Installer les dépendances : `npm i`
7.	Remplir le fichier /.env avec le fichier modèle /.env.exemple
8.	Créer la base de donnés
  - `sudo -i -u postgres psql`
  - `CREATE ROLE koikonmange WITH LOGIN PASSWORD 'MotDePasse';`
  - `CREATE DATABASE koikonmange OWNER koikonmange;`
  - pour quitter : ctrl + d
9.  Créer la structure de la base de donnés : `npm run db:create`
10.  Générer le seeding de donnés : `npm run db:seed`    
11. Lancer en tant que dev:
  - front : `npm run dev:front`
  - back : `npm run dev:back`
12. Lancer en prod
  - build : `npm run build`
  - start : `npm run start`
