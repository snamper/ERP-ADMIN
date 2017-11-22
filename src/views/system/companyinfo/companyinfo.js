import {system as ajax} from 'services'

export default {
    data() {
        return {
            form: {
                corpName: '',//公司名称
                contact: '',//联系方式
                webSite:'',//erp域名
                securityWebSite:'',//微信端域名
                payQRCode : '',//收款二维码
                loginLogo : '',//前端登陆Logo
                loginBackImage : '',//前端登陆背景
                manageLogo : '',//后台logo
                subscriptionQrCode:'',//微信公众号二维码
                carouselImages: [],//首页轮播
                
            },
            
            payQRCode:[],//收款二维码
            loginLogo:[],//前端登陆Logo
            loginBackImage : [],//前端登陆背景
            manageLogo : [],//后台logo
            subscriptionQrCode:[],//微信公众号二维码
            carouselImages: [],//首页轮播
            addText:[],//页面上存在的启用文本

            page:[],//轮播图对应的页面
            texts:[],//所有启用的文本
           
        };
    },
    methods: {
        
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        //获取公司详细信息
        queryCompanyDetail(){
            ajax.getCompanyDetail()
                .then((result)=>{
                    this.form = result
                    if(result.payQRCode !='' && result.payQRCode != null) {
                        this.payQRCode.push(result.payQRCode)
                    }
                    if(result.loginLogo !='' && result.loginLogo != null) {
                        this.loginLogo.push(result.loginLogo)
                    }
                    if(result.loginBackImage !='' && result.loginBackImage != null) {
                        this.loginBackImage.push(result.loginBackImage)
                    }
                    if(result.manageLogo !='' && result.manageLogo != null) {
                        this.manageLogo.push(result.manageLogo)
                    }
                    if(result.subscriptionQrCode !='' && result.subscriptionQrCode != null) {
                        this.subscriptionQrCode.push(result.subscriptionQrCode)
                    }
                    if(result.carouselImages.length>0) {
                        for(let i=0;i<result.carouselImages.length;i++){
                            this.carouselImages.push(result.carouselImages[i].imageUrl)
                            this.addText.push(result.carouselImages[i].basTextID)
                        }
                    }
                })
        },
        //保存公司信息
        save() {
            ajax.saveCompanyDetail(this.form)
                .then((result)=>{
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    this.$message.error(error)
                })
        },
        /**获取全部的启用的文章 */
        getAllText(){
            ajax.getAllText()
                .then((result)=>{
                    this.texts = result
                   
                })
        },
            // 微信公众号二维码
        uploadWechatQRCode(file) {
            this.form.subscriptionQrCode = file  
        },
        // 二维码
        uploadPayQRCode(file) {
            this.form.payQRCode = file  
        },
        // 前端登陆Logo
        uploadLoginLogo(file) {
            this.form.loginLogo = file
        },
        // 前端登陆背景
        uploadLoginBackImage(file) {
            this.form.loginBackImage = file
            
        },
        // 后端登陆Logo
        uploadManageLogo(file) {
            this.form.manageLogo = file  
        },
        // 多图
        multipleUploadSuccess(filelist) {
            let content = []
            let images = this.form.carouselImages
            let oldVal = this.carouselImages
            let val = filelist
            if(oldVal.length<val.length) {
                this.carouselImages = filelist;
                images.push({basTextID:'',imageUrl:val[val.length-1]})
            } else{
                let deleteOne = '';
                for(let i=0;i<oldVal.length;i++){
                        for(let j=0;j<val.length;j++){
                            if(oldVal[i]==val[j]){
                                break;
                            }else{
                                if(j==val.length-1){
                                    deleteOne = oldVal[i];
                                }
                            }
                        }
                }
                for(let m=images.length-1;m>=0;m--){
                    if(images[m].imageUrl == deleteOne){
                        images.splice(m,1)
                        break;
                    }
                }
            }
        },
    },
    mounted(){
        this.getAllText();
        this.queryCompanyDetail()
    },
    watch:{
    }
}