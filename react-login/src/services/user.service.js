import Axios from 'axios'
export {
    login,
    logout,
    register,
    saveUser,
    getUserName,
    getAuthToken,
    checkUser
};

const API = 'http://localhost:1000/api/user/'

async function login(email, password) {
    const req = await Axios.post(`${API}/login`, {
        email: email,
        password: password
    })
    return req
}

async function register(firstName, lastName, email, password) {
    const req = Axios.post('http://localhost:1000/api/user/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
    return req
}

function saveUser(userDetails) {
    const details = {
        userId: userDetails.id,
        name: `${userDetails.firstName}:${userDetails.lastName}`,
        authToken: userDetails.authToken
    }

    // saving user to localstorage
    localStorage.setItem('user-details', JSON.stringify(details))
}

function getUserName() {
    const userDetails = localStorage.getItem('user-details')
    if (userDetails !== null) {
        const user = JSON.parse(userDetails)
        const fullUsername = user.name.split(':')
        return {
            firstName: fullUsername[0],
            lastName: fullUsername[1]
        }
    }
}

function getAuthToken() {
    const userDetails = localStorage.getItem('user-details')
    if (userDetails !== null) {
        const user = JSON.parse(userDetails)
        const token = user.authToken
        return token
    }
}

function checkUser() {
    const userDetails = localStorage.getItem('user-details')
    if (userDetails !== null) {
        return true
    } else {
        return false
    }
}

function logout() {
    localStorage.removeItem('user-details')
}