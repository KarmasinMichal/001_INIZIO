export default class CsvExporter {
    constructor(nameOfElement) {
        this.nameOfElement = nameOfElement;
    }

    saveToFile() {
        const items = document.querySelectorAll(this.nameOfElement);
        let text = "Titulek,Popis,URL\n"; // Hlavička CSV

        items.forEach(item => {
            const title = item.querySelector(".title")?.innerText || "";
            const snippet = item.querySelector(".snippet")?.innerText || "";
            const url = item.querySelector(".url")?.innerText || "";

            // Každou hodnotu uzavřeme do uvozovek pro správné CSV
            text += `"${title}","${snippet}","${url}"\n`;
        });

        var blob = new Blob([text], {
            type: "text/csv;charset=utf-8",
        });
        saveAs(blob, "resultOfGoogleSearch.csv");
    }
}