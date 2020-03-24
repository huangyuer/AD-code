import {
  getMyLocation,
  getNearHospitals,
  getDoctors
} from "@/api/medicationGuidance";
const state = {

};

const mutations = {

};

const actions = {
  getMyLocation({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getMyLocation()
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
