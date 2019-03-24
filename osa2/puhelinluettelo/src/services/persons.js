import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(r => r.data)
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(r => r.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(r => r.data)
}
const remove = id => {
    return axios.delete(`${baseUrl}/${id}`).then(r => r.data)
}

export default {
    getAll,
    create,
    update,
    remove
}