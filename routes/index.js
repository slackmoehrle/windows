
var Router = require('koa-router'), fs = require("fs"), k = require("kmodel");

var index = new Router();


index.get("/:page", function*(){

    var page = this.params.page, list = [];

    if(page == "intro"){

        list = yield Cn.findall();
        yield this.render(page, {list: list});
        return ;
    }


    
    yield this.render(page);

});

index.get("/info/:id", function*(){

    var id = this.params.id;


    var c = yield Cn.queryOne({_id: id});
    yield this.render("info", {info: c});

});


index.get("/", function *(){

    if(this.headers['accept-language'].indexOf("zh-CN")!=-1){
        yield this.render("index");
    }else{
        yield this.render("indexen");
    }
});


var En = k.load("En");

index.post("/endata", function*(){


    var en = {}, body = this.request.body;

    en.firstname = body.text1;
    en.lastname  = body.text2;
    en.email = body.text3;
    en.link  = body.text4;

    var e = yield En.insertOne(en);

    this.body = {status: 0, en: e};

});


var Cn = k.load("Cn");

index.post("/cndata", function*(){


    var en = {}, body = this.request.body;

    var e = yield Cn.insertOne(body);

    this.body = {status: 0, en: e};

});

index.post("/uploadfile", function*(){

    var base64 = this.request.body.base64, id = Date.now();


    if(base64 && base64.indexOf && base64.indexOf("base64,") > 0) {
            
        var subfix = base64.indexOf("data:image/png") == 0 ? ".png" : ".jpg";
        var index  = subfix == ".png" ? 22 : 23;

        fs.writeFileSync("public/upload/"+id+".png", new Buffer(base64.slice(index), 'base64'));
    }

    this.body = {status: 0, id: id + ".png"};

});


module.exports = index;
