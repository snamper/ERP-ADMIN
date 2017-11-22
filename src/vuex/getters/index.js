export default {
    demoList: (state) => state.demo.demoList,
    menusRecord: (state) => state.sysconfig.menusHancleRecord, // 菜单操作记录
    regionStateList: state => state.basic.stateList, // 省
    teamList: state => state.basic.teamList, // 团队列表
    tagList: state => state.basic.tagList, // 分类标签
    sysImages: (state) => state.sysconfig.images, // 商家图片资源
    accountInfo: (state) => state.sysconfig.accountInfo, // 登录者信息
    isShowFullLoading: (state) => state.loading.isShowFullLoading, // 显示全局加载动画
    localLoading: (state) => state.loading.localLoading, // 显示局部加载动画
    companyInfo: (state) => state.basic.companyInfo, // 加载公司信息
}