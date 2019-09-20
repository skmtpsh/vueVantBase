export default {
  namespaced: true,
  state: {
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set ({ state, commit, dispatch }, info) {
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load ({ state, commit, dispatch }) {

    }
  }
}
