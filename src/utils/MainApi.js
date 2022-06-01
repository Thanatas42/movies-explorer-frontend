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
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };


    updateUser(name, email) {
        const url = `${this._baseUrl}/users/me`;
        return fetch(url, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, email }),
        }).then(handleResponse);
    };

}

const createApi = (token) => new Api({
    baseUrl: "https://api.movies-dmitry.nomoredomains.rocks",
    headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export default createApi;
