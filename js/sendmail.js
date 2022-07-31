function clearForm() {
  const name = (document.getElementById("name").value = "");
  const email = (document.getElementById("email").value = "");
  const sub = (document.getElementById("subject").value = "");
  const msg = (document.getElementById("message").value = "");
}

function showError(error, alrt) {
  const card = document.querySelector(".send-form");
  const head = document.querySelector(".contact-form");

  const errordiv = document.createElement("div");

  errordiv.className = alrt;
  errordiv.appendChild(document.createTextNode(error));
  card.insertBefore(errordiv, head);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const sub = document.getElementById("subject").value;
    const msg = document.getElementById("message").value;

    // generate a five digit number for the contact_number variable
    if (name != "" && email != "" && sub != "" && msg != "") {
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm("service_jqqodmg", "template_3d56csi", this).then(
        function () {
          console.log("SUCCESS!");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      showError("Received! Thanks for your message", "alert alert-success");
      clearForm();
    } else {
      showError("Fields Cannot be Empty!", "alert alert-danger");
    }
  });
