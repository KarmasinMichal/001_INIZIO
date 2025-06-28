import GoogleSearch from './GoogleSearch.js';
import fetchMock from 'jest-fetch-mock';

let url = 'https://www.googleapis.com/customsearch/v1?key=';
let key = 'KEY'
let cx = 'CX';
let query = 'QUERY';

let resultMustBe = 'https://www.googleapis.com/customsearch/v1?key=KEY&cx=CX&q=QUERY';

const mockData = {
    items: [
        {
            title: 'Test Title',
            snippet: 'Test Snippet',
            formattedUrl: 'https://example.com/test'
        }
    ]
};

fetchMock.enableMocks();

//test správného setování URL
test('GoogleSearch.createUrl() zda sestaví URL pro REST dotaz správně', () => {
    const gs = new GoogleSearch(url, key, cx, query);
    expect(gs.createUrl()).toBe(resultMustBe);
});

//test zda data z API jsou správně načtena
test('GoogleSearch.fetchDataFromApi zda vrátí data z endpoint', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const gs = new GoogleSearch(url, key, cx, query);
    const data = await gs.fetchDataFromApi(resultMustBe);

    expect(data).toEqual(mockData);

});