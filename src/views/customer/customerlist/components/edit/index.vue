<template>
    <pg-box :isShowBox="show" @close="close">
        <div class="box_title">{{title}}</div>
        

        <el-form ref="form" :model="form" label-width="100px" :rules="rules" :inline="true">
            <h3>分销信息</h3>
            <el-form-item label="所属团队" prop="distributorGroupID">
                <el-select clearable v-bind:disabled="isEdit" @change="teamChange" v-model="distributorGroupID" placeholder="不限">
                    <el-option
                        v-for="item in teamList"
                        :key="item.distributorGroupID"
                        :label="item.name"
                        :value="item.distributorGroupID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="推荐人"  prop="introducerID">
                <el-select v-model="form.introducerID" filterable placeholder="请选择">
                    <el-option
                        v-for="item in personList"
                        :key="item.customerID"
                        :label="item.customerName"
                        :value="item.customerID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保证金缴纳"  prop="">
                <el-select v-model="form.guaranteeFlag" filterable placeholder="请选择">
                    <el-option
                        v-for="item in optionList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="代理等级" prop="customerGradeID">

                <el-select clearable v-model="form.customerGradeID" placeholder="不限">
                    <el-option
                        v-for="item in levelList"
                        :key="item.customerGradeID"
                        :label="item.name"
                        :value="item.customerGradeID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="授权时间" prop="time">
                <el-date-picker
                    v-model="timeList"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <br>
            <h3>基本信息<span style="color: red">（请慎重修改，可能影响代理正常登陆）</span></h3>
            <el-form-item label="关联分销客户"  prop="customerID">
                <el-select clearable v-bind:disabled="isEdit" filterable @change="customerChange" v-model="form.customerID" placeholder="不限">
                    <el-option
                        v-for="item in customerList"
                        :key="item.id"
                        :label="item.desc"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat">
                <el-input v-model="form.wechat"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="身份证" prop="certNo">
                <el-input v-model="form.certNo"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            
            <el-form-item v-if="!isEdit" label="密码" prop="passWord">
                <el-input type="password" v-model="form.passWord"></el-input>
            </el-form-item>
            <el-form-item v-else label="密码">
                <el-input type="password" v-model="form.passWord"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="省市区">
                <span>{{form.stateName}}</span> - <span>{{form.cityName}}</span> - <span>{{form.districtName}}</span>   
                <el-button @click="setPlace">设置地址</el-button>
                <br/>
                <!--<pg-region @changeRegions="changeRegions" :stateInfo="form.state" :cityInfo="form.city" :districtInfo="form.district"></pg-region>-->
                <br/>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="具体地址" v-model="form.address">
                </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="form.note"></el-input>
            </el-form-item>
            <br>
            
            <el-form-item label="收款二维码" prop ="qrCodeImg" >
                <pg-upload @upload-success="uploadSuccess" :files="qRList" folderType='21'></pg-upload>
            </el-form-item>
            <!--<el-form-item label="新增">
                <el-button size="small" @click="add">新增</el-button>
            </el-form-item>-->
            <br>
            <el-form-item class="el-form-item_btns">
                <el-button v-if="!detail" size="small" type="primary" @click="save">保存</el-button>
                <el-button size="small" @click="close">返回</el-button>
            </el-form-item>
        </el-form>
    </pg-box>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>
