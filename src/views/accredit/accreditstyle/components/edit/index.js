import { cloneDeep } from 'lodash'
import {accredit as ajax} from 'services'

export default {

    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object
    },
    data() {
        return {
            mainImageUrl: '', 
            form: {
                mainImageUrl:''
            },         
            // 输入验证
            rules: {
                name: [
                    { required: true, message: '请输入授权样式名称', trigger: 'blur' },
                ],
                mainImageUrl: [
                    { required: true, message: '请上传授权样式模板', trigger: 'blur' },
                ],
            

            }
        }
    },
    watch: {
        show() {
            if (this.show) {
                console.log(this.form)
                this.form = cloneDeep(this.editForm)
                console.log(this.form)
            }
            
        }
    },
    methods: {
       
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                console.log(this.form)
                if (valid) {
                    // 验证通过
                    var data = this.form
                    ajax.saveAccreditStyle(data)
                        .then((result)=>{
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            })
                            this.close()
                        })
                        .catch((error)=>{
                            this.$message.error(error);
                        })
                }
            })
        },
        // 单图
        uploadSuccess(file) {
            this.form.mainImageUrl = file
            console.log(file)
        },
    }
}