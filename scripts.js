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

class FormSubmit{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form){
            this.url = this.form.getAttribute("action");
        }     
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }
    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.fields.querySelector("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event){
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event){
        try{
            this.onSubmission(event);
            await fetch(this.url, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
        }catch(error){
            throw new Error(error);

        }
    }
    init(){
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
            return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possivel enviar sua mensagem.</h1>",
});