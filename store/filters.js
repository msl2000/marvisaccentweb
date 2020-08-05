export const state = () => ({
    loaded: false,
    path: [],
    customers: [],
    employees: []
})

export const getters = {
    getCustomers: state => state.customers,
    getEmployees: state => state.employees,
}

export const mutations = {
    setFilters(state, {
        customers,
        employees,
    
    }) {
        state.customers = customers ? customers : state.customers;
        state.employees = employees ? employees : state.employees;

    }
}

export const actions = {
    async loadFilters({ commit, getters, dispatch, rootGetters }) {
        axios.get('/filters')
            .then(response => {
                let data = response.data.data;
                commit('setFilters', data);
            })
    },
}