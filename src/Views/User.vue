<template>
    <div>
        <el-dialog :title="$t('user.newUser')" :visible.sync="newUserdialogVisible"
         width="50%" :before-close="newUsercloseDialog">
            <el-form ref="form" label-width="80px">
                <el-form-item :label="$t('user.email')" >
                    <el-input v-model="current_mail" placeholder=" "></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.products')" >
                    <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="deleteTag(tag)">
                      {{tag.name}}
                    </el-tag>

                    <el-select
                      v-model="newProdId"
                      v-if="tagVisible"
                      size="small"
                      placeholder=" "
                      :no-data-text="$t('user.noDataText')"
                      @change="handleInputConfirm"
                    >
                        <el-option
                            v-for="item in Prodoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button v-else class="button-new-tag" size="small" @click="addTag">{{$t("user.newProduct")}}</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newUsercloseDialog">{{$t("user.done")}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('user.edit')" :visible.sync="editdialogVisible"  width="50%" :before-close="editcloseDialog">
            <el-form ref="form" label-width="80px">
                <el-form-item :label="$t('user.email')" >
                    <div>{{current_mail}}</div>
                </el-form-item>
                <el-form-item :label="$t('user.products')" >
                    <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="deleteTag(tag)">
                      {{tag.name}}
                    </el-tag>

                    <el-select
                      v-model="newProdId"
                      v-if="tagVisible"
                      size="small"
                      placeholder=" "
                      :no-data-text="$t('user.noDataText')"
                      @change="editHandleSelect"
                    >
                        <el-option
                            v-for="item in Prodoptions"
                            :key="item.value"
                            :label="item.label"
                            :disabled="item.disabled"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button v-else class="button-new-tag" size="small" @click="addTag">{{$t("user.newProduct")}}</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editcloseDialog">{{$t("user.done")}}</el-button>
            </div>
        </el-dialog>
        <el-card>
            <!-- <div>{{$t("user.title")}}</div> -->
            <el-button type="primary" @click="handlecreate">{{$t("user.addUser")}}</el-button>
            <el-table :data="userData" style="width: 100%" :empty-text="$t('user.noDataText')">
                <el-table-column prop="name" :label="$t('user.name')" width="180"></el-table-column>
                <el-table-column prop="email" :label="$t('user.email')" width="180"></el-table-column>
                <el-table-column prop="permission" :label="$t('user.permission')" width="180"></el-table-column>
                <el-table-column prop="products" :label="$t('user.products')" width="180"></el-table-column>
                <el-table-column label="" >
                    <template slot-scope="scope">
                        <div class="button-group">
                            <!-- :disabled="InviteEnd(scope.row)" -->
                            <el-button @click="handleEdit(scope.row)">{{$t("user.edit")}}</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
import i18n from '../utils/i18n/index';
import { getAuthList, getdataList, getAdminProdSummary, getChildSummary, removeProdSeat, addProdSeat } from '../api/user';


export default {
    components: {

    },
    data() {
        return {
            dataList: [],
            userData: [],
            account:{
                userid:'',
                name:'',
                mail:'',
                company:'',
                phone:'',
                isadmin:'',
            },
            appdict: {},
            current_mail:"",
            editdialogVisible: false,
            newUserdialogVisible: false,
            tagVisible: false,
            dynamicTags: [],
            Prodoptions: [],
            newProdId: "",
        }
    },
    methods: {
        async getData(){
            this.userData = [];
            await getChildSummary({params:{userid: this.account.userid}}).then((response)=> {
                this.dataList = response.data.data;
                console.log(this.dataList);
            });

            for (var i=0; i<this.dataList.length;i++){
                let prod = ""
                for (var j=0;j<this.dataList[i].prodlist.length;j++){
                    prod = prod + this.dataList[i].prodlist[j].name + ","

                }
                const tempdict = {
                    name: this.dataList[i].user.name,
                    email: this.dataList[i].user.mail,
                    permission: i18n.t('home.child'),
                    products: prod,
                    productidlist: this.dataList[i].prodlist,
                }
                this.userData.push(tempdict);
            }

        },
        handlecreate(){
            this.dynamicTags = [];
            this.current_mail = "";
            this.tagVisible = false;
            this.newUserdialogVisible = true;
        },
        handleEdit(index) {
            this.dynamicTags = index.productidlist;
            this.current_mail = index.email;
            this.tagVisible = false;
            this.editdialogVisible = true;
            // 深拷贝
            this.form = JSON.parse(JSON.stringify(index));
        },

        deleteTag(tag){
            this.$confirm(i18n.t('user.deleteProdHintMessage'), i18n.t('user.hint'), {
                confirmButtonText: i18n.t('user.confirm'),
                cancelButtonText: i18n.t('user.cancel'),
                type: 'warning'
            }).then(() => {
                removeProdSeat({params:{userid: this.account.userid, prodid: tag.id, mail: this.current_mail}}).then((response)=> {
                    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                    this.$message({
                        type: 'success',
                        message: i18n.t('user.operationSuccess'),
                    });
                    this.getData()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: i18n.t('user.cancelDelete')
                });
            });

        },
        addTag(){
            let existIdlist = [];
            for (var i=0; i<this.dynamicTags.length;i++){
                existIdlist.push(this.dynamicTags[i].id)
            }
            console.log(existIdlist);
            this.Prodoptions = [];
            this.newProdId = "";
            getAdminProdSummary({params:{userid: this.account.userid}}).then((response)=> {
                const temp = response.data.data;
                for (var i=0; i<temp.length;i++){
                    this.appdict[temp[i].product.id] = temp[i].product;
                    let tempdict = {
                        value: temp[i].product.id,
                        label:  `${temp[i].product.name} ${temp[i].remainSeats}/${temp[i].totalSeats}`,
                        //name: this.prodList[i].product.name,
                        //total: this.prodList[i].totalSeats,
                        //occupied: this.prodList[i].occupiedSeats,
                        //remain: this.prodList[i].remainSeats,
                    }
                    if (existIdlist.indexOf(temp[i].product.id) != -1 || temp[i].remainSeats == 0){
                        tempdict["disabled"] = true
                    }
                    console.log(tempdict);
                    this.Prodoptions.push(tempdict);
                }
                this.tagVisible = true;
            });

        },
        editHandleSelect(){
            console.log(this.newProdId);
            console.log(this.appdict);
            this.$confirm(i18n.t('user.addProdHintMessage'), i18n.t('user.hint'), {
                confirmButtonText: i18n.t('user.confirm'),
                cancelButtonText: i18n.t('user.cancel'),
                type: 'warning'
            }).then(() => {
                addProdSeat({userid: this.account.userid, prodid: this.newProdId, mail: this.current_mail}).then((response)=> {
                    this.dynamicTags.push(this.appdict[this.newProdId])
                    // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                    this.$message({
                        type: 'success',
                        message: i18n.t('user.operationSuccess'),
                    });
                    this.tagVisible = false;
                    this.getData()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: i18n.t('user.cancelDelete')
                });
                this.tagVisible = false;
            });

        },
        editcloseDialog() {
            this.editdialogVisible = false;
        },
        newUsercloseDialog(){
            this.newUserdialogVisible = false;
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
        this.getData()
    },
}


</script>

<style lang="less" scoped>






</style>