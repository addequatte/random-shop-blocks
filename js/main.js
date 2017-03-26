var a = 0;
var b = 6;
var target = false;
var item = 0;
var size;
var width = 0;
 var color = [
        'green',
        'red',
        'yellow',
        'blue',
        'purple',
        'silver'
        ];
var market = [
    '<div class="block jacket" data-target="jacket">'+
    '<h3 class="item-name" data-target="Куртка">Куртка</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>',
    '<div class="block tshirt" data-target="tshirt">'+
    '<h3 class="item-name" data-target="Футболка">Футболка</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>',
    '<div class="block shoes" data-target="shoes">'+
    '<h3 class="item-name" data-target="Ботинки">Ботинки</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>',
    '<div class="block dress" data-target="dress">'+
    '<h3 class="item-name" data-target="Платье">Платье</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>',
    '<div class="block trousers" data-target="trousers">'+
    '<h3 class="item-name" data-target="Штаны">Штаны</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>',
    '<div class="block hat" data-target="hat">'+
    '<h3 class="item-name" data-target="Шляпа">Шляпа</h3>'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'];
$(function () {
	initDrow();
	$('header button').on('click',function () {
        $('header button').not(this).removeClass('current');
		$(this).addClass('current');
	  if (navigator.userAgent.search(/Firefox/) > 0)
		$('html').animate({
		  'scrollTop': 0
		}, 800);
	  else
		$('html body').animate({
		  'scrollTop': 0
		}, 800);
		$('html body').animate({'scrollTop': 0},800);
		var t = $(this).attr('data-target');
		$('.block').not('#busket .block').fadeOut(800);
		setTimeout(function () {
			$('.block').not('#busket .block').remove();
			$('.group').remove();
			b = 0;
			a = t;
			target = true;
			if(t == 'all'){a = 0; b = 6; target = false}
			initDrow();
		},800,t);
	});
	$(document).on('click','.block .add',function () {
		$('.cart-count').html(parseInt($('.cart-count').html()) + 1);
		$(this).prev().prev().css('filter','blur(30px)');
        $(this).removeClass('add').addClass('delete');
		$(this).html('<b class="price">'+$(this).children().html()+'</b>Убрать');
		$('body').append('<div class="add-text">Товар Добавлен</div>');
		$('.add-text').animate({'fontSize':'250px','opacity':'0'},500,function () {
			$(this).remove();
        });
		$(this).parent().clone().appendTo($('#busket .line-row'));
        $('#busket .block').css({'margin':'1vw','margin-top':'1vw','margin-bottom':'1vw'}).removeClass('big').addClass('small');
        $('#busket .block img').css('filter','blur(0px)');
		$('.cart b').html(parseInt($('.cart b').html()) + parseInt($(this).attr('data-price')));
		$(this).remove();
    });
    $(document).on('click','.block .delete',function () {
        var id = $(this).parent().attr('data-id');
        var price = $(this).attr('data-price');
        $('.cart-count').html(parseInt($('.cart-count').html()) - 1);
        $(this).removeClass('delete').addClass('add');
        $(this).parent().remove();
        $(this).html('<b class="price">'+$(this).children().html()+'</b>Добавить');
        $('body').append('<div class="add-text">Товар Убран</div>');
        $('.add-text').animate({'fontSize':'250px','opacity':'0'},500,function () {
            $(this).remove();
        });
        $('.cart b').html(parseInt($('.cart b').html()) - parseInt($(this).attr('data-price')));
        $('.block[data-id="'+id+'"]').append('<button class="add" data-price="'+price+'"><b class="price">'+price+' Pуб.</b>Добавить</button>');
        $('.block[data-id="'+id+'"] img').css('filter','blur(0px)');

    });
    $('.cart').on('click',function () {
       $('#busket').slideToggle(500);
       $('.cover-back').toggleClass('over')
    });
});
function drowBlocks(a,b,target) {
	if(target)
	{
        item = parseInt(Math.random()*b + a);
		size = parseInt(Math.random()*2) == 0 ? 'small' : 'big';
	}
    else
    	{
			item = parseInt(Math.random()*(a + b));
			size = parseInt(Math.random()*2) == 0 ? 'small' : 'big';
		}
    if(width == 5)
        size = 'small';
    if(size == 'big')
        width +=2;
    else
        width +=1;
    if(width == 0)
        $('#content').append('<div class="content-row"></div>');
    if(size == 'small')
    {
        $('#content').append('<div class="group">'+market[item]+market[item]+'</div>');
        $('.block').last().addClass(size).css('margin-bottom',0);
        $('.block').last().prev().addClass(size).css('margin-top',0);
	}
    else
    	{
            $('#content').append(market[item]);
            $('.block').last().addClass(size);
		}
    if(width > 5)
        width = 0;
}
function initDrow() {
    for(i=0;i<50;i++){
        drowBlocks(a,b,target);
        if(i == 49 && width != 0){
            for(n = width+1;n < 7 ;n++)
            {
                drowBlocks(a,b,target);
                if(size == 'big')
                    n = n+1;
            }
        }
    }
    $('.block').not('#busket .block').each(function () {
        var id = parseInt(Math.random()*99999 + 10000);
        $(this).attr('data-id',id);
        $(this).prepend('<img src="images/'+$(this).attr('data-target')+'('+parseInt(Math.random()*10 + 1)+').svg"/>');
        $(this).children('h3').html($(this).children('h3').attr('data-target')+' № '+id);
        $(this).addClass(color[parseInt(Math.random()*6)]) ;
    });
    $('.price').not('#busket .price').each(function () {
        var price = parseInt(Math.random()*5000 + 500);
        $(this).html(price+' Pуб.');
        $(this).parent().attr('data-price',price);
    });
    $('.block h3').not('#busket .block h3').each(function () {
        $(this).html($(this).attr('data-target')+' № '+parseInt(Math.random()*99999 + 10000))
    });
    setTimeout(function(){$('.block').fadeTo(800,1)},200);
    width = 0;
    $('.block button').not('#busket .block button').each(function () {
       var d = parseInt(Math.random()*8);
       if(d == 0)
       {
           $(this).removeClass('add').addClass('nothave');
           $(this).html('<b class="price">'+$(this).children().html()+'</b>Закончился');
       }
    });
}