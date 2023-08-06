const map = document.querySelector("#map-container object");

fetch('http://localhost:3000/data')
  .then(response => response.json()) // Parsing the response as JSON
  .then(data => {
    answers = data.answers; // Setting the answers
    document.getElementById('haha').innerText = answers.join(", "); // Assuming answers is an array
    console.log(answers);

    // Call the function to update the SVG
    updateSVG();
  })
  .catch(error => {
    console.error('Error:', error);
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
}

map.addEventListener("load", updateSVG);
