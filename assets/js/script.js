let language = navigator.language.startsWith("es") ? "es" : "en";

(function () {
  emailjs.init("_DMo6GOUm3AqMXs2_");
})();

const form = document.getElementById("contactForm");
const button = document.getElementById("submitButton");

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(button);
    button.textContent = language === "es" ? "Enviando..." : "Sending...";
    button.disabled = true;

    var templateParams = {
      from_name: event.target.elements[0].value,
      email: event.target.elements[1].value,
      message: event.target.elements[2].value,
    };

    emailjs.send("service_c0v1mep", "template_lxxicf1", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        button.textContent = language === "es" ? "Enviar" : "Send";
        button.disabled = false;
        form.reset();
        alert(
          language === "es"
            ? "Gracias por contactarnos. Nos pondremos en contacto contigo."
            : "Thank you for contacting us. We will get in touch with you soon."
        );
      },
      (error) => {
        button.value = language === "es" ? "Enviar" : "Send";
        button.disabled = false;
        console.log("FAILED...", error);
        form.reset();
        alert(
          language === "es"
            ? "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente."
            : "There was an error sending your message. Please try again."
        );
      }
    );
  });

const phrases_es = [
  "🚨 Muchos paros de producción",
  "🔧 Calidad defectuosa en el producto",
  "📊 Falta de datos en tiempo real",
  "🌐 Dificultad de integración con otros sistemas",
  "⚠️ Cumplimiento regulatorio deficiente",
];

const phrases_en = [
  "🚨 Many production downtimes",
  "🔧 Defective product quality",
  "📊 Lack of real-time data",
  "🌐 Difficulty integrating with other systems",
  "⚠️ Poor regulatory compliance",
];

let currentIndex = 0;
const bannerElement = document.querySelector("#banner .phrase");

function updateBanner() {
  bannerElement.style.opacity = "0";
  setTimeout(() => {
    bannerElement.textContent =
      language === "es" ? phrases_es[currentIndex] : phrases_en[currentIndex];
    bannerElement.style.opacity = "1";
    const length = language === "es" ? phrases_es.length : phrases_en.length;
    currentIndex = (currentIndex + 1) % length;
  }, 1000);
}

// Inicializar el banner
bannerElement.textContent =
  language === "es" ? phrases_es[currentIndex] : phrases_en[currentIndex];
bannerElement.style.opacity = "1";
const length = language === "es" ? phrases_es.length : phrases_en.length;
currentIndex = (currentIndex + 1) % length;

// Cambiar la frase cada 5 segundos
setInterval(updateBanner, 3000);

const scrollButton = document.getElementsByClassName("floating-btn")[0];

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollButton.classList.remove("hidden");
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
    scrollButton.classList.add("hidden");
  }
});
