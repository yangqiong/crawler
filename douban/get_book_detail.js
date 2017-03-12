/**
 * 获取豆瓣图书详情
 * https://book.douban.com/subject/25862578/
 */

let request = require("request");
let cheerio = require("cheerio");

module.exports = function(url){
    return new Promise(function(resolve){
        let options = {
            url: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
            }
        }

        request.get(options, function(err, response, html){
            if (err){
                console.log(err);
                reject(err);
                return;
            }

            if (response.statusCode != 200){
                console.log("statusCode: " + response.statusCode);
                reject();
                return;
            }

            let url = options.url;
            let bookId;
            url.replace(/subject\/(\d+)/, function(match, p1){
                bookId = p1;
            });

            let $ = cheerio.load(html, {decodeEntities: false});
            if ($("#wrapper h1")){
                let author = "";
                let translator = "";
                let press = "";
                let press_date = "";
                let original_author = "";
                let subtitle = "";
                let page_number = "";
                let price = "";
                let binding = "";
                let isbn = "";
                let series = "";
                let series_link = "";

                html.replace(/作者<[\s|\S]*?>(.*)<\/a>/, function(match, p1){
                    if (p1) author = p1;
                })
                html.replace(/译者<[\s|\S]*?>(.*)<\/a>/, function(match, p1){
                    if (p1) translator = p1;
                })
                html.replace(/出版社:.*>(.*)</, function(match, p1){
                    if (p1) press = p1;
                })
                html.replace(/出版年:.*>(.*)</, function(match, p1){
                    if (p1) press_date = p1;
                })
                html.replace(/原作名:.*>(.*)</, function(match, p1){
                    if (p1) original_author = p1;
                })
                html.replace(/副标题:.*>(.*)</, function(match, p1){
                    if (p1) subtitle = p1;
                })
                html.replace(/页数:.*>(.*)</, function(match, p1){
                    if (p1) page_number = p1;
                })
                html.replace(/定价:.*>(.*)</, function(match, p1){
                    if (p1) price = p1;
                })
                html.replace(/装帧:.*>(.*)</, function(match, p1){
                    if (p1) binding = p1;
                })
                html.replace(/ISBN:.*>(.*)</, function(match, p1){
                    if (p1) isbn = p1;
                })
                html.replace(/丛书:.*>(.*)<\/a>/, function(match, p1){
                    if (p1) series = p1;
                })
                html.replace(/丛书:.*href="(.*)"/, function(match, p1){
                    if (p1) series_link = p1;
                })

                resolve({
                    author: author,
                    translator: translator,
                    press: press,
                    press_date: press_date,
                    original_author: original_author,
                    subtitle: subtitle,
                    page_number: page_number,
                    price: price,
                    binding: binding,
                    isbn: isbn,
                    series: series,
                    series_link: series_link
                })

                // console.log(author, translator, press, press_date, original_author, subtitle, page_number, price, binding, isbn, series, series_link);

                // let info = $("#info").html().replace(/\s{2,}/g, "");
                // let info_text = $("#info").text().replace(/\s+/g, "");
                // let content_info = ""; // = $("#link-report .intro").html();
                // let author_info = ""; // = $(".intro").html();
                // let dir_info = ""; //$("#dir_" + bookId + "_full").html();
                // let buy_info = ""; //$("#buyinfo-printed").html();

            } else {
                resolve({});
            }
        })
    })
}

module.exports("https://book.douban.com/subject/25862578/").then(function(data){
    console.log(data);
})