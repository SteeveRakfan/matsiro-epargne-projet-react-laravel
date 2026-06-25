#!/bin/bash

# --- 1. GESTION DU RESEAU WIFi & POINT D'ACCES ---
echo "🔄 Activation du Wi-Fi..."
nmcli radio wifi on
sleep 2 # Pause pour laisser la carte Wi-Fi s'allumer

echo "📡 Activation du point d'accès Hotspot..."
# Si vous avez déjà créé votre Point d'accès via l'interface graphique d'Ubuntu :
nmcli connection up Hotspot
sleep 2 # Pause pour stabiliser le réseau avant de lancer les serveurs

# --- 2. OUVERTURE DES EDITEURS VS CODE ---
echo "💻 Ouverture de VS Code..."
code /home/stv/Projets/Web/MatsiroEpargne/laravel/ &
code /home/stv/Projets/Web/MatsiroEpargne/react/ &
sleep 1

# --- 3. LANCEMENT DES SERVEURS DANS PTYXIS ---
echo "🚀 Lancement des serveurs..."
ptyxis -d /home/stv/Projets/Web/MatsiroEpargne/react/ --tab -- bash -c "npm run dev -- --host=10.42.0.1; exec bash"
ptyxis -d /home/stv/Projets/Web/MatsiroEpargne/laravel/ --tab -- bash -c "php artisan serve --host=10.42.0.1; exec bash"

