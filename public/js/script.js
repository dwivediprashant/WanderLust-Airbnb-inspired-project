(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//-------flash alert code-------------------------
document.addEventListener("DOMContentLoaded", () => {
  const flashAlert = document.querySelector(".flash-alert");
  if (flashAlert) {
    setTimeout(() => {
      flashAlert.remove();
    }, 4000);
  }
});

//---------for tax toggler----------------
const taxInfo = document.querySelectorAll(".tax-info");
const taxToggler = document.querySelector("#switchCheckReverse");

taxToggler.addEventListener("click", () => {
  taxInfo.forEach((tax) => {
    if (taxToggler.checked) {
      tax.style.display = "inline"; // show
    } else {
      tax.style.display = "none"; // hide
    }
  });
});
