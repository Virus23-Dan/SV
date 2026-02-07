// URLs de photos de démonstration (remplacez par vos vraies photos)
const photoUrls = [
    'Photo1.jpeg',
    'Photo2.jpeg',
    'Photo3.jpeg',
    'Photo4.jpeg',
    'Photo5.jpeg',
    'Photo6.jpeg',
    'Photo7.jpeg',
    'Photo8.jpeg',
    'Photo9.jpeg',
    'Photo10.jpeg',
];

// Textes à afficher
const texts = {
    title: 'Mon Amour ❤️',
    text1: 'Chaque jour passé à tes côtés est un cadeau précieux qui illumine ma vie. Tu es la mélodie qui fait chanter mon cœur, la lumière qui éclaire mes journées.',
    text2: 'Dans tes yeux, j\'ai trouvé mon foyer. Dans ton sourire, j\'ai découvert le bonheur. Dans ton amour, j\'ai trouvé ma raison d\'être.',
    text3: 'Je t\'aime plus que les mots ne pourront jamais l\'exprimer, plus profondément que l\'océan, plus haut que les étoiles.',
    text4: '❤️ Pour toujours, ton amour éternel ❤️'
};

const bubblesContainer = document.getElementById('bubblesContainer');
const audio = document.getElementById('backgroundMusic');
const startOverlay = document.getElementById('startOverlay');

// Fonction pour taper le texte caractère par caractère
function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Fonction pour animer tous les textes séquentiellement
function animateAllTexts() {
    const titleEl = document.getElementById('title');
    const text1El = document.getElementById('text1');
    const text2El = document.getElementById('text2');
    const text3El = document.getElementById('text3');
    const text4El = document.getElementById('text4');
    
    // Animer le titre en premier
    typeText(titleEl, texts.title, 80, () => {
        // Puis le premier paragraphe
        setTimeout(() => {
            typeText(text1El, texts.text1, 40, () => {
                // Puis le deuxième paragraphe
                setTimeout(() => {
                    typeText(text2El, texts.text2, 40, () => {
                        // Puis le troisième paragraphe
                        setTimeout(() => {
                            typeText(text3El, texts.text3, 40, () => {
                                // Enfin le dernier paragraphe
                                setTimeout(() => {
                                    typeText(text4El, texts.text4, 60);
                                }, 500);
                            });
                        }, 500);
                    });
                }, 500);
            });
        }, 800);
    });
}

// Fonction pour créer une bulle avec photo
function createBubble(photoUrl, index) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Taille aléatoire entre 80px et 200px
    const size = Math.random() * 120 + 80;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Position horizontale aléatoire
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Durée d'animation aléatoire entre 15 et 30 secondes
    const duration = Math.random() * 15 + 15;
    bubble.style.animationDuration = `${duration}s`;
    
    // Délai pour échelonner les bulles
    bubble.style.animationDelay = `${index * 2}s`;
    
    // Créer l'image
    const img = document.createElement('img');
    img.src = photoUrl;
    img.alt = 'Photo d\'amour';
    
    bubble.appendChild(img);
    bubblesContainer.appendChild(bubble);
    
    // Recréer la bulle quand l'animation se termine
    setTimeout(() => {
        bubble.remove();
        createBubble(photoUrl, 0);
    }, (duration + index * 2) * 1000);
}

// Créer toutes les bulles au démarrage
function initBubbles() {
    photoUrls.forEach((url, index) => {
        createBubble(url, index);
    });
}

// Démarrage du site
startOverlay.addEventListener('click', function() {
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
    }, 500);
    
    // Démarrer la musique
    audio.play().catch(err => {
        console.log('Lecture audio bloquée:', err);
    });
    
    // Initialiser les bulles
    initBubbles();
    
    // Démarrer l'animation du texte après un court délai
    setTimeout(() => {
        animateAllTexts();
    }, 1000);
});