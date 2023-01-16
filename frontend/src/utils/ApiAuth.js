const apiAuthHost = 'https://auth.nomoreparties.co';

export const signUpUser = async (email, password) => {
    const res = await fetch(`${apiAuthHost}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    return checkResponse(res);
};

export const signInUser = async (email, password) => {
    const res = await fetch(`${apiAuthHost}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    return checkResponse(res);
};

export const getUserContent = async (token) => {
    const res = await fetch(`${apiAuthHost}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return checkResponse(res);
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);