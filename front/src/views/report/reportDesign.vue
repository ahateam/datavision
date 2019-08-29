<template>
  <div>
    <div class="box-database"></div>
    <div :style="boxRes" ></div>
    <div class="box-charts">

    </div>
  </div>
</template>

<script>
export default {
  name: "reportDesign",
  data() {
    return {
      boxRes: {
        float: "left",
        width: document.body.clientWidth - 410 + "px",
        borderRight: "1px solid #ddd",
        height:document.body.clientHeight+'px'
      }
    };
  }
};
</script>

<style scoped lang="scss">
.box-database {
  float: left;
  width: 200px;
  height: 100vh;
  border-right: 1px solid #ddd;
}
.box-charts{
    float: left;
    width: 200px;
    height: 100vh;
    
}
</style>
