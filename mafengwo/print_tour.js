/**
 * 打印出马蜂窝每个城市的旅游景点
 * http://www.mafengwo.cn/jd/10065/gonglve.html
 */

let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

fs.readFile("city.txt", "utf8", function(err, data){
    if (err){
        console.log(err);
        return;
    }
    let rows = data.split("\n");
    (async function(){
        for (let i = 0; i < rows.length; i++){
            let row = rows[i];
            let cityName = row.split("|")[0];
            let cityId = row.split("|")[1];
            await getTour(cityName, cityId, 1);
        }
    })();
})

function getTour(cityName, cityId, pageId){
    return new Promise(function(resolve, reject){
        let options = {
            url: 'https://m.mafengwo.cn/jd/' + cityId + '/gonglve.html?page=' + pageId + '&is_ajax=1',
            headers: {
                'User-Agent': 'User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            }
        }
        request.get(options, function(err, response, data){
            if (err){
                console.log(err);
                reject(err);
                return;
            }
            if (response.statusCode !== 200){
                console.log("statusCode: ", response.statusCode);
                return;
            }
            let html = JSON.parse(data).html;
            if (html.length > 0){
                (async function(){
                    let $ = cheerio.load(html)
                    let citys = $(".hd");
                    let links = $("a");
                    for(let i = 0; i < citys.length; i++){
                        let tourName = $(citys[i]).text();
                        let tourId;
                        let href = $(links[i]).attr('href');
                        href.replace(/(\d+)\.html/, function(match, p1){
                            tourId = p1;
                        })
                        console.log(cityId + "|" + cityName + "|" + tourId + "|" + tourName);
                    }
                    await timeout(1000); // 有反爬机制，控制频率
                    pageId++;
                    await getTour(cityName, cityId, pageId);
                    resolve();
                })();
            } else {
               resolve();
            }
        })
    })
}

function timeout(delay) {  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}