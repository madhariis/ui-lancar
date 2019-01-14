import axios from 'axios'
import baseurl from '.'

export async function menuByCategory () {
  try {
    let config = {
      baseURL: baseurl
    }
    const {
      data
    } = await axios.get(`/menu/category/`, config)
    return data
  } catch (err) {
    throw err
  }
}

export async function getCategory () {
  try {
    let config = {
      baseURL: baseurl
    }
    const {
      data
    } = await axios.get(`/menu/category/all/`, config)
    return data
  } catch (err) {
    throw err
  }
}

export async function createCategory (body) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.post(`/menu/category/`, body, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function createMenu (body) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.post(`/menu/`, body, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function updateMenu (id, body) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.put(`/menu/${id}/`, body, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function deleteMenu (id) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.delete(`/menu/${id}/`, config)
    return response
  } catch (err) {
    throw err
  }
}

export async function uploadImage (body) {
  try {
    let config = {
      baseURL: baseurl
    }
    const response = await axios.post(`/image/upload/`, body, config)
    return response
  } catch (err) {
    throw err
  }
}

let menu = {
  menuByCategory,
  getCategory,
  createCategory,
  createMenu,
  updateMenu,
  deleteMenu,
  uploadImage
}

export default menu
