<template>
    
    <el-submenu v-if="item.child && item.child.length" :index="navIndex"> 
        <!-- 创建菜单分组 -->
        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
        <!-- 递归调用自身，直到subItem不含有子节点 -->
        <nav-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" >
        </nav-item>
    </el-submenu>

    
    <el-menu-item v-else :index="item.path"><i :class="item.icon"></i>{{ item.name }}</el-menu-item>
</template>
<script>
    export default {
        // 递归组件必须有name
        name: 'navItem',
        props: ['item','navIndex']
    }
</script>