/**
 * 打印出携程旅游城市列表
 * http://you.ctrip.com/place/countrylist.html
 */

let fs = require("fs");
let cheerio = require('cheerio');
let request = require('request');

let options = {
    url: "http://you.ctrip.com/place/countrylist.html",
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }
}

request.get(options, function(err, response, html){
    if (err) {
        console.log(err);
        return;
    };
    if (response.statusCode !== 200){
        console.log("statusCode: ", response.statusCode);
        return;
    }
    let $ = cheerio.load(html);
    let $cityNodes = $(".bd li");
    for (let i = 0; i < $cityNodes.length; i++){
        let $cityNode = $($cityNodes[i]);
        let cityName = $cityNode.find("a").text().trim();
        let cityEnName = $cityNode.find("span").text().trim();
        let cityId;
        $cityNode.find("a").attr("href").replace(/place\/(\S+)\./, function(match, p1){
            cityId = p1;
        });
        console.log(cityName + "|" + cityEnName + "|" + cityId);
    }
});