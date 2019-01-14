import axios from 'axios'
import baseurl from '.'

export async function postOrder (body, {token, tableId}) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        'token': token
      }
    }
    const response = await axios.put(`/order/${tableId}/add/`, body, config)
    return response
  } catch (err) {
    throw err.response
  }
}

export async function getMyOrder ({ token, tableId }) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        'token': token
      }
    }
    const { data } = await axios.get(`/order/me/${tableId}/`, config)
    return data
  } catch (err) {
    throw err.response
  }
}

export async function getAllOrder (token) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        'token': token
      }
    }
    const { data } = await axios.get(`/order/all/`, config)
    return data
  } catch (err) {
    throw err.response
  }
}

export async function getMyTransaction ({ token, tableId, transactionId }) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        token: token
      }
    }
    const { data } = await axios.get(`/order/${tableId}/mytransaction/${transactionId}`, config)
    return data
  } catch (err) {
    throw err.response
  }
}

export async function closeMyTransaction ({ token, tableId, transactionId }) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        token: token
      }
    }
    const { data } = await axios.patch(
      `/order/${tableId}/end/${transactionId}`,
      {},
      config
    )
    return data
  } catch (err) {
    throw err.response
  }
}

export async function cancelOrder (body, {token, tableId}) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        'token': token
      }
    }
    const response = await axios.put(`/order/${tableId}/cancel/`, body, config)
    return response
  } catch (err) {
    throw err.response
  }
}

export async function closeOrder (body, { token, tableId }) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        token: token
      }
    }
    const response = await axios.put(`/order/${tableId}/close/`, body, config)
    return response
  } catch (err) {
    throw err.response
  }
}

export async function updateStatus (body, token) {
  try {
    let config = {
      baseURL: baseurl,
      headers: {
        token: token
      }
    }
    const response = await axios.put(`/order/foodstatus/`, body, config)
    return response
  } catch (err) {
    throw err.response
  }
}

let order = {
  postOrder,
  getMyOrder,
  cancelOrder,
  closeOrder,
  getMyTransaction,
  closeMyTransaction,
  getAllOrder,
  updateStatus
}

export default order
