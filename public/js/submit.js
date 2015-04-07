

void function(){


    var body = $("body");


    body.on("change", ".uploadfile input", function(){
        var reader  = new FileReader();
        var file = this.files[0], me = $(this);
        var previewfile = document.querySelector(".previewfile");

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        me.prev("span").html("处理中...");

        var xtype = !!me.attr("xtype");

        reader.onloadend = function () {
            var base64 = reader.result;

            // previewfile.onload = function(){

            //     var width = previewfile.width, height = previewfile.height;
            //     canvas.height = height;
            //     canvas.width  = width;
            //     ctx.drawImage(previewfile, 0, 0);
            //     base64 = canvas.toDataURL('image/png');
            //     me.prev("span").html("上传中...");
                
            // };

            // previewfile.src = reader.result;
            $.post("/uploadfile", {base64: base64}, function(data){
                if(data.status == 0){
                    me.parent().attr("img", data.id);
                    me.prev("span").html("已选择");

                    if(xtype){
                        me.parent().parent().parent().find("img").attr("src", "/upload/"+data.id);
                    }
                }
            });

        }

        reader.readAsDataURL(file);
    });
    
    var form = $(".form");


    var name = form.find(".name"), 
        developer = form.find(".developer"), 
        devlink = form.find(".devlink"), 
        icon = form.find(".icon.uploadfile"), 
        shootscreen = form.find(".shootscreen"),
        intro = form.find(".intro"),
        email = form.find(".email"),
        phone = form.find(".phone");


    var submitbtn = $(".submitbtn");

    var data = {};


    submitbtn.on("click", function(){

        data.name = name.val();
        data.developer = developer.val();
        data.devlink = devlink.val();
        data.icon = icon.attr("img");
        data.shootscreen = "";

        $.each(shootscreen.find(".btn"), function(i, btn){
            if($(btn).attr("img")) data.shootscreen += $(btn).attr("img") + ",";
        });

        data.intro = intro.val();
        data.email = email.val();
        data.phone = phone.val();

        if(!data.name || !data.developer || !data.devlink){
            alert("请填写完整信息");
            return false;
        }

        if(!data.icon){
            return alert("请上传图标") || false;
        }

        if(data.shootscreen.length == 0){
            return alert("请上传游戏截图") || false;
        }  

        if(!data.email ) return alert("请输入邮箱")|| false;;
        if(!data.phone ) return alert("请输入手机号")|| false;;

        if(window.result && result.sign_status != "yes") { 
            alert("请前往cocoachina登录，再提交");
            return false;
        }
        data.username = result.username;
        data.uid = result.uid;
        $.post("/cndata", data, function(d){

            alert("提交成功");
        });

        return false;
    });




















}();


