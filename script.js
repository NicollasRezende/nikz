// Gerenciamento de Estado e Configurações
const CONFIG = {
    ANIMATION_DURATION: 1000,
    TYPEWRITER_SPEED: 100,
    SCROLL_OFFSET: 100,
    MOBILE_BREAKPOINT: 768,
};

// Inicialização do Site
document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    initializeTheme();
    initializeAnimations();
    initializeNavigation();
    initializeTypewriter();
    initializeParallax();
});

// Sistema de Loading
function initializeLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                document.body.classList.add('loaded');
            }, 500);
        }, 1000);
    });
}

// Gerenciamento de Tema
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    // Estabelece tema inicial
    if (savedTheme) {
        document.body.classList.toggle('light-theme', savedTheme === 'light');
        updateThemeIcon(savedTheme === 'light');
    } else {
        document.body.classList.toggle('light-theme', !prefersDark.matches);
        updateThemeIcon(!prefersDark.matches);
    }

    // Evento de toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });

    // Observer de mudança de preferência do sistema
    prefersDark.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('light-theme', !e.matches);
            updateThemeIcon(!e.matches);
        }
    });
}

function updateThemeIcon(isLight) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}

// Animações de Scroll
function initializeAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Opcional: remover observer após animação
                    // observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}

// Navegação Suave e Menu Mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Toggle menu mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Navegação Suave
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (navLinks.classList.contains('active')) {
                hamburger.click();
            }

            if (target) {
                const headerOffset = navbar.offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Navbar Scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (
            currentScroll > lastScroll &&
            !navbar.classList.contains('scroll-down')
        ) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (
            currentScroll < lastScroll &&
            navbar.classList.contains('scroll-down')
        ) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Efeito de Digitação
function initializeTypewriter() {
    const element = document.querySelector('.typewriter');
    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, CONFIG.TYPEWRITER_SPEED);
}

// Efeito Parallax
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element) => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Sistema de Notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animação de entrada
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    // Remover após delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Utilitários
const debounce = (func, wait = 20) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
