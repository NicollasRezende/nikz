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
});

// Alternar entre tema claro e escuro
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

// Links ativos na navbar
function initNavbarActive() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

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
}

// Botão voltar ao topo
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
}

// Filtro de projetos
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            // Remover classe ativa de todos os botões
            filterBtns.forEach((btn) => btn.classList.remove('active'));

            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');

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

// Efeito de digitação
function initTypewriter() {
    const text = document.querySelector('.typewriter').textContent;
    const typewriterElement = document.querySelector('.typewriter');
    typewriterElement.textContent = '';

    let i = 0;
    function type() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 1000);
}

// Animações de scroll
function initScrollAnimation() {
    const elements = document.querySelectorAll(
        '.project-card, .skill-category, .contact-card, .about-text p, .stat-card'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((element) => {
        element.classList.add('fade-item');
        observer.observe(element);
    });
}

// Validação do formulário de contato
function initFormValidation() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obter valores dos campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Verificar se todos os campos estão preenchidos
            if (name && email && subject && message) {
                // Aqui você pode adicionar código para enviar o formulário via AJAX
                // Por enquanto, vamos apenas simular o envio
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                setTimeout(() => {
                    // Mostrar mensagem de sucesso
                    alert(
                        'Mensagem enviada com sucesso! Em breve entrarei em contato.'
                    );

                    // Resetar formulário
                    form.reset();

                    // Restaurar botão
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
}

// Adicionar CSS para animações de fade
const style = document.createElement('style');
style.textContent = `
    .fade-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Script para carregar projetos do GitHub dinamicamente (ajustado)
document.addEventListener('DOMContentLoaded', function () {
    const username = 'NicollasRezende'; // Seu username do GitHub
    const projectsPerSlide = 4; // Ajustado para exibir menos projetos por slide
    const maxProjects = 24; // Número máximo de projetos a serem carregados

    // Elementos DOM
    const projectsContainer = document.getElementById('projects-container');
    const languageButtons = document.getElementById('language-buttons');
    const carouselIndicators = document.getElementById('carousel-indicators');

    // Coleção para armazenar linguagens únicas
    let languages = new Set();
    // Array para armazenar todos os projetos
    let allProjects = [];
    // Linguagem de filtro atual
    let currentLanguage = 'all';

    // Mapeamento de linguagens para classificações seguras em CSS
    const languageMapping = {
        'c++': 'cpp',
        'c#': 'csharp',
        // Adicione outros mapeamentos conforme necessário
    };

    // Função para obter uma classe CSS segura para a linguagem
    function getSafeLanguageClass(language) {
        if (!language) return 'unknown';

        const lowerLang = language.toLowerCase();

        // Verificar se a linguagem precisa ser mapeada
        if (languageMapping[lowerLang]) {
            return languageMapping[lowerLang];
        }

        // Remover caracteres especiais e espaços
        return lowerLang.replace(/[^a-z0-9]/g, '');
    }

    // Função para buscar repositórios do GitHub
    async function fetchGitHubRepos() {
        try {
            // Mostrar estado de carregamento
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
            projectsContainer.innerHTML = `
                <div class="carousel-item active">
                    <div class="error-container">
                        <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                        <h3>Erro ao carregar projetos</h3>
                        <p>${
                            error.message ||
                            'Falha ao conectar com a API do GitHub'
                        }</p>
                        <button class="btn btn-primary mt-3" onclick="window.location.reload()">
                            <i class="fas fa-sync-alt me-2"></i>Tentar novamente
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Função para renderizar botões de filtro por linguagem
    function renderLanguageButtons() {
        let buttonsHTML = '';

        // Botão "Todos" já está no HTML

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

    // Manipulador de clique para botões de filtro
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

    // Função para renderizar projetos
    function renderProjects(projects) {
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
            carouselIndicators.innerHTML = '';
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

            // Iniciar o slide com uma nova div de projeto-grid
            slidesHTML += `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <div class="project-grid">
                        <div class="row g-3">
            `;

            // Adicionar projetos
            slideProjects.forEach((project) => {
                const languageClass = getSafeLanguageClass(project.language);

                slidesHTML += `
                    <div class="col-md-6">
                        <div class="project-card" data-language="${languageClass}">
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

            // Adicionar indicador no formato que o Bootstrap espera
            indicatorsHTML += `
                <button type="button" data-bs-target="#projectsCarousel" data-bs-slide-to="${i}" ${
                i === 0 ? 'class="active" aria-current="true"' : ''
            } aria-label="Slide ${i + 1}"></button>
            `;
        }

        // Atualizar DOM - Nota: Agora adicionamos os indicadores diretamente ao elemento do carrossel
        projectsContainer.innerHTML = slidesHTML;

        // Adicionar os indicadores antes do carrossel-inner
        const carousel = document.getElementById('projectsCarousel');

        // Criar o elemento div para os indicadores se ele não existir
        let indicatorsDiv = carousel.querySelector('.carousel-indicators');
        if (!indicatorsDiv) {
            indicatorsDiv = document.createElement('div');
            indicatorsDiv.className = 'carousel-indicators';
            carousel.insertBefore(indicatorsDiv, projectsContainer);
        }

        // Atualizar os indicadores
        indicatorsDiv.innerHTML = indicatorsHTML;

        // Reinicializar carrossel com a opção interval: false para desativar o deslizamento automático
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: false, // Desativa a rolagem automática
        });
    }

    // Função para renderizar uma linha de projetos
    function renderProjectRow(projects) {
        let rowHTML = '';

        projects.forEach((project) => {
            const languageClass = getSafeLanguageClass(project.language);

            rowHTML += `
                <div class="col-md-6">
                    <div class="project-card mb-4" data-language="${languageClass}">
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
                                    project.topics && project.topics.length > 0
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

        return rowHTML;
    }

    // Função auxiliar para capitalizar primeira letra
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Iniciar carregamento de repositórios
    fetchGitHubRepos();
});
