<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon @click="$router.push('/my')" class="cha" name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        required
        placeholder="请输入用户名"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        maxlength="6"
        required
        type="number"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            @finish="isShowTime = false"
            :time="time"
            v-if="isShowTime"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            size="small"
            class="send-sms-btn"
            type="primary"
            @click="sendCode"
            ref="getCodeBtn"
            :disabled="isdisable"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, getCode } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      // 倒计时组件的业务逻辑:
      // 页面初始化的时候默认展示获取验证码按钮
      // >>点击按钮之后(表单校验通过)
      // >>显示倒计时
      // >>倒计时结束继续展示验证码按钮
      isShowTime: false,
      isdisable: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      time: 5000,
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    // 方法一
    // async onSubmit(values) {
    //   const res = await userLogin(values);
    //   console.log(res);
    //   console.log(values);
    // },
    // value自动从表单里面获取的值
    // 获取到的值是对象: key >>表单的name值value >>用户输入的值
    // await后面写的是promise
    // 只有promise成功了的情况下才会继续执行
    async onSubmit() {
      try {
        // 用户登录
        const res = await userLogin(this.user);
        this.$store.commit("setUser", res.data.data);
        this.$router.push({ path: "/my" });
        Toast.success("登录成功");
        console.log(res);
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "登录失败");
      }
    },
    // 发送验证码
    async sendCode() {
      // 两个函数对于错误的提示需求不同，因此需要分开来进行trycatch
      // 当第一个函数执行结果是错误时，return返回，防止后面的函数继续执行，显示后面的提示信息
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      // 2、校验通过
      //   2-1:按钮禁用>>发送请求
      //   发送成功>>倒计时>>成功的提示
      //   发送失败>>错误的提示
      //   拿到结果>>解除禁用
      try {
        this.isdisable = true;
        // 发送验证码请求
        await getCode(this.user.mobile);
        this.isShowTime = true;
        this.$toast.success("获取验证码成功");
      } catch (e) {
        console.log(e);
        //通过可选链操作符来判断每一级的路径是否存在
        this.$toast.fail(e?.response?.data?.message || "出错了");
      } finally {
        // 不管成功或者失败都会执行的逻辑
        this.isdisable = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .cha {
    color: #ededed;
  }
}
</style>
