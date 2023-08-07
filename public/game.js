const map = document.querySelector("#map");

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

