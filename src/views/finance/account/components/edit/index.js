import { cloneDeep } from 'lodash'
import {finance as ajax} from 'services'

export default {

    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
                //操作类型下拉数据
                typeOptions:[
                            {
                                value: 1,
                                text: '余额'
                            },
                            {
                                value: 2,
                                text: '佣金'
                            },  
                ],
                //动作下拉数据
                actionOptions:[
                            {
                                value: 1,
                                text: '增加'
                            },
                            {
                                value: -1,
                                text: '减少'
                            },
                ],
            form: {
                distributorLinkID:'',//关系ID
                type:1,//类型
                directFlag :1,//动作
                accValue:''//调整数
            },
            // 初始表单
            initForm: {
                distributorLinkID:'',
                type:1,
                directFlag :1,
                accValue:''
            },           
        }
    },
    watch: {
        show(val){
            if(val){
                console.info('11');
                this.resetForm()
                this.form.distributorLinkID = this.editForm.distributorLinkID
            }
        }
    },
    methods: {
        //主页面修改
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            let param = this.form
            var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
            if(!reg.test(param.accValue)) {
                this.$message({
                        message:'请输入正数',
                        type:'warning'
                    })
                return false
            }
            ajax.updateAdjustAccount(param)
                .then((result)=>{
                    this.$message({
                        message:'调整成功',
                        type:'success'
                    })
                    this.close()
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
    }
}