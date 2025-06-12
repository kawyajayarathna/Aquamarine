document.addEventListener('DOMContentLoaded', () => {
    // Function to handle navigation link clicks
    function handleNavLinkClick(event) {
        const targetSection = event.target.getAttribute('href').substring(1);
        const section = document.getElementById(targetSection);
        
        if (section) {
            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveNavLink(event.target);
        }
    }

    // Function to set the active navigation link
    function setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Function to handle scrolling events
    function handleScroll() {
        const sections = document.querySelectorAll('main section');
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                const activeNavLink = document.querySelector(`nav a[href="#${currentId}"]`);
                setActiveNavLink(activeNavLink);
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});
