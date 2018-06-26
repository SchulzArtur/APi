/*
    API wraz z dokumentacją: https://api.publicapis.org/
*/

class PublicApi {
    constructor() {
        this.baseUrl = "https://api.publicapis.org/";
    }


    getSearchQuery(params) {

        let queryString = "";

        if (typeof params == 'object') {

            if (typeof params.title != 'undefined') {
                queryString += "title=" + params.title + "&";
            }

            if (typeof params.description != 'undefined') {
                queryString += "description=" + params.description + "&";
            }

            if (typeof params.auth != 'undefined') {
                queryString += "auth=" + params.auth + "&";
            }

            if (typeof params.https != 'undefined' && typeof params.https === 'boolean') {
                queryString += "https=" + params.https + "&";
            }

            if (typeof params.cors != 'undefined' && ["yes", "no", "unknown"].indexOf(params.cors) >= 0) {
                queryString += "cors=" + params.cors + "&";
            }

            if (typeof params.category != 'undefined') {
                queryString += "category=" + params.category;
            }
        }

        if (queryString.length > 0) {
            queryString = "?" + queryString;

        }

        return queryString;

        /*
            params to obiekt, który przyjmuje wszystkie mozliwe
            wartosci opisane w dokumentacji jako parametry dla GET /entries 

            na jego podstawie stwórz query string, który mozna bedzie dodac do /entries, np.
            "?categry=movies&?https=true&cors=no"

            warunki do spełnienia:
            1. własności, króre nie są wymienione jako parametry dla GET /entries powinny zostać pominięte, np.
                {cors: true, author: "Zenek"} zamieniamy na {cors: true} bo parametr "author" nie istnieje
            2. parametry, które nie zawierają sensownych wartości powinny zostać pominięte
                {cors: 25, https: true} zamieniamy na {http: true} bo "cors" przyjmuje tylko określone stringi
            3. jeśli po 1 i 2 nie ma parametrów zwróć pusty string
        */

        // przydatne info:
        // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
        // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    }

    search(params) {

        const searchUrl = this.baseUrl + "entries" + this.getSearchQuery(params);

        const promise = new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", searchUrl);
            xhr.addEventListener('load', () => resolve(xhr.responseText));
            xhr.addEventListener('error', () => reject(xhr.statusText));
            xhr.send();
        });

        promise.then(function(res) {
            console.log(res);
        }).catch(function(error) {
            console.log(error);
        });






        // stwórz searchUrl na podstawie baseUrl, enpointa określonego w dokumentacji oraz getSearchQuery
        //const searchUrl = "";

        // wykorzystaj searchUrl do wywołania zapytania do api

        // warunki do spełnienia
        // 1. użyj dowolnej metody (XMLHttpRequest, fetch, dodatkowa biblioteka)
        // 2. niezaleźnie od użytej metody zwróć Promise'a, który w przypadku:
        //    a) powodzenia zwróci obiekt {count: integer, results: Array}
        //    b) niepowodzenia zwróci string zawierajacy tresc bledu

        // przydatne info:
        //    - https://appelsiini.net/2017/accessing-api-with-javascript/
        //    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

    }
}

const api = new PublicApi();

//api.getSearchQuery({cors: "yes", http: true, category: "Continuous Integration"});
//api.getSearchQuery({cors: "dunno", auth: "apiKey"});
//api.getSearchQuery();

api.search({ cors: "yes", http: true, category: "Animals" });
api.search({ cors: "dunno", auth: "apiKey" });
api.search();