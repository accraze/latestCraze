$(document).ready(function() {
    
    $("[data-toggle='modal']").click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        
        $('#modal').load(url,function(){
            $('#modal').modal('show');
        });
    });
    
    $(document).on('click', "i", function(e) {
        var remId = $(this).attr('remId');
        if (remId) {$.post('/cart/rem/' + remId, function(data) {
            //$('#cart').html(data);
            location.reload();
        });}
        e.preventDefault();
        e.stopPropagation();
    });
    
});