import {
    getMyLocation,
    getNearHospitals,
    getHospital,
    getDoctors,
    hospitalSign,
    searchAddress,
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
    getNearHospitals({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getNearHospitals({
                    x: params.x,
                    y: params.y,
                    address: params.address,
                    distance: params.distance,
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getHospital({
        commit
    }, question) {
        return new Promise((resolve, reject) => {
            getHospital({
                    id: question
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getDoctors({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getDoctors({
                    hospital: params
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    hospitalSign({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            hospitalSign({
                    hospital: params.hospital,
                    file    : params.file
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    searchAddress({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            searchAddress({
                    address: params
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