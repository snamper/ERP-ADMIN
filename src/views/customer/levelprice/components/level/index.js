import { cloneDeep } from 'lodash'
export default {
    props: {
        show: Boolean,
        editForm: Object,

    },
    data() {
        return {
            query:{
                code:'',
                name:''
            },
            priceType:'1',
            priceOption:[{
                value: 0,
                label: '固定金额'
            },
            {
                value: 1,
                label:'百分比'
            }],
            priceBtnName:'锁定',
            priceList: [{
                code:'11',
                name:'aux',
                price:134,
                ceo:'',
                zd:'',
                shengd:'',
                shid:''
            },{
                code:'11',
                name:'aux',
                price:134,
                ceo:'',
                zd:'',
                shengd:'',
                shid:''
            }],
            value:'',
            form: {},
            // 初始表单
            initForm: {
                teamname: '',
                teamcode: '',
                note:'',
            },
            selected:[],
            selectDisable: false,
            
        
        }
    },
    computed: {
        //搜索区默认显示
        defaultQuery: {
            get() {
                return [
                    {
                        type: 'input',
                        label: '货号',
                        model: 'code'
                    },
                    {
                        type: 'input',
                        label: '名称',
                        model: 'name'
                    },
                    
                ]
            }
        },
    },
    
    methods: {
        // 全选
        selectChange(selections) {
            this.selected = selections
            console.log(selections)
        },
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
        closeType(){
            if(this.priceBtnName=='锁定'){
                this.selectDisable=true;
                this.priceBtnName='开锁';
            }else{
                this.selectDisable=false;
                this.priceBtnName='锁定';
            }
        },
        // 返回
        close() {
            this.$emit('close')
        },
        newLevel(){
            this.levelList.push(this.oneNewLevel);
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 验证通过
                }
            })
        },
        // 搜索按钮
        search() {
           
            this.getDecorationEffects()
        },
    },
}