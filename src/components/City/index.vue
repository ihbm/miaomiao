<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li @click="handleClick(city.cityId,city.name)" v-for="city in hotList" :key="city.cityId">{{city.name}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="data in cityList" :key="data.firstLetter">
          <h2>{{data.firstLetter}}</h2>
          <ul>
            <li @click="handleClick(cityinfo.cityId,cityinfo.name)" v-for="cityinfo in data.cityinfo" :key="cityinfo.cityId">{{cityinfo.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(data,index) in cityList"
          :key="data.firstLetter"
          @click="handleToindex(index)"
        >{{data.firstLetter}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
    };
  },
  mounted() {
    this.axios({
      url: "https://m.maizuo.com/gateway?k=4776007",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159567748091495688306690","bc":"110100"}',
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      if (res.data.msg === "ok") {
        var { cityList, hotList } = this.formatCitys(res.data.data.cities);
        this.cityList = cityList;
        this.hotList = hotList;
      }
      //   console.log(res.data.data.cities);
    });
  },
  methods: {
    formatCitys(citys) {
      //   console.log(citys);
      var cityList = [];
      var hotList = [];
      for (let i = 0; i < citys.length; i++) {
        //是否是热门城市
        if (citys[i].isHot === 1) {
          hotList.push({ cityId: citys[i].cityId, name: citys[i].name });
        }
        //城市按首字母分组
        var firstLetter = citys[i].pinyin.substring(0, 1).toUpperCase();
        if (flitercity(firstLetter)) {
          cityList.push({
            firstLetter: firstLetter,
            cityinfo: [{ cityId: citys[i].cityId, name: citys[i].name }],
          });
        } else {
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].firstLetter === firstLetter) {
              cityList[j].cityinfo.push({
                cityId: citys[i].cityId,
                name: citys[i].name,
              });
            }
          }
        }
      }
      cityList.sort((x, y) => {
        if (x.firstLetter > y.firstLetter) {
          return 1;
        } else {
          return -1;
        }
      });

      function flitercity(letter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].firstLetter === letter) {
            return false;
          }
        }
        return true;
      }
      //    console.log(cityList,hotList);
      return {
        cityList,
        hotList,
      };
    },
    handleToindex(index) {
      //  console.log(index);
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
	},
     handleClick(id,name){
      console.log(id,name)
      localStorage.setItem("cityId",id);
      localStorage.setItem("cityName",encodeURIComponent(name));
      this.$router.push(`/movie`)
    }
  },
};
</script>
<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>