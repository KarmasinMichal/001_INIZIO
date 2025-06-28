import GoogleSearch from './GoogleSearch.js';
import CsvExporter from './CsvEporter.js';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1?key=';
const API_KEY = 'AIzaSyC2rcnmPMxmi9Et56NzrmQtepqhVmykepg'
const CX = '75b42aa779e544599';

document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});


document.getElementById("searchButton").addEventListener("click", () => {
    const googleSearch = new GoogleSearch(BASE_URL, API_KEY, CX, document.getElementById("searchInput").value);
    googleSearch.getResult();
});

document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    const googleSearch = new GoogleSearch(BASE_URL, API_KEY, CX, document.getElementById("searchInput").value);
    googleSearch.getResult();
});

//Array.from protože getElementsByClassName vrací HTMLCollection, která není pole a nemohu tedy přes ni použít forEach
Array.from(document.getElementsByClassName("saveToCsv")).forEach(element => {
    element.onclick = event => {
        const csvExporter = new CsvExporter("#content .search-item");
        csvExporter.saveToFile();
    }
});





