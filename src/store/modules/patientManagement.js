import {
  getMyInfo,
  getMedications,
  getStarMenus,
  getMyStars,
  getQuestions,
  submitAnswer,
} from "@/api/patientManagement";
const state = {
  getmyinfo: '',
  getmedications: [],
  getstarmenus: [],
  getmystars: [],
  getquesion: [],
};

const mutations = {
  GET_MYINFO: (state, getmyinfo) => {
    state.getmyinfo = getmyinfo;
  },
  GET_MEDICATIONS: (state, getmedications) => {
    state.getmedications = getmedications;
  },
  GET_STARMENUS: (state, getstarmenus) => {
    state.getstarmenus = getstarmenus;
  },
  GET_MYSTARS: (state, getmystars) => {
    state.getmystars = getmystars;
  },
  GET_QUESTION: (state, getquesion) => {
    state.getquesion = getquesion;
  },
};

const actions = {
  getMyInfo({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getMyInfo()
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_MYINFO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMedications({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getMedications()
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_MEDICATIONS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getStarMenus({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getStarMenus()
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_STARMENUS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMyStars({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getMyStars({
          menu: question.menu,
          desc: question.desc,
          page: question.page,
          limit: question.limit,
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_MYSTARS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQuestions({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getQuestions()
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_QUESTION", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  submitAnswer({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      submitAnswer({
          detail: question
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
