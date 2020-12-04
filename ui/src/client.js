import axios from 'axios'

const SERVER = 'http://localhost:4000'

export const index = async (resource) =>
  await axios.get(`${SERVER}/api/${resource}`)

export const show = async (resource, id) =>
  await axios.get(`${SERVER}/api/${resource}/${id}`)

export const create = async (resource, payload) =>
  await axios.post(`${SERVER}/api/${resource}`, payload)
