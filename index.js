var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb');
var db = require('./config/database');
var config  = require('./config/config').app;
var json2csv = require('json2csv').Parser;
var Iconv  = require('iconv').Iconv;
var utf2euckr = new Iconv('UTF-8', 'EUC-KR');
var utf2euccn = new Iconv('UTF-8', 'EUC-CN');
var fs = require('fs');

app.set('port', (process.env.PORT || config.port));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res)=> res.send("Testing Taobao API"));

var ApiClient = require('./api-client/top-sdk/index').ApiClient;

const client = new ApiClient({
  'appkey':'23557753',
  'appsecret':'fe07dd33eac65c1b13324395a2cde358',
  'url':'http://gw.api.taobao.com/router/rest'
});


console.log("Testing taobao.item.seller.get");
client.execute('taobao.item.seller.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
    'fields':'num_iid,title,nick,price,approve_status,sku',
    'num_iid':'564628951829'
}, function(error, response) {
    if (!error) { 
      //var fields = ['title', 'price', 'sku_id', 'created', 'request_id'];
      var fields = ['title', 'price'];
//      console.log(JSON.stringify(response));
      var opts = { fields };
      var productCsv = new json2csv({ opts });
      var temp = productCsv.parse(response.item);
      var csv =  utf2euccn.convert(temp);
//      console.log(csv);
      fs.writeFile("./tmallproduct.csv", csv, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The product file was saved!");
      }); 
    }
    else { console.log(error);
    }
})


console.log("Testing taobao.trades.sold.get");
client.execute('taobao.trades.sold.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
  'fields':'tid,status,payment,title,orders.outer_iid,orders.outer_sku_id,shipping_type,receiver_name,receiver_state,receiver_city,receiver_district,receiver_address,receiver_zip, receiver_mobile, ',
  'start_created':'2018-04-09 00:00:00',
//'end_created':'2018-03-30 23:59:59',
//  'status':'TRADE_FINISHED',
//  'buyer_nick':'zhangsan',
  'type':'tmall_i18n',
/*  'ext_type':'service',
  'rate_status':'RATE_UNBUYER',
  'tag':'time_card',//
  'page_no':'1',
  'page_size':'40',
  'use_has_next':'true'*/
}, function(error, response) {
  if (!error) {
    var Orders = response.trades.trade;
//    console.log(JSON.stringify(Orders));
    opts = ['tid','status','payment','title', 'orsers.outer_iid','orders.outer_sku_id','shipping_type','receiver_name','receiver_state','receiver_city','receiver_district','receiver_address','receiver_zip', 'receiver_mobile'];
    var orderCsv = new json2csv({ opts });
    var temp = orderCsv.parse(Orders);
    var order1 = Orders.order;
    console.log(order1);
    var csv = utf2euccn.convert(temp);
//    console.log(temp);   
    fs.writeFile("./tmallorder.csv", csv, function(err) {
      if(err) {
        return console.log(err);
      } else {
        console.log("The tmall order file was saved!");
      }})}
    else {console.log(error);}});

/*/ 韩国时尚
var testjson = [
  {
    "car": "한글테스트",
    "price": 40000,
    "color": "핑크"
  }, 
  {
    "car": "한글 차이름",
    "price": 35000,
    "color": "black"
  }, 
  {
    "car": "Porsche",
    "price": 60000,
    "color": "green"
  }
  ];
    
  opts = ['car','color'];
  var carCsv = new json2csv({ opts });
  var temp = carCsv.parse(testjson);
//  var csv = utf2euccn.convert(temp)
    fs.writeFile("./pirin-test.csv", temp, function(err) {
      if(err) {
        return console.log(err);
      }
    });
//    console.log(csv1);
    csv = utf2euckr.convert(temp);
//    console.log(csvconv);
    
    fs.writeFile("./hangultest.csv", csv, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The hangul test file was saved!");
    });
  

/*client.execute('taobao.trade.fullinfo.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
  'fields':'tid,type,status,payment,orders',
  'tid':'ryi4ayxghc61'
}, function(error, response) {
  if (!error) {
    console.log("fullinfo OK");
    console.log(response);
  }
  else console.log(error);
})*/

/*
client.execute('taobao.product.get', {
  'customer_props':'20000:优衣库:型号:001:632501:1234',
  'fields':'product_id,outer_id',
  'product_id':'549089985311',
  'cid':'1285783221',
  'props':'10005:10027;10006:29729',
  'market_id':'2'
}, function(error, response) {
  if (!error) console.log(response);
  else console.log(error);
});
*/

/*tells our application to listen on the specified port*/

app.listen(config.port);
console.log("App running on port " + config.port);