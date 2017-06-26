$(function(){
    // 通过隐藏域发送回复信息
    // 自身页面已经包含movie.id和from.id
    // 这里需要发送to.id和被回复的comment.id
    $('.comment').on('click', function(e){
        let target = $(this);
        let toId = target.data('tid');
        let commentId = target.data('cid');
        console.log(target.data);
        // 回复对象的id
        // 回复对象的id是否已经存在
        // 有则使用覆盖原值
        // 无则创建新隐藏域
        if($('#toId').length > 0) {
            $('#toId').val(toId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm');
        }
        // 回复内容的id
        // 回复内容的id是否已经存在
        // 有则使用覆盖原值
        // 无则创建新隐藏域
        if($('#commentId').length > 0) {
            $('#commentId').val(commentId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm');
        }
    });
})
