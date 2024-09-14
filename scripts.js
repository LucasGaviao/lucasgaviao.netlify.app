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

class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
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
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
        event.preventDefault();
        if (!this.form.reportValidity()) {
          event.target.disabled = false;
          event.target.innerText = "Enviar";
          return; // Evita continuar se o formulário não for válido
        }
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
      }
  
    async sendForm(event) {
        this.onSubmission(event);
        if (!this.form.reportValidity()) {
            // Se o formulário for inválido, não tenta enviar
            return;
        }
        try{
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
                });
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                this.displaySuccess();
        }catch(error){
            this.displayError();
            console.error(error);
        }   
    }

  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });

  formSubmit.init();