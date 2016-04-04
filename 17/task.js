/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
 var form_gra_time = document.getElementById('form-gra-time');
    var city_select = document.getElementById('city-select');
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
  //随机选取并返回一种颜色
    function rancolor(){
        var colorstr=["#FF4D00","#FFBF00","#00FFFF","#66FF00","#6495ED","#DA70D6","#C0C0C0","#8CE600","#FF8C69","#00FA9A"];
        var i=Math.floor(Math.random()*10);
        return colorstr[i];
    }
   //清空上一次的结果
    document.getElementById("list").innerHTML="";
    var nowcitydata=datastr[pageState.nowSelectCity];
    if(pageState.nowGraTime=="day"){
        for(daytime in nowcitydata){
            var chartline=document.createElement("li");
            chartline.setAttribute("title",daytime+":"+nowcitydata[daytime]);
            chartline.style.backgroundColor=rancolor();
            chartline.style.height=nowcitydata[daytime];
            chartline.style.width="10px";
            document.getElementById("list").appendChild(chartline);
        }
    }
    else if (pageState.nowSelectCity!=-1 && pageState.nowGraTime=="week" ){
        //进行数据处理
        var weekdata=[];
        for(key in nowcitydata){
            weekdata.push(nowcitydata[key]);
        }
        console.log(weekdata.length);
    var remain1=weekdata.length%7;
    var remain2=weekdata.length/7;
        console.log(remain1);
        console.log(remain2);
        var numb=0;
        var average=0;
    for(i=0;i<=remain2-1;i++){
            for(j=0;j<=6;j++){
                average=average+weekdata[i*7+j];
                numb++;
                if(numb==weekdata.length)break;
            }
            average=average/7;
            var chartline=document.createElement("LI");
            c=i+1;
            chartline.setAttribute("title","第"+c+"周"+average);
            chartline.style.backgroundColor=rancolor();
            chartline.style.height=average;
            chartline.style.width="30px";
            document.getElementById("list").appendChild(chartline);
            average=0;
        }
    }
    else if (pageState.nowGraTime=="month" && pageState.nowSelectCity!=-1){
        var weekdata=[];
        for(key in nowcitydata){
            weekdata.push(nowcitydata[key]);
        }
        console.log(weekdata.length);
        var remain1=weekdata.length%30;
        var remain2=weekdata.length/30;
        console.log(remain1);
        console.log(remain2);
        var numb=0;
        var average=0;
        for(i=0;i<=remain2-1;i++){
            for(j=0;j<=29;j++){
                average=average+weekdata[i*30+j];
                numb++;
                if(numb==weekdata.length)break;
            }
            average=average/30;
            var chartline=document.createElement("LI");
            c=i+1;
            chartline.setAttribute("title","第"+c+"月"+average);
            chartline.style.backgroundColor=rancolor();
            chartline.style.height=average;
            chartline.style.width="60px";
            document.getElementById("list").appendChild(chartline);
            average=0;
        }
    }

}



/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
    var city = city_select.value;
if (city != pageState.nowGraTime) {
  pageState.nowSelectCity = city;// 设置对应数据
  renderChart();// 调用图表渲染函数
}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  form_gra_time.onclick=function(event){
    if(event.target.value&&event.target.value != pageState.nowGraTime){
        pageState.nowGraTime = event.target.value;
        renderChart();
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var list = [];
  for(item in aqiSourceData){
    if(pageState.nowSelectCity === -1){
      pageState.nowSelectCity = item;
    }
    list.push('<option>');
    list.push(item);
    list.push('</option>');
  }

  city_select.innerHTML = list.join('');
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    datastr=aqiSourceData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
