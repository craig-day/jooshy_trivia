import axios from 'axios'
import snakeize from 'snakeize'
import camelize from 'camelize'

export const SERVER = 'http://localhost:4000'

export const urlFor = (resource, id = null) => {
  const url = `${SERVER}/api/${resource}`

  if (id) {
    url += `/${id}`
  }

  return url
}

export const create = async (resource, data) =>
  await axios
    .post(urlFor(resource), snakeize(data))
    .then((response) => ({ ...response, data: camelize(response.data) }))

export const joinGame = async (data) =>
  await axios
    .post(urlFor('games', 'join'), snakeize(data))
    .then((response) => ({ ...response, data: camelize(response.data) }))
