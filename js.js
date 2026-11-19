
document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE MENU
    const menuButton = document.getElementById("menu-button");
    const navLinks = document.getElementById("nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // 2. HERO IMAGE SLIDER
    const heroTrack = document.getElementById("hero-track");
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroNext = document.getElementById("hero-next");
    const heroPrev = document.getElementById("hero-prev");

    if (heroTrack && heroSlides.length > 0) {

        let currentSlide = 0;
        let heroTimer;

        function showHeroSlide(index) {
            currentSlide = (index + heroSlides.length) % heroSlides.length;

            heroTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;
        }

        function nextHeroSlide() {
            showHeroSlide(currentSlide + 1);
        }

        function previousHeroSlide() {
            showHeroSlide(currentSlide - 1);
        }

        function startHeroTimer() {
            clearInterval(heroTimer);
            heroTimer = setInterval(nextHeroSlide, 3500);
        }

        if (heroNext) {
            heroNext.addEventListener("click", function () {
                nextHeroSlide();
                startHeroTimer();
            });
        }

        if (heroPrev) {
            heroPrev.addEventListener("click", function () {
                previousHeroSlide();
                startHeroTimer();
            });
        }

        showHeroSlide(0);
        startHeroTimer();
    }

    // 3. PRODUCT CAROUSELS
    function setupCarousel(windowId, previousId, nextId) {

        const carouselWindow = document.getElementById(windowId);
        const previousButton = document.getElementById(previousId);
        const nextButton = document.getElementById(nextId);

        if (!carouselWindow) return;

        function getScrollAmount() {
            const card = carouselWindow.querySelector(".product-card");

            if (!card) return 250;

            const track = carouselWindow.querySelector(".carousel-track");

            const gap = track
                ? parseFloat(getComputedStyle(track).gap) || 0
                : 0;

            return card.getBoundingClientRect().width + gap;
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {

                const amount = getScrollAmount();
                const maxScroll =
                    carouselWindow.scrollWidth - carouselWindow.clientWidth;

                if (carouselWindow.scrollLeft >= maxScroll - 5) {
                    carouselWindow.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });
                } else {
                    carouselWindow.scrollBy({
                        left: amount,
                        behavior: "smooth"
                    });
                }
            });
        }

        if (previousButton) {
            previousButton.addEventListener("click", function () {

                const amount = getScrollAmount();

                if (carouselWindow.scrollLeft <= 5) {
                    carouselWindow.scrollTo({
                        left: carouselWindow.scrollWidth,
                        behavior: "smooth"
                    });
                } else {
                    carouselWindow.scrollBy({
                        left: -amount,
                        behavior: "smooth"
                    });
                }
            });
        }
    }

    setupCarousel("new-window", "new-prev", "new-next");
    setupCarousel("wanted-window", "wanted-prev", "wanted-next");


    // 4. NEWSLETTER FORM
    const newsletterForm = document.getElementById("newsletter-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for subscribing!");

            newsletterForm.reset();
        });
    }


    // 5. CONTACT FORM
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you! Your message has been received.");

            contactForm.reset();
        });
    }


    // 6. COLLECTION SEARCH AND CATEGORY FILTER
    const searchInput = document.getElementById("search-input");

    const collectionProducts =
        document.querySelectorAll(".collection-product");

    const categoryFilters =
        document.querySelectorAll(".category-filter");

    function filterProducts() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedCategories = Array.from(categoryFilters)
            .filter(function (filter) {
                return filter.checked;
            })
            .map(function (filter) {
                return filter.value;
            });

        collectionProducts.forEach(function (product) {

            const productName = product.textContent.toLowerCase();

            const productCategory = product.dataset.category;

            const matchesSearch = productName.includes(searchText);

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(productCategory);

            product.style.display =
                matchesSearch && matchesCategory ? "" : "none";
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    categoryFilters.forEach(function (filter) {
        filter.addEventListener("change", filterProducts);
    });

});