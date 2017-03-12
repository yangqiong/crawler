/**
 * 打印出马蜂窝城市列表
 * http://www.mafengwo.cn/mdd/
 */

let request = require("request");
let cheerio = require("cheerio");

let options = {
    url: "http://www.mafengwo.cn/mdd/",
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
    let $cityNodes = $(".hot-list dd a");
    for (let i = 0; i < $cityNodes.length; i++){
        let $cityNode = $($cityNodes[i]);
        let cityName = $cityNode.text().trim();
        let cityId;
        $cityNode.attr("href").replace(/(\d+)/, function(match, p1){
            cityId = p1;
        });
        console.log(cityName + "|" + cityId);
    }
});