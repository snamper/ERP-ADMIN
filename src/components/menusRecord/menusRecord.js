import {mapGetters, mapActions} from 'vuex'

export default {
	name: 'MenusRecord',
    props: ['currentPath'],
	mounted() {

    },
    computed: {
    	...mapGetters([
    			'menusRecord'
    		])
    },
    methods: {
    	...mapActions([
                'delMenusRecord', // 删除指定的单个菜单记录
                'delAllMenusRecord' // 删除所有的菜单记录
    		]),
    	/**
    	 * 跳转到对应的页面
    	 */
    	toPath(path) {
    		this.$router.push({
    			path: path
    		})
    	},
        /**
         * 删除指定的单个菜单记录
         */
        delMenu(path) {
            this.delMenusRecord(path)
        },
        /**
         * 删除所有的菜单记录
         */
        delAllMenu() {
            this.delAllMenusRecord()
        }
    }
}