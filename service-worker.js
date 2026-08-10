const CACHE_NAME = "rpg-combat-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",

    "./js/Actions.js",
    "./js/Bibliotheque.js",
    "./js/BibliothequeEquipements.js",
    "./js/Combat.js",
    "./js/Competence.js",
    "./js/Constantes.js",
    "./js/Effets.js",
    "./js/Equipement.js",
    "./js/Interface.js",
    "./js/InventaireEquipements.js",
    "./js/journal.js",
    "./js/Personnage.js",
    "./js/Resolution.js",
    "./js/script.js",

    "./js/monstres/ChampionMalakor.js",
    "./js/monstres/Corbeau.js",
    "./js/monstres/LoupAlpha.js",
    "./js/monstres/LoupBeta.js",
    "./js/monstres/Murloc.js",
    "./js/monstres/Ours.js",
    "./js/monstres/Squelette.js",

    "./js/personnages/BarbeNoire.js",
    "./js/personnages/BoucleNoire.js",
    "./js/personnages/CraneBlanc.js",
    "./js/personnages/CraneRoux.js",
    "./js/personnages/Tom.js",
    "./js/personnages/VieuxSage.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});