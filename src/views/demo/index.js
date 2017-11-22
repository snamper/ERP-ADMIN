import { demo as ajax } from '../../services'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            title: 'Demo',
            isShow: true,
            total: 81,
            current: 1,
            tag: ['标签一', '标签二', '标签三'],
            stepActive: -1,
            isShowBox: false
        }
    },
    computed: {
        ...mapGetters([
            'demoList'
        ]),
    },
    mounted() {
        this.requestDemo()
    },
    methods: {
        ...mapActions([
            'setDemo'
        ]),
        openBox() {
            this.isShowBox = true
        },
        closeBox() {
            this.isShowBox = false
        },
        requestDemo() {
            //网络请求
            ajax.getDemoData((result) => {
                this.setDemo(result)
                console.log(result)
            })

            const result = [
                {
                    Name: 'aaa',
                    Age: '20'
                },
                {
                    Name: 'bbb',
                    Age: '21'
                },
                {
                    Name: 'ccc',
                    Age: '22'
                },
                {
                    Name: 'ddd',
                    Age: '23'
                }
            ]

            this.setDemo(result)
        },
        changePage(page) {
            console.log(page)
        },
        handleClose(item) {
            console.log(item)
        },
        stepChange() {
            this.stepActive++
            if (this.stepActive > 2)
                this.stepActive = -1
        }
    }
}