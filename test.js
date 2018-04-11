var mongo = require('mongodb');
//var config = require('./config/config').app;
var Iconv  = require('iconv').Iconv;
var utf2euckr = new Iconv('UTF-8', 'EUC-KR');
var utf2euccn = new Iconv('UTF-8', 'EUC-CN');
var utf2unknown = new Iconv('UTF-8', 'CP949')
var json2xls = require('json2xls');
var fs = require('fs');
var flatten = require('flat');

const Json2csvParser = require('json2csv').Parser;

const fields = [
    {
    label: '색깔',
    value: 'color'
    },
    {
    label: '모델',
    value: 'price.won'
    }
];
const myCars = [
  {
    "car": "아우디",
    "price_won": 40000,
    "color": "blue",
    "원산지": "韩国"
  }, {
    "car": "비엠더블유",
    "price_won": 35000,
    "color": "black",
    "원산지": "韩国"
  }, {
    "car": "포르쉐",
    "price_won": 60000,
    "color": "green",
    "원산지": "韩国"
  }
];

const json2csvParser = new Json2csvParser({ fields });
const csv = json2csvParser.parse(myCars, {fields});
var xls = json2xls(myCars,{ fields: ['car','price_won','원산지','color']}
);

//var csv1 = utf2euckr.convert(csv); 
fs.writeFile("./cars.csv", csv, function(err) {
    if(err) {
      return console.log(err);
    }
      console.log("The Car file was saved!");
    });

fs.writeFileSync('cars.xlsx', xls, 'binary');
console.log("The Car xlsx file was saved!");

