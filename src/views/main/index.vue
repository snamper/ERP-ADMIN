<template>
    <el-row class="container">
        <el-col :span="24" class="main">
            <aside>
                <div class="menu_head">
                    <pg-img @click="gotoHome" class="company_logo" :src="companyInfo.manageLogo"></pg-img>
                    <strong @click="gotoHome" class="company_name">{{companyInfo.corpName || '微销宝'}}</strong>
                    <div class="user_info clearfix">
                        <div class="avatar">
                            <pg-img :src="accountInfo.headImgUrl" v-if="accountInfo.headImgUrl"></pg-img>
                            <img src="../../assets/images/avatar_default.png" v-else>
                        </div>
                        <div class="info">
                            <span>账号：{{accountInfo.customerName}}</span>
                            <span>套餐：{{accountInfo.priceLevelName}}</span>
                            <span>有效期至：{{accountInfo.endDate}}</span>
                        </div>
                        <div class="logout">
                            <i class="iconfont icon-icon_tuichu" @click="logout"></i>
                        </div>
                    </div>
                </div>
                <!-- 本地模拟数据部分 -->
                <el-menu default-active="index1" theme="dark" router>
                    <el-submenu :index="'index' + (menuIndex + 1)" v-for="(menu, menuIndex) in menuList">
                        <template slot="title">
                        <pg-button :icon="menu.iconCls"></pg-button>
                            {{ menu.name }}
                        </template>
                        <el-menu-item :index="child.path" v-for="child in menu.children" style="padding-left:64px;">
                            {{ child.name }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <!-- 调用接口读取数据部分 -->
                <!-- <el-menu default-active="index1" theme="dark" router>
                    <el-submenu :index="'index' + (menuIndex + 1)" v-for="(menu, menuIndex) in menuList">
                        <template slot="title">
                        <pg-button :icon="menu.Icon"></pg-button>
                            {{ menu.Name }}
                        </template>
                        <el-menu-item :index="child.MenuURL" v-for="child in menu.ChildMenus" style="padding-left:64px;">
                            {{ child.Name }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu> -->
            </aside>
            <section class="content-container">
                <MenusRecord :currentPath="this.$route.path"></MenusRecord>
                <div class="grid-content bg-purple-light">
                    <!-- <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">
                            {{ $route.meta.title }}
                        </strong>
                    </el-col> -->
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        background: #f5f5f5;
        // .header {
        //     height: 60px;
        //     line-height: 60px;
        //     background: #20a0ff;
        //     color:#fff;
        //     .userinfo {
        //         text-align: right;
        //         padding-right: 35px;
        //         float: right;
        //         .userinfo-inner {
        //             cursor: pointer;
        //             color:#fff;
        //             img {
        //                 width: 40px;
        //                 height: 40px;
        //                 border-radius: 20px;
        //                 margin: 10px 0px 10px 10px;
        //                 float: right;
        //             }
        //         }
        //     }
        //     .logo {
        //         height:60px;
        //         font-size: 22px;
        //         padding-left:20px;
        //         padding-right:20px;
        //         border-color: rgba(238,241,146,0.3);
        //         border-right-width: 1px;
        //         border-right-style: solid;
        //         img {
        //             width: 40px;
        //             float: left;
        //             margin: 10px 10px 10px 18px;
        //         }
        //         .txt {
        //             color:#fff;
        //         }
        //     }
        //     .logo-width{
        //         width:230px;
        //     }
        //     .logo-collapse-width{
        //         width:60px
        //     }
        //     .tools{
        //         padding: 0px 23px;
        //         width:14px;
        //         height: 60px;
        //         line-height: 60px;
        //         cursor: pointer;
        //     }
        // }
        .main {
            display: flex;
            position: absolute;
            top: 0px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                height: 100%;
                background: #282e37;
                overflow-y: scroll;
                overflow-x: hidden;
                .el-menu--dark {
                    background: #282e37;
                }
                .menu_head {
                    width: 100%;
                    height: 310px;
                    text-align: center;
                    .company_logo {
                        margin-top: 45px;
                        width: 118px;
                        height: 118px;
                        border-radius: 100%;
                        overflow: hidden;
                    }
                    .company_name {
                        cursor: pointer;
                        display: block;
                        font-size: 24px;
                        color: #fff;
                        height: 75px;
                        line-height: 75px;
                    }
                    .user_info {
                        position: relative;
                        background: #d7b791;
                        height: 72px;
                        padding: 6px 0;
                        box-sizing: border-box;
                        .avatar {
                            position: absolute;
                            width: 40px;
                            height: 40px;
                            border-radius: 100%;
                            top: 18px;
                            left: 20px;
                            overflow: hidden;
                            img {
                                width: 100%;
                            }
                        }
                        .info {
                            width: 130px;
                            text-align: left;
                            margin-left: 50px;
                            display: inline-block;
                            span {
                                height: 20px;
                                line-height: 20px;
                                display: block;
                                font-size: 12px;
                                color: #323a45;
                            }
                        }
                        .logout {
                            position: absolute;
                            width: 40px;
                            height: 66px;
                            line-height: 66px;
                            right: 0;
                            top: 0;
                            i {
                                color: #323a45;
                                font-size: 30px;
                            }
                        }
                    }
                }
                .el-menu {
                }
                .collapsed{
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position:absolute;
                        top:0px;
                        left:60px;
                        z-index:99999;
                        height:auto;
                        display:none;
                    }

                }
            }
            .menu-collapsed {
                flex:0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex:0 0 230px;
                width: 230px;
            }
            .content-container {
                flex:1;
                overflow-y: scroll;
                margin: 20px;
                .breadcrumb-container {
                    background: #fff;
                    padding: 20px;
                    margin-bottom: 20px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    box-sizing: border-box;
                }
            }
        }
    }
    .fade-enter-active {
        animation: fade-in .5s
    }
    .fade-leave-active {
        opacity: 0
    }
    @keyframes fade-in {
        0% { opacity: 0 }
        100% { opacity: 1 }
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>