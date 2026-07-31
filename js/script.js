// Captura o formulário de contato do HTML através do seu ID
const form = document.getElementById('contact-form');

// Adiciona um "ouvinte de evento" que detecta quando o usuário tenta submeter o formulário
form.addEventListener('submit', function(event) {
    // event.preventDefault() previne o comportamento padrão do navegador de recarregar a página ao enviar o formulário
    event.preventDefault(); 

    // Captura os valores digitados nos campos. 
    // O método .trim() remove espaços em branco acidentais no início e no final do texto.
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Expressão Regular (Regex) básica para verificar o padrão de e-mail.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Etapa de Validação 1: Verifica se há algum campo obrigatório em branco
    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return; // O return interrompe a execução do script aqui, impedindo o envio falso
    }

    // Etapa de Validação 2: Verifica se a estrutura do e-mail é compatível com o Regex definido
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).');
        return;
    }

    // --- LÓGICA DE ENVIO DIRETO (FORMSPREE) ---
    
    // Altera visualmente o botão para dar feedback ao usuário
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.innerText = 'Enviando...';

    // Captura todos os campos e valores do formulário
    const formData = new FormData(form);

    // O seu endpoint exclusivo do Formspree
    const endpoint = 'https://formspree.io/f/xbdnvrzn';

    // Dispara a requisição de forma invisível (AJAX)
    fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Sucesso!
            alert('Mensagem enviada com sucesso! Obrigado pelo contato, ' + nome + '.');
            form.reset(); // Limpa todos os campos do formulário para um novo preenchimento
        } else {
            // Erro na resposta da API
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        }
    })
    .catch(error => {
        // Erro de rede (ex: usuário sem internet)
        alert('Erro de conexão. Verifique sua internet e tente novamente.');
    })
    .finally(() => {
        // Restaura o texto do botão, independentemente de dar erro ou sucesso
        btnSubmit.innerText = textoOriginal;
    });
});

// Funcionalidade Adicional: Botão para Alternar Tema Claro/Escuro
const themeToggleBtn = document.getElementById('theme-toggle');

// Ouve o clique no botão do menu
themeToggleBtn.addEventListener('click', function() {
    // Busca o atributo data-theme na tag <html> (o elemento root do documento)
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Se o tema atual for escuro, ele remove o atributo (voltando para as cores claras padrão)
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        // Se for claro, ele injeta data-theme="dark", ativando a sobrescrita de variáveis no CSS
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});
