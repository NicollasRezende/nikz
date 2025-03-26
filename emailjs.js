/**
 * EmailJS - Integração com o formulário de contato
 */

// Configurações do EmailJS
const SERVICE_ID = 'service_ziq2y93';
const TEMPLATE_ID = 'template_avhebkn';
const USER_ID = 'fbuS5hV8q8lXF8dMP';

// Inicializar EmailJS quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(USER_ID);
        console.log('EmailJS inicializado com sucesso');

        // Definir uma flag global para indicar que o EmailJS está gerenciando o formulário
        window.emailJSInitialized = true;

        // Inicializar o formulário de contato
        initContactForm();
    } else {
        console.error(
            'EmailJS não carregado. Verifique a conexão com a internet ou se o script foi adicionado ao HTML.'
        );
    }
});

/**
 * Inicializa o formulário de contato com validação e envio via EmailJS
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Remover todos os event listeners anteriores do formulário (se houver)
    const clonedForm = form.cloneNode(true);
    form.parentNode.replaceChild(clonedForm, form);

    // Agora trabalhamos com o formulário limpo sem event listeners
    const newForm = document.getElementById('contact-form');

    // Adicionar validação ao formulário
    newForm.classList.add('needs-validation');

    // Validação em tempo real
    const formFields = newForm.querySelectorAll('.form-control');
    formFields.forEach((field) => {
        field.addEventListener('input', function () {
            validateField(this);
        });

        field.addEventListener('blur', function () {
            validateField(this);
        });
    });

    // Manipular envio do formulário
    newForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Verificar validade
        if (!this.checkValidity()) {
            e.stopPropagation();

            // Destacar campos inválidos
            formFields.forEach((field) => {
                validateField(field);
            });

            // Animação de shake no formulário
            this.classList.add('shake-animation');
            setTimeout(() => {
                this.classList.remove('shake-animation');
            }, 500);

            return;
        }

        // Coletar dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Enviar email
        sendEmail(name, email, subject, message, newForm);
    });
}

/**
 * Valida um campo individual
 */
function validateField(field) {
    if (field.checkValidity()) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

/**
 * Envia o email usando EmailJS
 */
function sendEmail(name, email, subject, message, form) {
    // Obter o botão de envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Mostrar estado de carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

    // Remover qualquer mensagem anterior (se houver)
    const existingMessages = document.querySelectorAll(
        '.form-success, .alert-danger'
    );
    existingMessages.forEach((msg) => msg.remove());

    // Preparar dados para o template
    const templateParams = {
        name: name,
        from_email: email,
        subject: subject,
        message: message,
        time: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
    };

    // Enviar email
    emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('Email enviado com sucesso!', response);

            // Mostrar mensagem de sucesso
            showSuccessMessage(form, submitBtn, originalBtnText);

            // Limpar formulário
            form.reset();
            form.querySelectorAll('.form-control').forEach((input) => {
                input.classList.remove('is-valid');
            });
        })
        .catch(function (error) {
            console.error('Erro ao enviar email:', error);

            // Mostrar mensagem de erro
            showErrorMessage(form, submitBtn, originalBtnText);
        });
}

/**
 * Mostra mensagem de sucesso
 */
function showSuccessMessage(form, submitBtn, originalBtnText) {
    // Criar elemento de mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success mt-3 alert alert-success';
    successMessage.innerHTML =
        '<i class="fas fa-check-circle me-2"></i>Mensagem enviada com sucesso! Entrarei em contato em breve.';

    // Adicionar à página
    submitBtn.parentNode.insertAdjacentElement('afterend', successMessage);

    // Animar entrada
    setTimeout(() => {
        successMessage.classList.add('active');
    }, 10);

    // Atualizar texto do botão
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviado!';

    // Restaurar estado original após um tempo
    setTimeout(() => {
        submitBtn.textContent = originalBtnText;

        // Remover mensagem
        successMessage.classList.remove('active');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 3000);
}

/**
 * Mostra mensagem de erro
 */
function showErrorMessage(form, submitBtn, originalBtnText) {
    // Criar elemento de mensagem de erro
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-3';
    errorMessage.innerHTML =
        '<i class="fas fa-exclamation-circle me-2"></i>Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.';

    // Adicionar à página
    submitBtn.parentNode.insertAdjacentElement('afterend', errorMessage);

    // Restaurar estado do botão
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;

    // Remover mensagem após um tempo
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
