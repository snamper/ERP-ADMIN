import { cloneDeep } from 'lodash'

export default {
    name: 'PgSearchForm',
    props: {
        // form对象
        value: {
            type: Object,
            required: true,
        },
        // 默认显示的表单
        defaultForm: {
            type: Array,
            default() {
                return []
            },
            validator(val) {
                return val.length < 3
            }
        },
        // 隐藏的表单项
        more: Array,
        // 是否显示隐藏的表单项
        isShowMore: {
            type: Boolean,
            default() {
                return false
            }
        },
        // 点击重置时是否自动重置
        autoReset: {
            type: Boolean,
            default() {
                return true
            }
        },
        // 重置表单数据
        resetForm: {
            type: Object,
        }
    },
    data() {
        return {
            maxHeight: 0,
            showHeight: 0,
            isOpen: false,  // 是否显示隐藏的表单
            initForm: {},  // 存放重置表单数据
            // 时间组件快捷选项
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                    }
                }]
            },
            // 时间范围组件快捷选项
            pickerOptionsRange: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                },]
            },
        }
    },
    computed: {
        /**
         * 用来双向绑定表单数据
         */
        form: {
            get() {
                return this.value
            },
            set(form) {
                this.$emit('input',form)
            }
        }
    },
    /**
     * 如果isShowMore有变化,则重新赋值
     */
    watch: {
        isShowMore() {
            this.isOpen = this.isShowMore
            this.$refs.secondForm.$el.style.maxHeight = (this.isOpen ? this.maxHeight : 0) + 'px'
        }
    },
    methods: {
        /**
         * 显示或隐藏更多搜索条件,emit'openMore'事件,将isOpenMore作为参数传递给父级,方便父级更新状态,并作缓存
         */
        toggleMoreCtrl() {
            this.isOpen = !this.isOpen
            this.$emit('openMore',this.isOpen)
        },
        /**
         * 点击搜索按钮
         */
        search() {
            this.$emit('search')
        },
        /**
         * 点击重置按钮
         */
        reset() {
            // 如果autoReset设置为true,或者没有设置,则重置表单
            if (this.autoReset || typeof this.autoReset === 'undefined') {
                if (typeof this.initForm !== 'undefined') {   // 如果有传递resetForm,则使用resetForm数据重置
                    Object.keys(this.form).forEach((k) => {
                        this.form[k] = cloneDeep(this.initForm[k])
                    })
                } else {  // 否则全部置空
                    Object.keys(this.form).forEach((k) => {
                        this.form[k] = ''
                    })
                }

            }
            this.$emit('reset')
        },
        /**
         * 按enter的时候,执行搜索
         * @param e
         */
        handleKeyUp(e) {
            if (e.keyCode === 13) {
                this.search()
            }
        },
        /**
         * 如果地址组件触发select事件,则将事件emit出去
         * @param address {object} 地址
         */
        handleAddressSelect(address) {
            this.$emit('select',address)
        }
    },
    mounted() {
        this.maxHeight = this.$refs.secondForm.$el.clientHeight
        this.isOpen = this.isShowMore   // 初始化是否打开隐藏条件
        this.$refs.secondForm.$el.style.maxHeight = (this.isOpen ? this.maxHeight : 0) + 'px'
        this.initForm = cloneDeep(this.resetForm)  // 保存表单初始状态到initForm,方便重置
    },
    render(h) {
        /**
         * 表单render函数
         * @param form {object} 表单数据
         * @param renderArray  {array} 需要渲染的表单列表
         * @param col {number} 每个表单项要占的多少栅格
         * @returns {*}
         */
        const formRender = (form,renderArray,col) => {
            if (renderArray && renderArray.length > 0) {
                return renderArray.map((item) => {
                    switch (item.type) {
                        // 单个输入框, 必填属性model(绑定值字段),label(标题),可配置属性placeholder,
                        case 'input':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    <el-input placeholder={typeof item.placeholder === 'undefined' ? '请输入' + item.label : item.placeholder} value={this.util.getValByKey(form, item.model)} on-input={(val) => {this.util.setValByKey(form,item.model,val)}}></el-input>
                                </el-form-item>
                            </el-col>
                        // 输入数字范围 必填属性,start(开始范围字段),end(结束范围字段),label(标题),可配置属性placeholder
                        case 'inputRange':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    <el-col span={11}>
                                        <el-input placeholder={typeof item.startPlaceholder === 'undefined' ? '请输入' + item.label + '开始段' : item.startPlaceholder} value={this.util.getValByKey(form, item.start)} on-input={(val) => { this.util.setValByKey(form,item.start,val)}}></el-input>
                                    </el-col>
                                    <el-col span={2}>
                                        <label class="input-link">~</label>
                                    </el-col>
                                    <el-col span={11}>
                                        <el-input placeholder={typeof item.endPlaceholder === 'undefined' ? '请输入' + item.label + '结束段' : item.endPlaceholder} value={this.util.getValByKey(form, item.end)} on-input={(val) => { this.util.setValByKey(form,item.end,val)}}></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        // 下拉列表,必填字段 label(标题) model(绑定值字段),options(下拉列表数组),可配置属性 value(下拉列表选中时的返回值的key,原则上必填,如果不填,则将选中项的所有数据返回) text(下拉列表项显示文本的key,如果不填则取value或者item)
                        case 'select':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    <el-select clearable={!item.multiple} filterable={true} multiple={item.multiple} placeholder={typeof item.placeholder === 'undefined' ? '请选择' + item.label : item.placeholder} value={this.util.getValByKey(form, item.model)} on-input={(val) => { this.util.setValByKey(form,item.model,val)}}>
                                        {
                                            (() => {
                                                const optionsList = item.options
                                                if (optionsList && optionsList.length > 0) {
                                                    return optionsList.map((list) => {
                                                        return <el-option label={this.util.getValByKey(list,item.text || item.value)} value={this.util.getValByKey(list,item.value)}></el-option>
                                                    })
                                                }
                                            })()
                                        }
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        // 时间 必填:label(标题) model(绑定值字段),可配置属性placeholder
                        case 'time':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    <el-date-picker
                                        value={this.util.getValByKey(form, item.model)} on-input={(val) => {this.util.setValByKey(form,item.model,val)}}
                                        align="right"
                                        type="date"
                                        placeholder={typeof item.placeholder === 'undefined' ? '请选择' + item.label : item.placeholder}
                                        style="width: 100%"
                                        picker-options={this.pickerOptions}
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        // 时间范围 必填 label start(开始时间) end(结束时间) model(时间范围绑定值) 可配置 placeholder
                        case 'timeRange':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    <el-date-picker
                                        value={this.util.getValByKey(form, item.model)}
                                        on-input={(val) => {
                                        //const startTime = val[0] ? `${this.util.formatTimeRange(val[0], true)} 00:00:00` : val[0]
                                        //const endTime = val[1] ? `${this.util.formatTimeRange(val[1], true)} 23:59:59` : val[1]
                                        const startTime = val[0]
                                        const endTime = val[1]
                                        this.util.setValByKey(form,item.start,startTime)
                                        this.util.setValByKey(form,item.end,endTime)
                                        this.util.setValByKey(form,item.model,val)
                                        console.log(startTime, endTime)
                                    }}
                                        type="datetimerange"
                                        align="right"
                                        placeholder={typeof item.placeholder === 'undefined' ? '请选择' + item.label : item.placeholder}
                                        style="width: 100%"
                                        picker-options={this.pickerOptionsRange}
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        case 'address':
                            return <el-col span={col}>
                                <el-form-item label={item.label}>
                                    {
                                        (() => {
                                            /**
                                             * 初始化state/city/district 的id和text属性
                                             * @param idkey {string} state/city/district 配置中对应的id key值('stateId','cityId','districtId')
                                             * @param textKey {string} state/city/district 配置中对应的text key值('stateText','cityText','districtText')
                                             * @returns {{id: string, text: string}}
                                             */
                                            const getValue = (idkey,textKey) => {
                                                return {
                                                    id: item[idkey] ? this.util.getValByKey(form, item[idkey]) : '',
                                                    text: item[textKey] ? this.util.getValByKey(form, item[textKey]) : '',
                                                }
                                            }

                                            /**
                                             * 设置form中对应的地址数据
                                             * @param key {string} 需要设置的key ('state','city','district')
                                             * @param areaKey {string} 需要设置的类型('Id','Text')
                                             * @param callbackVal {object} 地址组件回传的地址对象
                                             */
                                            const setFormAreaValue = (key, areaKey, callbackVal) => {
                                                if (typeof item[key + areaKey] !== 'undefined') {
                                                    this.util.setValByKey(form,item[key + areaKey],callbackVal[key][areaKey.toLowerCase()])
                                                }
                                            }
                                            let state = getValue('stateId','cityText')  //省
                                            let city  // 市
                                            let district // 区
                                            if (item.addressType === 'name') {  // 如果以文本为条件
                                                if (typeof item.cityText === 'undefined') {
                                                    city = undefined
                                                } else {
                                                    city = getValue('cityId','cityText')
                                                }
                                                if (typeof item.districtText === 'undefined') {
                                                    district = undefined
                                                } else {
                                                    district = getValue('districtId','cityText')
                                                }
                                            } else {   // 以id 为条件
                                                if (typeof item.cityId === 'undefined') {
                                                    city = undefined
                                                } else {
                                                    city = getValue('cityId','cityText')
                                                }
                                                if (typeof item.districtId === 'undefined') {
                                                    district = undefined
                                                } else {
                                                    district = getValue('districtId','cityText')
                                                }
                                            }
                                            let region = {
                                                state: state,
                                                city: city,
                                                district: district
                                            }
                                        return <nw-area type={item.addressType} full={item.full} on-select={this.handleAddressSelect} value={region} on-input={
                                            (val) => {
                                                ['state','city','district'].forEach((area) => {
                                                     setFormAreaValue(area, 'Id', val)
                                                     setFormAreaValue(area, 'Text', val)
                                                })
                                                region = val
                                        }}></nw-area>
                                        })()
                                    }
                                </el-form-item>
                            </el-col>
                        default:
                            return ''
                    }
                })
            } else {
                return ''
            }
        }
        return (
            <div on-keyup={this.handleKeyUp} class="search-form">
                <el-form model={this.form} label-width="100px">
                    <el-row class="search">
                        <el-col span={24}>
                            <el-col span={12}>
                                {
                                    // 默认展开选项
                                    formRender(this.form,this.defaultForm, 12)
                                }
                                {this.$slots['first-form']}
                            </el-col>
                            {
                                // 展开更多选项
                                (() => {
                                    if ((this.more && this.more.length > 0) || (this.$slots['second-form'] && this.$slots['second-form'].length > 0)) {
                                        return <el-col span={6}>
                                                    <label class="show-second-form-ctrl" on-click={this.toggleMoreCtrl}>
                                                        <span class="text">{this.isOpen ? '收起筛选' : '更多筛选'}</span>
                                                        <span class={{'icon': true,'el-icon-arrow-down':true,'open': this.isOpen}}></span>
                                                    </label>
                                                </el-col>
                                    }
                                })()
                            }
                        </el-col>
                        <el-col ref="secondForm" span={24} class="second-form">
                            {
                                // 隐藏选项
                                formRender(this.form,this.more, 6)
                            }
                            {
                                this.$slots['second-form']
                            }
                        </el-col>
                        <el-col span={24}>
                            <el-form-item>
                                <el-button size="mini" nativeOn-click={this.search} type="primary">搜索</el-button>
                                <el-button size="mini" nativeOn-click={this.reset}>重置</el-button>
                                {this.$slots['buttons']}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        )
    }
}