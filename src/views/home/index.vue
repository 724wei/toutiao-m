<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 内容 -->
    <van-tabs animated v-model="active" swipeable class="channel-tabs">
      <van-tab v-for="item in ChannelList" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <ToutiaoIcon icon="gengduo" />
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from "@/api";
import ArticleList from "@/components/article-list.vue";
export default {
  name: "HomePage",
  components: {
    ArticleList,
  },
  props: {},
  data() {
    return {
      active: 0,
      ChannelList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getChannelList();
  },
  mounted() {},
  methods: {
    async getChannelList() {
      const res = await getChannel();
      console.log(res);
      this.ChannelList = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  // 标签栏
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
