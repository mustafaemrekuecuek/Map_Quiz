import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let answers = [];
let answersName = [];
let anzahlLastAnswers = 5;
let gameover = false;
let answersFlag = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.render("index.ejs", {
        answers: [],
        countryData: countryData,
        answersName: [],
        input: "",
        cardAnswers: [],
        success: false,
        gameover: gameover,
    });
});


// Route für die zweite Seite
app.get('/flags', (req, res) => {
    res.render('flags.ejs', {
        answersFlag: answersFlag,
        countryData: countryData,
        countryID: countryID,
    });
  });

app.post("/flags-save", (req, res) => {
   answersFlag = req.body.answersFlag; // Hier erhältst du das Array vom Client
   
   const response = { message: "Array erfolgreich empfangen" };
   res.json(response);
});

app.post("/reset", (req,res) => {
    gameover = false;
    answers = [];
    answersName = [];
    res.redirect("/");
});


app.post("/data", function (req,res,next) {
    let input = req.body.land.toLowerCase();
    let success = false;
    
    if(gameover){
        answers = [];
        answersName = [];
    }

    gameover = false;

    if (!(input.length > 2)){
        input = "";
    }

    for(let i = 0; i < countryData.length;i++){
        const altNames = countryData[i].altnames ? countryData[i].altnames.toLowerCase() : 'noAltname';
        if((countryData[i].name.toLowerCase() == input || altNames == input) && !answers.includes(countryID[i])){
            answers.push(countryID[i]);
            answersName.push(countryData[i].name);
            success = true;
        }
    }
    let cardAnswers = answersName.slice(-anzahlLastAnswers).reverse();
    res.render("index.ejs", {
        answers: answers,
        countryData: countryData,
        answersName: answersName,
        input: input,
        cardAnswers: cardAnswers,
        success: success,
        gameover: gameover,
    });
    next();
});

app.post("/gameover", function (req,res,next) {
    let cardAnswers = answersName.slice(-anzahlLastAnswers).reverse();
    gameover = true;
    res.render("index.ejs", {
        answers: answers,
        countryData: countryData,
        answersName: answersName,
        input: "Game Over",
        cardAnswers: cardAnswers,
        success: false,
        gameover: gameover,
    });
});

app.get("/data", (req, res) => {
    res.json({ answers: answers, countryData: countryDataJSON_ENG,countryID: countryID, gameover: gameover});
});

app.get("/gameover", (req, res) => {
    res.json({ countryData: countryDataJSON_ENG, gameover: gameover, });
});

app.get("/flags-data", (req, res) => {
    res.json({answers: [], countryData: countryDataJSON_ENG, countryID: countryID, answersFlag: answersFlag});
});

app.listen(3000, () => {
    console.log("Server running on port " + port);
});


var countryDataJSON_ENG = { 
    "AD": { "name": "Andorra", "region": "EU" }, "AE": { "name": "United Arab Emirates","altnames": "UAE", "region": "AS" }, "AF": { "name": "Afghanistan", "region": "AS" }, "AG": { "name": "Antigua and Barbuda", "region": "NA" }, "AL": { "name": "Albania", "region": "EU" }, "AM": { "name": "Armenia", "region": "AS" }, "AO": { "name": "Angola", "region": "AF" }, "AR": { "name": "Argentina", "region": "SA" }, "AT": { "name": "Austria", "region": "EU" }, "AU": { "name": "Australia", "region": "OC" }, "AW": { "name": "Aruba", "region": "SA" }, "AZ": { "name": "Azerbaijan", "region": "AS" }, 
    "BA": { "name": "Bosnia and Herzegovina","altnames": "BoH", "region": "EU" }, "BB": { "name": "Barbados", "region": "SA" }, "BD": { "name": "Bangladesh", "region": "AS" }, "BE": { "name": "Belgium", "region": "EU" }, "BF": { "name": "Burkina Faso", "region": "AF" }, "BG": { "name": "Bulgaria", "region": "EU" }, "BH": { "name": "Bahrain", "region": "AS" }, "BI": { "name": "Burundi", "region": "AF" }, "BJ": { "name": "Benin", "region": "AF" }, "BN": { "name": "Brunei", "region": "AS" }, "BO": { "name": "Bolivia", "region": "SA" }, "BR": { "name": "Brazil", "region": "SA" }, "BS": { "name": "Bahamas", "region": "NA" }, "BT": { "name": "Bhutan", "region": "AS" }, "BW": { "name": "Botswana", "region": "AF" }, "BY": { "name": "Belarus", "region": "EU" }, "BZ": { "name": "Belize", "region": "NA" }, 
    "CA": { "name": "Canada", "region": "NA" }, "CD": { "name": "Congo DR", "altnames": "Democratic Republic of the Congo,DR Congo", "region": "AF" }, "CF": { "name": "Central African Republic", "region": "AF" }, "CG": { "name": "Congo", "altnames": "Republic of the Congo", "region": "AF" }, "CH": { "name": "Switzerland", "region": "EU" }, "CI": { "name": "Ivory Coast", "altnames": "Ivory Coast", "region": "AF" }, "CL": { "name": "Chile", "region": "SA" }, "CM": { "name": "Cameroon", "region": "AF" }, "CN": { "name": "China", "region": "AS" }, "CO": { "name": "Colombia", "region": "SA" }, "CR": { "name": "Costa Rica", "region": "NA" }, "CU": { "name": "Cuba", "region": "NA" }, "CV": { "name": "Cabo Verde", "altnames": "Cape Verde", "region": "AF" }, "CW": { "name": "Curaçao", "region": "SA" }, "CY": { "name": "Cyprus", "region": "EU" }, "CZ": { "name": "Czechia", "altnames": "Czech Republic", "region": "EU" }, 
    "DE": { "name": "Germany", "region": "EU" }, "DJ": { "name": "Djibouti", "region": "AF" }, "DK": { "name": "Denmark", "region": "EU" }, "DM": { "name": "Dominica", "region": "NA" }, "DO": { "name": "Dominican Republic","altnames": "DomRep", "region": "NA" }, "DZ": { "name": "Algeria", "region": "AF" }, 
    "EC": { "name": "Ecuador", "region": "SA" }, "EE": { "name": "Estonia", "region": "EU" }, "EG": { "name": "Egypt", "region": "AF" }, "ER": { "name": "Eritrea", "region": "AF" }, "ES": { "name": "Spain", "region": "EU" }, "ET": { "name": "Ethiopia", "region": "AF" }, 
    "FI": { "name": "Finland", "region": "EU" }, "FJ": { "name": "Fiji", "region": "OC" }, "FM": { "name": "Micronesia", "region": "OC" }, "FO": { "name": "Faroe Islands", "region": "EU" }, "FR": { "name": "France", "region": "EU" }, 
    "GA": { "name": "Gabon", "region": "AF" }, "GB": { "name": "United Kingdom","altnames": "UK", "region": "EU" }, "GD": { "name": "Grenada", "region": "NA" }, "GE": { "name": "Georgia", "region": "AS" }, "GH": { "name": "Ghana", "region": "AF" }, "GI": { "name": "Gibraltar", "region": "EU" }, "GL": { "name": "Greenland", "region": "NA" }, "GM": { "name": "Gambia", "region": "AF" }, "GN": { "name": "Guinea", "region": "AF" }, "GQ": { "name": "Equatorial Guinea", "region": "AF" }, "GR": { "name": "Greece", "region": "EU" }, "GT": { "name": "Guatemala", "region": "NA" }, "GW": { "name": "Guinea-Bissau", "region": "AF" }, "GY": { "name": "Guyana", "region": "SA" }, 
    "HK": { "name": "Hong Kong", "region": "AS" }, "HN": { "name": "Honduras", "region": "NA" }, "HR": { "name": "Croatia", "region": "EU" }, "HT": { "name": "Haiti", "region": "NA" }, "HU": { "name": "Hungary", "region": "EU" }, 
    "ID": { "name": "Indonesia", "region": "AS" }, "IE": { "name": "Ireland", "region": "EU" }, "IL": { "name": "Israel", "region": "AS" }, "IN": { "name": "India", "region": "AS" }, "IQ": { "name": "Iraq", "region": "AS" }, "IR": { "name": "Iran", "region": "AS" }, "IS": { "name": "Iceland", "region": "EU" }, "IT": { "name": "Italy", "region": "EU" }, 
    "JM": { "name": "Jamaica", "region": "NA" }, "JO": { "name": "Jordan", "region": "AS" }, "JP": { "name": "Japan", "region": "AS" }, 
    "KE": { "name": "Kenya", "region": "AF" }, "KG": { "name": "Kyrgyzstan", "region": "AS" }, "KH": { "name": "Cambodia", "region": "AS" }, "KI": { "name": "Kiribati", "region": "OC" }, "KM": { "name": "Comoros", "region": "AF" }, "KN": { "name": "Saint Kitts and Nevis","altnames": "St. Kitts and Nevis", "region": "NA" }, "KP": { "name": "North Korea", "region": "AS" }, "KR": { "name": "South Korea", "region": "AS" }, "KW": { "name": "Kuwait", "region": "AS" }, "KZ": { "name": "Kazakhstan", "region": "AS" }, 
    "LA": { "name": "Laos", "region": "AS" }, "LB": { "name": "Lebanon", "region": "AS" }, "LC": { "name": "Saint Lucia","altnames": "St. Lucia", "region": "NA" }, "LI": { "name": "Liechtenstein", "region": "EU" }, "LK": { "name": "Sri Lanka", "region": "AS" }, "LR": { "name": "Liberia", "region": "AF" }, "LS": { "name": "Lesotho", "region": "AF" }, "LT": { "name": "Lithuania", "region": "EU" }, "LU": { "name": "Luxembourg", "region": "EU" }, "LV": { "name": "Latvia", "region": "EU" }, "LY": { "name": "Libya", "region": "AF" }, 
    "MA": { "name": "Morocco", "region": "AF" }, "MC": { "name": "Monaco", "region": "EU" }, "MD": { "name": "Moldova", "region": "EU" }, "ME": { "name": "Montenegro", "region": "EU" }, "MG": { "name": "Madagascar", "region": "AF" }, "MH": { "name": "Marshall Islands", "region": "OC" }, "MK": { "name": "North Macedonia", "region": "EU" }, "ML": { "name": "Mali", "region": "AF" }, "MM": { "name": "Myanmar", "region": "AS" }, "MN": { "name": "Mongolia", "region": "AS" }, "MO": { "name": "Macao", "region": "AS" }, "MR": { "name": "Mauritania", "region": "AF" }, "MT": { "name": "Malta", "region": "EU" }, "MU": { "name": "Mauritius", "region": "AF" }, "MV": { "name": "Maldives", "region": "AS" }, "MW": { "name": "Malawi", "region": "AF" }, "MX": { "name": "Mexico", "region": "NA" }, "MY": { "name": "Malaysia", "region": "AS" }, "MZ": { "name": "Mozambique", "region": "AF" }, 
    "NA": { "name": "Namibia", "region": "AF" }, "NE": { "name": "Niger", "region": "AF" }, "NG": { "name": "Nigeria", "region": "AF" }, "NI": { "name": "Nicaragua", "region": "NA" }, "NL": { "name": "Netherlands", "region": "EU" }, "NO": { "name": "Norway", "region": "EU" }, "NP": { "name": "Nepal", "region": "AS" }, "NR": { "name": "Nauru", "region": "OC" }, "NZ": { "name": "New Zealand", "region": "OC" }, 
    "OM": { "name": "Oman", "region": "AS" }, 
    "PA": { "name": "Panama", "region": "NA" }, "PE": { "name": "Peru", "region": "SA" }, "PF": { "name": "French Polynesia", "region": "OC" }, "PG": { "name": "Papua New Guinea", "region": "OC" }, "PH": { "name": "Philippines", "region": "AS" }, "PK": { "name": "Pakistan", "region": "AS" }, "PL": { "name": "Poland", "region": "EU" }, "PR": { "name": "Puerto Rico", "region": "NA" }, "PS": { "name": "Palestine", "altnames": "State of Palestine", "region": "AS" }, "PT": { "name": "Portugal", "region": "EU" }, "PW": { "name": "Palau", "region": "OC" }, "PY": { "name": "Paraguay", "region": "SA" }, 
    "QA": { "name": "Qatar", "region": "AS" }, "RO": { "name": "Romania", "region": "EU" }, "RS": { "name": "Serbia", "region": "EU" }, "RU": { "name": "Russia", "region": "EU" }, "RW": { "name": "Rwanda", "region": "AF" }, 
    "SA": { "name": "Saudi Arabia", "region": "AS" }, "SB": { "name": "Solomon Islands", "region": "OC" }, "SC": { "name": "Seychelles", "region": "AF" }, "SD": { "name": "Sudan", "region": "AF" }, "SE": { "name": "Sweden", "region": "EU" }, "SG": { "name": "Singapore", "region": "AS" }, "SI": { "name": "Slovenia", "region": "EU" }, "SK": { "name": "Slovakia", "region": "EU" }, "SL": { "name": "Sierra Leone", "region": "AF" }, "SM": { "name": "San Marino", "region": "EU" }, "SN": { "name": "Senegal", "region": "AF" }, "SO": { "name": "Somalia", "region": "AF" }, "SR": { "name": "Suriname", "region": "SA" }, "SS": { "name": "South Sudan", "region": "AF" }, "ST": { "name": "Sao Tome and Principe", "altnames": "São Tomé and Príncipe", "region": "AF" }, "SV": { "name": "El Salvador", "region": "NA" }, "SY": { "name": "Syria", "altnames": "Syrian Arab Republic", "region": "AS" }, "SZ": { "name": "Eswatini", "altnames": "Swaziland", "region": "AF" }, 
    "TD": { "name": "Chad", "region": "AF" }, "TG": { "name": "Togo", "region": "AF" }, "TH": { "name": "Thailand", "region": "AS" }, "TJ": { "name": "Tajikistan", "region": "AS" }, "TL": { "name": "Timor-Leste","altnames": "East-Timor", "region": "AS" }, "TM": { "name": "Turkmenistan", "region": "AS" }, "TN": { "name": "Tunisia", "region": "AF" }, "TO": { "name": "Tonga", "region": "AF" }, "TR": { "name": "Turkey","altnames": "Türkiye", "region": "AS" }, "TT": { "name": "Trinidad and Tobago", "region": "NA" }, "TV": { "name": "Tuvalu", "region": "OC" }, "TW": { "name": "Taiwan", "region": "AS" }, "TZ": { "name": "Tanzania", "region": "AF" }, 
    "UA": { "name": "Ukraine", "region": "EU" }, "UG": { "name": "Uganda", "region": "AF" }, "US": { "name": "United States","altnames": "USA", "region": "NA" }, "UY": { "name": "Uruguay", "region": "SA" }, "UZ": { "name": "Uzbekistan", "region": "AS" }, 
    "VA": { "name": "Vatican", "region": "EU" }, "VC": { "name": "Saint Vincent and the Grenadines", "altNames": "St. Vincent and the Grenadines", "region": "NA" }, "VE": { "name": "Venezuela", "region": "SA" }, "VN": { "name": "Viet Nam", "altnames": "Vietnam", "region": "AS" }, "VU": { "name": "Vanuatu", "region": "OC" }, 
    "WF": { "name": "Wallis and Futuna", "region": "OC" }, "WS": { "name": "Samoa", "region": "OC" }, 
    "XK": { "name": "Kosovo", "region": "EU" }, 
    "YE": { "name": "Yemen", "region": "AS" }, 
    "ZA": { "name": "South Africa", "region": "AF" }, "ZM": { "name": "Zambia", "region": "AF" }, "ZW": { "name": "Zimbabwe", "region": "AF" }
};

var countryDataJSON_GER = {
    "AD": {"name": "Andorra", "region": "EU" }, "AE": { "name": "Vereinigte Arabische Emirate", "altnames": "UAE", "region": "AS" }, "AF": {"name": "Afghanistan", "region": "AS" }, "AG": { "name": "Antigua und Barbuda", "region": "NA" }, "AL": { "name": "Albanien", "region": "EU" }, "AM": { "name": "Armenien", "region": "AS" }, "AO": { "name": "Angola", "region": "AF" }, "AR": { "name": "Argentinien", "region": "SA" }, "AT": { "name": "Österreich", "region": "EU" }, "AU": { "name": "Australien", "region": "OC" }, "AW": { "name": "Aruba", "region": "SA" }, "AZ": { "name": "Aserbaidschan", "region": "AS" }, 
    "BA": { "name": "Bosnien und Herzegowina", "altnames": "BoH", "region": "EU" }, "BB": {"name": "Barbados", "region": "SA" }, "BD": { "name": "Bangladesch", "region": "AS" }, "BE": { "name": "Belgien", "region": "EU" }, "BF": { "name": "Burkina Faso", "region": "AF" }, "BG": { "name": "Bulgarien", "region": "EU" }, "BH": { "name": "Bahrain", "region": "AS" }, "BI": { "name": "Burundi", "region": "AF" }, "BJ": { "name": "Benin", "region": "AF" }, "BN": { "name": "Brunei", "region": "AS" }, "BO": { "name": "Bolivien", "region": "SA" }, "BR": { "name": "Brasilien", "region": "SA" }, "BS": { "name": "Bahamas", "region": "NA" }, "BT": { "name": "Bhutan", "region": "AS" }, "BW": { "name": "Botswana", "region": "AF" }, "BY": { "name": "Belarus", "region": "EU" }, "BZ": { "name": "Belize", "region": "NA" }, 
    "CA": { "name": "Kanada", "region": "NA" }, "CD": { "name": "Kongo DR", "altnames": "Demokratische Republik Kongo, DR Kongo", "region": "AF" }, "CF": { "name": "Zentralafrikanische Republik", "region": "AF" }, "CG": { "name": "Kongo", "altnames": "Republik Kongo", "region": "AF" }, "CH": { "name": "Schweiz", "region": "EU" }, "CI": { "name": "Elfenbeinküste", "altnames": "Elfenbeinküste", "region": "AF" }, "CL": { "name": "Chile", "region": "SA" }, "CM": { "name": "Kamerun", "region": "AF" }, "CN": { "name": "China", "region": "AS" }, "CO": { "name": "Kolumbien", "region": "SA" }, "CR": { "name": "Costa Rica", "region": "NA" }, "CU": { "name": "Kuba", "region": "NA" }, "CV": { "name": "Cabo Verde", "altnames": "Kap Verde", "region": "AF" }, "CW": { "name": "Curaçao", "region": "SA" }, "CY": { "name": "Zypern", "region": "EU" }, "CZ": { "name": "Czechia", "altnames": "Tschechische Republik", "region": "EU" }, 
    "DE": { "name": "Deutschland", "region": "EU" }, "DJ": { "name": "Dschibuti", "region": "AF" }, "DK": { "name": "Dänemark", "region": "EU" }, "DM": { "name": "Dominica", "region": "NA" }, "DO": { "name": "Dominikanische Republik", "altnames": "DomRep", "region": "NA" }, "DZ": {"name": "Algerien", "region": "AF" }, 
    "EC": { "name": "Ecuador", "region": "SA" }, "EE": { "name": "Estland", "region": "EU" }, "EG": { "name": "Ägypten", "region": "AF" }, "ER": { "name": "Eritrea", "region": "AF" }, "ES": { "name": "Spanien", "region": "EU" }, "ET": { "name": "Äthiopien", "region": "AF" }, 
    "FI": { "name": "Finnland", "region": "EU" }, "FJ": { "name": "Fidschi", "region": "OC" }, "FM": { "name": "Mikronesien", "region": "OC" }, "FO": { "name": "Färöer Inseln", "region": "EU" }, "FR": { "name": "Frankreich", "region": "EU" }, 
    "GA": { "name": "Gabun", "region": "AF" }, "GB": {"name": "Vereinigtes Königreich", "altnames": "UK", "region": "EU" }, "GD": {"name": "Grenada", "region": "NA" }, "GE": { "name": "Georgien", "region": "AS" }, "GH": { "name": "Ghana", "region": "AF" }, "GI": { "name": "Gibraltar", "region": "EU" }, "GL": { "name": "Grönland", "region": "NA" }, "GM": { "name": "Gambia", "region": "AF" }, "GN": { "name": "Guinea", "region": "AF" }, "GQ": { "name": "Äquatorialguinea", "region": "AF" }, "GR": { "name": "Griechenland", "region": "EU" }, "GT": { "name": "Guatemala", "region": "NA" }, "GW": { "name": "Guinea-Bissau", "region": "AF" }, "GY": { "name": "Guyana", "region": "SA" }, 
    "HK": { "name": "Hongkong", "region": "AS" }, "HN": { "name": "Honduras", "region": "NA" }, "HR": { "name": "Kroatien", "region": "EU" }, "HT": { "name": "Haiti", "region": "NA" }, "HU": { "name": "Ungarn", "region": "EU" }, 
    "ID": { "name": "Indonesien", "region": "AS" }, "IE": { "name": "Irland", "region": "EU" }, "IL": { "name": "Israel", "region": "AS" }, "IN": { "name": "Indien", "region": "AS" }, "IQ": { "name": "Irak", "region": "AS" }, "IR": { "name": "Iran", "region": "AS" }, "IS": { "name": "Island", "region": "EU" }, "IT": { "name": "Italien", "region": "EU" }, 
    "JM": { "name": "Jamaika", "region": "NA" }, "JO": { "name": "Jordanien", "region": "AS" }, "JP": { "name": "Japan", "region": "AS" }, "KE": { "name": "Kenia", "region": "AF" }, "KG": { "name": "Kirgisistan", "region": "AS" }, "KH": { "name": "Kambodscha", "region": "AS" }, "KI": { "name": "Kiribati", "region": "OC" }, "KM": { "name": "Komoren", "region": "AF" }, "KN": { "name": "St. Kitts und Nevis", "altnames": "St. Kitts und Nevis", "region": "NA" }, "KP": {"name": "Nordkorea", "region": "AS" }, "KR": { "name": "Südkorea", "region": "AS" }, "KW": { "name": "Kuwait", "region": "AS" }, "KZ": { "name": "Kasachstan", "region": "AS" }, 
    "LA": { "name": "Laos", "region": "AS" }, "LB": { "name": "Libanon", "region": "AS" }, "LC": { "name": "St. Lucia", "altnames": "St. Lucia", "region": "NA" }, "LI": { "name": "Liechtenstein", "region": "EU" }, "LK": { "name": "Sri Lanka", "region": "AS" }, "LR": { "name": "Liberia", "region": "AF" }, "LS": { "name": "Lesotho", "region": "AF" }, "LT": { "name": "Litauen", "region": "EU" }, "LU": { "name": "Luxemburg", "region": "EU" }, "LV": { "name": "Lettland", "region": "EU" }, "LY": { "name": "Libyen", "region": "AF" }, 
    "MA": { "name": "Marokko", "region": "AF" }, "MC": { "name": "Monaco", "region": "EU" }, "MD": { "name": "Moldawien", "region": "EU" }, "ME": { "name": "Montenegro", "region": "EU" }, "MG": { "name": "Madagaskar", "region": "AF" }, "MH": { "name": "Marshallinseln", "region": "OC" }, "MK": { "name": "Nord-Mazedonien", "region": "EU" }, "ML": { "name": "Mali", "region": "AF" }, "MM": { "name": "Myanmar", "region": "AS" }, "MN": { "name": "Mongolei", "region": "AS" }, "MO": { "name": "Macao", "region": "AS" }, "MR": { "name": "Mauretanien", "region": "AF" }, "MT": { "name": "Malta", "region": "EU" }, "MU": { "name": "Mauritius", "region": "AF" }, "MV": { "name": "Malediven", "region": "AS" }, "MW": { "name": "Malawi", "region": "AF" }, "MX": { "name": "Mexiko", "region": "NA" }, "MY": { "name": "Malaysia", "region": "AS" }, "MZ": { "name": "Mosambik", "region": "AF" }, 
    "NA": { "name": "Namibia", "region": "AF" }, "NE": { "name": "Niger", "region": "AF" }, "NG": { "name": "Nigeria", "region": "AF" }, "NI": { "name": "Nicaragua", "region": "NA" }, "NL": { "name": "Niederlande", "region": "EU" }, "NO": { "name": "Norwegen", "region": "EU" }, "NP": { "name": "Nepal", "region": "AS" }, "NR": { "name": "Nauru", "region": "OC" }, "NZ": { "name": "New Zealand", "region": "OC" }, 
    "OM": { "name": "Oman", "region": "AS" }, 
    "PA": { "name": "Panama", "region": "NA" }, "PE": { "name": "Peru", "region": "SA" }, "PF": { "name": "Französisch-Polynesien", "region": "OC" }, "PG": { "name": "Papua-Neuguinea", "region": "OC" }, "PH": { "name": "Philippinen", "region": "AS" }, "PK": { "name": "Pakistan", "region": "AS" }, "PL": { "name": "Polen", "region": "EU" }, "PR": { "name": "Puerto Rico", "region": "NA" }, "PS": { "name": "Palästina", "altnames": "State of Palestine", "region": "AS" }, "PT": { "name": "Portugal", "region": "EU" }, "PW": { "name": "Palau", "region": "OC" }, "PY": { "name": "Paraguay", "region": "SA" }, 
    "QA": { "name": "Katar", "region": "AS" }, "RO": { "name": "Rumänien", "region": "EU" }, "RS": { "name": "Serbien", "region": "EU" }, "RU": { "name": "Russland", "region": "EU" }, "RW": { "name": "Ruanda", "region": "AF" }, 
    "SA": { "name": "Saudi-Arabien", "region": "AS" }, "SB": { "name": "Salomonen", "region": "OC" }, "SC": { "name": "Seychellen", "region": "AF" }, "SD": { "name": "Sudan", "region": "AF" }, "SE": { "name": "Schweden", "region": "EU" }, "SG": { "name": "Singapur", "region": "AS" }, "SI": { "name": "Slowenien", "region": "EU" }, "SK": { "name": "Slowakei", "region": "EU" }, "SL": { "name": "Sierra Leone", "region": "AF" }, "SM": { "name": "San Marino", "region": "EU" }, "SN": { "name": "Senegal", "region": "AF" }, "SO": { "name": "Somalia", "region": "AF" }, "SR": { "name": "Surinam", "region": "SA" }, "SS": { "name": "Südsudan", "region": "AF" }, "ST": { "name": "Sao Tome und Principe", "altnames": "São Tomé und Príncipe", "region": "AF" }, "SV": { "name": "El Salvador", "region": "NA" }, "SY": { "name": "Syria", "altnames": "Syrische Arabische Republik", "region": "AS" }, "SZ": { "name": "Eswatini", "altnames": "Swasiland", "region": "AF" }, 
    "TD": { "name": "Tschad", "region": "AF" }, "TG": { "name": "Togo", "region": "AF" }, "TH": { "name": "Thailand", "region": "AS" }, "TJ": { "name": "Tadschikistan", "region": "AS" }, "TL": { "name": "Timor-Leste", "altnames": "Ost-Timor", "region": "AS" }, "TM": {"name": "Turkmenistan", "region": "AS" }, "TN": { "name": "Tunesien", "region": "AF" }, "TO": { "name": "Tonga", "region": "AF" }, "TR": { "name": "Türkei", "altnames": "Türkiye", "region": "AS" }, "TT": {"name": "Trinidad und Tobago", "region": "NA" }, "TV": { "name": "Tuvalu", "region": "OC" }, "TW": { "name": "Taiwan", "region": "AS" }, "TZ": { "name": "Tansania", "region": "AF" }, 
    "UA": { "name": "Ukraine", "region": "EU" }, "UG": { "name": "Uganda", "region": "AF" }, "US": { "name": "Vereinigte Staaten", "altnames": "USA", "region": "NA" }, "UY": {"name": "Uruguay", "region": "SA" }, "UZ": { "name": "Usbekistan", "region": "AS" }, 
    "VA": { "name": "Vatikan", "region": "EU" }, "VC": { "name": "St. Vincent und die Grenadinen", "region": "NA" }, "VE": { "name": "Venezuela", "region": "SA" }, "VN": { "name": "Viet Nam", "altnames": "Vietnam", "region": "AS" }, "VU": { "name": "Vanuatu", "region": "OC" }, 
    "WF": { "name": "Wallis und Futuna", "region": "OC" }, "WS": { "name": "Samoa", "region": "OC" }, 
    "XK": { "name": "Kosovo", "region": "EU" }, 
    "YE": { "name": "Jemen", "region": "AS" }, 
    "ZA": { "name": "Südafrika", "region": "AF" }, "ZM": { "name": "Sambia", "region": "AF" }, "ZW": { "name": "Simbabwe", "region": "AF" }
}

const sorted = Object.fromEntries(
    Object.entries(countryDataJSON_ENG).sort(([,a],[,b]) => a.name.localeCompare(b.name))
);

const countryData = Object.values(sorted);
const countryID = Object.keys(sorted);