<template>
  <div class="article-item">
    <van-cell :title="article.title">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>
      <template #label>
        <div class="img-container" v-if="article.cover.type === 3">
          <van-image
            class="img"
            :src="item"
            v-for="(item, index) in article.cover.images"
            :key="index"
          ></van-image>
        </div>
        <div class="label-container">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_cont }}</span>
          <span>{{ article.pubdate }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .img {
    width: 200px;
  }
  .img-container {
    display: flex;
    justify-content: space-between;
    .img {
      width: 200px;
      height: 200px;
    }
  }
  .label-container {
    span {
      margin-left: 10px;
    }
  }
}
</style>
