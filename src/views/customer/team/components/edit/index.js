import { cloneDeep } from 'lodash'
import {customer as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
        uploadBtn: String,
        detail: Boolean
    },
    data() {
        return {
            imgFile:[],//上传图片数组
            //提交数据的form
            form: {
                code:'',
                name:'',
                codeSerial:'',
                codeHead:'',
                note:'',
                url:'',
                status:0
            },
            // 初始表单
            initForm: {
                code:'',
                name:'',
                codeSerial:'',
                codeHead:'',
                note:'',
                url:'',
                status:0
            },
            // 输入验证
            rules: {
                name: [
                    { required: true, message: '团队名称不为空', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入1-4个英文字母', trigger: 'blur' },
                ],
                codeSerial: [
                    { required: true, message: '请输入6个长度的数字', trigger: 'blur' },
                ],
                codeHead: [
                    { required: true, message: '请输入1-4个英文字母', trigger: 'blur' },
                ],

            }
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
                this.$nextTick(() => {
                    this.imgFile = []
                    if(this.form.url !=null&& this.form.url!=''){
                        this.imgFile.push(this.form.url)
                    }
                })
                
                console.log(this.imgFile)
            }
            else {
                this.resetForm()
            }
        }
    },
    // mounted() {
    //     if (!this.isEdit) {
    //         this.resetForm()
    //     }
    // },
    // created() {
    //     this.setForm(this.editForm)
    // },
    methods: {
        resetForm() {
            this.form = cloneDeep(this.initForm)
        },
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
            }
            else {
                this.resetForm()
            }
        },
        // 返回
        close() {
            this.$emit('close')
        },
        // 保存
        save() {
            //1-4的字符的正则
            var abc = new RegExp("^[a-zA-Z]{1,4}$")
            //起始号
            var number = new RegExp("^[0-9]{6}$")
            
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let flag = true
                    var text = ''
                    if(!abc.test(this.form.codeHead)){
                        flag = false
                        text+='前缀必须为1-4个英文字母 '
                    }
                    if(!abc.test(this.form.code)){
                        flag = false
                        text +='编号必须为1-4个英文字母 '
                    }
                    if(!number.test(this.form.codeSerial)){
                        flag = false
                        text +='起始号必须为6个长度的数字 '
                    }
                    if(flag) {
                        var data = this.form;
                        ajax.saveTeam(data)
                            .then((result)=>{
                                console.log(result)
                                this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                this.close()
                            }) 
                            .catch((error) => {
                                this.$message.error(error)
                            });
                    }else{
                       this.$message({
                                message: text,
                                type: 'warning'
                            })
                    }

                }
            })
        },
        // 上传图片
        uploadSuccess(file) {
            
            this.form.url = file
            // this.imgFile=[]
            // this.imgFile.push(file);
            console.log(file)
        },
    }
}