
export const state = () => ({
    sales: [],
    filters: {},
    loaded: true,
    loadingMore: false,
    total: 0,
    search: null,
    page: 1
})

export const getters = {
    getSales: state => state.sales,
    isLoaded: state => state.loaded,
    getTotal: state => state.total,
    getLoaded: state => state.loaded,
    getLoadingMore: state => state.loadingMore,
    getSearch: state => state.search,
    getFilters: (state) => {
        return {
            page: state.page,
            search: state.search,
            ...state.filters,
        }
    },
}

export const mutations = {
    setSales(state, { sales }) {
        state.sales = sales;
    },
    setMoreSales(state, { sales }) {
        state.sales = [...state.sales, ...sales];
    },
    setTotal(state, { total }) {
        state.total = total;
    },
    setPage(state, { page }) {
        state.page = page;
    },
    setLoaded(state, { value }) {
        state.loaded = value;
    },
    setLoadingMore(state, { value }) {
        state.loadingMore = value;
    },
    setSearch(state, { value }) {
        state.search = value;
    },
    setFilters(state, { filters }) {
        state.filters = filters;
    },
}

export const actions = {
    init({ dispatch, commit }) {
        dispatch('loadSalesData', true);
    },
    async loadSalesData({ state, commit, dispatch, getters }, reset = false) {
        if (getters.getLoaded && !getters.loadingMore) {
            if (reset) dispatch('reset');
            else commit('setLoadingMore', { value: true });
            const res = await this.$repositories.sale.all(getters.getFilters)
            const { status, data } = res
            if (status === 200) {
                let sales = [];
                data.data.forEach(async(sale, index) => {
                    let response = this.$repositories.sale.show(sale.id);
                    sales.push(response);
                });
                Promise.all(sales).then(results => { //Awaits all promises to complete and parses all responses in the 'results' variable
                    /**
                     * Map the responses to an array format that is more suitable to pass into the state contacts array.
                     */
                    let mapped_sales = results.map(sale => sale.data.data.attributes);
                    commit('setMoreSales', { sales: mapped_sales });
                    commit('setLoadingMore', { value: false });
                    commit('setLoaded', { value: true });
                });
                // commit('loadMoreTeams', { teams: response.data.data });
                commit('setTotal', { total: data.meta.total });
                commit('setPage', { page: state.page + 1 });
            }
        }
    },
    applySalesFilter({ commit, dispatch }, { filters }) {
        commit('setFilters', {
            filters: filters
        });
        dispatch('loadSalesData', true);
    },
    reset({ commit }) {
        commit('setLoaded', { value: false });
        commit('setSales', { sales: [] });
        commit('setPage', { page: 1 });
    },
    searchSales({ commit, dispatch }, { search }) {
        commit('setSearch', { value: search })
        dispatch('loadSalesData', true);
    }
}