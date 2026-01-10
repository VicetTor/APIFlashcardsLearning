
## Installation du projet

_Il vous faut en prérequis, avoir installer npm sur votre machine._

**Suivre ces étapes pour démarrer le projet :**

- Premièrement, placez vous dans le répertoire de votre choix et clonez le projet à l'aide de la commande : **_git clone https://github.com/VicetTor/APIFlashcardsLearning.git_**

- Après avoir le clone le projet, exécutez la commande **_npm install_** à la racine. Cela va installer toutes les dépendances du projet via le package.json.

- Créer le fichier .env à la racine contenant ces deux variables :

```
DB_FILE=file:local.db
JWT_SECRET=1fe771bdebaa31614869a58625a17bab38aab0ecaad584818dbd7fe539b398a1a778c2852ae872ba0fcb7bf94090762db96b62a2b17462d519c054d666bf1e1b 
```

- Exécutez la commande **_npm run db:push_** pour mettre à jour votre schéma de base de données.

- Ensuite, avec la commande **_npm run db:seed_** vous allez ajouter les données primaires pour tester l'application.

- Puis, avec la commande **_npm run db:studio_**, vous allez lancer le serveur Drizzle Studio et pouvoir accéder à l'interface de gestion de la base de données via l'url local.drizzle.studio.

- Enfin, pour lancer votre serveur express et tester les endpoints API, utilisez la commande **_npm run dev_**.

** N. B. :  Vous pouvez utiliser l'extension ThunderClient de VSCode pour tester les endpoints API avec une interface facile d'utilisation.







