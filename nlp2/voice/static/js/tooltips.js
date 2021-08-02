// --------
// TOOLTIPS
// --------

$(function () {
    
    $('[data-toggle="tooltip"]').tooltip({
        animation: true,
        delay: {show: 100, hide: 0}
    }); 

    $('[data-toggle="tooltip"]').on('click', function(){
        $('[data-toggle="tooltip"]').tooltip('hide');
        $('.show[data-toggle="tooltip"]').tooltip('hide');
    });

    $('[data-toggle="tooltip"]').on('mouseleave', function(){
        $('[data-toggle="tooltip"]').tooltip('hide');
        $('.show[data-toggle="tooltip"]').tooltip('hide');
    });

    $(document).on('shown.bs.tooltip', function (e) {
        setTimeout(function () {
            $(e.target).tooltip('hide');
        }, 2000);
    });
    
});