<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
    <ul>
      <li v-for="item in movielist" :key="item.filmId">
        <div class="pic_show">
          <img :src="item.poster" />
        </div>
        <div class="info_list">
          <h2>{{item.name}}</h2>
          <span class="item" v-if="item.filmType.value==1">{{item.filmType.name}}</span>
          <span class="item" v-else>{{item.filmType.name}}</span>
          <p v-if="item.actors">主演:{{item.actors | actorfilter}}</p>
          <p v-else>暂无主演</p>
          <p>上映时间：{{showtime(item.premiereAt)}}</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
    </Scroller>
  </div>
</template>
<script>
import Vue from "vue";
Vue.filter("actorfilter", function (data) {
  // console.log(data);
  var newlist = data.map((item) => item.name);
  return newlist.join(" ");
});
export default {
  name: "NowPlaying",
  data() {
    return {
    movielist: [],
    isLoading: true,
    };
  },
  mounted() {
    this.axios({
      url:
        "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=7664264",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159567748091495688306690","bc":"610900"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.isLoading=false;
	  this.movielist = res.data.data.films;
	  
   
	

	//   console.log(this.movielist);
    });
  },
  methods: {
	  showtime:function(time){
		   // 格式化日期
		var d = new Date();
		var s = d.getTime()+time;
		var n = new Date(s);
		// 格式化日期
		var month = n.getMonth();
		// var day=n.getDay();
		var  date=n.getDate();
		var  hours=n.getHours()
		//   console.log(month, date,day,hours);
		  return  month+" 月 "+date+" 日 "+hours+" 点"
	  }
  },
};
</script>
<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list .item {
  position: absolute;
  right: 100px;
  top: 5px;
  font-size: 9px;
  color: rgb(49, 22, 202);
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>