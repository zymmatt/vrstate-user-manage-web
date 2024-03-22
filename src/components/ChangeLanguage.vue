<template>
    <el-dropdown class="right-top">
        <span class="el-dropdown-link">
            {{$t("login.changelang")}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
                <div @click="change('tw')">繁中</div>
            </el-dropdown-item>
            <el-dropdown-item>
                <div @click="change('zh')">简中</div>
            </el-dropdown-item>
            <el-dropdown-item>
                <div @click="change('en')">English</div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import i18n from '../utils/i18n/index'

export default {
    name: 'changelanguage',
    props: {
        msg: String
    },
    methods: {
        change(tolang) {
            this.$i18n.locale = tolang
            console.log(this.$i18n.locale)
            this.$store.commit('Menulang')
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right-top {

    background-color: lightblue;
    padding: 10px;
}
</style>
