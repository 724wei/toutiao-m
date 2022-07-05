module.exports = {
  plugins: {
    autoprefixer: {
      // 兼容设置
      Browserslist: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      // 随着设计稿的尺寸/10来改变
      // 普通写法
      // rootValue: 75,
      // 区分设置
      rootValue: (arg) => {
        // arg  处理的文件对象
        // 动态设置
        // 自己的样式 ==>75
        // vant组件的样式 ==>37.5
        // 通过判断需要处理的样式文件是否是vant组件的来进行判断
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
