<script setup>
import { onMounted, onUnmounted } from 'vue'

let observer = null

const handleScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        }else {
            entry.target.classList.remove('visible')
        }
    })
}

onMounted(() => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    observer = new IntersectionObserver(handleScroll, options)

    const elements = document.querySelectorAll('.one')
    elements.forEach(el => {
        observer.observe(el)
    })
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
    <div class="app">
        <div class="container">
            <div class="title">
                <div class="title-msg-1 action">
                    <span class="text-1">让代码分享更简单，更高效</span>
                </div>
                <div class="title-msg-2 action">
                    <span class="text-2">分享你的创新，启发全球的开发者</span>
                </div>

                <div class="title-msg-3 action">
                    <span class="text-3">加入我们，让代码改变世界</span>
                </div>

            </div>

            <div class="open-msg">
                <div class="open-msg-1">
                    <span class="msg-1">您是否还在这样分享代码？</span>
                </div>
                <div class="open-question">

                    <div class="one">
                        <div class="left">
                            <img src="./imgs/压缩包.png" alt="压缩包" class="img">
                        </div>
                        <div class="right">
                            <div class="center">
                                <div class="title-con">
                                    <span class="title">
                                    文件打包
                                    </span>
                                </div>
                                <div class="question-con">
                                    <span class="question-msg-1">
                                将代码文件打包成压缩包，通过电子邮件或即时通讯工具发送给好友。既耗时又麻烦，接收方还需要解压文件，非常不便
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="one">

                        <div class="right">
                            <div class="center">
                                <div class="title-con">
                                    <span class="title">
                                    手机拍摄
                                    </span>
                                </div>
                                <div class="question-con">
                                    <span class="question-msg-1">
                                用手机拍摄代码截图发送给好友。图像模糊且难以阅读，无法直接复制和运行代码，分享效率低下
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div class="left">
                            <img src="./imgs/相机.png" alt="压缩包" class="img">
                        </div>
                    </div>
                </div>
                <div class="open-msg-2 open-msg-1">
                    <span class="msg-2 msg-1">现在，我们为您提供更好的解决方案</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.app {
    background: #000000;
    display: flex;
    justify-content: center;

    .container {
        //background: #1B75D0;
        width: 80%;
        //height: 100vh;
        margin-top: 120px;

        .title {
            //background: #1B75D0;
            width: 100%;
            height: 400px;

            .action {
                position: relative;

                .text-1 {
                    position: absolute;
                    animation: fadeInUp 3s;
                }

                .text-2 {
                    position: absolute;
                    top: 150px;
                    left: 0;
                    animation: fadeInUp 3s;
                }

                .text-3 {
                    position: absolute;
                    top: 280px;
                    left: 0;
                    animation: fadeInUp 3s;
                }

            }

            .title-msg-1 {
                .text-1 {
                    font-weight: 600;
                    font-size: 90px;
                    background-image: linear-gradient(to right, #1A73E8, #794FF4);
                    -webkit-background-clip: text;
                    color: transparent;
                }
            }

            .title-msg-2 {
                margin-top: 40px;

                .text-2 {
                    font-weight: 540;
                    font-size: 60px;
                    color: white;
                }
            }

            .title-msg-3 {
                margin-top: 40px;

                .text-3 {
                    font-weight: 500;
                    font-size: 50px;
                    background-image: linear-gradient(to right, #1A73E8, #794FF4);
                    -webkit-background-clip: text;
                    color: white;
                }
            }
        }

        .open-msg {
            margin-top: 200px;
            width: 100%;

            .open-msg-1 {
                width: 100%;
                //background: #1B75D0;
                display: flex;
                justify-content: center;

                .msg-1 {
                    animation: fadeInUp 3s;
                    font-weight: 500;
                    font-size: 50px;
                    color: white;
                }
            }

            .open-question {

                margin-top: 40px;
                width: 100%;

                .one {
                    margin-top: 90px;
                    display: flex;
                    height: 400px;

                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 2s, transform 2s;

                    &.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .left {
                        width: 50%;
                        //background: #6962D0;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .img {
                            width: 150px;
                            height: 150px;
                        }
                    }

                    .right {
                        flex: 1;
                        //background: gold;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .center {
                            width: 62%;

                            .title {
                                font-weight: 500;
                                font-size: 34px;
                                color: white;
                            }

                            .question-msg-1 {
                                font-weight: 500;
                                font-size: 24px;
                                color: #616162;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>