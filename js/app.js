// --- Events ---
// une liste d'évènements est mise à disposition par JS et le navigateur
// par exemple, l'évènement "click"
// Quand l'évènement arrive/survient, JS exécute toutes les fonctions attachées à cet évènement
// => l'exécution de la fonction attachée est désynchronisée

// On place notre code dans un module
const app = {
    // Propriété "counter"
    currentQuoteIndex: 0,
    // Ma fenêtre en cas d'erreur sur le formulaire
    myModal: new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: true,
        focus: true
    }),
    // Méthode appelée au chargement du DOM
    init: function () {
        // attache la méthode app.handleClickOnDisplayAddFormButton à l'évènement "click" sur le bouton "ajouter une citation"
        document.getElementById('btnDisplayAddForm').addEventListener('click', app.handleClickOnDisplayAddFormButton);

        // TODO afficher la première citation de fail
        document.getElementById('quote').innerText = quotes[0]['quote'];
        document.getElementById('author').innerText = quotes[0]['author'];

        // TODO attacher la méthode app.handleClickOnNextButton à l'évènement "click" sur le bouton "next" (id="nav-next")
        document.getElementById('nav-next').addEventListener('click', app.handleClickOnNextButton);


        document.getElementById('nav-prev').addEventListener('click', app.handleClickOnPrevButton);
        document.getElementById('nav-first').addEventListener('click', app.handleClickOnFirstButton);
        document.getElementById('nav-last').addEventListener('click', app.handleClickOnLastButton);

        document.getElementById('addQuoteForm').addEventListener('submit', app.handleFormSubmit);

        document.getElementById('close-modal').addEventListener('click', app.handleClickOnCloseModalButton);

        console.log(quotes.length);

    },

    handleFormSubmit: function (evt) {
        evt.preventDefault();

        let userQuote = document.getElementById('input-quote').value.toString();
        let userAuthor = document.getElementById('input-author').value.toString();
        if (userQuote === '' && userAuthor === '') {
            app.myModal.show();
        } else {
            console.log('Vous avez bien ajouté: "' + userQuote + '" de ' + userAuthor);

            let blockQuote = {
                quote: userQuote,
                author: userAuthor
            };

            quotes.push(blockQuote);

            document.getElementById('divAddQuote').classList.add('d-none');
        }
        
        // Remise à zéro des input
        document.getElementById('input-author').value = document.getElementById('input-quote').value = '';
        
    },

    handleClickOnCloseModalButton: function () {
        app.myModal.hide();
    },

    // Méthode gérant le click pour afficher le form d'ajout
    handleClickOnDisplayAddFormButton: function (evt) {
        console.log('click to display form');

        document.getElementById('divAddQuote').classList.remove('d-none');
    },
    // Méthode permettant de modifier le DOM pour afficher la quote "courante"
    displayCurrentQuote: function () {
        // TODO se baser sur app.currentQuoteIndex pour afficher la quote "courante"

        document.getElementById('quote').innerText = quotes[app.currentQuoteIndex]['quote'];
        document.getElementById('author').innerText = quotes[app.currentQuoteIndex]['author'];

    },
    // Je crée une méthode dédiée à la gestion du click sur le bouton "Next"
    handleClickOnNextButton: function () {
        console.log('click on next');
        if (app.currentQuoteIndex === quotes.length - 1) {
            app.displayCurrentQuote();
        } else {
            app.currentQuoteIndex++;
            app.displayCurrentQuote();
        }
    },

    handleClickOnPrevButton: function () {
        console.log('click on previous');
        if (app.currentQuoteIndex === 0) {
            app.displayCurrentQuote();
        } else {
            app.currentQuoteIndex--;
            app.displayCurrentQuote();
        }
    },

    handleClickOnFirstButton: function () {
        console.log('click on first');

        app.currentQuoteIndex = 0;
        app.displayCurrentQuote();
    },

    handleClickOnLastButton: function () {
        console.log('click on last');

        app.currentQuoteIndex = quotes.length - 1;
        app.displayCurrentQuote();
    }
};

// Appel "synchronisé" de la méthode init
// app.init();

// Permet d'exécuter notre code une fois le DOM chargé
// => lorsque l'event DOMContentLoaded survient => la méthode app.init est appelée
// donc app.init n'est pas exécuter lorsque JS lit cette ligne de code
document.addEventListener('DOMContentLoaded', app.init); // ici, ne jamais mettre les (), sinon, la fonction/méthode sera aussitôt exécutée

// Attention à la syntaxe, on ne doit pas mettre les () après la fonction, sinon elle est appelée aussitôt
// Explications :
// envoie de l'eau, au lancement du détecteur
// document.addEventListener('fuméeDetectée', envoyerDeLeau());
// Lorsque de la fumée sera détectée, envoie de l'eau
// document.addEventListener('fuméeDetectée', envoyerDeLeau);