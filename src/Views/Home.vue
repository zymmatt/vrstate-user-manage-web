<template>
    <div>
        <el-dialog :title="$t('home.edit')" :visible.sync="editdialogVisible"  width="50%" :before-close="editcloseDialog">
            <el-form :inline="true" :model="editform" :rules="editrules" ref="editform" label-width="80px">
                <el-form-item :label="$t('login.name')" prop="name">
                    <el-input placeholder="" v-model="editform.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.company')" prop="company">
                    <el-input placeholder="" v-model="editform.company"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.job')" prop="job">
                    <el-input placeholder="" v-model="editform.job"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.phone')" prop="phone">
                    <el-input placeholder="" v-model="editform.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editcloseDialog">{{$t("login.cancel")}}</el-button>
                <el-button type="primary" @click="submitEdit">{{$t("login.submit")}}</el-button>
            </div>
        </el-dialog>
        <el-card>
            <div style="display: flex; align-items: center;">
                <div class="title" >{{$t("home.account")}}</div>
                <el-button @click="editopenDialog">{{$t("home.edit")}}</el-button>
            </div>
            <div>
                <p>{{$t("home.name")}}：<span>{{account.name}}</span></p>
            </div>
            <div>
                <p>{{$t("home.mail")}}：<span>{{account.mail}}</span></p>
            </div>
            <div>
                <p>{{$t("home.company")}}：<span>{{account.company}}</span></p>
            </div>
            <div>
                <p>{{$t("home.job")}}：<span>{{account.job}}</span></p>
            </div>
            <div>
                <p>{{$t("home.phone")}}：<span>{{account.phone}}</span></p>
            </div>
            <div>
                <p>{{$t("home.authority")}}：<span>{{$t(permission)}}</span></p>
            </div>
        </el-card>
        <el-card>
            <div class="title" >{{$t("home.app")}}</div>
            <div v-for="item in applist">
                {{item.name}}
            </div>
        </el-card>

    </div>
</template>

<script>
import i18n from '../utils/i18n/index';
import { getAuthList, getProdList, getProdSeat, updateUser, getUserById } from '../api/user';

export default {
    components: {

    },
    data() {
        return {
            permission:'',
            account:{
                userid:'',
                name:'',
                mail:'',
                job:'',
                company:'',
                phone:'',
                isadmin:'',
            },
            applist: [],
            editform: {
                name: '',
                company: '',
                job: '',
                mail: '',
                phone: '',
                isadmin: '',
            },
            editrules: {
                name: [{ required: 'true', message: ' ', trigger: 'blur' }],
            },
            editdialogVisible: false,

        }
    },
    methods: {
        getAuth(){
            getAuthList({params:{useridstr: this.account.userid, mail: this.account.mail, isadmin: this.account.isadmin}}).then((response)=>{
                this.applist = response.data.data;
            })

        },
        getUserInfo(){
            getUserById({params:{useridstr: this.account.userid}}).then((response)=>{
                sessionStorage.setItem('user', JSON.stringify(response.data.data));
                this.account.userid = response.data.data.useridstr;
                this.account.name = response.data.data.name;
                this.account.company = response.data.data.company;
                this.account.job = response.data.data.job;
                this.account.phone = response.data.data.phone;
            })
        },
        submitEdit(){
            this.editform['useridstr'] = this.account.userid;
            this.editform['isadmin'] = this.account.isadmin;
            updateUser(this.editform).then((response)=>{
                this.getUserInfo();
                this.$message({
                    type: 'success',
                    message: response.data.msg,
                });
                this.editcloseDialog();

            })

        },
        editopenDialog(){
            this.editform.name = this.account.name
            this.editform.company = this.account.company
            this.editform.job = this.account.job
            this.editform.phone = this.account.phone
            this.editdialogVisible = true
        },
        editcloseDialog(){
            this.editdialogVisible = false
            this.$refs.editform.resetFields()
        },
    },
    created() {
        const userdata = JSON.parse(sessionStorage.getItem('user'));
        this.account.userid = userdata.useridstr;
        this.account.name = userdata.name;
        this.account.mail = userdata.mail;
        this.account.job = userdata.job;
        this.account.company = userdata.company;
        this.account.phone = userdata.phone;
        this.account.isadmin = userdata.isadmin;
        if (userdata.isadmin == true){
            this.permission = "home.admin"
        } else {
            this.permission = "home.child"
        }

    },
    mounted() {
        this.getAuth();
    },
}


</script>

<style lang="less" scoped>
    .title {
        font-size: 24px;
    }





</style>