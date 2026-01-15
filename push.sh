#!/bin/bash

# Script simplifié de Push GitHub pour MedicalFlow
cd /Users/robinmasini/Desktop/Medical.ia

echo "🧹 Nettoyage..."
rm -f .git/index.lock

echo "📝 Configuration Git..."
git config user.email "robinmasini@users.noreply.github.com"
git config user.name "Robin Masini"

echo "➕ Staging des fichiers (cela peut prendre 30-60 secondes)..."
# Utiliser une seule commande git add qui gère mieux les gros volumes
git add -A

echo "💾 Création du commit..."
git commit -m "Initial commit - MedicalFlow"

echo "📤 Push vers GitHub (vous devrez entrer votre token)..."
git push -u origin master

echo ""
echo "✅ Terminé ! Vérifiez https://github.com/robinmasini/MedicalFlow"
