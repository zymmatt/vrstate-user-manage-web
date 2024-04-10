<template>
    <div>
        <el-card>
            <div>{{$t("home.account")}}</div>
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
                <p>{{$t("home.phone")}}：<span>{{account.phone}}</span></p>
            </div>
            <div>
                <p>{{$t("home.authority")}}：<span>{{$t(permission)}}</span></p>
            </div>
        </el-card>
        <el-card>
            <div>{{$t("home.app")}}</div>
            <div v-for="item in applist">
                {{item.name}}
            </div>
        </el-card>

    </div>
</template>

<script>
import i18n from '../utils/i18n/index';
import { getAuthList, getProdList, getProdSeat } from '../api/user';

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
                company:'',
                phone:'',
                isadmin:'',
            },
            applist: [],

        }
    },
    methods: {
        getAuth(){
            getAuthList({params:{userid: this.account.userid, mail: this.account.mail, isadmin: this.account.isadmin}}).then((response)=>{
                this.applist = response.data.data;
            })

        },

    },
    created() {
        const userdata = JSON.parse(sessionStorage.getItem('user'));
        this.account.userid = userdata.userid;
        this.account.name = userdata.name;
        this.account.mail = userdata.mail;
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
        this.getAuth()
    },
}


</script>

<style lang="less" scoped>






</style>