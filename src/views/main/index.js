import { menuList } from '../../data/menu.js'
import cookie from 'js-cookie'
import {sysHandle as ajax} from '../../services'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            sysName: '后台管理系统',
            menuList: []
        }
    },
    mounted() {
        this.menuList = menuList
        // 获取菜单接口
        // this.getMenus()
        // 获取登陆者信息
        this.getAccount()
        //获取公司信息
        this.getCompanyInfo()
    },
    computed: {
        ...mapGetters([
            'accountInfo', // 登录者信息
            'companyInfo', // 公司信息
        ])
    },
    methods: {
        ...mapActions([
            'setAccount', // 登陆者信息
            'getCompanyInfo', // 获取公司信息
        ]),
        getAccount() {
            ajax.getAccount().then((res) => {
                this.setAccount(res)
            })
        },
        /**
         * 获取菜单
         */
        getMenus() {
            ajax.getMenus().then((result) => {
                this.menuList = result
            })
        },
        /**
         * 调转到首页
         */
        gotoHome() {
            this.$router.push({
                path: '/dashboard'
            })
        },
        // 退出登录
        logout() {
            this.$confirm('确定退出登录吗？', '提示', { type: 'warning' }).then(() => {
                this.$message({
                    message: '退出登录成功',
                    type: 'success'
                })
                cookie.remove('wxb_erp_authToken')
                this.$router.push('log')
            }).catch(() => {

            })
        }
    }
}