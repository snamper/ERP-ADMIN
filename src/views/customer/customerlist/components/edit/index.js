import { cloneDeep } from 'lodash'
import {customer as ajax} from 'services'

export default {
    props: {
        title: String,//页面标题
        show: Boolean,//是否显示
        isEdit: Boolean,//判断是否是修改
        editForm: Object,//当前form的数据对象
        detail:Boolean,//判断是否是详情
        teamsList:Array,//团队列表数据
        type: String, //访问类型（‘1‘=新增 ‘2‘=查看 ‘3‘=修改）
        place:Object,//设置的地址
    },
    data() {
        return {
            distributorGroupID:'',//选中的团队
            //form 表单
            form: {
                distributorLinkID :'',
                guaranteeFlag:'',
                customerID:'',
                distributorGroupID:'',
                introducerID:'',
                name:'',
                mobile:'',
                state:'',
                city:'',
                district:'',
                stateName:'省',
                cityName:'市',
                districtName:'区',
                address:'',
                certNo:'',
                wechat:'',
                beingDate:'',
                endDate:'',
                passWord:'',
                note:'',
                qrCodeImg:'',
                customerGradeID:''
            },
            qRList:[],//二维码图片地址
            timeList:[],//授权时间集合
            teamList:[],//团队列表
            levelList:[],//团队等级集合
            personList:[],  //推荐人集合
            customerList:[],//团队客户集合
            //是否选项
            optionList:[
                {
                text:'是',
                value:1,
                },
                {
                text:'否',
                value:0,
                },
            ],
            // 输入验证
            rules: {
                distributorGroupID: [
                    { 
                        required: true,
                         message: '请选择所属团队', 
                         trigger: 'blur' },
                ],
                name: [
                    { 
                        required: true, 
                        message: '请输入分销客户真实名称', 
                        trigger: 'blur' },
                ],
                introducerID:[
                    {
                        required: true, 
                        message: '请选择推荐人', 
                        trigger: 'blur' }
                ],
                customerGradeID:[
                    {
                        required: true, 
                        message: '请选择分销等级', 
                        trigger: 'blur' }
                ],
                wechat:[
                    {
                        required: true, 
                        message: '请填写微信号', 
                        trigger: 'blur' }
                ],
                certNo:[
                    {
                        required: true, 
                        message: '请填写身份证号', 
                        trigger: 'blur' }
                ],
                mobile:[
                    {
                        required: true, 
                        message: '请填写手机号码', 
                        trigger: 'blur' }
                ],
                qrCodeImg:[
                    {
                        required: true, 
                        message: '请上传收款二维码', 
                        trigger: 'blur' }
                ],
                passWord:[
                    {
                        required: true, 
                        message: '请输入密码', 
                        trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        place:{
                handler(val,one){
                this.form.state = this.place.state
                this.form.city = this.place.city
                this.form.district = this.place.district
                this.form.stateName = this.place.stateName
                this.form.cityName = this.place.cityName
                this.form.districtName = this.place.districtName
            
                },
            deep: true
        },
        show(val){
            if(val){
                this.getCustomerList()
            }
        },
        type(val) {
            this.setTeamList(this.teamsList)
            if(val == '1') {
                this.resetForm()
                this.customerList = []//团队客户集合
                this.timeList = []
                let begin = new Date()
                let endYear = begin.getFullYear() + 1
                let endMonth = begin.getMonth()+1
                let endDay = begin.getDate()
                let beginDefault = begin.getFullYear() + '-' + endMonth + '-' + endDay
                let endDefault = endYear + '-' + endMonth + '-' + endDay
                this.timeList[0] = beginDefault
                this.timeList[1] = endDefault
                this.distributorGroupID = ''
            }
                
            // }else if(val == '2'||val == '3'){
            //     // this.resetForm() 
            //     // this.getTeamLevelList(this.editForm.distributorGroupID)
            //     // this.querySelectIntror(this.editForm.distributorGroupID)
            //     // this.getCustomerList(this.editForm.distributorGroupID)
            //     // this.getCustomerDetail(this.editForm.distributorLinkID);
                
            //     // this.form = cloneDeep(this.editForm)
            //     // this.distributorGroupID= this.form.distributorGroupID
            //     // this.timeList[0]= this.form.beginTime
            //     // this.timeList[1]= this.form.endTime
            // }
        },
        //监听editForm
        editForm(editForm) {
            if (this.isEdit) {
                this.resetForm()
                this.customerList = []//团队客户集合
                this.getTeamLevelList(this.editForm.distributorGroupID)
                this.querySelectIntror(this.editForm.distributorGroupID)
                this.getCustomerDetail(this.editForm.distributorLinkID);
                //this.form = cloneDeep(this.editForm)
                this.distributorGroupID= this.editForm.distributorGroupID
                this.timeList[0] = this.editForm.beginTime
                this.timeList[1] = this.editForm.endTime
                    
                
            }
        },
        
    },
    methods: {
        //重置页面
        resetForm() {
            //用于初始化form
            let initForm = {
                distributorLinkID :'',
                guaranteeFlag:'',
                customerID:'',
                distributorGroupID:'',
                introducerID:'',
                name:'',
                mobile:'',
                state:'',
                city:'',
                district:'',
                stateName:'',
                cityName:'',
                districtName:'',
                address:'',
                certNo:'',
                wechat:'',
                beingDate:'',
                endDate:'',
                passWord:'',
                note:'',
                qrCodeImg:'',
                customerGradeID:''
            }
            this.form = cloneDeep(initForm)
            this.qRList = []
            this.levelList = []//团队等级集合
            this.personList = [] //推荐人集合
            
        },
        //设置form
        setForm(editForm) {
            if (this.isEdit) {
                this.form = cloneDeep(this.editForm)
            }
        },
        //设置团队列表
        setTeamList(teamsList) {
            this.teamList = teamsList
        },
        // 返回
        close() {
            this.distributorGroupID = ''
            this.customerList = []//团队客户集合
            this.resetForm()
            
            this.$emit('close')
        },
        // 省市区选择
        changeRegions(val) {
            //console.log(val)
            if(val.state){
               this.form.state=val.state
               this.form.city=val.city
               this.form.district=val.district
            }
        },
        // 单图上传
        uploadSuccess(file) {
            console.log(file)
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.distributorGroupID = this.distributorGroupID
                    this.form.beingDate = this.timeList[0]
                    this.form.endDate = this.timeList[1]
                    ajax.saveCustomer(this.form)
                        .then((result)=>{
                            console.log("Baocun")
                            console.log(result)
                            this.$message({
                                message:'保存成功',
                                type:'success'
                            })
                            this.close()
                        })
                        .catch((error)=>{
                            this.$message.error(error)
                        })
                }
            })
            
        },
        //获取推荐人
        querySelectIntror(distributorGroupID) {
            let param={
                "distributorGroupID": distributorGroupID,
                "customerName": "",
                "introducer": "",
                "status": 1,
            }
            ajax.querySelectIntror(param)
                .then((result)=>{
                    this.personList= result
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
        //查询团队级别列表
        getTeamLevelList(distributorGroupID) {
            ajax.queryTeamLevelList(distributorGroupID)
                .then((result)=>{
                    console.info('级别')
                    console.info(result)
                    this.levelList = result
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
        //获取分销客户下拉列表
        getCustomerList(){
            
            ajax.selectStatusCustomerNameList('')
                .then((result)=>{
                    this.customerList = result
                })
                .catch((error)=>{
                    this.$message.error(error)
                })
        },
        //团队下拉切换
        teamChange(val){
            console.info(val);
            if(this.distributorGroupID !='') {
                this.resetForm()
                this.form.distributorGroupID = val
                // this.getCustomerList()
                this.getTeamLevelList(this.form.distributorGroupID)
                this.querySelectIntror(this.form.distributorGroupID)
            
            }
        },
        // 获取客户详情
        getCustomerDetail(distributorLinkID) {
            ajax.queryCustomerDetail(distributorLinkID)
                .then((result)=>{
                    this.form = result
                    this.qRList = []
                    if(result.qrCodeImg!=''&&result.qrCodeImg!=null)  {
                        this.qRList.push(result.qrCodeImg)
                    }
                    // this.timeList[0]= result.beginTime
                    // this.timeList[1]= result.endTime
                })
        },
        //关联客户下拉切换
        customerChange(val){
            console.info(val);
            if(val==''){
                this.form.name = ''
                this.form.wechat = ''
                this.form.certNo =''
                this.form.mobile ='' 
                this.form.passWord ='' 
                this.form.state = ""
                this.form.city = ""
                this.form.district = ""
                this.form.stateName = ""
                this.form.cityName = ""
                this.form.districtName = ""
                this.form.note = ''
                this.form.qrCodeImg = ''
                this.qRList = []
                return false
            }
            ajax.queryCustomerDetailByCustomerId(val)
                .then((result)=>{
                    console.info(result)
                    this.form.name = result.name
                    this.form.wechat = result.wechat
                    this.form.certNo = result.certNo
                    this.form.mobile = result.mobile
                    this.form.passWord = result.passWord
                    this.form.state = result.state
                    this.form.city = result.city
                    this.form.district = result.district
                    this.form.stateName = result.stateName
                    this.form.cityName = result.cityName
                    this.form.districtName = result.districtName
                    this.form.note = result.note
                    this.form.qrCodeImg = result.qrCodeImg
                    this.qRList = []
                    if(result.qrCodeImg!=''&&result.qrCodeImg!=null)  {
                        this.qRList.push(result.qrCodeImg)
                    }
                })
        },

        // 上传二维码
        uploadSuccess(file) {
            this.form.qrCodeImg=file
            // this.qRList=[]
            // this.qRList.push(file)
            console.log(file)
        },
        //设置显示地区
        setPlace(){
            this.$emit("setPlace")
        },
        
    }
}