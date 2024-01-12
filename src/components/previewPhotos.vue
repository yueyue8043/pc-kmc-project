<template>
  <div class="deliverDetail" v-if="isShowPreviewPhotos">
    <el-dialog
      title="图片预览"
      :visible.sync="isShowPreviewPhotos"
      width="60%"
      :before-close="handleClose"
    >
      <div class="img-box">
        <el-image
          style="width: 150px; height: 150px"
          v-for="(item, index) in previewList"
          :key="index"
          :src="item"
          :preview-src-list="previewList"
        >
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>
 
  <script>
export default {
  data() {
    return {
      previewList: this.$store.state.user.rowData.receiptPhotos || [],
      isShowPreviewPhotos: false,
    };
  },

  methods: {
    handleClose() {
      this.$emit("closePreviewPhotos");
    },
    getPreviewList() {
      this.previewList = this.$store.state.user.rowData.receiptPhotos;
    },
  },
};
</script>
  
  
  <style lang="less" scoped>
.el-image {
  margin: 20px 20px;
}
</style>