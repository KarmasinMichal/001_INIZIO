export default class GoogleSearch {
    constructor(baseUrl, apiKey, cx, query) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.cx = cx;
        this.query = query;
    }

    async getResult() {

        if (this.query.trim() === "") {
            this.emptySearchResults();
            this.setResponseState("Prosím vložte vyhledávací dotaz.")
            return;
        }

        const url = this.createUrl();
        const response = await this.fetchDataFromApi(url);

        if (response.items == null) {
            this.setResponseState("Nenalezeny žádné výsledky")
        } else {
            this.emptySearchResults();
            this.appendResults(response);
        };

        Array.from(document.getElementsByClassName("saveToCsv")).forEach(element => {

            element.style.display = "block";

        });
    }

    appendResults(response) {
        let searchResults = document.getElementById("content");
        this.emptySearchResults();

        //nadpis zobrazuji až po načtení výsledků pro čistější UX
        searchResults.appendChild(document.createElement("h2")).textContent = "Výsledek vyhledávání:";

        //pro každý jeden řádek výsledku vyhledávání vytvořím div s třídou search-item
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

    createUrl() {
        const CX_PARAM = '&cx=';
        const QUERY_PARAM = '&q=';
        return this.baseUrl + this.apiKey + CX_PARAM + this.cx + QUERY_PARAM + this.query;
    }

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

    setResponseState(message) {
        document.getElementById("stateOfResponse").innerHTML = `<h3>${message}</h3>`;
    }

    emptySearchResults() {
        document.getElementById("content").innerHTML = "";
        document.getElementById("stateOfResponse").innerHTML = "";

        Array.from(document.getElementsByClassName("saveToCsv")).forEach(element => {

            element.style.display = "none";

        });


    }


}


