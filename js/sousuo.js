$(function () {
    $(".back").click(function (e) {
        e.preventDefault();
        history.back();
    });
    $("#input").focus();
    let arr1=[];
    let str1="";
    if(localStorage.history){
        str1=localStorage.history;
    }else{
        str1="";
    }
    let arr3=str1.split(",");

    function interest(index) {
        let type = $("#input").val();
        if (type == "") {
            return;
        }
        $.ajax({
            url: 'https://api.jisuapi.com/news/search?keyword=' + type + '&appkey=ea7f9075ee2b40ff',
            dataType: "jsonp",
            beforeSend:function () {
                $(".zhao").show();
                $("#add").hide();
                $(".history").hide();
            },
            success: function (val) {
                $(".zhao").hide();
                let arr = val.result.list;
                arr1=arr1.concat(arr);
                if(!arr){
                    return;
                }
                $("#add").show();
                let str = "";
                let newarr = arr.splice(index, 4);
                if(newarr.length==0){
                    return;
                }
                newarr.forEach(function (val, ind) {
                    val.pic=val.pic.replace("http","https");
                    console.log(val.pic);
                    if (!val.pic) {
                        str += `
                            <li class="list nopic">
                                <a href="${val.url}">
                                    <div>${val.title}</div>
                                    <span>${val.time}</span>
                                </a>
                         </li>`
                    } else {
                        str += `
                                <li class="list">
                                    <a href="${val.url}">
                                         <div class="left"><img src="${val.pic}" alt=""></div>
                                         <div class="right">${val.title}
                                          <span>${val.time}</span>
                                        </div>
                                    </a>
                                </li>`
                    }
                });
                $("#main").html(function (index, html) {
                    return html + str;
                });
                $("#add").css("display","block");
                flag=true;
            }
        })
    }
    let flag=true;
    $(".sousuo").click(function (e) {
        e.preventDefault();
        $(".history").hide();
        if (!flag) {
            return;
        }
        flag = false;
        if (!($("#input").val())) {
            flag = true;
            console.log(flag);
        }
        if (!arr3.includes($("#input").val())) {
            str1 = "," + $("#input").val() + str1;
            localStorage.history = str1;
        }
        $("#main").html("");
        interest(0);
    });
    $("#add").click(function () {
        let index = $("#main").children().length;
        interest(index);
    });
    $("#main").on("click","li",function () {
        let newindex=$("#main").children("li").index(this);
        let newobj=arr1[newindex];
        sessionStorage.media=JSON.stringify(newobj);
    });
    console.log(arr3);
    arr3=arr3.slice(0,11);
    if(arr3!=[]){
        let str2="";
        arr3.forEach(function (val) {
            if(val){
                str2+=`<p>${val}</p>`;
                $(".content").html(str2);
            }
        });
    }
    $(".content").on("click","p",function () {
        let val=$(this).text();
        $("#main").html("");
        $.ajax({
            url: 'https://api.jisuapi.com/news/search?keyword=' + val + '&appkey=ea7f9075ee2b40ff',
            dataType: "jsonp",
            beforeSend:function () {
                $(".zhao").show();
                $("#add").hide();
                $(".history").hide();
            },
            success: function (val) {
                $(".zhao").hide();
                let arr = val.result.list;
                arr1=arr1.concat(arr);
                if(!arr){
                    return;
                }
                let str = "";
                arr.forEach(function (val, ind) {
                    val.pic=val.pic.replace("http","https");
                    if (!val.pic) {
                        str += `
                                <li><a href="xiangqing.html">
                                    <div class="title">${val.title}</div>
                                    <div class="message">
                                    <div class="from"><span>${val.src}</span></div>
                                    <div class="time">${val.time}</div>
                                       
                                       
                                    </div>
                                    </a>
                                  </li>`
                    } else {
                        str += `<li class="mark"><a href="xiangqing.html">
                                <div class="left">
                                    <div class="leftBox">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                </div>
                                <div class="right">${val.title}</div>
                                <div class="bottom">
                                <div class="from"><span>${val.src}</span></div>
                                    <div class="time">${val.time}</div>
                                </div>
                                </a>
                                </li>`
                    }
                });
                $("#main").html(function (index, html) {
                    return html + str;
                });
            }
        })
    })
})