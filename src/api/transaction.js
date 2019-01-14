import axios from 'axios'
import baseurl from '.'

export async function getTransaction (args = {}) {
  try {
    let config = {
      baseURL: baseurl,
      params: args
    }
    const { data } = await axios.get(`/transaction/`, config)
    return data
  } catch (err) {
    throw err.response
  }
}

let transaction = {
  getTransaction
}

export default transaction
