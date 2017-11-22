import { system as ajax } from 'services'
import { cloneDeep } from 'lodash'

export default {
    components: {
       
    },
    data() {
        return {
            checkAll: true,//全选
            menu: [],//菜单列表
            checkList: [],//选择到的菜单项
            isIndeterminate: true,
            menuID: [],//全部的菜单id
        }
    },
	computed: {
       
    },
    mounted() {
        // 获取菜单列表
        this.getMobileMenu()
    },
    methods: {
        getMobileMenu() {
            ajax.getMobileMenu(-1).then((result) => {
                this.menu = result
                // console.log(this.menu)
                // 判断是否全部的菜单都启用
                this.menuID = []
                this.menu.forEach((item) => {
                    this.menuID.push(item.mobileMenuID)
                })
            })
        },
        // 保存
        save() {
            ajax.updateMobileMenu(this.checkList).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                this.getMobileMenu()
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 处理全选按钮
        handleCheckAllChange(event) {
            this.checkList = event.target.checked ? this.menuID : []
            this.isIndeterminate = false
        },
        // 控制全选样式
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.menu.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.menu.length
        }
    }
}