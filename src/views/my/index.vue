<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 已登录头部 -->
    <!-- 已登录 -->
    <div class="header user-info" v-else>
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span> <ToutiaoIcon icon="dianzan" /> </span>
        </div>
      </div>
      <van-grid class="grid-nav" :column-num="2" clickable>
        <van-grid-item>
          <!-- <i slot="icon" class="toutiao toutiao-shoucang"></i> -->
          <template #icon>
            <ToutiaoIcon icon="shoucang" />
          </template>
          <template #text>
            <span class="text">收藏 </span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <ToutiaoIcon icon="lishi" />
          </template>
          <template #text>
            <span class="text">历史 </span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="grid-nav"></div>
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="实名认证" is-link url="" />
      <van-cell title="用户反馈" is-link url="" />
      <van-cell title="小智同学" is-link url="" />
      <van-cell title="系统设置" is-link url="" />
      <van-cell @click="logOut" class="logOut" title="退出登录" />
    </div>
    <!-- /已登录头部 -->
  </div>
</template>

<script>
// import { Dialog } from "vant";
import { mapState } from "vuex";
import { fetchUser } from "@/api";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.getUserInfo();
  },
  mounted() {},
  methods: {
    async logOut() {
      await this.$dialog.confirm({
        title: "退出",
        message: "是否退出",
      });
      console.log("确认退出");
      this.$store.commit("setUser", null);
      // Dialog.confirm({
      //   title: "标题",
      //   message: "弹窗内容",
      // })
      //   .then(() => {
      //     // on confirm
      //     console.log("确认");
      //   })
      //   .catch(() => {
      //     // on cancel
      //     console.log("取消");
      //   });
    },
    async getUserInfo() {
      const res = await fetchUser();
      console.log(res);
      this.userInfo = res.data.data;
      console.log(this.userInfo);
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  padding-bottom: 200px;
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    //background: red;
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 30px;
        }
      }
    }
  }
  .data {
    display: flex;
    justify-content: space-around;
    .data-item {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      span:nth-child(1) {
        font-size: 36px;
        margin-bottom: 15px;
      }
      span:nth-child(2) {
        font-size: 23px;
      }
    }
  }
  .grid-nav {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logOut {
    text-align: center;
    margin-top: 10px;
    color: #eb5253;
  }
}
</style>
