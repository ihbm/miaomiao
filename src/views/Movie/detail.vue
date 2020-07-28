<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header id="header" title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading" />
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg" style="background-color: #402C1B;">
        </div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.poster" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{detailMovie.name}}</h2>
            <p>A Cool Fish</p>
            <p>{{detailMovie.grade}}</p>
            <p>{{detailMovie.category}}</p>
            <p>{{detailMovie.nation}} / {{detailMovie.runtime}}分钟</p>
            <p>{{showtime(detailMovie.premiereAt)}}大陆上映</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{detailMovie.synopsis}}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
					<li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
						<div>
							<img :src="item | setWH('140.127')" alt="">
						</div>
					</li>
				</ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Detail",
  data() {
      return {
          detailMovie : {},
          isLoading : true
      }
  },
  components: {
    Header,
  },
  props: ["movieId"],
  mounted() {
    this.axios({
      url: "https://m.maizuo.com/gateway?filmId=" + this.movieId + "&k=3670290",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159567748091495688306690","bc":"610900"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      if (res.data.msg === "ok") {
        // console.log(res.data);
        this.detailMovie = res.data.data.film;
         this.isLoading = false;
         this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                });
        // console.log(this.detailMovie);
      }
    });
  },
  methods: {
    handleToBack() {
      this.$router.back();
      // https://m.maizuo.com/gateway?filmId=3982&k=3670290
    },
    showtime:function(time){
		   // 格式化日期
		var d = new Date();
		var s = d.getTime()+time;
		var n = new Date(s);
        // 格式化日期
        var year = n.getFullYear();
		var month = n.getMonth();
		// var day=n.getDay();
		var  date=n.getDate();
		var  hours=n.getHours()
		//   console.log(month, date,day,hours);
		  return  year+"-"+month+"-"+date
	  }
  },
};
</script>

<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}
#detailContrainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  /* filter: blur(20px); */
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>