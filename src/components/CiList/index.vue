<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
    <ul>
      <li v-for="data in cinemas" :key="data.cinemaId">
        <div>
          <span class="name">{{data.name}}</span>
          <span class="q">
            <span class="price">￥{{data.lowPrice}}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{data.address}}</span>
          <span>{{data.Distance.toFixed(2)}}km</span>
        </div>
        <div class="card">
			 <div v-if="data.businessTime">{{data.businessTime}}</div>
          <div v-if="data.phone">{{data.phone}}</div>        
        </div>
      </li>
    </ul>
    </Scroller>
  </div>
</template>
<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemas: [],
      isLoading: true,
      prevCityId : -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.cityId;
    if( this.prevCityId === cityId ){ return; }
    this.isLoading = true;
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=365678`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159567748091495688306690","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
        // console.log(res.data.data.cinemas);
      this.cinemas = res.data.data.cinemas;
      this.isLoading=false
      this.prevCityId = cityId
    });
  },
};
</script>
<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body li span.name {
	display: inline-block;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  vertical-align: middle;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
   vertical-align: middle;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>