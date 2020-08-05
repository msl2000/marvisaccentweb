export const state = () => ({
    filters: {},
    loaded: true,
    statistics: {
        labels: [],
        data: []
    },
    dates: []
})

export const getters = {
    getStatistics: state => {
        return {
            labels: state.statistics.labels,
            datasets: [{
                label: 'Month Data',
                backgroundColor: '#00d4cb',
                data: state.statistics.data
            }]
        }
    },
    getFilters: state => {
        return {
            schema: 'statistics',
            ...state.filters
        }
    },
    getLoaded: state => state.loaded,
}

export const mutations = {
    setStatistics(state, { data }) {
        state.statistics = data
    },
    setFilters(state, { filters }) {
        state.filters = filters;
    },
    setLoaded(state, bool) {
        state.loaded = bool;
    },
}

export const actions = {
    init({ dispatch, commit }, { date, filter_by }) {
        commit('setFilters', {
            filters: {
                filter_by: filter_by,
                date: date,
            }
        })
        dispatch('loadStatistics', true);
    },
    async loadStatistics({ state, commit, dispatch, getters }) {
        if (getters.getLoaded && !getters.loadingMore) {
            commit('setLoaded', false);
            const res = await this.$repositories.sale.all(getters.getFilters)
            const { status, data } = res
            if (status === 200) {
                commit('setLoaded', true);
                commit('setStatistics', {
                    data: data
                });
            }
        }
    },
    applyFilters({ commit, dispatch }, { filters }) {
        commit('setFilters', {
            filters: filters
        });
        dispatch('loadStatistics', true);
    },
}