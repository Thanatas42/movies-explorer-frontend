export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

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

export const getMoviesCard = () => {
    return fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then(handleResponse)
        .catch(new Error("Ошибка загрузки фильмов"));
};