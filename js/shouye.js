$(function () {
    // 获取滚动轴
    myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false
    });

    function render(type, repaint=true, start=0) {
        $.ajax({
            url: 'http://api.jisuapi.com/news/get?channel=' + type + '&start=' + start + '&num=10&appkey=2b36cf368ec87b81',
            dataType: 'jsonP',
            beforeSend:function () {
                $(".zhao").show();
                $("#add").hide();
            },
            success: function (res) {
                $(".zhao").hide();
                $("#add").show();
                let arr = res.result.list;
                let str = '';
                arr.forEach(function (val) {
                    if (val.pic == '') {
                        str += `
                        <li class="list nopic">
                            <a href="${val.url}">
                                <div>${val.title}</div>
                                <span>${val.time}</span>
                            </a>
                        </li>
                        `
                    } else {
                        str += `
                        <li class="list">
                            <a href="${val.url}">
                                <div class="left"><img src="${val.pic}" alt=""></div>
                                <div class="right">${val.title}
                                  <span>${val.time}</span>
                                </div>
                            </a>
                        </li>
                        `
                    }
                })
                if (repaint) {
                    $('.content').html(str);
                } else {
                    $('.content').html($('.content').html() + str);
                }
            }
        })

    }

    //获取新闻模块（分类）
    $.ajax({
        url: 'http://api.jisuapi.com/news/channel?appkey=2b36cf368ec87b81',
        dataType: 'jsonP',
        success: function (res) {
            let arr = res.result;
            let str = '';
            arr.forEach(function(val,index) {
                if(index == 0){
                str += `<li class="active">${val}</li>`;
            }else{
                str += `<li>${val}</li>`;
            }
        });
            $('#scroller ul').html(str);
            render($('.active').text());
        }
    });
//    事件委派，添加点击事件，点击那个标题，换哪个内容，通过父元素委派到li身上
    $('#scroller').on('click', 'li', function () {
        if ($(this).hasClass('.active')) {
            return;
        }
        $(this).siblings().removeClass().end().addClass('active');
        /*this当前点击的元素，siblings查找同辈li，将其他的类名移除，返回上一次操作之前，也就是他自己，再添加类名*/
        let text = $(this).html();
        render(text);
    });
    $('#add').click(function () {
        render($('#scroller ul li.active').html(), false, $('.content').children('li').length);
    })


})