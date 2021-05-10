// Expresión regular para validar emails.
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmptyText = text => text.trim() === '';

// Creamos las funciones que nos indicarán si los inputs están correctamente
// rellenados.
const isInvalidName = (name) => name || !isEmptyText(name);
const isInvalidSurname = (surname) => surname || !isEmptyText(surname);
const isInvalidAge = (age) => age || parseInt(age) > 0;
const isInvalidEmail = (email) => emailRegex.test(email);

// Guardamos el formulario que queremos validar.
const form = document.getElementById('form');

/**
 * Creamos un array de objetos, y cada objeto estará compuesto por:
 *  - DOMId: id del input.
 *  - isInvalid: una función que comprueba si el input no es correcto.
 *  - errorMessage: mensaje de error que se mostrará en el input si se
 *    rellena erróneamente.
 */
const fields = [
  { DOMId: 'name', isInvalid: isInvalidName, errorMessage: 'Name cannot be empty' },
  { DOMId: 'surname', isInvalid: isInvalidSurname, errorMessage: 'Surname cannot be empty' },
  { DOMId: 'email', isInvalid: isInvalidEmail, errorMessage: 'Enter a valid email' },
  { DOMId: 'age', isInvalid: isInvalidAge, errorMessage: 'Age must be greater than 0' }
];

form.addEventListener('submit', (e) => {
  /**
   * Creamos un array vacío. En este array iremos guardando los campos que el
   * usuario rellene incorrectamente.
   */
  const errorFields = [];

  /**
   * Recorremos el array con los inputs de nuestro formulario para ir validando
   * uno a uno si sus valores son válidos o no.
   */
  fields.forEach(field => {
    const inputValue = document.getElementById(field.DOMId).value;

    // Si el input no es correcto, lo guardamos en el array de errores.
    if (!field.isInvalid(inputValue)) {
      errorFields.push({
        DOMId: field.DOMId,
        errorMessage: field.errorMessage
      });
    }
  });

  /**
   * Si el array de errores tiene una longitud mayor a cero, significa que al
   * menos hay un campo que el usuario ha rellenado incorrectamente. Evitamos
   * que el formulario se envíe y recorremos el array de errores para ir
   * mostrando al usuario qué errores ha cometido.
   */
  if (errorFields.length > 0) {
    e.preventDefault();

    errorFields.forEach(errorField => {
      // Añadimos al div que envuelve al input, el label y el error la clase
      // que se encargará de darle los estilos de error.
      document.getElementById(`${errorField.DOMId}-field`).classList.add('form__field--error');

      // Mostramos el mensaje de error debajo de cada input mal rellenado.
      document.querySelector(`[id='${errorField.DOMId}-field-error']`).textContent = errorField.errorMessage;
    });
  }
});

/**
 * Cuando hagamos foco en alguno de los elementos del formulario, comprobamos
 * si se está realizando sobre un input y procedemos a quitar la clase de error
 * al div que envuelve al input, label y mensaje de error. Esto lo hacemos para
 * que si el usuario ha enviado previamente el formulario y lo ha rellenado mal,
 * se le quiten los estilos de error cuando vaya a solucionarlo.
 */
form.addEventListener('focusin', (e) => {
  if (e.target.classList.contains('form__input')) {
    const fieldErrorId = `${e.target.id}-field-error`;
    const fieldId = `${e.target.id}-field`;

    document.getElementById(fieldId).classList.remove('form__field--error');
    document.getElementById(fieldErrorId).textContent = '';
  }
});
