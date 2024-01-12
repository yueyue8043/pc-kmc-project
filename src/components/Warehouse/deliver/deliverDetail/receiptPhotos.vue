<template>
  <div class="receiptPhotos">
    <el-upload
      class="upload-demo"
      accept=".jpg, .png"
      action="#"
      :auto-upload="false"
      :show-file-list="true"
      :file-list="fileList"
      :before-remove="beforeRemove"
      list-type="picture-card"
      :on-change="getFile"
      multiple
    >
      <i class="el-icon-upload"></i>

      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过2M
      </div>
    </el-upload>

    <div class="btn-box">
      <el-button
        type="primary"
        :disabled="disabled"
        @click="postReceiptPhotos()"
        >上传回单照片</el-button
      >
    </div>
  </div>
</template>

<script>
import { postReceiptPhotos, getSTSToken } from "@/api/deliver";
import OSS from "ali-oss";
export default {
  data() {
    return {
      imageUrl: "",
      fileList: [],
      disabled: true,
      receiptPhotos: [],
      nowTime: new Date().getTime(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
  },
  methods: {
    async getSTSToken(file) {
      const result = await getSTSToken();
      const client = new OSS({
        region: "oss-cn-beijing",
        accessKeyId: result.data.AccessKeyId,
        accessKeySecret: result.data.AccessKeySecret,
        stsToken: result.data.SecurityToken,
        // 填写Bucket名称。
        bucket: "kmc-images",
      });
      //转换当前时间戳
      let now = this.dayjs(this.nowTime).format("YYYY-MM-DD_HH:mm:ss");

      //图片存储目录： kmc_uid/uid_当前年份/uid_当前月份/订单id_年_月_日_时_分_秒_图片名
      let fileName = `kmc_uid_${this.$store.getters.uid}/kmc_uid_${
        this.$store.getters.uid
      }_${this.year}/kmc_uid_${this.$store.getters.uid}_${
        this.month + 1
      }/orderID_${this.$store.state.user.rowData.orderId}_${now}_${file.name}`;
      client.put(fileName, file.raw).then((res) => {
        if (res.res.status == 200) {
          this.receiptPhotos.push(res.url);
        } else {
          this.$message.error("图片上传失败,请重新上传");
        }
      });
    },

    async postReceiptPhotos() {
      const data = {
        receiptPhotos: this.receiptPhotos.join(","),
        orderId: this.$store.state.user.rowData.orderId,
      };
      const result = await postReceiptPhotos(data);
      if(result.status == 200) {
        this.$message.success(result.message)
        this.$emit('handleClose')
      }else {
        this.$message.error(result.message)
      }
    },

    getFile(file, fileList) {
      if (this.beforeAvatarUpload(file)) {
        //通过校验就上传图片
        this.fileList.push(file);
        this.getSTSToken(file);
      } else {
        this.beforeRemove(file);
      }
      this.getDisabled();
    },

    beforeRemove(file, fileList) {
      this.fileList = this.fileList.filter((e) => e.uid !== file.uid);
      this.getDisabled();
    },

    getDisabled() {
      if (this.fileList.length === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.fileList.length !== 0) {
        const temp = this.fileList.filter(
          (e) => e.name == file.name && e.size == file.size
        );
        if (temp.length !== 0) {
          this.$message.error("请勿上传相同的图片");
          return false;
        }
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .upload-demo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.receiptPhotos {
  .el-upload__tip {
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
  }

  .btn-box {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>