import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let answers = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs", {
        answers: answers,
    });
    console.log(answers);
});


app.post("/", function (req,res,next) {
    let input = req.body.land;
    countryNames.forEach(element => {
        let temp = element.toLowerCase();
        input = input.toLowerCase();
       if(temp == input){
        answers.push(element);
        }
    });
    res.redirect("/");
    next();
});

app.listen(3000, () => {
    console.log("Server running on port " + port);
});


const countriesJson = {
        AE: "United Arab Emirates",
        AF: "Afghanistan",
        AG: "Antigua and Barbuda",
        AI: "Anguilla",
        AL: "Albania",
        AM: "Armenia",
        AO: "Angola",
        AR: "Argentina",
        AS: "American Samoa",
        AT: "Austria",
        AU: "Australia",
        AW: "Aruba",
        AZ: "Azerbaijan",
        BA: "Bosnia and Herzegovina",
        BB: "Barbados",
        BD: "Bangladesh",
        BE: "Belgium",
        BF: "Burkina Faso",
        BG: "Bulgaria",
        BH: "Bahrain",
        BI: "Burundi",
        BJ: "Benin",
        BL: "Saint-Barthélemy",
        BM: "Bermuda",
        BN: "Brunei",
        BO: "Bolivia",
        BQBO: "Netherlands",
        BQSA: "Saba (Netherlands)",
        BQSE: "St. Eustatius (Netherlands)",
        BR: "Brazil",
        BS: "Bahamas",
        BT: "Bhutan",
        BW: "Botswana",
        BY: "Belarus",
        BZ: "Belize",
        CA: "Canada",
        CD: "Democratic Republic of the Congo",
        CF: "Central African Republic",
        CG: "Republic of Congo",
        CH: "Switzerland",
        CI: "Côte d'Ivoire",
        CL: "Chile",
        CM: "Cameroon",
        CN: "China",
        CO: "Colombia",
        CR: "Costa Rica",
        CU: "Cuba",
        CV: "Cape Verde",
        CW: "Curaco (Netherlands)",
        CY: "Cyprus",
        CZ: "Czech Republic",
        DE: "Germany",
        DJ: "Djibouti",
        DK: "Denmark",
        DM: "Dominica",
        DO: "Dominican Republic",
        DZ: "Algeria",
        EC: "Ecuador",
        EE: "Estonia",
        EG: "Egypt",
        EH: "Western Sahara",
        ER: "Eritrea",
        ES: "Spain",
        ET: "Ethiopia",
        FI: "Finland",
        FJ: "Fiji",
        FK: "Falkland Islands",
        FM: "Micronesia",
        FO: "Faeroe Islands",
        FR: "France",
        GA: "Gabon",
        GB: "United Kingdom",
        GD: "Grenada",
        GE: "Georgia",
        GF: "France",
        GH: "Ghana",
        GL: "Greenland",
        GM: "The Gambia",
        GN: "Guinea",
        GP: "Guadeloupe (France)",
        GQ: "Equatorial Guinea",
        GR: "Greece",
        GT: "Guatemala",
        GU: "Guam",
        GW: "Guinea-Bissau",
        GY: "Guyana",
        HN: "Honduras",
        HR: "Croatia",
        HT: "Haiti",
        HU: "Hungary",
        IC: "Canary Islands (Spain)",
        ID: "Indonesia",
        IE: "Ireland",
        IL: "Israel",
        IN: "India",
        IQ: "Iraq",
        IR: "Iran",
        IS: "Iceland",
        IT: "Italy",
        JM: "Jamaica",
        JO: "Jordan",
        JP: "Japan",
        KE: "Kenya",
        KG: "Kyrgyzstan",
        KH: "Cambodia",
        KM: "Comoros",
        KN: "Saint Kitts and Nevis",
        KP: "North Korea",
        KR: "South Korea",
        KW: "Kuwait",
        KY: "Cayman Islands",
        KZ: "Kazakhstan",
        LA: "Laos",
        LB: "Lebanon",
        LC: "Saint Lucia",
        LK: "Sri Lanka",
        LR: "Liberia",
        LS: "Lesotho",
        LT: "Lithuania",
        LU: "Luxembourg",
        LV: "Latvia",
        LY: "Libya",
        MA: "Morocco",
        MD: "Moldova",
        ME: "Montenegro",
        MF: "Saint Martin (French)",
        MG: "Madagascar",
        MH: "Marshall Islands",
        MK: "Macedonia",
        ML: "Mali",
        MM: "Myanmar",
        MN: "Mongolia",
        MP: "Northern Mariana Islands",
        MQ: "Martinique (France)",
        MR: "Mauritania",
        MS: "Montserrat",
        MT: "Malta",
        MU: "Mauritius",
        MV: "Maldives",
        MW: "Malawi",
        MX: "Mexico",
        MY: "Malaysia",
        MZ: "Mozambique",
        NA: "Namibia",
        NC: "New Caledonia",
        NE: "Niger",
        NG: "Nigeria",
        NI: "Nicaragua",
        NL: "Netherlands",
        NO: "Norway",
        NP: "Nepal",
        NR: "Nauru",
        NZ: "New Zealand",
        OM: "Oman",
        PA: "Panama",
        PE: "Peru",
        PF: "French Polynesia",
        PG: "Papua New Guinea",
        PH: "Philippines",
        PK: "Pakistan",
        PL: "Poland",
        PR: "Puerto Rico",
        PS: "Palestine",
        PT: "Portugal",
        PW: "Palau",
        PY: "Paraguay",
        QA: "Qatar",
        RE: "Reunion (France)",
        RO: "Romania",
        RS: "Serbia",
        RU: "Russian Federation",
        RW: "Rwanda",
        SA: "Saudi Arabia",
        SB: "Solomon Islands",
        SC: "Seychelles",
        SD: "Sudan",
        SE: "Sweden",
        SI: "Slovenia",
        SK: "Slovakia",
        SL: "Sierra Leone",
        SN: "Senegal",
        SO: "Somalia",
        SR: "Suriname",
        SS: "South Sudan",
        ST: "São Tomé and Principe",
        SV: "El Salvador",
        SX: "Saint Martin (Dutch)",
        SY: "Syria",
        SZ: "Swaziland",
        TC: "Turks and Caicos Islands",
        TD: "Chad",
        TG: "Togo",
        TH: "Thailand",
        TJ: "Tajikistan",
        TL: "Timor-Leste",
        TM: "Turkmenistan",
        TN: "Tunisia",
        TO: "Tonga",
        TR: "Turkey",
        TT: "Trinidad and Tobago",
        TV: "Tuvalu",
        TW: "Taiwan",
        TZ: "Tanzania",
        UA: "Ukraine",
        UG: "Uganda",
        US: "United States",
        UY: "Uruguay",
        UZ: "Uzbekistan",
        VC: "Saint Vincent and the Grenadines",
        VE: "Venezuela",
        VG: "British Virgin Islands",
        VI: "United States Virgin Islands",
        VN: "Vietnam",
        VU: "Vanuatu",
        WS: "Samoa",
        XK: "Kosovo",
        YE: "Yemen",
        YT: "Mayotte (France)",
        ZA: "South Africa",
        ZM: "Zambia",
        ZW: "Zimbabwe"
};

const countryNames = Object.values(countriesJson);

console.log(countryNames);
