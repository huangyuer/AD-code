import {
  getMyInfo,
  getMedications,
  getStarMenus,
  getMyStars,
  getQuestions,
  submitAnswer,
  getAnswerLogs,
  getMyAddress,
  upMyInfo,
  upMyAddress,
  delMyInfo,
  getGoods,
  exchangeGoods,
  getExchangeLogs,
  getExchangeDetail,
  getTasks,
  getMyScore,
} from "@/api/patientManagement";
const state = {
  getmyinfo: {},
  getmedications: [],
  getstarmenus: [],
  getmystars: [],
  getquesion: [],
  getmyaddress: '',
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
  GET_MYADDRESS: (state, getmyaddress) => {
    state.getmyaddress = getmyaddress;
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
  getAnswerLogs({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getAnswerLogs({
          page: question.page,
          limit: question.limit,
          startDate: question.startDate,
          endDate: question.endDate,
          isChart: question.isChart,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMyAddress({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getMyAddress()
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("GET_MYADDRESS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  upMyInfo({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      upMyInfo({
          name: question.name,
          sex: question.sex,
          birthday: question.birthday,
          province: question.province,
          city: question.city,
          diaTime: question.diaTime,
          medications: question.medications,
          level: question.level
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  upMyAddress({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      upMyAddress({
          recipient: question.recipient,
          phone: question.phone,
          province: question.province,
          city: question.city,
          area: question.area,
          detail: question.detail
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delMyInfo({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      delMyInfo()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getGoods({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getGoods()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exchangeGoods({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      exchangeGoods({
          goods: question.goods,
          address: question.address
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getExchangeLogs({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getExchangeLogs({
          page: question.page,
          limit: question.limit
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getExchangeDetail({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getExchangeDetail({
          id: question.id,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getTasks({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getTasks()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMyScore({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getMyScore()
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
