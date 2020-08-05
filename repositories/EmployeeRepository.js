const resource = '/employees'
export default () => ({
  all(payload) {
    return axios.get(`${resource}`)
  },

})