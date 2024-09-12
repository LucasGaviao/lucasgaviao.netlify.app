const $html = document.querySelector('html')
const $theme_button = document.querySelector('#theme-button')

function change_theme(){
    $html.classList.toggle('light-mode')

    // Alterna o texto do botão
    if ($theme_button.textContent === 'Light') {
        $theme_button.textContent = 'Dark'
    } else {
        $theme_button.textContent = 'Light'
    }
}

$theme_button.addEventListener('click', change_theme)

function alerta(){
    alert("Esta funcionalidade está incompleta desculpe pelo transtorno.");
}

// nao esta sendo usado
function perguntar(){
    var nome;
    nome = prompt("Qual é o seu nome? ");
    alert("Olá " + nome);
}
