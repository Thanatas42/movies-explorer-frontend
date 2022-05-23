const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json().then((json) => {
        if (json.data) {
            return json.data;
        } else {
            return json;
        }
    })
};

class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        //this._headers = headers;
    };

    getMoviesCard() {
        const url = `${this._baseUrl}`;
        return fetch(url).then(handleResponse);
    };
}



const createApi = () => new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default createApi;