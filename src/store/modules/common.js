import {
  getMenuSelect,
  getArticles,
  getArticle,
  star,
  unStar,
  getShareUrl,
  addOutPageLog,
  getSignature,
  getTempHtml
} from "@/api/common";
import axios from "axios";

const state = {
  menuList: [],
  articlesList: [],
  articleDetail: '',
  Star: false,
  sortwayctypetime: '',
  sortwayctypeclick: '',
};
const mutations = {
  SET_MENU: (state, menuList) => {
    state.menuList = menuList;
  },
  SET_ARTICLES: (state, articlesList) => {
    state.articlesList = articlesList;
  },
  SET_ARTICLE: (state, articleDetail) => {
    state.articleDetail = articleDetail;
  },
  SET_STARSAVE: (state, Star) => {
    state.Star = Star;
  },
  getsortwayctypetime: (state, value) => {
    state.sortwayctypetime = value;
  },
  getsortwayctypeclick: (state, value) => {
    state.sortwayctypeclick = value;
  },
};
const actions = {
    getTempHtml({
        commit
      }, params) {
        return new Promise((resolve, reject) => {
          getTempHtml(params)
            .then(response => {
              const {
                msg,
                data
              } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
  getMenuSelect({
    commit
  }, question) {
    const menu = question;
    return new Promise((resolve, reject) => {
      getMenuSelect({
          menu: menu
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("SET_MENU", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getArticles({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getArticles({
          menu: question.menu,
          childMenu: question.childMenu,
          tag: question.tag,
          title: question.title,
          page: question.page,
          limit: question.limit,
          province: question.province,
          city: question.city,
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("SET_ARTICLES", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  star({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      star({
          menu: question.menu,
          starId: question.starId
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("SET_STARSAVE", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  unStar({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      unStar({
          starId: question.starId
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getShareUrl({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getShareUrl({
          url: question.url,
          id: question.id
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getArticle({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getArticle({
          id: question
        })
        .then(response => {
          const {
            msg,
            data
          } = response;
          commit("SET_ARTICLE", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addOutPageLog({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      addOutPageLog({
          menu: question
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSignature({
    commit
  }, question) {
    return new Promise((resolve, reject) => {
      getSignature({
          url: question
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};
