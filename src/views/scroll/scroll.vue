<template>
    <div>
        <my-scroll ref="myScroll" :on-refresh="onRefresh" :on-pull="onPull" :get-scroll-top="getTop" :scroll-state="scrollState">
            <div slot="scrollList">
                <!-- 列表 -->
                <!-- <p v-for="item in listdata">{{item}}</p> -->
            </div>
        </my-scroll>
    </div>
</template>
<script>
import myScroll from "./vue-scroll.vue";
export default {
    data() {
        return {
            scrollState: true, //是否可以滑动
            indexScrollTop: 0,
            listdata: [1,1,1,1,1,1,1,1,1,1,1,1,111,1,11,1111,11]
        };
    },
    components: {
        myScroll
    },
    methods: {
        onRefresh(mun) {
            // 刷新
            this.listParams.p = 1;
            this.$axios
                .get(apiUrl.noticeList, {
                    params: this.listParams,
                    isLoading: false
                })
                .then(res => {
                    if (res.code == 10000) {
                        this.listParams.p++;
                        this.listdata = res.data;
                        this.$refs.myScroll.setState(3);
                    } else {
                        this.$refs.myScroll.setState(3);
                    }
                });
        },
        onPull(mun) {
            alert(11111)
            //加载
            this.$axios
                .get(apiUrl.noticeList, {
                    params: this.listParams,
                    isLoading: false
                })
                .then(res => {
                    if (res.code == 10000 && res.data.length > 0) {
                        this.listParams.p++;
                        res.data.map((v, k) => {
                            this.listdata.push(v);
                        });
                         this.listdata=[1,1,1,1,1,1,1,1,1,1,1,1,111,1,11,1111,11,1]
                        this.$refs.myScroll.setState(5);
                    } else {
                        this.$refs.myScroll.setState(7);
                    }
                });
        },
        getTop(y) {
            //滚动条位置
            this.indexScrollTop = y;
        }
    }
};
</script>