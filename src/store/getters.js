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
  Star: state => state.common.Star
}
export default getters
