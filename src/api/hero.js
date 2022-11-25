import axios from "axios";

const url = "https://anyapi.com"

const getHero = async heroId => {
    return axios.get(`${url}/heroes/${heroId}`)
}

const getHeroes = async params => {
    return axios.get(`${url}/heroes`, { params });
}

export {
    getHero,
    getHeroes
};
