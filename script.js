document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const aiResponse = document.getElementById("aiResponse");
    const aiMessage = document.getElementById("aiMessage");
    const resultsGrid = document.getElementById("resultsGrid");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const suggestionButtons =
        document.querySelectorAll(".search-suggestions button");


    /* =========================================
       SEARCH DATABASE
    ========================================= */

    const searchDatabase = {

        background: {
            message:
                "Vous recherchez un outil permettant de supprimer automatiquement l'arrière-plan d'une image.",

            results: [
                {
                    name: "Remove.bg",
                    description:
                        "Supprime automatiquement l'arrière-plan de vos images.",
                    url: "https://www.remove.bg/"
                },
                {
                    name: "Canva",
                    description:
                        "Éditez vos images et utilisez la suppression d'arrière-plan.",
                    url: "https://www.canva.com/"
                }
            ]
        },

        logo: {
            message:
                "Vous recherchez un outil permettant de créer ou concevoir un logo.",

            results: [
                {
                    name: "Canva",
                    description:
                        "Créez facilement des logos et éléments graphiques.",
                    url: "https://www.canva.com/create/logos/"
                },
                {
                    name: "Adobe Express",
                    description:
                        "Créez rapidement des designs et logos personnalisés.",
                    url: "https://www.adobe.com/express/"
                }
            ]
        },

        pdf: {
            message:
                "Vous recherchez un outil permettant de compresser ou optimiser un fichier PDF.",

            results: [
                {
                    name: "iLovePDF",
                    description:
                        "Compressez, convertissez et éditez vos fichiers PDF.",
                    url: "https://www.ilovepdf.com/"
                },
                {
                    name: "Smallpdf",
                    description:
                        "Une suite d'outils en ligne pour vos documents PDF.",
                    url: "https://smallpdf.com/"
                }
            ]
        },

        video: {
            message:
                "Vous recherchez un outil pour créer ou modifier des vidéos.",

            results: [
                {
                    name: "CapCut",
                    description:
                        "Plateforme de création et de montage vidéo.",
                    url: "https://www.capcut.com/"
                },
                {
                    name: "Canva",
                    description:
                        "Créez des vidéos et animations directement en ligne.",
                    url: "https://www.canva.com/video-editor/"
                }
            ]
        },

        code: {
            message:
                "Vous recherchez un environnement ou un outil pour développer du logiciel.",

            results: [
                {
                    name: "GitHub",
                    description:
                        "Hébergez, gérez et collaborez sur vos projets de code.",
                    url: "https://github.com/"
                },
                {
                    name: "Stack Overflow",
                    description:
                        "Trouvez des réponses aux problèmes de programmation.",
                    url: "https://stackoverflow.com/"
                }
            ]
        },

        generic: {
            message:
                "J'ai analysé votre demande. Voici quelques outils qui pourraient correspondre à votre recherche.",

            results: [
                {
                    name: "Canva",
                    description:
                        "Une plateforme polyvalente pour créer différents contenus.",
                    url: "https://www.canva.com/"
                },
                {
                    name: "Google",
                    description:
                        "Recherchez rapidement des ressources et services sur le web.",
                    url: "https://www.google.com/"
                }
            ]
        }

    };


    /* =========================================
       DETECT SEARCH TYPE
    ========================================= */

    function detectSearch(query) {

        const text = query.toLowerCase();

        if (
            text.includes("background") ||
            text.includes("arrière-plan") ||
            text.includes("fond") ||
            text.includes("photo")
        ) {
            return searchDatabase.background;
        }

        if (
            text.includes("logo") ||
            text.includes("design")
        ) {
            return searchDatabase.logo;
        }

        if (
            text.includes("pdf") ||
            text.includes("document") ||
            text.includes("compresser")
        ) {
            return searchDatabase.pdf;
        }

        if (
            text.includes("vidéo") ||
            text.includes("video") ||
            text.includes("montage")
        ) {
            return searchDatabase.video;
        }

        if (
            text.includes("code") ||
            text.includes("programmer") ||
            text.includes("développer") ||
            text.includes("developer")
        ) {
            return searchDatabase.code;
        }

        return searchDatabase.generic;
    }


    /* =========================================
       PERFORM SEARCH
    ========================================= */

    function performSearch() {

        const query = searchInput.value.trim();

        if (!query) {

            searchInput.focus();

            searchInput.style.borderBottom =
                "1px solid rgba(255,0,0,0.5)";

            setTimeout(() => {
                searchInput.style.borderBottom = "none";
            }, 700);

            return;
        }


        /* Loading state */

        aiResponse.classList.add("visible");

        aiMessage.textContent =
            "Analyse de votre demande en cours...";

        resultsGrid.innerHTML = `
            <div class="tool-card">
                <div class="tool-number">...</div>

                <div class="tool-info">
                    <h3>Analyse</h3>
                    <p>Recherche des outils correspondants...</p>
                </div>
            </div>
        `;


        /* Simulate AI processing */

        setTimeout(() => {

            const result = detectSearch(query);

            aiMessage.textContent = result.message;

            resultsGrid.innerHTML = "";

            result.results.forEach((item, index) => {

                const card = document.createElement("div");

                card.className = "tool-card";

                card.innerHTML = `
                    <div class="tool-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="tool-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>

                    <a
                        href="${item.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="tool-link"
                    >
                        Ouvrir
                        <span>↗</span>
                    </a>
                `;

                resultsGrid.appendChild(card);

            });

            aiResponse.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 900);
    }


    /* =========================================
       SEARCH BUTTON
    ========================================= */

    searchButton.addEventListener("click", performSearch);


    /* =========================================
       ENTER KEY
    ========================================= */

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            performSearch();
        }

    });


    /* =========================================
       SUGGESTIONS
    ========================================= */

    suggestionButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const query = button.dataset.query;

            searchInput.value = query;

            performSearch();

        });

    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    mobileMenuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    document.querySelectorAll(".mobile-menu a").forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(2, 4, 3, 0.75)";

            navbar.style.backdropFilter =
                "blur(12px)";

        } else {

            navbar.style.background = "transparent";

            navbar.style.backdropFilter = "none";

        }

    });


    /* =========================================
       START BUTTONS
    ========================================= */

    document.querySelectorAll(".start-btn").forEach((button) => {

        button.addEventListener("click", () => {

            document
                .getElementById("home")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {
                searchInput.focus();
            }, 600);

        });

    });


    /* =========================================
       CATEGORY BUTTONS
    ========================================= */

    document.querySelectorAll(".category-list button")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const category =
                    button.querySelector("strong").textContent;

                searchInput.value =
                    `Je cherche des outils de ${category}`;

                document
                    .getElementById("home")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                setTimeout(() => {
                    performSearch();
                }, 700);

            });

        });

});