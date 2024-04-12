<template>
    <div>
        <changelanguage />
        <el-dialog :title="$t('login.register')" :visible.sync="dialogVisible"  width="50%" :before-close="closeDialog">
            <el-form :inline="true" :model="registerform" :rules="registerrules" ref="registerform" label-width="80px">
                <el-form-item :label="$t('login.mail')" prop="mail" >
                    <el-input placeholder="" v-model="registerform.mail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.password')" prop="password">
                    <el-input type="password" placeholder="" v-model="registerform.password"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.name')" prop="name">
                    <el-input placeholder="" v-model="registerform.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.company')" prop="company">
                    <el-input placeholder="" v-model="registerform.company"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.job')" prop="job">
                    <el-input placeholder="" v-model="registerform.job"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.phone')" prop="phone">
                    <el-input placeholder="" v-model="registerform.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">{{$t("login.cancel")}}</el-button>
                <el-button type="primary" @click="submitRegister">{{$t("login.submit")}}</el-button>
            </div>
        </el-dialog>
        <el-form ref="form" class="login_container" :model="login" status-icon :rules="rules" label-width="70px">
            <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
            <h3 class="login_title">{{$t("login.title")}}</h3>
            <!-- prop对应rules里的键 -->
            <el-form-item :label="$t('login.mail')" prop="mail">
                <el-input v-model="login.mail" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.password')" prop="password">
                <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="submitLogin" type="primary" >{{$t("login.submit")}}</el-button>
                <el-button @click="signup" type="primary" >{{$t("login.signup")}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import i18n from '../utils/i18n/index';
import changelanguage from '../components/ChangeLanguage';
import { registerByMail, loginByMail } from '../api/user';

export default {
    components: {
        changelanguage
    },
    data() {
        return {
            form: {
                mail: '',
                password: ''
            },
            registerform:{
                password: '',
                name: '',
                company: '',
                job: '',
                mail: '',
                phone: ''
            },
            // 登陆数据
            login: {
                mail: '',
                password: ''
            },
            // 校验规则
            rules: {
                mail: [{ required: 'true', message: ' ', trigger: 'blur' }],
                password: [{ required: 'true', message: ' ', trigger: 'blur' }],

            },
            registerrules: {
                mail: [{ required: 'true', message: ' ', trigger: 'blur' }],
                password: [{ required: 'true', message: ' ', trigger: 'blur' }],
                name: [{ required: 'true', message: ' ', trigger: 'blur' }],
            },
            adminroutedata: {
                menu: [
                    {
                        path: '/home',
                        name: 'home',
                        label: i18n.t('tab.home'),
                        icon: 's-home',//el-icon-s-home,来自Element ui
                        url: 'Home.vue'
                    },
                    {
                        path: '/product',
                        name: 'product',
                        label: i18n.t('tab.product'),
                        icon: 'video-play',
                        url: 'Product.vue'
                    },
                    {
                        path: '/user',
                        name: 'user',
                        label: i18n.t('tab.user'),
                        icon: 'user',
                        url: 'User.vue'
                    },
                ],
                token: "token_admin",
                message: '获取成功'
            },
            childroutedata: {
                menu: [
                    {
                        path: '/home',
                        name: 'home',
                        label: i18n.t('tab.home'),
                        icon: 's-home',//el-icon-s-home,来自Element ui
                        url: 'Home.vue'
                    }
                ],
                token: "token_child",
                message: '获取成功'
            },
            dialogVisible: false,
        }
    },
    methods: {
        changeLanguage(tolang) {
            this.$i18n.locale = tolang
        },
        openForm() {
            this.dialogVisible = true
        },
        // 关闭对话框
        closeDialog() {
            // 先重置
            this.$refs.form.resetFields()
            // 后关闭
            this.dialogVisible = false
        },
        submitRegister(){
            this.$refs.registerform.validate((valid) => {
                if (valid) {
                    registerByMail(this.registerform).then((response)=>{
                        let temp = response.data.data;
                        if (temp==1){
                            this.$message({
                                type: 'success',
                                message: response.data.msg,
                            });
                            this.closeDialog();
                        } else {
                            this.$message({
                                type: 'fail',
                                message: response.data.msg,
                            });
                        }
                    })
                }

            })

        },
        submitLogin() {
            // 表单的校验
            this.$refs.form.validate((valid) => {
                if (valid) {
                    loginByMail({params:{mail: this.login.mail, password: this.login.password}}).then((response)=>{
                        let code = response.data.code;
                        sessionStorage.setItem('user', JSON.stringify(response.data.data));
                        if (code != 200){
                            this.$message({
                                type: 'fail',
                                message: response.data.msg,
                            });
                        } else {
                            if (response.data.data.isadmin){
                                // 记录cookie
                                Cookie.set('token_iecshowroom',this.adminroutedata.token)
                                // 设置菜单
                                this.$store.commit('setMenu',this.adminroutedata.menu)
                                // 动态添加路由
                                this.$store.commit('addMenu',this.$router)
                                // 跳转到首页
                                this.$router.push('/home')
                            } else {
                                Cookie.set('token_iecshowroom',this.childroutedata.token)
                                this.$store.commit('setMenu',this.childroutedata.menu)
                                this.$store.commit('addMenu',this.$router)
                                this.$router.push('/home')
                            }

                        }


                    })
                }
            })
        },
        signup(){
            this.openForm()
        },
    }
}
</script>

<style lang="less" scoped>

.right-top {
    position: absolute;
    top: 0;
    right: 0;
    background-color: lightblue;
    padding: 10px;
}

.login_container {
    width: 350px;
    border: 1px solid #eaeaea;

    // 居中
    margin: 180px auto;

    padding: 35px 35px 15px 35px;

    // 让padding在width里面
    box-sizing: border-box;

    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        color: #505458;
        // 左右居中
        text-align: center;
        margin-bottom: 40px;
    }



    .el-input {
        width: 198px;
    }
}
</style>