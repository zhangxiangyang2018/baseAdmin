<template>
    <div class="outerLink">


       
     
        <iframe :src="path" id="frameOuter" frameborder="0" ></iframe>
    
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            a:1
        }
    },
    computed:{
         path(){
             return window.sessionStorage.getItem("outLInk")
         }
    }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .outerLink {
    
        position: absolute;
    
        width: 100%;
    
        height: 100%;
    
        #frameOuter {
    
            overflow: hidden;
    
            overflow-x: hidden;
    
            overflow-y: hidden;
    
            height: 100%;
    
            width: 100%;
    
            position: absolute;
    
            top: 0px;
    
            left: 0px;
    
            right: 0px;
    
            bottom: 0px
    
        }
    
    }
</style>


