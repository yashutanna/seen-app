import { ExchangeRateService } from "@/services/apiService";

const state = {
    openModal: null,
    mobileMenu: null,
    currencies: null,
    balance: {
        eth: null,
        seen: null,
    },
};

const mutations = {
    SET_OPEN_MODAL(state, modal) {
        state.openModal = modal
    },
    CLOSE_MODAL(state) {
        state.openModal = null
    },
    OPEN_MOBILE_MENU(state) {
        state.mobileMenu = true
    },
    CLOSE_MOBILE_MENU(state) {
        state.mobileMenu = false
    },
    SET_EXCHANGE_RATES(state, exchangeRates) {
        state.currencies = exchangeRates;
    },
    SET_BALANCE(state, balance) {
        state.balance = balance;
    }
};

const actions = {
    openModal(context, modal) {
        context.commit('SET_OPEN_MODAL', modal)
    },
    closeModal(context) {
        context.commit('CLOSE_MODAL')
    },
    async getExchangeRates(context) {
        ExchangeRateService.get().then((data) => {
            context.commit('SET_EXCHANGE_RATES', {
                seen: parseFloat(data.seen.usd, 10),
                bitcoin: parseFloat(data.bitcoin.usd, 10),
                ethereum: parseFloat(data.ethereum.usd, 10)
            });
        });
    },
    setBalance(context, balance) {
        context.commit('SET_BALANCE', balance);
    }
};

const getters = {
    openModal(state) {
        return state.openModal
    },
    mobileMenu(state) {
        return state.mobileMenu
    },
    currencies(state) {
        return state.currencies;
    },
    balance(state) {
        return state.balance;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
