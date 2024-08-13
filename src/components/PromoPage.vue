<template>
  <div class="l-big-container">
    <h1>欢迎来到 iChat</h1>
    <h2>大学生i人交友平台</h2>
    <button class="cta-button" @click="register">立即注册</button>
    <div class="features">
      <div class="feature-item">
        <h3>寂寞的灵魂在此相遇</h3>
        <p>加入与你兴趣相投的群聊，结识新朋友。</p>
      </div>
      <div class="feature-item">
        <h3>快乐的日常带来共鸣</h3>
        <p>发布你的动态，与好友分享你的生活点滴。</p>
      </div>
      <div class="feature-item">
        <h3>同校社交拉近心的距离</h3>
        <p>认识同校伙伴，不当熟悉的陌生人。</p>
      </div>
      <div class="feature-item">
        <h3>寻觅真爱共度美好时光</h3>
        <p>接触异性，感受青春美好</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoPage",
  methods: {
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.l-big-container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 100px;
  margin: 30px 30px 60px;
  color: #fff;
}
h2 {
  font-size: 40px;
  margin: 12px 12px 24px;
  color: #f1f1f1;
}
p {
  font-size: 30px;
  margin: 12px;
  color: #f1f1f1;
}

.cta-button {
  padding: 20px 30px;
  margin: 20px 20px 40px;
  font-size: 20px;
  color: #fff;
  background-color: #559eeb;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cta-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
  width: 100%;
  text-align: left;
  color: #fff;
}

.feature-item {
  margin-bottom: 16px;
}

.feature-item h3 {
  font-size: 24px;
  margin-bottom: 6px;
  transition: font-size 0.3s ease;
}

.feature-item p {
  font-size: 16px;
  margin: 0;
}

.feature-item:hover h3 {
  font-size: 28px;
}
</style>
