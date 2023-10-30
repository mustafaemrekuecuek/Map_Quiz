const map = document.querySelector("#map");

// Ein Array, um die Namen der ausgewählten Antworten zu speichern
let answerNames = [];

// Daten von http://localhost:3000/data abrufen
fetch('http://localhost:3000/data')
  .then(response => response.json()) // Die Antwort als JSON interpretieren
  .then(data => {
    answers = data.answers; // Die Antworten setzen
    countryData = data.countryData;
    countryID = data.countryID;

    console.log(countryData);
    // Namen den Antwortnamen zuweisen
    for(let i = 0; i < answers.length; i++) {
        answerNames.push(countryData[answers[i]].name);
    }

    function getID(name) {
      input = name;
      let id = "";
      for (let i = 0; i < countryID.length-1; i++) {
        if(input == countryData[countryID[i]].name){
          id = countryID[i];
        }
      }
      return id;
    }

    // Die Funktion aufrufen, um das SVG zu aktualisieren
    newColorMap("#FFFF80");
    updateSVG();

    const zelle = document.querySelectorAll(".hoverEffect");

    zelle.forEach(elements => {
    elements.addEventListener('click', function() {
      // Hier kannst du den Code platzieren, der ausgeführt wird, wenn über das Element geschwebt wird
        let input = this.textContent.trim();

        const countryCode = getID(input).toLowerCase();

        showCountry(countryCode);
      });
      function isObjectOutOfView(element) {
        var rect = element.getBoundingClientRect();
        return rect.bottom < 0 || rect.top > window.innerHeight;
      }
  
      if(isObjectOutOfView(document.getElementById("eingabe"))){
        document.getElementById("eingabe2").focus();
      } else {
        document.getElementById("eingabe").focus();
      }
    });
  })
  .catch(error => {
    console.error('Error:', error.message);
});

fetch('http://localhost:3000/gameover')
  .then(response => response.json()) // Die Antwort als JSON interpretieren
  .then(data => {
    gameover = data.gameover;
    // Namen den Antwortnamen zuweisen
    if(gameover == true) {
      newColorMap("red");
      newColorStroke("white");
    }
    // Die Funktion aufrufen, um das SVG zu aktualisieren
    updateSVG();
  })
  .catch(error => {
    console.error('Error:', error.message);
});

// Funktion zum Aktualisieren des SVGs
function updateSVG() {
    // Überprüfen, ob das SVG geladen ist
    if (!map.contentDocument) return;

    const svgDocument = map.contentDocument;

    // Die Farbe der SVG-Elemente der ausgewählten Antworten auf Grün ändern
    for(let i = 0; i < answers.length; i++) {
        let id = answers[i].toLowerCase();
        const svgElements = svgDocument.querySelectorAll(`.${id}`);
        svgElements.forEach(function(element) {
            element.classList.add("green");
        });
    }
}

// Die Funktion updateSVG aufrufen, wenn das SVG im iframe geladen ist
map.addEventListener('load', updateSVG);

// Funktion ausführen, wenn das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.getElementById("myNavbar");

  // Bei einem Scrollereignis den Zustand der Navbar anpassen
  window.addEventListener("scroll", function() {
      if (window.scrollY > navbar.clientHeight) {
          navbar.classList.add("fixed-top");
      } else {
          navbar.classList.remove("fixed-top");
      }
  });
});

function newColorMap(color) {
  // Prüfen, ob map.contentDocument existiert
  if (!map.contentDocument) return;

  const svgDocument = map.contentDocument;

      const svgElements = svgDocument.querySelectorAll(`.landxx`);
      svgElements.forEach(function(element) {
          element.classList.add(color);
      });
}

function newColorStroke(color) {
  var newColorStroke = color;
  // Prüfen, ob map.contentDocument existiert
  if (!map.contentDocument) return;

  const svgDocument = map.contentDocument;

      const svgElements = svgDocument.querySelectorAll(`.landxx`);
      svgElements.forEach(function(element) {
          element.classList.add(newColorStroke);
      });
}
const fadeOutElements = document.querySelectorAll(".fade-out");

// Füge die CSS-Klasse "hidden" hinzu, um die Opazität langsam auf 0 zu ändern
fadeOutElements.forEach(element => {
  element.classList.add("hidden");

  // Optional: Nachdem die Animation abgeschlossen ist, entferne die Klasse "fade-out"
  element.addEventListener("transitionend", function() {
    element.classList.remove("fade-out");
  });
});


function showCountry(countryCode) {
  // Überprüfen, ob das SVG geladen ist
  if (!map.contentDocument) return;
  console.log(countryCode);
  // Verweise auf das SVG-Dokument im <object>-Element
  const svgDocument = map.contentDocument;

  // Finde das SVG-Element mit der entsprechenden Klasse (z.B. "DE" für Deutschland)
  const svgElement = svgDocument.querySelectorAll(`.${countryCode}`);
    // Füge die Klasse "blue" hinzu (vorausgesetzt, "blue" ist im CSS definiert)
    svgElement.forEach(element => {
      element.style.animation = 'highlight 4s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 5000);
  });
}
