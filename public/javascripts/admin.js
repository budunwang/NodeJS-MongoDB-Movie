$(function(){
    $('.del').click(function(e) {
        let id = $(e.target).data('id');
        let tr = $('.item-id-' + id);

        //检查list是否存在
        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/list?id=' + id
        }).done((result) => {
            //如果电影id存在，从列表中删除该电影
            if(result.success === 1 && tr.length > 0) {
                tr.remove();
            }
        })
    })
});