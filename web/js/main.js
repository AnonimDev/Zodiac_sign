var y;
var m;
var d;

function trw(d, m, y) {
    $.ajax({
        type: "POST",
        url: 'ajax',
        data: {
            d: d,
            m: m,
            y: y
        },
        dataType: 'JSON',
        success: function (data) {
            alerting(data.status, data.text);
        }
    });
}

function alerting(status, data) {

    if (status === 200){
        $('.rez').html('<div class="alert alert-success" role="alert">' + data + '</div>');
    }
    if (status === 400){
        $('.rez').append('<div class="alert alert-danger" role="alert">' + data + '</div>');
    }
    setTimeout(function () {
        $('.alert-danger')[0].remove();
        //$($('.alert')[0]).fadeOut(300, function () { $(this).remove(); });
    }, 5000);
}
function changeOption() {
    $('select.y').change(function () {
        y = $(this).val();
        if (m != undefined) prov();
    });
    $('select.m').change(function () {
        m = $(this).val();
        if (y != undefined) prov();
    });
}
function prov() {
    var d_max = getLastDayOfMonth(y, m - 1);
    addOptionDay(d_max);
}
function getLastDayOfMonth(year, month) {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
}
function addOptionDay(d_max) {
    var d_min = 1;
    $('select.d').html('');
    for ( d_min; d_min <= d_max; d_min++){
        $('select.d').append('<option value=' + d_min + '>' + d_min + '</option>');
    }
}
function addOption() {
    var date = new Date();
    var mouth = {
        1 :  'январь',
        2 : 'февраль',
        3 :    'март',
        4 :  'апрель',
        5 :     'май',
        6 :    'июнь',
        7 :    'июль',
        8 :  'август',
        9 :'сентябрь',
        10: 'октябрь',
        11:  'ноябрь',
        12: 'декабрь'
    };

    var y = date.getFullYear();
    for ( y; y >= 1900; y--){
        $('select.y').append('<option value=' + y + '>' + y + '</option>');
    }
    for (var i in mouth){
        $('select.m').append('<option value=' + i + '>' + mouth[i] + '</option>');
    }
}

function clk() {
    $('.btn').click( function () {
        trw($('.d').val(), $('.m').val(), $('.y').val());
    });
}
function q() {
    var q = 1;
    for (var e = 10; e >= 1; e--){
        console.log((' '.repeat(e-1)) + ('+'.repeat(q)));
        q = q+2;
    }
}


$(document).ready( function () {
    q();
    changeOption();
    addOption();
    clk();
});