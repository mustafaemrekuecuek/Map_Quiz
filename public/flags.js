// Ein Array, um die Namen der ausgewählten Antworten zu speichern
var answersFlag = [];
// Daten von http://localhost:3000/ abrufen
fetch('http://localhost:3000/flags-data')
  .then(response => response.json())
  .then(data => {
    var countryData = data.countryData;
    var countryID = data.countryID;
    answersFlag = data.answersFlag;
    let inputElements = document.querySelectorAll(".inputFlag");

    for(var i = 0; i < inputElements.length; i++){
        let currentElement = inputElements[i];
        let nextElement = inputElements[i+1];
        let id = inputElements[i].id;

        for(let j = 0; j < answersFlag.length; j++){
          if(answersFlag[j] == countryData[id].name) {
            currentElement.value = countryData[id].name;
            currentElement.classList.add("input-correct");
            currentElement.disabled = true;
          }
        }
        currentElement.addEventListener("input", function() {
            if(currentElement.value.toLowerCase() == countryData[id].name.toLowerCase() && !answersFlag.includes(currentElement.value)) {
                currentElement.value = countryData[id].name;
                currentElement.classList.add("input-correct");
                currentElement.disabled = true;
                answersFlag.push(countryData[id].name);
                nextElement.focus();
            }
        })
    };
    inputElements.forEach(input => {
      input.addEventListener("focus", function() {
        input.classList.add("focus")
    });
      input.addEventListener("blur", function() {
        input.classList.remove("focus");
      });
    });
  })
  .catch(error => {
    console.error('Error:', error.message);
  });


  window.addEventListener("beforeunload", function(event) {
    const dataToSend = { answersFlag: answersFlag };
  
    // Verwende die fetch()-API, um die Daten zu senden
    fetch("/flags-save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      // Hier könntest du auf die Serverantwort reagieren
    })
    .catch(error => {
      console.error("Fehler beim Senden der Daten:", error);
    });
  
    event.returnValue = "Möchten Sie die Seite wirklich verlassen?";
  });
console.log(answersFlag);