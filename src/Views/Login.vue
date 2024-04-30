<template>
    <div class="background">
        <changelanguage />
        <el-dialog :title="$t('login.changePW')" :visible.sync="changePWDialogVisible"  width="20%" :before-close="changePWCloseDialog">
            <div v-if="enableResetPw==false">
                <el-form class="changePW" label-width="70px">
                    <el-form-item class="aLine" :label="$t('user.email')">
                        <el-input v-model="current_mail" placeholder=" " style="width: 230px;"></el-input>
                    </el-form-item>
                    <el-form-item class="aLine" :label="$t('login.validateCode')">
                        <el-input v-model="validateCode" placeholder=" " style="width: 120px;"></el-input>
                        <el-button class="commonButton"  @click="getValidate">{{$t("login.send")}}</el-button>
                    </el-form-item>
                 </el-form>
                 <el-button class="middleButton" type="primary" @click="checkValidate">{{$t("login.validate")}}</el-button>
            </div>
            <div v-else>
                <el-form class="changePW" label-width="70px">
                    <el-form-item class="aLine"  :label="$t('login.password')"  label-width="80px">
                        <el-input v-model="newPW" placeholder=" " style="width: 200px;" show-password></el-input>
                    </el-form-item>
                </el-form>
                <el-button  class="middleButton" type="primary" @click="resetPW">{{$t("login.submit")}}</el-button>
            </div>

        </el-dialog>
        <el-dialog :title="$t('login.register')" :visible.sync="registerDialogVisible"  width="50%" :before-close="registerCloseDialog">
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
                <el-button class="commonButton" @click="registerCloseDialog">{{$t("login.cancel")}}</el-button>
                <el-button class="commonButton" type="primary" @click="submitRegister">{{$t("login.submit")}}</el-button>
            </div>
        </el-dialog>
        <el-form ref="form" class="login_container" :model="login" status-icon :rules="rules" label-width="70px">
            <h3 class="login_title">{{$t("login.title")}}</h3>
            <el-form-item :label="$t('login.mail')" label-width="80px" prop="mail">
                <el-input v-model="login.mail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password')" label-width="80px" prop="password">
                <el-input show-password v-model="login.password" autocomplete="off" ></el-input>
                <el-button style="margin-left: 115px" size="mini" @click="openValidate" >{{$t("login.forgetpw")}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="commonButton" @click="submitLogin" type="primary" >{{$t("login.signin")}}</el-button>
                <el-button class="commonButton" @click="signup" type="primary" >{{$t("login.signup")}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import i18n from '../utils/i18n/index';
import changelanguage from '../components/ChangeLanguage';
import { registerByMail, loginByMail, setValidateCode, checkValidateCode, resetPassword } from '../api/user';

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
            registerDialogVisible: false,
            changePWDialogVisible: false,
            current_mail: '',
            validateCode: '',
            useridstr: '',
            enableResetPw: false,
            newPW: '',
        }
    },
    methods: {
        changeLanguage(tolang) {
            this.$i18n.locale = tolang
        },
        openForm() {
            this.registerDialogVisible = true
        },
        registerCloseDialog() {
            // 先重置
            this.$refs.form.resetFields()
            // 后关闭
            this.registerDialogVisible = false
        },
        changePWCloseDialog() {
            this.changePWDialogVisible = false
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
                            this.registerCloseDialog();
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
                        sessionStorage.setItem('userid', response.data.data.useridstr);
                        sessionStorage.setItem('sessionid', response.data.msg);
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
        getValidate(){
            setValidateCode({params:{mail: this.current_mail}}).then((response)=>{
                if (response.data.code!=200){
                    this.$message({
                        type: 'fail',
                        message: '郵箱錯誤',
                    });
                } else {
                    this.$message({
                        type: 'success',
                        message: '驗證碼已發送',
                    });
                }
            })
        },
        checkValidate(){
            if (this.current_mail=='' || this.validateCode==''){
                this.$message({
                    type: 'fail',
                    message: '信息不完整',
                });
            }else{
                checkValidateCode({params:{mail: this.current_mail, code: this.validateCode}}).then((response)=>{
                    if (response.data.code!=200){
                        this.$message({
                            type: 'fail',
                            message: '驗證碼失效',
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '驗證成功',
                        });
                        this.enableResetPw = true;

                    }
                })
            }
        },
        resetPW(){
            resetPassword({password: this.newPW, mail:this.current_mail}).then((response)=>{
                this.$message({
                    type: 'success',
                    message: '重置密碼成功',
                });
                this.enableResetPw = false;
                this.changePWDialogVisible = false;
            })
        },
        signup(){
            this.openForm()
        },
        openValidate(){
            this.current_mail = '';
            this.newPW = '';
            this.validateCode = '';
            this.enableResetPw = false;
            this.changePWDialogVisible = true;
        },

    }
}
</script>

<style lang="less" scoped>


.changePW {
    .aLine *{
        margin-right: 20px;
    }



}

.commonButton {
    width: 90px;
}

.middleButton {
    margin-left: 120px;
    width: 90px;
}

.right-top {
    position: absolute;
    top: 0;
    right: 0;
    background-color: lightblue;
    padding: 10px;
}

.login_container {
    width: 390px;
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