import { MoviesApiPath } from './constants';
import { AuthApiPAth } from '../utils/constants';

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

    getMovies() {
        const url = `${this._baseUrl}/movies`;
        return fetch(url, {
            method: "GET",
            headers: this._headers,
        }).then(handleResponse);
    };

    createMovies({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
    }) {
        const url = `${this._baseUrl}/movies`;
        return fetch(url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image: MoviesApiPath + image.url,
                trailer: trailerLink,
                thumbnail: MoviesApiPath + image.formats.thumbnail.url,
                movieId,
                nameRU,
                nameEN
            }),
        }).then(handleResponse);
    };

    deleteMovies(movieId) {
        const url = `${this._baseUrl}/movies/${movieId}`;
        return fetch(url, {
            headers: this._headers,
            method: "DELETE",
        }).then(handleResponse);
    }
}


const createApi = (token) => new Api({
    baseUrl: AuthApiPAth,
    headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export default createApi;
