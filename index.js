import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let language = "ENG";
let answers = [];
let answersName = [];
let anzahlLastAnswers = 5;
let gameover = false;
let answersFlag = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

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
    gameover = false;

    if (!(input.length > 2)){
        input = "Bitte gebe mehr Buchstaben an";
    }

    for(let i = 0; i < countryData.length;i++){
        const altNames = countryData[i].altnames ? countryData[i].altnames.toLowerCase() : '';
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
        answers: [],
        countryData: countryData,
        answersName: answersName,
        input: "Game Over",
        cardAnswers: cardAnswers,
        success: false,
        gameover: gameover,
    });
});

app.get("/data", (req, res) => {
    res.json({ answers: answers, countryData: countryDataJSON_ENG, gameover: gameover});
});

app.get("/gameover", (req, res) => {
    res.json({ answers: answers, countryData: countryDataJSON_ENG, gameover: gameover, });
});

app.get("/flags-data", (req, res) => {
    res.json({answers: [], countryData: countryDataJSON_ENG, countryID: countryID, answersFlag: answersFlag});
});

app.listen(3000, () => {
    console.log("Server running on port " + port);
});


var countryDataJSON_ENG = { 
    "AD": { "name": "Andorra", "region": "EU" }, "AE": { "name": "United Arab Emirates","altnames": "UAE", "region": "AS" }, "AF": { "name": "Afghanistan", "region": "AS" }, "AG": { "name": "Antigua and Barbuda", "region": "NA" }, "AI": { "name": "Anguilla", "region": "NA" }, "AL": { "name": "Albania", "region": "EU" }, "AM": { "name": "Armenia", "region": "AS" }, "AO": { "name": "Angola", "region": "AF" }, "AR": { "name": "Argentina", "region": "SA" }, "AT": { "name": "Austria", "region": "EU" }, "AU": { "name": "Australia", "region": "OC" }, "AW": { "name": "Aruba", "region": "SA" }, "AZ": { "name": "Azerbaijan", "region": "AS" }, 
    "BA": { "name": "Bosnia and Herzegovina","altnames": "BoH", "region": "EU" }, "BB": { "name": "Barbados", "region": "SA" }, "BD": { "name": "Bangladesh", "region": "AS" }, "BE": { "name": "Belgium", "region": "EU" }, "BF": { "name": "Burkina Faso", "region": "AF" }, "BG": { "name": "Bulgaria", "region": "EU" }, "BH": { "name": "Bahrain", "region": "AS" }, "BI": { "name": "Burundi", "region": "AF" }, "BJ": { "name": "Benin", "region": "AF" }, "BM": { "name": "Bermuda", "region": "NA" }, "BN": { "name": "Brunei", "region": "AS" }, "BO": { "name": "Bolivia", "region": "SA" }, "BR": { "name": "Brazil", "region": "SA" }, "BS": { "name": "Bahamas", "region": "NA" }, "BT": { "name": "Bhutan", "region": "AS" }, "BW": { "name": "Botswana", "region": "AF" }, "BY": { "name": "Belarus", "region": "EU" }, "BZ": { "name": "Belize", "region": "NA" }, 
    "CA": { "name": "Canada", "region": "NA" }, "CD": { "name": "Congo DR", "altnames": "Democratic Republic of the Congo,DR Congo", "region": "AF" }, "CF": { "name": "Central African Republic", "region": "AF" }, "CG": { "name": "Congo", "altnames": "Republic of the Congo", "region": "AF" }, "CH": { "name": "Switzerland", "region": "EU" }, "CI": { "name": "Ivory Coast", "altnames": "Ivory Coast", "region": "AF" }, "CL": { "name": "Chile", "region": "SA" }, "CM": { "name": "Cameroon", "region": "AF" }, "CN": { "name": "China", "region": "AS" }, "CO": { "name": "Colombia", "region": "SA" }, "CR": { "name": "Costa Rica", "region": "NA" }, "CU": { "name": "Cuba", "region": "NA" }, "CV": { "name": "Cabo Verde", "altnames": "Cape Verde", "region": "AF" }, "CW": { "name": "Curaçao", "region": "SA" }, "CY": { "name": "Cyprus", "region": "EU" }, "CZ": { "name": "Czechia", "altnames": "Czech Republic", "region": "EU" }, 
    "DE": { "name": "Germany", "region": "EU" }, "DJ": { "name": "Djibouti", "region": "AF" }, "DK": { "name": "Denmark", "region": "EU" }, "DM": { "name": "Dominica", "region": "NA" }, "DO": { "name": "Dominican Republic","altnames": "DomRep", "region": "NA" }, "DZ": { "name": "Algeria", "region": "AF" }, 
    "EC": { "name": "Ecuador", "region": "SA" }, "EE": { "name": "Estonia", "region": "EU" }, "EG": { "name": "Egypt", "region": "AF" }, "ER": { "name": "Eritrea", "region": "AF" }, "ES": { "name": "Spain", "region": "EU" }, "ET": { "name": "Ethiopia", "region": "AF" }, 
    "FI": { "name": "Finland", "region": "EU" }, "FJ": { "name": "Fiji", "region": "OC" }, "FK": { "name": "Falkland Islands", "region": "SA" }, "FM": { "name": "Micronesia", "region": "OC" }, "FO": { "name": "Faroe Islands", "region": "EU" }, "FR": { "name": "France", "region": "EU" }, 
    "GA": { "name": "Gabon", "region": "AF" }, "GB": { "name": "United Kingdom","altnames": "UK", "region": "EU" }, "GD": { "name": "Grenada", "region": "NA" }, "GE": { "name": "Georgia", "region": "AS" }, "GH": { "name": "Ghana", "region": "AF" }, "GI": { "name": "Gibraltar", "region": "EU" }, "GL": { "name": "Greenland", "region": "NA" }, "GM": { "name": "Gambia", "region": "AF" }, "GN": { "name": "Guinea", "region": "AF" }, "GQ": { "name": "Equatorial Guinea", "region": "AF" }, "GR": { "name": "Greece", "region": "EU" }, "GT": { "name": "Guatemala", "region": "NA" }, "GW": { "name": "Guinea-Bissau", "region": "AF" }, "GY": { "name": "Guyana", "region": "SA" }, 
    "HK": { "name": "Hong Kong", "region": "AS" }, "HN": { "name": "Honduras", "region": "NA" }, "HR": { "name": "Croatia", "region": "EU" }, "HT": { "name": "Haiti", "region": "NA" }, "HU": { "name": "Hungary", "region": "EU" }, 
    "ID": { "name": "Indonesia", "region": "AS" }, "IE": { "name": "Ireland", "region": "EU" }, "IL": { "name": "Israel", "region": "AS" }, "IN": { "name": "India", "region": "AS" }, "IQ": { "name": "Iraq", "region": "AS" }, "IR": { "name": "Iran", "region": "AS" }, "IS": { "name": "Iceland", "region": "EU" }, "IT": { "name": "Italy", "region": "EU" }, 
    "JM": { "name": "Jamaica", "region": "NA" }, "JO": { "name": "Jordan", "region": "AS" }, "JP": { "name": "Japan", "region": "AS" }, 
    "KE": { "name": "Kenya", "region": "AF" }, "KG": { "name": "Kyrgyzstan", "region": "AS" }, "KH": { "name": "Cambodia", "region": "AS" }, "KI": { "name": "Kiribati", "region": "OC" }, "KM": { "name": "Comoros", "region": "AF" }, "KN": { "name": "Saint Kitts and Nevis","altnames": "St. Kitts and Nevis", "region": "NA" }, "KP": { "name": "North Korea", "region": "AS" }, "KR": { "name": "South Korea", "region": "AS" }, "KW": { "name": "Kuwait", "region": "AS" }, "KZ": { "name": "Kazakhstan", "region": "AS" }, 
    "LA": { "name": "Laos", "region": "AS" }, "LB": { "name": "Lebanon", "region": "AS" }, "LC": { "name": "Saint Lucia","altnames": "St. Lucia", "region": "NA" }, "LI": { "name": "Liechtenstein", "region": "EU" }, "LK": { "name": "Sri Lanka", "region": "AS" }, "LR": { "name": "Liberia", "region": "AF" }, "LS": { "name": "Lesotho", "region": "AF" }, "LT": { "name": "Lithuania", "region": "EU" }, "LU": { "name": "Luxembourg", "region": "EU" }, "LV": { "name": "Latvia", "region": "EU" }, "LY": { "name": "Libya", "region": "AF" }, 
    "MA": { "name": "Morocco", "region": "AF" }, "MC": { "name": "Monaco", "region": "EU" }, "MD": { "name": "Moldova", "region": "EU" }, "ME": { "name": "Montenegro", "region": "EU" }, "MG": { "name": "Madagascar", "region": "AF" }, "MH": { "name": "Marshall Islands", "region": "OC" }, "MK": { "name": "North Macedonia", "region": "EU" }, "ML": { "name": "Mali", "region": "AF" }, "MM": { "name": "Myanmar", "region": "AS" }, "MN": { "name": "Mongolia", "region": "AS" }, "MO": { "name": "Macao", "region": "AS" }, "MQ": { "name": "Martinique", "region": "NA" }, "MR": { "name": "Mauritania", "region": "AF" }, "MT": { "name": "Malta", "region": "EU" }, "MU": { "name": "Mauritius", "region": "AF" }, "MV": { "name": "Maldives", "region": "AS" }, "MW": { "name": "Malawi", "region": "AF" }, "MX": { "name": "Mexico", "region": "NA" }, "MY": { "name": "Malaysia", "region": "AS" }, "MZ": { "name": "Mozambique", "region": "AF" }, 
    "NA": { "name": "Namibia", "region": "AF" }, "NC": { "name": "New Caledonia", "region": "OC" }, "NE": { "name": "Niger", "region": "AF" }, "NF": { "name": "Norfolk Island", "region": "OC" }, "NG": { "name": "Nigeria", "region": "AF" }, "NI": { "name": "Nicaragua", "region": "NA" }, "NL": { "name": "Netherlands", "region": "EU" }, "NO": { "name": "Norway", "region": "EU" }, "NP": { "name": "Nepal", "region": "AS" }, "NR": { "name": "Nauru", "region": "OC" }, "NU": { "name": "Niue", "region": "OC" }, "NZ": { "name": "New Zealand", "region": "OC" }, 
    "OM": { "name": "Oman", "region": "AS" }, 
    "PA": { "name": "Panama", "region": "NA" }, "PE": { "name": "Peru", "region": "SA" }, "PF": { "name": "French Polynesia", "region": "OC" }, "PG": { "name": "Papua New Guinea", "region": "OC" }, "PH": { "name": "Philippines", "region": "AS" }, "PK": { "name": "Pakistan", "region": "AS" }, "PL": { "name": "Poland", "region": "EU" }, "PN": { "name": "Pitcairn", "region": "OC" }, "PR": { "name": "Puerto Rico", "region": "NA" }, "PS": { "name": "Palestine", "altnames": "State of Palestine", "region": "AS" }, "PT": { "name": "Portugal", "region": "EU" }, "PW": { "name": "Palau", "region": "OC" }, "PY": { "name": "Paraguay", "region": "SA" }, 
    "QA": { "name": "Qatar", "region": "AS" }, 
    "RE": { "name": "Réunion", "region": "AF" }, "RO": { "name": "Romania", "region": "EU" }, "RS": { "name": "Serbia", "region": "EU" }, "RU": { "name": "Russia", "region": "EU" }, "RW": { "name": "Rwanda", "region": "AF" }, 
    "SA": { "name": "Saudi Arabia", "region": "AS" }, "SB": { "name": "Solomon Islands", "region": "OC" }, "SC": { "name": "Seychelles", "region": "AF" }, "SD": { "name": "Sudan", "region": "AF" }, "SE": { "name": "Sweden", "region": "EU" }, "SG": { "name": "Singapore", "region": "AS" }, "SI": { "name": "Slovenia", "region": "EU" }, "SK": { "name": "Slovakia", "region": "EU" }, "SL": { "name": "Sierra Leone", "region": "AF" }, "SM": { "name": "San Marino", "region": "EU" }, "SN": { "name": "Senegal", "region": "AF" }, "SO": { "name": "Somalia", "region": "AF" }, "SR": { "name": "Suriname", "region": "SA" }, "SS": { "name": "South Sudan", "region": "AF" }, "ST": { "name": "Sao Tome and Principe", "altnames": "São Tomé and Príncipe", "region": "AF" }, "SV": { "name": "El Salvador", "region": "NA" }, "SY": { "name": "Syria", "altnames": "Syrian Arab Republic", "region": "AS" }, "SZ": { "name": "Eswatini", "altnames": "Swaziland", "region": "AF" }, 
    "TC": { "name": "Turks and Caicos Islands", "region": "NA" }, "TD": { "name": "Chad", "region": "AF" }, "TG": { "name": "Togo", "region": "AF" }, "TH": { "name": "Thailand", "region": "AS" }, "TJ": { "name": "Tajikistan", "region": "AS" }, "TL": { "name": "Timor-Leste","altnames": "East-Timor", "region": "AS" }, "TM": { "name": "Turkmenistan", "region": "AS" }, "TN": { "name": "Tunisia", "region": "AF" }, "TO": { "name": "Tonga", "region": "AF" }, "TR": { "name": "Turkey","altnames": "Türkiye", "region": "AS" }, "TT": { "name": "Trinidad and Tobago", "region": "NA" }, "TV": { "name": "Tuvalu", "region": "OC" }, "TW": { "name": "Taiwan", "region": "AS" }, "TZ": { "name": "Tanzania", "region": "AF" }, 
    "UA": { "name": "Ukraine", "region": "EU" }, "UG": { "name": "Uganda", "region": "AF" }, "US": { "name": "United States","altnames": "USA", "region": "NA" }, "UY": { "name": "Uruguay", "region": "SA" }, "UZ": { "name": "Uzbekistan", "region": "AS" }, 
    "VA": { "name": "Vatican", "region": "EU" }, "VC": { "name": "Saint Vincent and the Grenadines", "region": "NA" }, "VE": { "name": "Venezuela", "region": "SA" }, "VG": { "name": "Virgin Islands (British)", "region": "NA" }, "VI": { "name": "Virgin Islands (U.S.)", "region": "NA" }, "VN": { "name": "Viet Nam", "altnames": "Vietnam", "region": "AS" }, "VU": { "name": "Vanuatu", "region": "OC" }, 
    "WF": { "name": "Wallis and Futuna", "region": "OC" }, "WS": { "name": "Samoa", "region": "OC" }, 
    "XK": { "name": "Kosovo", "region": "EU" }, 
    "YE": { "name": "Yemen", "region": "AS" }, 
    "ZA": { "name": "South Africa", "region": "AF" }, "ZM": { "name": "Zambia", "region": "AF" }, "ZW": { "name": "Zimbabwe", "region": "AF" }
};

var countryDataJSON_GER = {
        "AD": { "name": "Andorra", "region": "EU" }, "AE": { "name": "Vereinigte Arabische Emirate", "Region": "AS" }, "AF": { "name": "Afghanistan", "Region": "AS" }, "AG": { "name": "Antigua und Barbuda", "Region": "NA" }, "AI": { "name": "Anguilla", "Region": "NA" }, "AL": { "name": "Albanien", "Region": "EU" }, "AM": { "name": "Armenien", "Region": "AS" }, "AO": { "name": "Angola", "Region": "AF" }, "AR": { "name": "Argentinien", "Region": "SA" }, "AS": { "name": "Amerikanisch-Samoa", "Region": "OC" }, "AT": { "name": "Österreich", "Region": "EU" }, "AU": { "name": "Australien", "Region": "OC" }, "AW": { "name": "Aruba", "Region": "SA" }, "AX": { "name": "Åland-Inseln", "Region": "EU" }, "AZ": { "name": "Aserbaidschan", "Region": "AS" }, 
        "BA": { "name": "Bosnien und Herzegowina", "Region": "EU" }, "BB": { "name": "Barbados", "Region": "SA" }, "BD": { "name": "Bangladesch", "Region": "AS" }, "BE": { "name": "Belgien", "Region": "EU" }, "BF": { "name": "Burkina Faso", "Region": "AF" }, "BG": { "name": "Bulgarien", "Region": "EU" }, "BH": { "name": "Bahrain", "Region": "AS" }, "BI": { "name": "Burundi", "Region": "AF" }, "BJ": { "name": "Benin", "Region": "AF" }, "BM": { "name": "Bermuda", "Region": "NA" }, "BN": { "name": "Brunei", "Region": "AS" }, "BO": { "name": "Bolivien", "Region": "SA" }, "BR": { "name": "Brasilien", "Region": "SA" }, "BS": { "name": "Bahamas", "Region": "NA" }, "BT": { "name": "Bhutan", "Region": "AS" }, "BW": { "name": "Botswana", "Region": "AF" }, "BY": { "name": "Belarus", "Region": "EU" }, "BZ": { "name": "Belize", "Region": "NA" }, 
        "CA": { "name": "Kanada", "Region": "NA" }, "CD": { "name": "Kongo DR", "altnames": "Demokratische Republik Kongo, DR Kongo", "region": "AF" }, "CF": { "name": "Zentralafrikanische Republik", "Region": "AF" }, "CG": { "name": "Kongo", "altnames": "Republik Kongo", "Region": "AF" }, "CH": { "name": "Schweiz", "Region": "EU" }, "CI": { "name": "Côte d'Ivoire", "altnames": "Elfenbeinküste", "Region": "AF" }, "CK": { "name": "Cookinseln", "Region": "OC" }, "CL": { "name": "Chile", "Region": "SA" }, "CM": { "name": "Kamerun", "Region": "AF" }, "CN": { "name": "China", "Region": "AS" }, "CO": { "name": "Kolumbien", "Region": "SA" }, "CR": { "name": "Costa Rica", "Region": "NA" }, "CU": { "name": "Kuba", "Region": "NA" }, "CV": { "name": "Cabo Verde", "altnames": "Kap Verde", "region": "AF" }, "CW": { "name": "Curaçao", "region": "SA" }, "CY": { "name": "Zypern", "Region": "EU" }, "CZ": { "name": "Czechia", "altnames": "Tschechische Republik", "Region": "EU" }, 
        "DE": { "name": "Deutschland", "Region": "EU" }, "DJ": { "name": "Dschibuti", "Region": "AF" }, "DK": { "name": "Dänemark", "Region": "EU" }, "DM": { "name": "Dominica", "Region": "NA" }, "DO": { "name": "Dominikanische Republik", "Region": "NA" }, "DZ": { "name": "Algerien", "Region": "AF" }, 
        "EC": { "name": "Ecuador", "Region": "SA" }, "EE": { "name": "Estland", "Region": "EU" }, "EG": { "name": "Ägypten", "Region": "AF" }, "EH": { "name": "Westsahara", "altnames": "Demokratische Arabische Republik Sahara", "region": "AF" }, "ER": { "name": "Eritrea", "Region": "AF" }, "ES": { "name": "Spanien", "Region": "EU" }, "ET": { "name": "Äthiopien", "Region": "AF" }, 
        "FI": { "name": "Finnland", "Region": "EU" }, "FJ": { "name": "Fidschi", "Region": "OC" }, "FK": { "name": "Falklandinseln", "Region": "SA" }, "FM": { "name": "Mikronesien", "Region": "OC" }, "FO": { "name": "Färöer Inseln", "Region": "EU" }, "FR": { "name": "Frankreich", "Region": "EU" }, 
        "GA": { "name": "Gabun", "Region": "AF" }, "GB": { "name": "Vereinigtes Königreich", "Region": "EU" }, "GD": { "name": "Grenada", "Region": "NA" }, "GE": { "name": "Georgien", "Region": "AS" }, "GG": { "name": "Guernsey", "Region": "EU" }, "GH": { "name": "Ghana", "Region": "AF" }, "GI": { "name": "Gibraltar", "Region": "EU" }, "GL": { "name": "Grönland", "Region": "NA" }, "GM": { "name": "Gambia", "Region": "AF" }, "GN": { "name": "Guinea", "Region": "AF" }, "GQ": { "name": "Äquatorialguinea", "Region": "AF" }, "GR": { "name": "Griechenland", "Region": "EU" }, "GT": { "name": "Guatemala", "Region": "NA" }, "GU": { "name": "Guam", "Region": "OC" }, "GW": { "name": "Guinea-Bissau", "Region": "AF" }, "GY": { "name": "Guyana", "Region": "SA" }, 
        "HK": { "name": "Hongkong", "Region": "AS" }, "HN": { "name": "Honduras", "Region": "NA" }, "HR": { "name": "Kroatien", "Region": "EU" }, "HT": { "name": "Haiti", "Region": "NA" }, "HU": { "name": "Ungarn", "Region": "EU" }, 
        "ID": { "name": "Indonesien", "Region": "AS" }, "IE": { "name": "Irland", "Region": "EU" }, "IL": { "name": "Israel", "Region": "AS" }, "IM": { "name": "Isle of Man", "Region": "EU" }, "IN": { "name": "Indien", "Region": "AS" }, "IO": { "name": "Britisches Territorium im Indischen Ozean", "Region": "AS" }, "IQ": { "name": "Irak", "Region": "AS" }, "IR": { "name": "Iran", "Region": "AS" }, "IS": { "name": "Island", "Region": "EU" }, "IT": { "name": "Italien", "Region": "EU" }, 
        "JM": { "name": "Jamaika", "Region": "NA" }, "JO": { "name": "Jordanien", "Region": "AS" }, "JP": { "name": "Japan", "Region": "AS" }, 
        "KE": { "name": "Kenia", "Region": "AF" }, "KG": { "name": "Kirgisistan", "Region": "AS" }, "KH": { "name": "Kambodscha", "Region": "AS" }, "KI": { "name": "Kiribati", "Region": "OC" }, "KM": { "name": "Komoren", "Region": "AF" }, "KN": { "name": "St. Kitts und Nevis", "Region": "NA" }, "KP": { "name": "Nordkorea", "Region": "AS" }, "KR": { "name": "Südkorea", "Region": "AS" }, "KW": { "name": "Kuwait", "Region": "AS" }, "KY": { "name": "Kaimaninseln", "Region": "NA" }, "KZ": { "name": "Kazakhstan", "region": "AS" }, 
        "LA": { "name": "Laos", "Region": "AS" }, "LB": { "name": "Libanon", "Region": "AS" }, "LC": { "name": "St. Lucia", "Region": "NA" }, "LI": { "name": "Liechtenstein", "Region": "EU" }, "LK": { "name": "Sri Lanka", "Region": "AS" }, "LR": { "name": "Liberia", "Region": "AF" }, "LS": { "name": "Lesotho", "Region": "AF" }, "LT": { "name": "Litauen", "Region": "EU" }, "LU": { "name": "Luxemburg", "Region": "EU" }, "LV": { "name": "Lettland", "Region": "EU" }, "LY": { "name": "Libyen", "Region": "AF" }, 
        "MA": { "name": "Marokko", "Region": "AF" }, "MC": { "name": "Monaco", "Region": "EU" }, "MD": { "name": "Moldawien", "Region": "EU" }, "ME": { "name": "Montenegro", "Region": "EU" }, "MF": { "name": "Saint Martin (französischer Teil)", "Region": "NA" }, "MG": { "name": "Madagaskar", "Region": "AF" }, "MH": { "name": "Marshallinseln", "Region": "OC" }, "MK": { "name": "Nord-Mazedonien", "Region": "EU" }, "ML": { "name": "Mali", "Region": "AF" }, "MM": { "name": "Myanmar", "Region": "AS" }, "MN": { "name": "Mongolei", "Region": "AS" }, "MO": { "name": "Macao", "Region": "AS" }, "MP": { "name": "Nördliche Marianen", "Region": "AS" }, "MQ": { "name": "Martinique", "Region": "NA" }, "MR": { "name": "Mauretanien", "Region": "AF" }, "MS": { "name": "Montserrat", "Region": "NA" }, "MT": { "name": "Malta", "Region": "EU" }, "MU": { "name": "Mauritius", "Region": "AF" }, "MV": { "name": "Malediven", "Region": "AS" }, "MW": { "name": "Malawi", "Region": "AF" }, "MX": { "name": "Mexiko", "Region": "NA" }, "MY": { "name": "Malaysia", "Region": "AS" }, "MZ": { "name": "Mosambik", "Region": "AF" }, 
        "NA": { "name": "Namibia", "Region": "AF" }, "NC": { "name": "Neukaledonien", "Region": "OC" }, "NE": { "name": "Niger", "Region": "AF" }, "NF": { "name": "Norfolkinsel", "Region": "OC" }, "NG": { "name": "Nigeria", "Region": "AF" }, "NI": { "name": "Nicaragua", "Region": "NA" }, "NL": { "name": "Niederlande", "Region": "EU" }, "NO": { "name": "Norwegen", "Region": "EU" }, "NP": { "name": "Nepal", "Region": "AS" }, "NR": { "name": "Nauru", "Region": "OC" }, "NU": { "name": "Niue", "Region": "OC" }, "NZ": { "name": "New Zealand", "region": "OC" }, 
        "OM": { "name": "Oman", "Region": "AS" }, 
        "PA": { "name": "Panama", "Region": "NA" }, "PE": { "name": "Peru", "Region": "SA" }, "PF": { "name": "Französisch-Polynesien", "Region": "OC" }, "PG": { "name": "Papua-Neuguinea", "Region": "OC" }, "PH": { "name": "Philippinen", "Region": "AS" }, "PK": { "name": "Pakistan", "Region": "AS" }, "PL": { "name": "Polen", "Region": "EU" }, "PM": { "name": "Saint Pierre und Miquelon", "Region": "NA" }, "PN": { "name": "Pitcairn", "Region": "OC" }, "PR": { "name": "Puerto Rico", "Region": "NA" }, "PS": { "name": "Palästina", "altnames": "State of Palestine", "region": "AS" }, "PT": { "name": "Portugal", "Region": "EU" }, "PW": { "name": "Palau", "Region": "OC" }, "PY": { "name": "Paraguay", "Region": "SA" }, 
        "QA": { "Name": "Katar", "Region": "AS" }, 
        "RE": { "name": "Réunion", "region": "AF" }, "RO": { "name": "Rumänien", "Region": "EU" }, "RS": { "name": "Serbien", "Region": "EU" }, "RU": { "name": "Russland", "Region": "EU" }, "RW": { "name": "Ruanda", "Region": "AF" }, 
        "SA": { "name": "Saudi-Arabien", "Region": "AS" }, "SB": { "name": "Salomonen", "Region": "OC" }, "SC": { "name": "Seychellen", "Region": "AF" }, "SD": { "name": "Sudan", "Region": "AF" }, "SE": { "name": "Schweden", "Region": "EU" }, "SG": { "name": "Singapur", "Region": "AS" }, "SH": { "name": "St. Helena", "Region": "AF" }, "SI": { "name": "Slowenien", "Region": "EU" }, "SK": { "name": "Slowakei", "Region": "EU" }, "SL": { "name": "Sierra Leone", "Region": "AF" }, "SM": { "name": "San Marino", "Region": "EU" }, "SN": { "name": "Senegal", "Region": "AF" }, "SO": { "name": "Somalia", "Region": "AF" }, "SR": { "name": "Surinam", "Region": "SA" }, "SS": { "name": "Südsudan", "Region": "AF" }, "ST": { "name": "Sao Tome und Principe", "altnames": "São Tomé und Príncipe", "Region": "AF" }, "SV": { "name": "El Salvador", "region": "NA" }, "SZ": { "name": "Eswatini", "altnames": "Swasiland", "Region": "AF" }, 
        "TC": { "name": "Turks- und Caicosinseln", "Region": "NA" }, "TD": { "name": "Tschad", "Region": "AF" }, "TF": { "name": "Französische Südterritorien", "Region": "AF" }, "TG": { "name": "Togo", "Region": "AF" }, "TH": { "name": "Thailand", "Region": "AS" }, "TJ": { "name": "Tadschikistan", "Region": "AS" }, "TK": { "name": "Tokelau", "Region": "OC" }, "TL": { "name": "Timor-Leste (Osttimor)", "Region": "AS" }, "TM": { "name": "Turkmenistan", "Region": "AS" }, "TN": { "name": "Tunesien", "Region": "AF" }, "TO": { "name": "Tonga", "Region": "AF" }, "TR": { "name": "Türkei", "Region": "AS" }, "TT": { "name": "Trinidad und Tobago", "Region": "NA" }, "TV": { "name": "Tuvalu", "Region": "OC" }, "TW": { "name": "Taiwan", "Region": "AS" }, "TZ": { "name": "Tansania", "Region": "AF" }, 
        "UA": { "name": "Ukraine", "Region": "EU" }, "UG": { "name": "Uganda", "Region": "AF" }, "UM": { "name": "United States Minor Outlying Islands", "region": "OC" }, "US": { "name": "United States", "region": "NA" }, "UY": { "name": "Uruguay", "Region": "SA" }, "UZ": { "name": "Usbekistan", "Region": "AS" }, 
        "VA": { "name": "Vatikan", "Region": "EU" }, "VC": { "name": "St. Vincent und die Grenadinen", "Region": "NA" }, "VE": { "name": "Venezuela", "Region": "SA" }, "VG": { "name": "Jungferninseln (Britisch)", "Region": "NA" }, "VI": { "name": "Jungferninseln (U.S.)", "Region": "NA" }, "VN": { "name": "Viet Nam", "altnames": "Vietnam", "region": "AS" }, "VU": { "name": "Vanuatu", "region": "OC" }, 
        "WF": { "name": "Wallis und Futuna", "Region": "OC" }, "WS": { "name": "Samoa", "Region": "OC" }, 
        "XK": { "name": "Kosovo", "Region": "EU" }, 
        "YE": { "name": "Jemen", "Region": "AS" }, "YT": { "name": "Mayotte", "Region": "AF" }, 
        "ZA": { "name": "South Africa", "region": "AF" }, "ZM": { "name": "Sambia", "Region": "AF" }, "ZW": { "name": "Simbabwe", "Region": "AF" }
}

const sorted = Object.fromEntries(
    Object.entries(countryDataJSON_ENG).sort(([,a],[,b]) => a.name.localeCompare(b.name))
);

const countryData = Object.values(sorted);
const countryID = Object.keys(sorted);