export const state = () => ({
    employees: [],
    loaded: true,
})

export const getters = {
    getEmployees: state => {
        return state.employees
    },
    getLoaded: state => state.loaded,
}

export const mutations = {
    setEmployees(state, { data }) {
        state.employees = data
    },
    setLoaded(state, bool) {
        state.loaded = bool;
    },
}

export const actions = {
    async loadEmployees({ state, commit, dispatch, getters }) {
        commit('setLoaded', false);
        const res = await this.$repositories.employee.all()
        const { status, data } = res
        if (status === 200) {
            commit('setLoaded', true);
            commit('setEmployees', {
                data: data.data
            });
        }
    },
}