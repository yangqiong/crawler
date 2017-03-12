/**
 * 获取豆瓣图书标签
 * https://book.douban.com/tag/?icn=index-nav
 */

let fs = require("fs");
let cheerio = require('cheerio');
let request = require('request');

let options = {
    url: "https://book.douban.com/tag/?icn=index-nav",
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
    let $tagNodes = $(".article td a");
    for (let i = 0; i < $tagNodes.length; i++){
        let $cityNode = $($tagNodes[i]);
        let tag = $cityNode.text();
        console.log(tag);
    }
});