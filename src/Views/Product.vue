<template>
    <div>
        <el-card>
            <div>{{$t("product.title")}}</div>
            <el-table :data="productData" style="width: 100%">
                <el-table-column prop="name" :label="$t('product.name')" width="180"></el-table-column>
                <el-table-column prop="total" :label="$t('product.total')" width="180"></el-table-column>
                <el-table-column prop="occupied" :label="$t('product.occupied')" width="180"></el-table-column>
                <el-table-column prop="remain" :label="$t('product.remain')" width="180"></el-table-column>
            </el-table>
        </el-card>

    </div>
</template>


<script>
import i18n from '../utils/i18n/index';
import { getAuthList, getAdminProdSummary } from '../api/user';


export default {
    components: {

    },
    data() {
        return {
            prodList: [],
            productData: [],
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
            getAdminProdSummary({params:{useridstr: this.account.userid}}).then((response)=> {
                this.prodList = response.data.data;
                for (var i=0; i<this.prodList.length;i++){
                    const tempdict = {
                        name: this.prodList[i].product.name,
                        total: this.prodList[i].totalSeats,
                        occupied: this.prodList[i].occupiedSeats,
                        remain: this.prodList[i].remainSeats,
                    }
                    this.productData.push(tempdict);
                }
                //getAuthList({params:{userid: this.account.userid, mail: this.account.mail, isadmin: this.account.isadmin}}).then((response)=>{
                //    this.applist = response.data.data;
                //})
            });
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