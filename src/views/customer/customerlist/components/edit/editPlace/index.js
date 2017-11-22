import { cloneDeep } from 'lodash'
import {goods as ajax} from 'services'

export default {
    props: {
        show: Boolean,
    },
    data() {
        return {
            place:{
                state:'',
                stateName:'',
                city:'',
                cityName:'',
                district:'',
                districtName:''
            },
            size:'small'
        
        }
    },
    
    methods: {
        // 关闭
        close() {
            this.$emit('closePlace')
        },
        // 省市区选择
        changeRegions(val) {
            console.log("changeRegions")
            console.log(val)
            if(val.state){
                this.place.state = val.state
                this.place.city = val.city
                this.place.district = val.district
                this.place.stateName = val.stateName,
                this.place.cityName = val.cityName,
                this.place.districtName = val.districtName

            }
        },
        addPlace(){
            if(this.place.state == "") {
                this.$message({
                    type:'warning',
                    message:"请选择完整的省市区"
                })
                return false
            }
            this.$emit('editPlace',this.place)
        }
    },
    watch:{
        show(val){
            if(val){
                this.place = {
                    state:'',
                    stateName:'',
                    city:'',
                    cityName:'',
                    district:'',
                    districtName:''
                }
            }
        }
    }
    
}