"use strict";


/* =====================================================
   ELEMENTS
===================================================== */

const header = document.getElementById("header");

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");

const navLinks =
    document.querySelectorAll(".nav-link");

const revealElements =
    document.querySelectorAll(".reveal");

const backToTop =
    document.getElementById("back-to-top");

const sections =
    document.querySelectorAll("main section[id]");

const yearElement =
    document.getElementById("year");


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    const isOpen =
        navMenu.classList.toggle("open");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
}


function closeMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    document.body.classList.remove(
        "menu-open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* Close menu with Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =====================================================
   HEADER
===================================================== */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }
}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNavigation() {

    if (!sections.length) {
        return;
    }

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            navLinks.forEach((link) => {

                link.classList.remove(
                    "active"
                );

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add(
                    "active"
                );

            }

        }

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }
}


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* =====================================================
   SCROLL EVENT
===================================================== */

function handleScroll() {

    updateHeader();

    updateBackToTop();

    updateActiveNavigation();

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


/* Run when page loads */

handleScroll();


/* =====================================================
   FOOTER YEAR
===================================================== */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 820) {
            closeMenu();
        }

    }
);