# Groupe6_INF4077

Notre  projet de développement d'une application de surveillance épidémiologique se décompose en Deux branches:
- La branche Master: qui contient l'app web et les apk native et cross
- La branche devops qui contient un projet que nous avons build avec devops

Exécution des applications:

1- Application web

-Outils de dévolloppement utilisés:
L'app a été faite avec angular et firebase

-Lancer l'app avec la fonction "ng serve'' puis aller dans le navigateur.

Puis une fois dans l'app il y a les parties suivantes:
-La partie 'signal' pour le signalement d'un cas
-Et la partie Admin où il y'a deux types d'admin : le médécin et l'expert qui effectuent tous deux des tâches particulières

2- L'application native

Elle a été développée avec Android studio, et la Bd c'est SQLite

Comment la tester ?

Elle est divisée en 3 parties: 
-Home:
-Signalement d'un cas: où nous avons un formulaire qui enregistre les cas dans la bd SqlLite, après avoir rempli le formualaire on le valide sur le bouton "soumettre".
Puis, à côté, un patient peut prendre une photo qui est stockée en local, et voir sa position actuelle sur la carte google map. 
Comment utiliser la géolocalisation ?
Après le clic sur le bouton "GPS", la carte est chargée et la position trouvée. Puis, cliquer sur l'endroid localisé par google pour que les coordonnées cartographiques s'affichent
-La partie admin: elle comprend les onglets "Sms", "Son", "Cas signalés'(pour voir les cas enregistrés dans la bd), et l'onglet "stats" qui affiche 2 types de stats: Un diagramme quia affiche le nombre de cas signalés les 7 derniers jours, ainsi que d'autres sats générales
