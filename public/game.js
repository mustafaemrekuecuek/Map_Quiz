document.querySelector("#btn").addEventListener("click", function() {
        document.querySelector("#map-container object").addEventListener("load", function() {
            // Zugriff auf das SVG-Dokument
            var svgDocument = this.contentDocument;

            for(let i = 0; i < answers.length; i++) {
                // Nehmen wir an, Sie möchten alle path, circle und rect Elemente einfärben
                var svgElements = svgDocument.querySelectorAll(`#${answers[i]} path, #${answers[i]} circle, #${answers[i]} rect`);

                // Iterieren über die ausgewählten Elemente und setzen das fill-Attribut
                svgElements.forEach(function(element) {
                element.setAttribute("fill", "green");
                });
            }
            console.log(answers);
        })
});