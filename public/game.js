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

//Timer
function updateTimer() {
    const timerElement = document.getElementById("timer");
    
    // Aktuelles Datum und Zeit
    const now = new Date();
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Führende Null hinzufügen, wenn nötig
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    // Timer aktualisieren
    timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Timer alle 1000ms (1 Sekunde) aktualisieren
setInterval(updateTimer, 1000);
