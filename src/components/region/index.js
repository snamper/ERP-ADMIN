// import { basic as ajax } from 'services'
// import { mapActions, mapGetters } from 'vuex'

// export default {
//     name: 'PgRegion',
//     props: {
//         stateInfo: {
//             type: String,
//             default: ''
//         },
//         cityInfo: {
//             type: String,
//             default: ''
//         },
//         districtInfo: {
//             type: String,
//             default: ''
//         }
//     },
//     data() {
//         return {
//             stateRegionID: '',
//             cityRegionID: '',
//             districtRegionID: '',
//             stateList: [],
//             cityList: [],
//             districtList: []
//         }
//     },
//     computed: {
//         ...mapGetters([
//             'regionStateList'
//         ])
//     },
//     mounted() {
//         this.stateRegionID = this.stateInfo
//         this.cityRegionID = this.cityInfo
//         this.districtRegionID = this.districtInfo
//         this.getRegionStates()
//         this.stateList = this.regionStateList
//     },
//     methods: {
//         ...mapActions([
//             'getRegionStates'
//         ]),
//         getRegions(levelID = 1, parentID = '', status = 1) {
//             ajax.selectRegionList({
//                 LevelID: levelID,
//                 ParentID: parentID,
//                 Status: status
//             }).then((result) => {
//                 console.info(result);
//                 if (levelID === 1) {
//                     this.stateList = result
//                     if (this.stateInfo) {
//                         this.stateRegionID = this.stateInfo
//                     }
//                 }
//                 else if (levelID === 2) {
//                     this.cityList = result
//                     if (this.cityInfo) {
//                         this.cityRegionID = this.cityInfo
//                     }
//                 }
//                 else if (levelID === 3) {
//                     this.districtList = result
//                     if (this.districtInfo) {
//                         this.districtRegionID = this.districtInfo
//                     }
//                 }
//             })
//         }
//     },
//     watch: {
//         regionStateList() {
//             this.stateList = this.regionStateList
//             if (this.stateInfo) {
//                 this.stateRegionID = this.stateInfo
//             }
//         },
//         stateInfo() {
//             this.stateRegionID = this.stateInfo
//         },
//         cityInfo() {
//             this.cityRegionID = this.cityInfo
//         },
//         districtInfo() {
//             this.districtRegionID = this.districtInfo
//         },
//         stateRegionID: function(val) {
//             this.cityList = []
//             this.districtList = []
//             this.cityRegionID = ''
//             this.districtRegionID = ''
//             this.getRegions(2, val)
//         },
//         cityRegionID: function(val) {
//             this.districtList = []
//             this.districtRegionID = ''
//             this.getRegions(3, val)
//         },
//         districtRegionID: function(val) {
//             if (this.stateRegionID !== '' && this.cityRegionID !== '' && this.districtRegionID !== '') {
//                 this.$emit('changeRegions', {
//                     state: this.stateRegionID,
//                     city: this.cityRegionID,
//                     district: this.districtRegionID,
//                     stateName: '',
//                     cityName: '',
//                     district: ''
//                 })
//             }
//         }
//     }
// }
import { basic as ajax } from 'services'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'PgRegion',
    props: {
        stateInfo: {
            type: String,
            default: ''
        },
        cityInfo: {
            type: String,
            default: ''
        },
        districtInfo: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            stateName: '',
            cityName: '',
            districtName: '',
            stateRegionID: '',
            cityRegionID: '',
            districtRegionID: '',
            stateList: [],
            cityList: [],
            districtList: [],
            isEdit: false
        }
    },
    computed: {
        ...mapGetters([
            'regionStateList'
        ])
    },
    mounted() {
        this.getRegionStates()
        this.stateList = this.regionStateList
    },
    methods: {
        ...mapActions([
            'getRegionStates'
        ]),
        changeState() {
            if (!this.isEdit) {
                this.cityList = []
                this.districtList = []
                this.cityRegionID = ''
                this.districtRegionID = ''
            }

            this.stateList.forEach((item) => {
                if (item.regionID == this.stateRegionID) {
                    this.stateName = item.name
                }
            })
            this.getRegions(2, this.stateRegionID)
        },
        changeCity() {
            if (!this.isEdit) {
                this.districtList = []
                this.districtRegionID = ''
            }
            
            this.cityList.forEach((item) => {
                if (item.regionID == this.cityRegionID) {
                    this.cityName = item.name
                }
            })
            this.getRegions(3, this.cityRegionID)
        },
        changeDistrict() {
            if (this.stateRegionID !== '' && this.cityRegionID !== '' && this.districtRegionID !== '') {
                this.isEdit = false

                this.districtList.forEach((item) => {
                    if (item.regionID == this.districtRegionID) {
                        this.districtName = item.name
                    }
                })
                this.$emit('changeRegions', {
                    state: this.stateRegionID,
                    city: this.cityRegionID,
                    district: this.districtRegionID,
                    stateName: this.stateName,
                    cityName: this.cityName,
                    districtName: this.districtName
                })
            }
        },
        getRegions(levelID = 1, parentID = '', status = 1) {
            if (levelID != 1 && parentID == '') {
                return
            }
            ajax.selectRegionList({
                LevelID: levelID,
                ParentID: parentID,
                Status: status
            }).then((result) => {
                if (levelID === 1) {
                    this.stateList = result
                }
                else if (levelID === 2) {
                    this.cityList = result
                }
                else if (levelID === 3) {
                    if (result.length == 0) {
                        this.cityList.forEach((item) => {
                            if (item.regionID == this.cityRegionID) {
                                this.districtList.push(item)
                            }
                        })
                    }
                    else {
                        this.districtList = result
                    }
                }
            })
        }
    },
    watch: {
        regionStateList() {
            this.stateList = this.regionStateList
            
            if (this.stateInfo) {
                if (!this.stateRegionID || this.stateRegionID == '') {
                    this.stateRegionID = this.stateInfo
                }
            }
        },
        stateInfo() {
            if (!this.stateRegionID || this.stateRegionID == '') {
                this.stateRegionID = this.stateInfo
            }
            if (this.districtInfo) {
                this.isEdit = true
            }
        },
        cityList() {
            if (this.isEdit) {
                if (this.cityInfo) {
                    this.cityRegionID = this.cityInfo
                }
            }
        },
        districtList() {
            if (this.isEdit) {
                if (this.districtInfo) {
                    this.districtRegionID = this.districtInfo
                }
            }
        },
        stateRegionID() {
            this.changeState()
        },
        cityRegionID() {
            this.changeCity()
        },
        districtRegionID() {
            this.changeDistrict()
        }
    }
}













