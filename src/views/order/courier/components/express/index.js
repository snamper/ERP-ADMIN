import { cloneDeep } from 'lodash'
import { order as ajax } from '../../../../../services'

export default {
    props: {
        show: Boolean,
        title: String,
        expressForm: Object,
    },
    data() {
        return {

        	form: {
				merchantDeliveryID: "",
				params: [],
        	},
        	formObj:{
        		name: "",
        		value: "",
        		note: ""
        	}
        }
    },
    watch: {
        "expressForm"(expressForm) {
        	console.log("222222")
            this.getDeliveryConfig()
        }
    },
    mounted() {
    	console.log(this.expressForm)
    },
    methods: {
    	//获取快递配置参数
    	getDeliveryConfig(){
    		console.log("11111")
    		ajax.getMerchantDeliveryConfig(this.expressForm.merchantDeliveryID).then((result)=>{
    			console.log(result)
    			if(result.params) {
    				this.form.params = eval ("(" + result.params + ")")
    			}
    			
    		})
    	},
        // 返回
        close() {
            this.$emit('close')
            this.resetForm() //清楚数据
        },
        // 保存
        save() {
        	const saveForm = {
        		merchantDeliveryID: this.expressForm.merchantDeliveryID,
        		params: JSON.stringify(this.form.params)
        	}
        	
        	ajax.saveMerchantDeliveryConfig(saveForm).then((result)=>{
                this.$message({
                    message: '保存成功',
                    type: 'success'
                }) 
                this.refresh()
        	})
        },
        // 新增返点设置
        addGoodsType() {
        	console.log(this.form)
            this.form.params.push(cloneDeep(this.formObj))
        },
        // 刷新页面
        refresh() {
            this.$emit('refresh')
        },
        resetForm(){
        	this.form = {
				merchantDeliveryID: "",
				params: [],        		
        	}
        },
    }
}