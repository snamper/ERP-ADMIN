import { cloneDeep } from 'lodash'
import {system as ajax} from 'services'

export default {
    props: {
        title: String,
        show: Boolean,
        isEdit: Boolean,
        editForm: Object,
        detail: Boolean,
        teams:Array,
    },
    data() {
        return {
            //提交数据的form
            //文本类型
            textType:[

                {
                    text: '自由消息',
                    value: 1
                },
                {
                    text: '消息模板',
                    value: 2
                }, 
            ],
            selected: [],
            form: {
                subject: "",
                distributorGroupID: "",
                content: "",
                body: '',
            },
            content:'',//内容
            // 初始表单
            initForm: {
                subject: "",
                distributorGroupID: "",
                content: "",
                body: '',
            },
            // 输入验证
            rules: {
                // textType: [
                //     { required: true, type: "regexp",  message: '请选择消息类型', trigger: 'change' },
                // ],
                subject: [
                    { required: true, message: '文本不为空', trigger: 'change' },
                ],
                distributorGroupID: [
                    { required: true, type: "regexp", message: '请选择团队', trigger: 'change' },
                ],

            }
        }
    },
    watch: {
        editForm(editForm) {
            if (this.isEdit) {
                console.log(this.editForm)
                this.form = cloneDeep(this.editForm)
                this.content = this.form.body
                if(this.form.distributorGroupID == null) {
                    this.form.distributorGroupID = ''
                }
                //this.getMsgOutById(this.form.msgOutID)
                //console.log(this.imgFile)
            }
            else {
                this.resetForm()
            }
        }
    },
    methods: {
        resetForm() {
            this.content = ''
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
        // //查询详情
        getMsgOutById(id) {
            ajax.queryMsgOutById(id).then((result) => {
            })
        },
        // 保存
        save() {
            console.log(this.form)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    ajax.saveMsgOut(this.form)
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
                        })

                } else {
                    return false
                }
            })
        },
        //发送
        send() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    ajax.saveMsgOut(this.form)
                        .then((result)=>{
                            this.selected = []
                            this.selected.push(this.form.msgOutID)
                            ajax.sendMsg(this.selected).then((result) => {
                                this.$message({
                                        message: '发送成功',
                                        type: 'success'
                                    });
                                this.close()
                            })
                            .catch((error) => {
                                this.$message.error(error)
                            })
                        }) 
                        .catch((error) => {
                            this.$message.error(error)
                        })

                } else {
                    return false
                }
            })

        }
    }
}