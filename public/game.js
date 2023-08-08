const map = document.querySelector("#map");
const btn = document.querySelector('.btn');
let answerNames = [];

fetch('http://localhost:3000/data')
  .then(response => response.json()) // Parsing the response as JSON
  .then(data => {
    answers = data.answers; // Setting the answers
    countryData = data.countryData; 
    //Assign names to Answer Names
    for(let i = 0; i < answers.length; i++) {
        answerNames.push(countryData[answers[i]].name);
    }
    // Call the function to update the SVG
    updateSVG();
    console.log(answerNames)
  })
  .catch(error => {
    console.error('Error:', error.message);
});

function updateSVG() {
    // Check if SVG is loaded
    if (!map.contentDocument) return;

    const svgDocument = map.contentDocument;

    for(let i = 0; i < answers.length; i++) {
        const svgElements = svgDocument.querySelectorAll(`#${answers[i]} path, #${answers[i]} circle, #${answers[i]} rect`);

        svgElements.forEach(function(element) {
            element.setAttribute("fill", "green");
        });
    }
    document.getElementById("eingabe").focus();
  }

map.addEventListener('load', updateSVG);

document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.getElementById("myNavbar");

  window.addEventListener("scroll", function() {
      if (window.scrollY > navbar.clientHeight) {
          navbar.classList.add("fixed-top");
      } else {
          navbar.classList.remove("fixed-top");
      }
  });
});


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