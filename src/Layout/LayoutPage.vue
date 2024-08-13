<script setup lang="ts">
import NavigationCrosswise from "@/components/NavigationCrosswise.vue";
import NavigationLengthways from "@/components/NavigationLengthways.vue";

</script>

<template>
    <div class="app">
        <div class="container-title">
            <NavigationCrosswise/>
        </div>
        <div class="container_big">
            <div class="container-tow">
                <div class="container_navigation">
                    <NavigationLengthways/>
                </div>
                <div class="container_father">
                    <div class="container_content">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-container">
            <div class="bottom-item">

                <div class="item">
                    <div class="bottom-logo-con">
                        <img src="../components/imgs/logo.png" class="img"/>
                        <a href="/home" class="a-msg">非凡文本</a>
                    </div>
                    <div class="understand-con">
                        <div class="content">
                            <a href="/publicity" class="a-understand">关于我们</a>
                        </div>
                    </div>

                </div>

                <div class="item">
                    <span class="bottom-msg">富强</span>
                    <span class="bottom-msg">民主</span>
                    <span class="bottom-msg">文明</span>
                    <span class="bottom-msg">和谐</span>
                </div>

                <div class="item">
                    <span class="bottom-msg">自由</span>
                    <span class="bottom-msg">平等</span>
                    <span class="bottom-msg">公正</span>
                    <span class="bottom-msg">法治</span>
                </div>

                <div class="item">
                    <span class="bottom-msg">爱国</span>
                    <span class="bottom-msg">敬业</span>
                    <span class="bottom-msg">诚信</span>
                    <span class="bottom-msg">友善</span>
                </div>

                <div class="item">
                    <span class="bottom-msg">友链</span>
                    <a href="/bb" class="bottom-msg">憋憋仓管</a>
                    <a href="/promo" class="bottom-msg">iChat</a>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

.app {

    display: flex;
    flex-direction: column;

    .container-title {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background-color: #ffffff;
    }

    .container_big {
        display: flex;
        margin-top: 10px;
        justify-content: center;
        padding-top: 32px;

        .container-tow {
            display: flex;
            width: 100%;
            max-width: 1200px;
            justify-content: flex-start;

            .container_navigation {
                flex: 0 0 200px;
                position: fixed;
                min-height: 100vh;
                z-index: 1;
            }

            .container_father {
                flex: 1;
                margin-top: 20px;

                .container_content {
                    border-left: 1px solid #DCDFE6;
                    min-height: 100vh;
                    margin-left: 200px;
                    padding: 20px;
                }
            }
        }
    }

    .bottom-container {
        background-color: #F1F3F4;
        display: flex;
        justify-content: center;
        z-index: 2;
        .bottom-item {
            display: flex;
            justify-content: space-between;
            height: 350px;
            width: 69.5%;

            .item {
                display: flex;
                flex-direction: column;
                height: 100%;
                color: #515253;

                a {
                    text-decoration: none;
                }

                .bottom-logo-con {
                    display: flex;
                    align-items: center;
                    margin-top: 15px;

                }

                .bottom-msg {
                    font-size: 18px;
                    margin-top: 22px;
                }

                .img {
                    width: 32px;
                    height: 40px;
                }

                .a-msg {
                    font-size: 22px;
                    color: #515253;
                    margin-left: 10px;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .understand-con{
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 10px;
                    width: 100%;

                    .content {
                        .a-understand {
                            font-size: 18px;

                        }
                    }
                }
            }


        }

    }


}


</style>