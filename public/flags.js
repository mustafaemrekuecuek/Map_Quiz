// Ein Array, um die Namen der ausgewählten Antworten zu speichern
let answersFlag = [];
// Daten von http://localhost:3000/ abrufen
fetch('http://localhost:3000/flags-data')
  .then(response => response.json())
  .then(data => {
    var countryData = data.countryData;
    var countryID = data.countryID;
    
    let inputElements = document.querySelectorAll(".inputFlag");

    for(var i = 0; i < inputElements.length; i++){
        let currentElement = inputElements[i];
        let id = inputElements[i].id;

        currentElement.addEventListener("input", function() {
            if(currentElement.value == countryData[id].name) {
                currentElement.disabled = true;
            }
        })
        inputElements[i+1].focus();
    };
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
