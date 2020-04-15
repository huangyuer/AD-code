import {
    getVideos,
    getVideo,
    upVideoClickNum,
    getLive,
    uploadFile,
    getLeaveMsgList,
    addLeaveMsg,
    delLeaveMsg,
    getLvMsgSelect,
    uploadBase64File,
} from "@/api/diseaseKnowledge";

const state = {
    videoList: [],
    upvideoclicknum: 0,
    LiveList: [],
};

const mutations = {
    SET_VIDEOLIST: (state, videoList) => {
        state.videoList = videoList;
    },
    SET_UPVIDEOCLICKNUM: (state, upvideoclicknum) => {
        state.upvideoclicknum = upvideoclicknum;
    },
    SET_GETLIVE: (state, LiveList) => {
        state.LiveList = LiveList
    }
};

const actions = {
    getVideos({
        commit
    }, question) {
        return new Promise((resolve, reject) => {
            getVideos({
                    page: question.page,
                    limit: question.limit,
                    title: question.title,
                    tag: question.tag,
                    sort: question.sort,
                    desc: question.desc
                })
                .then(response => {
                    const {
                        msg,
                        data
                    } = response;
                    commit("SET_VIDEOLIST", data);
                    resolve(msg);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getVideo({
        commit
    }, question) {
        return new Promise((resolve, reject) => {
            getVideo({
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
    upVideoClickNum({
        commit
    }, question) {
        return new Promise((resolve, reject) => {
            upVideoClickNum({
                    id: question
                })
                .then(response => {
                    const {
                        msg,
                        data
                    } = response;
                    commit("SET_UPVIDEOCLICKNUM", data);
                    resolve(msg);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getLive({
        commit
    }, question) {
        return new Promise((resolve, reject) => {
            getLive()
                .then(response => {
                    const {
                        msg,
                        data
                    } = response;
                    commit("SET_GETLIVE", data);
                    resolve(msg);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    uploadFile({
        commit
    }, file) {
        let form = new FormData();
        form.append("file", file);
        return new Promise((resolve, reject) => {
            uploadFile(
                    form
                )
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

    getLeaveMsgList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getLeaveMsgList({
                    page: params.page,
                    limit: params.limit
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

    addLeaveMsg({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            let form = new FormData();
            form.append("sex", params.sex);
            form.append("age", params.age);
            form.append("description", params.description);
            form.append("tag", params.tag);
            form.append("level", params.level);
            for (var i = 0; i < params.images.length; i++) {
                form.append('images' + [], params.images[i])
            }
            addLeaveMsg(form)
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

    delLeaveMsg({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            delLeaveMsg({
                    id: params.id,
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

    getLvMsgSelect({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            getLvMsgSelect()
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
    uploadBase64File({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            uploadBase64File({
                    base64: params
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};