var express = require('express');
var app = express();
var mongo = require('mongodb');
var db = require('./config/database');
var config  = require('./config/config').app;

app.set('port', (process.env.PORT || config.port));

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
    if (!error) console.log(JSON.stringify(response));
    else console.log(error);
})

client.execute('taobao.trades.sold.increment.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
  'fields':'tid,type,status,payment,orders,rx_audit_status',
  'start_modified':'2018-04-01 00:00:00',
  'end_modified':'2018-04-02 00:00:00',
//  'status':'TRADE_NO_CREATE_PAY',
  'type':'tmall-i18n',
/*  'buyer_nick':'zhangsan',
  'ext_type':'service',
  'tag':'time_card',
  'page_no':'1',
  'rate_status':'RATE_UNBUYER',
  'page_size':'40',
  'use_has_next':'true'*/
}, function(error, response) {
  if (!error) console.log(response);
  else console.log(error);
})

console.log("Testing taobao.trades.sold.get");
client.execute('taobao.trades.sold.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
  'fields':'tid,type,status,payment,orders',
  'start_created':'2018-04-02 00:00:00',
//'end_created':'2018-03-30 23:59:59',
//  'status':'TRADE_FINISHED',
//  'buyer_nick':'zhangsan',
  'type':'tmall_i18n',
/*  'ext_type':'service',
  'rate_status':'RATE_UNBUYER',
  'tag':'time_card',
  'page_no':'1',
  'page_size':'40',
  'use_has_next':'true'*/
}, function(error, response) {
  if (!error) {
  console.log(JSON.stringify(response))}
  else console.log(error);
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

/*client.execute('taobao.trade.get', {
  'session' :'61000051ff9e5102f2b320f2a2e773f0dafecc6ca1e5bd13031625218',
  'fields':'tid,type,status,payment,orders',
  'tid':'123456789'
}, function(error, response) {
  if (!error) console.log(response);
  else console.log(error);
});*/
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
console.log("App running on port " + config.port)