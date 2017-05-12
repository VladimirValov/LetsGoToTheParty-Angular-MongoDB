submitBtn.onclick =  function () {
  console.log("Submit");

  let data = {
    "youGo" : go.value,
    "youDrink" : drink.value,
    "youName" : people.value
  }

console.log( data );
sendDataXhr( data );
}

function sendDataXhr( data ) {
  let xhr = new XMLHttpRequest ();

  xhr.open('POST','/save');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
  xhr.send( JSON.stringify(data) );
}





/*
<script>
    function showError(container, errorMessage) {
      container.className = 'error';
      var msgElem = document.createElement('span');
      msgElem.className = "error-message";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
    }

    function resetError(container) {
      container.className = '';
      if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
      }
    }

    function validate(form) {
      var elems = form.elements;

      resetError(elems.from.parentNode);
      if (!elems.from.value) {
        showError(elems.from.parentNode, ' Укажите от кого.');
      }

      resetError(elems.password.parentNode);
      if (!elems.password.value) {
        showError(elems.password.parentNode, ' Укажите пароль.');
      } else if (elems.password.value != elems.password2.value) {
        showError(elems.password.parentNode, ' Пароли не совпадают.');
      }

      resetError(elems.to.parentNode);
      if (!elems.to.value) {
        showError(elems.to.parentNode, ' Укажите, куда.');
      }

      resetError(elems.message.parentNode);
      if (!elems.message.value) {
        showError(elems.message.parentNode, ' Отсутствует текст.');
      }

    }
*/
