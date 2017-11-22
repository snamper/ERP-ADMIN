import { sysHandle as ajax } from 'services'
import { mapGetters, mapActions } from 'vuex'
import cookie from 'js-cookie'

export default {
    data() {
        return {
            logining: false,
            form: {
                grant_type: 'password',
                username: '',
                password: '',
                scope: 'pc'
            },
            rules: {
                username: [
                    { 
                        required: true, 
                        message: '请输入账号', 
                        trigger: 'blur' 
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.logining = true
                    ajax.login(this.form).then((result) => {
                        this.logining = false
                        if (result) {
                            cookie.set('wxb_erp_authToken', result.access_token)
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            })

                            setTimeout(() => {
                                this.$router.push('/dashboard')
                            }, 600)
                        }
                    }).catch((error) => {
                        this.logining = false
                        this.$message({
                            message: '账号或密码错误',
                            type: 'error'
                        })
                    })
                }
            })
        }
    }
}
