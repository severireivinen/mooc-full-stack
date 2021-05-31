import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, addPerson, deletePerson, updatePerson }