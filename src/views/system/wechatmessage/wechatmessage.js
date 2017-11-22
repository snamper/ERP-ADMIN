import { system as ajax } from 'services'
import PgEdit from './components/edit/index.vue'
import { cloneDeep } from 'lodash'

export default {
    components: {
       PgEdit
    },
    data() {
        return {
            //消息模板
            form: {
                //微信公众号配置
                whchatSubscriptionConfig: {
                    appkey: '',//AppID(应用ID)
                    appSecret: '',//AppSecret(应用密匙) ,
                    mchID: '',//MchID(支付商户号) 
                    key: '',// PartnerKey(初始支付密匙) ,
                },
                //下级注册通知模版 
                registerTemplate: {
                    wechatMessageTemplateID: '',//id
                    templateType: 1,//消息模版类型 ,
                    template: '',//微信模版ID
                    firstData: '',//前置语
                    remarkData: '',//后置语
                },
                //自身下单通知模版 ,
                createOrderTemplate: {
                    wechatMessageTemplateID: '',//id
                    templateType: 2,//消息模版类型 ,
                    template: '',//微信模版ID
                    firstData: '',//前置语
                    remarkData: '',//后置语
                },
                // 订单提交通知上级模版
                commitOrderTemplate: {
                    wechatMessageTemplateID: '',//id
                    templateType: 3,//消息模版类型 ,
                    template: '',//微信模版ID
                    firstData: '',//前置语
                    remarkData: '',//后置语
                },
                //订单审核状态通知
                auditOrderTemplate: {
                    wechatMessageTemplateID: '',//id
                    templateType: 4,//消息模版类型 ,
                    template: '',//微信模版ID
                    firstData: '',//前置语
                    remarkData: '',//后置语
                },
                //发货通知
                sendGoodsTemplate: {
                    wechatMessageTemplateID: '',//id
                    templateType: 5,//消息模版类型 ,
                    template: '',//微信模版ID
                    firstData: '',//前置语
                    remarkData: '',//后置语
                },
            },
            editTitle: '',
            showEdit: false,
            editForm: {},
        }
    },
    mounted() {
        this.getWechatSubAndTemplateConfig()
    },
    methods: {
        // 保存
        save() {
            ajax.saveWechatSubAndTemplateConfig(this.form).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            }).catch((error) => {
                this.$message.error(error)
            })
        },
        // 获取微信公众号和微信通知消息模版配置信息
        getWechatSubAndTemplateConfig() {
            ajax.getWechatSubAndTemplateConfig().then((result) => {
                this.form = result
            })
        },
        // 编辑
        edit(item) {
            this.editTitle = '模板编辑'
            this.showEdit = true
            this.editForm = item
        },
        // 关闭编辑框
        closeEdit() {
            this.showEdit = false
        }
    }
}