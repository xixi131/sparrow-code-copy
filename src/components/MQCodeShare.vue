<template>
  <div class="container">
    <h1 class="animated-title">憋憋仓库管理系统</h1>
    <p class="animated-text">一个提高商品存储和管理工作效率的软件解决方案</p>
    <div class="content">
      <div class="section">
        <div class="left">
          <h2 class="animated-title">我们的特色</h2>
          <ul class="animated-list">
            <li>提高管理效率</li>
            <li>数据一致性</li>
            <li>查询优化</li>
            <li>权限管理</li>
            <li>灵活性</li>
          </ul>
        </div>
        <img class="image" src="./imgs/微信图片_20240519221742.png" alt="">
      </div>
      <div class="section">
        <img class="image" src="./imgs/微信图片_20240519221739.png" alt="">
        <div class="right">
          <h2 class="animated-title">我们的目标用户</h2>
          <ul class="animated-list">
            <li>仓库管理员</li>
            <li>物流人员</li>
            <li>采购经理</li>
            <li>销售团队</li>
            <li>IT支持人员</li>
          </ul>
        </div>
      </div>
    </div>
    <h2>即将上线，敬请期待</h2>
    <h2 @click="$router.push('/register')" class="dianwo">没有账号？点我马上注册</h2>

  </div>
</template>

<script>
export default {
  name: 'PublicityPage'
}
</script>

<style scoped>
.container {
  background: linear-gradient(to right, #0D162D, #00264A);
  color: white;
  text-align: center;
  padding: 30px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dianwo {
    cursor: pointer;
}

.animated-title {
  color: #3b82f6;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: fadeIn 2s;
}

.animated-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  animation: fadeIn 2s;
}

.content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.left, .right {
  flex: 1;
}

.image {
  max-width: 500px;
  height: auto;
  flex-shrink: 0;
}

.animated-list {
  list-style: none;
  padding: 0;
  animation: fadeIn 2s;
}

.animated-list li {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.animated-list li::before {
  content: '';
  position: absolute;
  left: -100%;
  top: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  animation: slideIn 5s infinite forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  to {
    left: 100%;
  }
}

</style>
