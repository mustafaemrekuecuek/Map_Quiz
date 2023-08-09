// Das map-Element und den Button mit der Klasse .btn auswählen
const map = document.querySelector("#map");
const btn = document.querySelector('.btn');

// Ein Array, um die Namen der ausgewählten Antworten zu speichern
let answerNames = [];

// Daten von http://localhost:3000/data abrufen
fetch('http://localhost:3000/data')
  .then(response => response.json()) // Die Antwort als JSON interpretieren
  .then(data => {
    answers = data.answers; // Die Antworten setzen
    countryData = data.countryData;
    // Namen den Antwortnamen zuweisen
    for(let i = 0; i < answers.length; i++) {
        answerNames.push(countryData[answers[i]].name);
    }
  
    // Die Funktion aufrufen, um das SVG zu aktualisieren
    newColorMap("#FFFF80");
    newColorStroke("black");

    updateSVG();
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
        const svgElements = svgDocument.querySelectorAll(`#${answers[i]} path, #${answers[i]} circle, #${answers[i]} rect`);

        svgElements.forEach(function(element) {
            element.setAttribute("fill", "green");
        });
    }
    // Den Fokus auf das Element mit der ID "eingabe" setzen
    document.getElementById("eingabe").focus();
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
  var newColorMap = color;
  // Prüfen, ob map.contentDocument existiert
  if (!map.contentDocument) return;

  // SVG-Dokument aus dem eingebetteten iframe holen
  const svgDocument = map.contentDocument;

  // CSS-Variable --map-color im :root-Pseudo-Element ändern
  svgDocument.documentElement.style.setProperty('--map-color', newColorMap);
}

function newColorStroke(color) {
  var newColorStroke = color;
  // Prüfen, ob map.contentDocument existiert
  if (!map.contentDocument) return;

  // SVG-Dokument aus dem eingebetteten iframe holen
  const svgDocument = map.contentDocument;

  // CSS-Variable --map-color im :root-Pseudo-Element ändern
  svgDocument.documentElement.style.setProperty('--stroke-color', newColorStroke);
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