<template>
  <div class="article-list">
    <van-pull-refresh
      pulling-text="往下拉！"
      loosing-text="快松开"
      loading-text="加载了别急"
      success-text="欧了"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from "@/api";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const res = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;
        console.log(this.list);
        if (this.list.length === 0) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        console.log(e);
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      const res = await getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];

      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
// 使得每次返回时还停留在上次滑动的位置
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
