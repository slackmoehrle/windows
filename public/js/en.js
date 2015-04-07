

void function(){


    var mask = $(".mask"), dialog = $(".dialog");


    mask.on("click", hide);

    dialog.on("click",".header img, .cancel", hide);

    $("body").on("click",".apply", show);


    function hide(){
        mask.hide();
        dialog.hide();
        return false;
    }


    function show(){
        mask.show();
        dialog.show();
        return false;
    }

    var texts = ["text1", "text2", "text3", "text4"];

    dialog.on("click",".submit", function(){

        var v = {};

        $.each(texts, function(i,t){
            v[t] = $("#"+t).val();
        });

        $.post("/endata", v, function(data){
            if(data.status === 0){
                hide();
                alert("submit success");
            }
        });

        return;
    });




}();


