export default class GoogleSearch {
    constructor(baseUrl, apiKey, cx, query) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.cx = cx;
        this.query = query;
    }

    async getResult() {
        /**
         * odstraním mezery na začátku a konci dotazu, pokud je prázdný resetuji result a zobrazím hlášku
         */

        if (this.query.trim() === "") {
            this.emptySearchResults();
            this.setResponseState("Prosím vložte vyhledávací dotaz.")
            return;
        }

        /**
         * zavolám fci pro vytvoření URL a načtení dat z API
         */
        const url = this.createUrl();
        const response = await this.fetchDataFromApi(url);

        if (response == null) {
            this.setResponseState(`Chyba při načítání dat`);
            console.error("Chyba při načítání dat z API:", url);
            console.error("Zkontrolujte platnost API klíče a CX.");
            console.error("Zkontrolujte také, zda máte povolený přístup k API Google Custom Search.");
            return;
        }

        /**
         * pokud je odpověď null, tak zobrazím hlášku o chybě
         * pokud není tak resetuji html element abych zobrazil vždy aktuální výsledky
         * následně volám appendResults přidání výsledků do HTML
         */

        if (response.items == null) {
            this.setResponseState("Nenalezeny žádné výsledky")
        } else {
            this.emptySearchResults();
            this.appendResults(response);
        };

        /**
         * po načtení dat zobrazím tlačítka pro export do CSV pomccí změny CSS display
         */
        Array.from(document.getElementsByClassName("saveToCsv")).forEach(element => {
            element.style.display = "block";
        });
    }

    /**
     * 
     * @param {*} response 
     * vloží výsledky vyhledávání do HTML elementu s id content
     */
    appendResults(response) {
        const searchResults = document.getElementById("content");
        this.emptySearchResults();

        /**
         * nadpis zobrazuji až po načtení výsledků pro čistější UX
         */
        searchResults.appendChild(document.createElement("h2")).textContent = "Výsledek vyhledávání:";

        /**
         * pro každý jeden řádek výsledku vyhledávání vytvořím div s třídou search-item
         */
        response.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'search-item';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'title';
            titleDiv.textContent = item.title;

            const snippetDiv = document.createElement('div');
            snippetDiv.className = 'snippet';
            snippetDiv.textContent = item.snippet;

            const urlDiv = document.createElement('div');
            urlDiv.className = 'url';
            urlDiv.innerHTML = `<a href="${item.formattedUrl}" target="_blank">${item.formattedUrl}</a> `;

            itemDiv.appendChild(titleDiv);
            itemDiv.appendChild(snippetDiv);
            itemDiv.appendChild(urlDiv);

            searchResults.appendChild(itemDiv);
        });
    }

    /**
     * 
     * @param {*} url 
     * @returns response v JSON formátu
     */
    fetchDataFromApi(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                return null;
            });
    }

    /**
     * 
     * @returns sestaví URL pro REST dotaz na Google Custom Search API
     */
    createUrl() {
        const CX_PARAM = '&cx=';
        const QUERY_PARAM = '&q=';
        return this.baseUrl + this.apiKey + CX_PARAM + this.cx + QUERY_PARAM + this.query;
    }

    /**
     * 
     * @param {*} message 
     * použije se pro vložení textu do stateOfResponse elementu
     */
    setResponseState(message) {
        document.getElementById("stateOfResponse").innerHTML = `<h3>${message}</h3>`;
    }

    /**
     * vymaže content element a stateOfResponse element a dále
     * skryje tlačítka pro export do CSV pomocí změny CSS display na none
     */
    emptySearchResults() {
        document.getElementById("content").innerHTML = "";
        document.getElementById("stateOfResponse").innerHTML = "";
        Array.from(document.getElementsByClassName("saveToCsv")).forEach(element => {
            element.style.display = "none";
        });


    }


}


