import axios from "axios";

const url = 'http://127.0.0.1:9000'

let user = null;

export function Login(username, password) {
    return axios.post(`${url}/auth`, {}, {
        auth: {
            username,
            password,
        }
    }).then((result) => {
        localStorage.setItem('user', JSON.stringify(result.data));
        user = result.data;

        return result;
    })
}

export function Boards() {
    User();
    return axios.get(`${url}/boards`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export function Board(id) {
    User();
    return axios.get(`${url}/boards/${id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export function Notes(board) {
    User();
    return axios.get(`${url}/boards/${board}/notes`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export function NewBoard(board) {
    User();
    return axios.post(`${url}/boards`, board, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export function NewNote(note) {
    User();
    return axios.post(`${url}/boards/${note.board}/notes`, note, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export function User() {
    if (user) {
        return user;
    }

    const localUser = localStorage.getItem('user')

    if (localUser) {
        const userParsed = JSON.parse(localUser);
        user = userParsed;
        return user;
    }

    return null;
}

export default {
    User,
    Login,
    Boards,
    Board,
    NewBoard,
    Notes,
    NewNote
}