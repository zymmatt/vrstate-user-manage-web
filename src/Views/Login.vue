<template>
    <div>
        <changelanguage />
        <el-form ref="form" class="login_container" :model="login" status-icon :rules="rules" label-width="70px">
            <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
            <h3 class="login_title">{{$t("login.title")}}</h3>
            <!-- prop对应rules里的键 -->
            <el-form-item :label="$t('login.username')" prop="username">
                <el-input v-model="login.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.password')" prop="password">
                <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="submit" type="primary" >{{$t("login.submit")}}</el-button>
                <el-button @click="signup" type="primary" >{{$t("login.signup")}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import i18n from '../utils/i18n/index';
import changelanguage from '../components/ChangeLanguage';
//  import { getMenu } from '../api/user'
export default {
    components: {
        changelanguage
    },
    data() {
        return {
            // 登陆数据
            login: {
                username: '',
                password: ''
            },
            // 校验规则
            rules: {
                username: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }]
            },
            routedata: {
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
                token: "token_iecshowroom",
                message: '获取成功'
            }

        }
    },
    methods: {
        changeLanguage(tolang) {
            this.$i18n.locale = tolang
        },
        submit() {
            // 表单的校验
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 传入表单数据
                    const username = this.login.username;
                    const password = this.login.password;
                    if (username === 'admin' && password === 'inventec') {
                        // 记录cookie
                        Cookie.set('token_iecshowroom',this.routedata.token)
                        // 设置菜单
                        this.$store.commit('setMenu',this.routedata.menu)
                        // 动态添加路由
                        this.$store.commit('addMenu',this.$router)
                        // 跳转到首页
                        this.$router.push('/home')
                    } else if (username === 'allen' && password === 'taiwan119'){
                        // 记录cookie
                        Cookie.set('token_iecshowroom',this.routedata_vrphoto.token)
                        // 设置菜单
                        this.$store.commit('setMenu',this.routedata_vrphoto.menu)
                        // 动态添加路由
                        this.$store.commit('addMenu',this.$router)
                        // 跳转到首页
                        this.$router.push('/vrphoto')
                    } else {
                        // 验证失败的弹窗
                        this.$message.error(data.data.data.message);
                    }
                    /*
                    getMenu(this.login).then((data) => {
                        // console.log(data);
                        if(data.data.code===20000){
                            // 记录cookie
                            Cookie.set('token',data.data.data.token)
                            // 设置菜单
                            this.$store.commit('setMenu',data.data.data.menu)
                            // 动态添加路由
                            this.$store.commit('addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                        }else{
                            // 验证失败的弹窗
                            this.$message.error(data.data.data.message);
                        }
                    })
                    */

                }
            })
        },
        signup(){}
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