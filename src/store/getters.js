const getters = {

    token: state => state.register.token,
    openId: state => state.register.openId,
    //getMenuSelect
    menuList: state => state.common.menuList,
    //getArticles
    articlesList: state => state.common.articlesList,
    //文章详情
    articleDetail: state => state.common.articleDetail,
    //收藏
    Star: state => state.common.Star,
    //视频列表
    videoList: state => state.diseaseKnowledge.videoList,
    //观看次数加1
    upvideoclicknum: state => state.diseaseKnowledge.upvideoclicknum,
    //获取视频直播列表
    LiveList: state => state.diseaseKnowledge.LiveList,
    //获取个人信息
    getmyinfo: state => state.patientManagement.getmyinfo,
    //编辑个人信息获取药物列表
    getmedications: state => state.patientManagement.getmedications,
    //获取我的收藏分类
    getstarmenus: state => state.patientManagement.getstarmenus,
    //获取我的收藏
    getmystars: state => state.patientManagement.getmystars,
    //自我评估
    getquesion: state => state.patientManagement.getquesion,
    //获得我的地址
    getmyaddress: state => state.patientManagement.getmyaddress,
    //dan
    IsSubmitExchange: state => state.patientManagement.IsSubmitExchange,
    IssaveAddress: state => state.patientManagement.IssaveAddress,
    produceinfoToeditaddress: state => state.patientManagement.produceinfoToeditaddress,
}
export default getters