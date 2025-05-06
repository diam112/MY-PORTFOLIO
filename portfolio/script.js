// Add any JavaScript functionality here in the future. 

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Adjust for fixed navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Simple scroll-reveal for sections
    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    sections.forEach(section => {
        section.classList.add('reveal-on-scroll'); // Initial class for styling
        revealObserver.observe(section);
    });

    // Active nav link highlighting on scroll (basic implementation)
    const navbarLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sectionElements = Array.from(navbarLinks).map(link => document.querySelector(link.hash));

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sectionElements.forEach(section => {
            if (section && window.scrollY >= section.offsetTop - 100) { // 100px offset for navbar and trigger point
                currentSectionId = section.id;
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.hash === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
        // Special case for top of page / hero section
        if (window.scrollY < sectionElements[0].offsetTop - 100 && sectionElements[0].id === 'hero') {
             navbarLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.nav-link[href="#hero"]');
             if(homeLink) homeLink.classList.add('active');
        }
    });

}); 