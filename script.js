/**
 * SCRIPT.JS - ORGANIZADO
 *
 * Estrutura do arquivo:
 * 1. Inicialização Principal
 * 2. Gerenciamento de Tema
 * 3. Navegação e UI
 * 4. Animações e Efeitos Visuais
 * 5. Manipulação de Formulários
 * 6. Interação com API do GitHub
 * 7. Utilitários
 */

/* ==================================================================================
   1. INICIALIZAÇÃO PRINCIPAL
   ================================================================================== */

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
    // Inicialização de componentes e funcionalidades
    initThemeToggle();
    initNavbarActive();
    initBackToTop();
    initProjectFilter();
    initTypewriter();
    initScrollAnimation();
    initFormValidation();
    initParallaxEffect();
    initCursorEffects();
    initGlassMorphism();

    // Adicionar estilos extras
    addExtraStyles();

    // Iniciar carregamento de projetos do GitHub
    initGitHubProjects();
});

/**
 * Adiciona estilos CSS extras para novas funcionalidades
 */
function addExtraStyles() {
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        /* Barra de progresso de scroll */
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            width: 0%;
            z-index: 1001;
            transition: width 0.1s;
        }
        
        /* Efeito de ripple para botões */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Cursor hover state */
        .cursor-hover {
            transform: scale(1.05);
        }
        
        /* Efeito de pulse para botões */
        .pulse-effect {
            animation: pulse-animation 0.5s ease-in-out;
        }
        
        @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        /* Animação de shake para formulário inválido */
        .shake-animation {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* Cursor piscante para typewriter */
        .cursor {
            display: inline-block;
            margin-left: 3px;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* Efeito de transição para troca de tema */
        .theme-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            z-index: 9999;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(extraStyles);
}

/* ==================================================================================
   2. GERENCIAMENTO DE TEMA
   ================================================================================== */

/**
 * Inicializa o toggle de tema (claro/escuro)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    // Verificar tema salvo ou preferência do sistema
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else if (prefersDark.matches) {
        document.body.classList.remove('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        document.body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Evento de clique para alternar tema
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

/* ==================================================================================
   3. NAVEGAÇÃO E UI
   ================================================================================== */

/**
 * Inicializa a navegação e links ativos na navbar
 */
function initNavbarActive() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Adicionar indicador de progresso na navegação
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    // Observador de interseção para seções
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const activeId = entry.target.getAttribute('id');
                    setActiveNav(activeId);
                }
            });
        },
        { threshold: 0.5 }
    );

    // Observar todas as seções
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Definir link ativo
    function setActiveNav(id) {
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Fechar menu ao clicar em link (mobile)
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });

    // Atualizar barra de progresso ao rolar
    window.addEventListener('scroll', function () {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Inicializa o botão de voltar ao topo
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Adicionar animação ao clicar
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        // Iniciar animação de pulso
        this.classList.add('pulse-effect');

        // Rolar suavemente para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        // Remover classe de animação
        setTimeout(() => {
            this.classList.remove('pulse-effect');
        }, 500);
    });
}

/**
 * Inicializa o filtro de projetos
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function (event) {
            // Remover classe ativa de todos os botões
            filterBtns.forEach((btn) => btn.classList.remove('active'));

            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');

            // Adicionar efeito de ripple ao botão
            createRippleEffect(this, event);

            // Obter categoria do filtro
            const filterValue = this.getAttribute('data-filter');

            // Filtrar projetos
            projectCards.forEach((card) => {
                const cardParent = card.parentElement; // Obter o col-* que contém o card

                if (
                    filterValue === 'all' ||
                    card.getAttribute('data-category') === filterValue
                ) {
                    cardParent.style.display = 'block';
                    setTimeout(() => {
                        cardParent.style.opacity = '1';
                        cardParent.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    cardParent.style.opacity = '0';
                    cardParent.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        cardParent.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==================================================================================
   4. ANIMAÇÕES E EFEITOS VISUAIS
   ================================================================================== */

/**
 * Inicializa o efeito de typewriter
 */
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';

    let i = 0;
    function type() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Adicionar cursor piscante após terminar de digitar
            typewriterElement.insertAdjacentHTML(
                'beforeend',
                '<span class="cursor">|</span>'
            );
            const cursor = document.querySelector('.cursor');
            cursor.style.animation = 'blink 1s infinite';
        }
    }

    setTimeout(type, 1000);
}

/**
 * Inicializa animações baseadas em scroll
 */
function initScrollAnimation() {
    // Selecionar todos os elementos que precisam de animação
    const fadeElements = document.querySelectorAll(
        '.project-card, .skill-category, .contact-card, .about-text p, .stat-card, .section-title, .section-line, .about-cta'
    );

    // Configurações do Observador de Interseção
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1,
    };

    // Criar diferentes tipos de animações
    fadeElements.forEach((element, index) => {
        // Determinar o tipo de animação com base no elemento ou em um padrão
        let animationType;

        if (element.classList.contains('project-card')) {
            animationType = 'fade-up';
        } else if (element.classList.contains('skill-category')) {
            animationType = 'scale-in';
        } else if (
            element.classList.contains('section-title') ||
            element.classList.contains('section-line')
        ) {
            animationType = 'fade-in';
        } else {
            // Alternar entre diferentes animações para outros elementos
            const animations = ['fade-up', 'scale-in', 'fade-in'];
            animationType = animations[index % animations.length];
        }

        // Adicionar classe de animação e delay
        element.classList.add(animationType);
        element.classList.add(`delay-${(index % 5) * 100}`);
    });

    // Função callback do observador
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Parar de observar após ativar
            }
        });
    };

    // Criar observador
    const observer = new IntersectionObserver(callback, options);

    // Observar todos os elementos
    fadeElements.forEach((element) => {
        observer.observe(element);
    });
}

/**
 * Inicializa efeitos parallax
 */
function initParallaxEffect() {
    // Adicionar elementos de parallax na seção hero
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Criar elementos de fundo para efeito parallax
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';

    // Adicionar círculos com gradiente
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'parallax-circle';
        parallaxBg.appendChild(circle);
    }

    // Adicionar grid de fundo
    const parallaxGrid = document.createElement('div');
    parallaxGrid.className = 'parallax-grid';
    parallaxBg.appendChild(parallaxGrid);

    // Inserir no início da seção hero
    hero.insertBefore(parallaxBg, hero.firstChild);

    // Adicionar evento de mousemove para efeito parallax
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Mover círculos em diferentes velocidades
        const circles = document.querySelectorAll('.parallax-circle');
        circles[0].style.transform = `translate(${mouseX * 30}px, ${
            mouseY * 30
        }px)`;
        circles[1].style.transform = `translate(${mouseX * -40}px, ${
            mouseY * -40
        }px)`;
        circles[2].style.transform = `translate(${mouseX * 20}px, ${
            mouseY * -20
        }px)`;

        // Mover grid
        const grid = document.querySelector('.parallax-grid');
        grid.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;

        // Mover elementos da seção hero
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.style.transform = `translate(${mouseX * 20}px, ${
                mouseY * 20
            }px)`;
        }
    });

    // Adicionar evento de scroll para efeito parallax
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Calcular o progresso do scroll dentro da seção hero (0 a 1)
        const scrollProgress = Math.min(scrollPosition / heroHeight, 1);

        // Mover elementos baseado no scroll
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.transform = `translateY(${scrollProgress * 50}px)`;
            heroText.style.opacity = 1 - scrollProgress;
        }

        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollProgress * 100}px)`;
        }
    });
}

/**
 * Inicializa efeitos de cursor personalizado
 */
function initCursorEffects() {
    // Adicionar efeito de hover para elementos interativos
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .nav-link, .social-link, .filter-btn, .project-links a'
    );

    interactiveElements.forEach((element) => {
        // Efeito de escala ao passar o mouse
        element.addEventListener('mouseenter', function () {
            this.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', function () {
            this.classList.remove('cursor-hover');
        });
    });
}

/**
 * Aplica efeito glass morphism aos elementos
 */
function initGlassMorphism() {
    // Adicionar a classe glass-effect aos elementos que devem ter o efeito
    const glassElements = document.querySelectorAll(
        '.card, .navbar, .contact-card, .contact-form-card, .skill-category, .project-card'
    );

    glassElements.forEach((element) => {
        element.classList.add('glass-effect');
    });
}

/**
 * Cria efeito ripple em botões
 */
function createRippleEffect(button, e) {
    // Remover qualquer ripple existente
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }

    // Criar novo elemento ripple
    const circle = document.createElement('span');
    circle.className = 'ripple';
    button.appendChild(circle);

    // Calcular tamanho do ripple (deve ser maior que o botão)
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Posicionar o ripple baseado na posição do clique
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;

    // Adicionar classe para animar
    circle.classList.add('animate');

    // Remover após a animação
    setTimeout(() => {
        circle.remove();
    }, 600);
}

/* ==================================================================================
   5. MANIPULAÇÃO DE FORMULÁRIOS
   ================================================================================== */

/**
 * Inicializa a validação do formulário de contato
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Verificar se o EmailJS já inicializou o formulário
    if (window.emailJSInitialized === true) {
        console.log(
            'Formulário já inicializado pelo EmailJS, ignorando inicialização padrão'
        );
        return;
    }

    // Adicionar classe para validação em tempo real
    form.classList.add('needs-validation');

    // Adicionar feedback visual para campos
    const formControls = form.querySelectorAll('.form-control');
    formControls.forEach((input) => {
        // Feedback de validação em tempo real
        input.addEventListener('input', function () {
            validateInput(this);
        });

        // Verificar ao perder o foco
        input.addEventListener('blur', function () {
            validateInput(this);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Verificar se o formulário é válido
        if (!form.checkValidity()) {
            e.stopPropagation();

            // Marcar todos os campos inválidos
            formControls.forEach((input) => {
                validateInput(input);
            });

            // Animação de shake no formulário
            form.classList.add('shake-animation');
            setTimeout(() => {
                form.classList.remove('shake-animation');
            }, 500);

            return;
        }

        // Obter valores dos campos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Verificar se todos os campos estão preenchidos
        if (name && email && subject && message) {
            // Simular envio do formulário
            simulateFormSubmission(form);
        } else {
            // Feedback visual para campos vazios
            formControls.forEach((input) => {
                validateInput(input);
            });
        }
    });
}

/**
 * Valida um campo do formulário e aplica o feedback visual
 */
function validateInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

/**
 * Simula o envio do formulário com animações e feedback
 */
function simulateFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Adicionar efeito de loading
    submitBtn.disabled = true;
    submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

    setTimeout(() => {
        // Mostrar mensagem de sucesso com animação
        const successEl = document.createElement('div');
        successEl.className = 'form-success mt-3 alert alert-success';
        successEl.innerHTML =
            '<i class="fas fa-check-circle me-2"></i> Mensagem enviada com sucesso! Entrarei em contato em breve.';

        // Inserir depois do botão
        submitBtn.parentNode.insertAdjacentElement('afterend', successEl);

        // Animar entrada
        setTimeout(() => {
            successEl.classList.add('active');
        }, 10);

        // Resetar formulário
        form.reset();
        form.querySelectorAll('.form-control').forEach((input) => {
            input.classList.remove('is-valid');
        });

        // Restaurar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviado!';

        // Restaurar texto original do botão após um tempo
        setTimeout(() => {
            submitBtn.textContent = originalText;

            // Remover mensagem de sucesso
            successEl.classList.remove('active');
            setTimeout(() => {
                successEl.remove();
            }, 300);
        }, 3000);
    }, 1500);
}

/* ==================================================================================
   6. INTERAÇÃO COM API DO GITHUB
   ================================================================================== */

/**
 * Inicializa a busca e exibição de projetos do GitHub
 */
function initGitHubProjects() {
    const username = 'NicollasRezende'; // Username do GitHub
    const projectsPerSlide = 4; // Projetos por slide
    const maxProjects = 24; // Número máximo de projetos

    // Elementos DOM
    const projectsContainer = document.getElementById('projects-container');
    const languageButtons = document.getElementById('language-buttons');

    if (!projectsContainer || !languageButtons) return;

    // Variáveis para armazenar dados
    let languages = new Set();
    let allProjects = [];
    let currentLanguage = 'all';

    // Buscar repositórios do GitHub
    fetchGitHubRepos();

    /**
     * Busca repositórios do GitHub via API
     */
    async function fetchGitHubRepos() {
        try {
            // Mostrar estado de carregamento
            showLoadingState();

            // Buscar repositórios
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxProjects}`
            );

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            allProjects = repos.filter((repo) => !repo.fork); // Filtrar forks

            // Coletar linguagens únicas
            languages = new Set(['all']);
            allProjects.forEach((repo) => {
                if (repo.language) {
                    languages.add(repo.language.toLowerCase());
                }
            });

            // Renderizar botões de filtro
            renderLanguageButtons();

            // Renderizar projetos iniciais (todos)
            renderProjects(allProjects);
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            showErrorState(error);
        }
    }

    /**
     * Mostra o estado de carregamento
     */
    function showLoadingState() {
        projectsContainer.innerHTML = `
            <div class="carousel-item active">
                <div class="loading-container">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                    <p class="mt-3">Buscando projetos do GitHub...</p>
                </div>
            </div>
        `;
    }

    /**
     * Mostra o estado de erro
     */
    function showErrorState(error) {
        projectsContainer.innerHTML = `
            <div class="carousel-item active">
                <div class="error-container">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <h3>Erro ao carregar projetos</h3>
                    <p>${
                        error.message || 'Falha ao conectar com a API do GitHub'
                    }</p>
                    <button class="btn btn-primary mt-3" onclick="window.location.reload()">
                        <i class="fas fa-sync-alt me-2"></i>Tentar novamente
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza botões de filtro por linguagem
     */
    function renderLanguageButtons() {
        let buttonsHTML = '';

        // Adicionar botões para cada linguagem
        languages.forEach((lang) => {
            if (lang !== 'all') {
                buttonsHTML += `
                    <button class="btn filter-btn me-2 mb-2" data-language="${lang.toLowerCase()}">
                        ${capitalizeFirstLetter(lang)}
                    </button>
                `;
            }
        });

        // Adicionar botões ao DOM
        const allButton = languageButtons.querySelector(
            '[data-language="all"]'
        );
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'd-inline';
        buttonsContainer.innerHTML = buttonsHTML;

        // Manter o botão "Todos" como primeiro filho e adicionar os outros depois
        Array.from(buttonsContainer.children).forEach((child) => {
            languageButtons.appendChild(child);
        });

        // Adicionar event listeners
        document.querySelectorAll('.filter-btn').forEach((button) => {
            button.addEventListener('click', handleFilterClick);
        });
    }

    /**
     * Manipulador de clique para botões de filtro
     */
    function handleFilterClick(e) {
        // Remover classe 'active' de todos os botões
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.remove('active');
        });

        // Adicionar classe 'active' ao botão clicado
        e.target.classList.add('active');

        // Obter linguagem selecionada
        const language = e.target.getAttribute('data-language');
        currentLanguage = language;

        // Filtrar e renderizar projetos
        if (language === 'all') {
            renderProjects(allProjects);
        } else {
            const filteredProjects = allProjects.filter(
                (project) =>
                    project.language &&
                    project.language.toLowerCase() === language
            );
            renderProjects(filteredProjects);
        }
    }

    /**
     * Renderiza projetos com Cards de Glass Morphism
     */
    function renderProjects(projects) {
        const carouselIndicators = document.getElementById(
            'carousel-indicators'
        );

        if (projects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="carousel-item active">
                    <div class="text-center p-5">
                        <i class="fas fa-folder-open fa-3x mb-3 text-secondary"></i>
                        <h3>Nenhum projeto encontrado</h3>
                        <p>Não há projetos disponíveis para o filtro selecionado.</p>
                    </div>
                </div>
            `;
            if (carouselIndicators) carouselIndicators.innerHTML = '';
            return;
        }

        // Calcular número de slides necessários
        const numSlides = Math.ceil(projects.length / projectsPerSlide);

        let slidesHTML = '';
        let indicatorsHTML = '';

        // Gerar slides
        for (let i = 0; i < numSlides; i++) {
            const startIdx = i * projectsPerSlide;
            const endIdx = Math.min(
                startIdx + projectsPerSlide,
                projects.length
            );
            const slideProjects = projects.slice(startIdx, endIdx);

            // Iniciar o slide
            slidesHTML += `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <div class="project-grid">
                        <div class="row g-3">
            `;

            // Adicionar projetos
            slideProjects.forEach((project, index) => {
                const languageClass = getSafeLanguageClass(project.language);
                const delayClass = `delay-${(index % 5) * 100}`;

                slidesHTML += `
                    <div class="col-md-6">
                        <div class="project-card fade-up ${delayClass}" data-language="${languageClass}">
                            <div class="project-header">
                                <h3 class="project-title">
                                    <i class="fas fa-code-branch"></i>
                                    ${project.name}
                                </h3>
                                <div class="project-links">
                                    ${
                                        project.homepage
                                            ? `<a href="${project.homepage}" target="_blank" title="Ver Demo">
                                            <i class="fas fa-external-link-alt"></i>
                                        </a>`
                                            : ''
                                    }
                                    <a href="${
                                        project.html_url
                                    }" target="_blank" title="Ver no GitHub">
                                        <i class="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="project-body">
                                <p class="project-description">
                                    ${
                                        project.description ||
                                        'Sem descrição disponível.'
                                    }
                                </p>
                                <div class="project-tech">
                                    <span class="tech-tag">${
                                        project.language || 'N/A'
                                    }</span>
                                    ${
                                        project.topics &&
                                        project.topics.length > 0
                                            ? project.topics
                                                  .slice(0, 3)
                                                  .map(
                                                      (topic) =>
                                                          `<span class="tech-tag">${topic}</span>`
                                                  )
                                                  .join('')
                                            : ''
                                    }
                                </div>
                            </div>
                            <div class="project-footer">
                                <div class="project-language">
                                    <span class="language-dot ${languageClass}"></span>
                                    <span class="language-name">${
                                        project.language || 'N/A'
                                    }</span>
                                </div>
                                <div class="project-meta">
                                    <div class="meta-item" title="Stars">
                                        <i class="fas fa-star"></i>
                                        <span>${project.stargazers_count}</span>
                                    </div>
                                    <div class="meta-item" title="Forks">
                                        <i class="fas fa-code-branch"></i>
                                        <span>${project.forks_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Fechar o slide
            slidesHTML += `
                        </div>
                    </div>
                </div>
            `;

            // Adicionar indicador
            indicatorsHTML += `
                <button type="button" data-bs-target="#projectsCarousel" data-bs-slide-to="${i}" ${
                i === 0 ? 'class="active" aria-current="true"' : ''
            } aria-label="Slide ${i + 1}"></button>
            `;
        }

        // Atualizar DOM
        projectsContainer.innerHTML = slidesHTML;

        // Adicionar os indicadores
        const carousel = document.getElementById('projectsCarousel');
        if (carousel) {
            // Criar o elemento div para os indicadores se ele não existir
            let indicatorsDiv = carousel.querySelector('.carousel-indicators');
            if (!indicatorsDiv) {
                indicatorsDiv = document.createElement('div');
                indicatorsDiv.className = 'carousel-indicators';
                carousel.insertBefore(indicatorsDiv, projectsContainer);
            }

            // Atualizar os indicadores
            indicatorsDiv.innerHTML = indicatorsHTML;

            // Reinicializar carrossel
            const carouselInstance = new bootstrap.Carousel(carousel, {
                interval: false, // Desativa a rolagem automática
            });
        }

        // Adicionar as classes para ativar as animações
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach((card) => {
                card.classList.add('active');
            });
        }, 100);
    }
}

/* ==================================================================================
   7. UTILITÁRIOS
   ================================================================================== */

/**
 * Retorna uma classe CSS segura para a linguagem
 */
function getSafeLanguageClass(language) {
    if (!language) return 'unknown';

    // Mapeamento de linguagens para classificações seguras em CSS
    const languageMapping = {
        'c++': 'cpp',
        'c#': 'csharp',
        // Adicione outros mapeamentos conforme necessário
    };

    const lowerLang = language.toLowerCase();

    // Verificar se a linguagem precisa ser mapeada
    if (languageMapping[lowerLang]) {
        return languageMapping[lowerLang];
    }

    // Remover caracteres especiais e espaços
    return lowerLang.replace(/[^a-z0-9]/g, '');
}

/**
 * Capitaliza a primeira letra de uma string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
