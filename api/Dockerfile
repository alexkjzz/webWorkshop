# On utilise l'image officielle Postgres (version 16 ici, la plus stable en 2026)
FROM postgres:16

# Définition des variables d'environnement pour la configuration initiale
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=mydatabase

# Optionnel : Exposer le port par défaut
EXPOSE 5433

# Note : L'image officielle exécute automatiquement le démarrage de Postgres,
# pas besoin de redéfinir la commande CMD sauf besoin spécifique.
COPY init.sql /docker-entrypoint-initdb.d/
