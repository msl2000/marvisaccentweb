const resource = '/sales'
export default () => ({
  all(payload) {
    return axios.get(`${resource}`, {
        params: payload
    })
  },

  show(id, payload) {
    return axios.get(`${resource}/${id}`, payload)
  },
})