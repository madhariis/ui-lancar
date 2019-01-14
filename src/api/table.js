import axios from 'axios'
import baseurl from './index'

export async function register (uniqueCode) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.patch(`/table/${uniqueCode}/register`, {}, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function loginUser (data) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.post(`/user/qrcode`, data, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function getTable () {
  try {
    let config = {
      baseURL: baseurl
    }
    const {
      data
    } = await axios.get(`/table/`, config)
    return data
  } catch (err) {
    throw err
  }
}

export async function getUser () {
  try {
    let config = {
      baseURL: baseurl
    }
    const {
      data
    } = await axios.get(`/user/all-qr`, config)
    return data
  } catch (err) {
    throw err
  }
}

let table = {
  register,
  getTable,
  getUser,
  loginUser
}

export default table
