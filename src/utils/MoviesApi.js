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
    };

    getMoviesCard() {
        const url = `${this._baseUrl}`;
        return fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(handleResponse);
    };
}



const createApi = () => new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default createApi;