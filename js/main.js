var a = 2;
var b = 3;
var target = false;
var item = 0;
var size;
var width = 0;
 var color = [
        'green',
        'red',
        'yellow',
        'blue'
        ];
var market = [
    '<div class="block jacket" data-target="jacket">'+
    '<div class="meta">'+
    '<h3 class="item-name" data-target="Куртка">Куртка</h3>'+
    '<div class="flex">'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'+
    '</div>'+
    '</div>',
    '<div class="block tshirt" data-target="tshirt">'+
	'<div class="meta">'+
    '<h3 class="item-name" data-target="Футболка">Футболка</h3>'+
    '<div class="flex">'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'+
    '</div>'+
    '</div>',
    '<div class="block shoes" data-target="shoes">'+
    '<div class="meta">'+
    '<h3 class="item-name" data-target="Ботинки">Ботинки</h3>'+
    '<div class="flex">'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'+
    '</div>'+
    '</div>',
    '<div class="block dress" data-target="dress">'+
    '<div class="meta">'+
    '<h3 class="item-name" data-target="Платье">Платье</h3>'+
    '<div class="flex">'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'+
    '</div>'+
    '</div>',
    '<div class="block trousers" data-target="trousers">'+
    '<div class="meta">'+
    '<h3 class="item-name" data-target="Штаны">Штаны</h3>'+
    '<div class="flex">'+
    '<button class="add"><b class="price"></b>Добавить</button></div>'+
    '</div>'+
    '</div>'];
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
		$('.block').fadeOut(800);
		setTimeout(function () {
			$('.block').remove();
			$('.group').remove();
			b = 0;
			a = t;
			target = true;
			if(t == 'all'){a = 3; b = 2; target = false}
			initDrow();
		},800,t);
	});
	$(document).on('click','.block .add',function () {
		$('.cart-count').html(parseInt($('.cart-count').html()) + 1);
		$(this).removeClass('add').addClass('delete');
		$(this).html('<b class="price">'+$(this).children().html()+'</b>Убрать');
		$('body').append('<div class="add-text">Товар Добавлен</div>');
		$('.add-text').animate({'fontSize':'250px','opacity':'0'},500,function () {
			$(this).remove();
        });
    });
    $(document).on('click','.block .delete',function () {
        $('.cart-count').html(parseInt($('.cart-count').html()) - 1);
        $(this).removeClass('delete').addClass('add');
        $(this).html('<b class="price">'+$(this).children().html()+'</b>Добавить');
        $('body').append('<div class="add-text">Товар Убран</div>');
        $('.add-text').animate({'fontSize':'250px','opacity':'0'},500,function () {
            $(this).remove();
        });
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
    if(width == 7)
        size = 'small';
    if(size == 'big')
        width +=2;
    else
        width +=1;
    if(size == 'small')
    {
        $('#content').append('<div class="group">'+market[item]+market[item]+'</div>');
        $('.block').last().addClass(size);
        $('.block').last().prev().addClass(size);
	}
    else
    	{
            $('#content').append(market[item]);
            $('.block').last().addClass(size);
		}
    if(width > 7)
        width = 0;
}
function initDrow() {
    for(i=0;i<60;i++){
        drowBlocks(a,b,target);
        if(i == 59 && width != 0){
            for(n = width+1;n < 9 ;n++)
            {
                drowBlocks(a,b,target);
                if(size == 'big')
                    n = n+1;
            }
        }
    }
    $('.block').each(function () {
        $(this).prepend('<img src="images/'+$(this).attr('data-target')+'('+parseInt(Math.random()*10 + 1)+').svg"/>')
    });
    $('.price').each(function () {
        $(this).html(parseInt(Math.random()*5000 + 500)+' Pуб.')
    });
    $('.meta h3').each(function () {
        $(this).html($(this).attr('data-target')+' № '+parseInt(Math.random()*99999 + 10000))
    });
    setTimeout(function(){$('.block').fadeTo(800,1)},200);
    width = 0;
    $('.block button').each(function () {
       var d = parseInt(Math.random()*8);
       if(d == 0)
       {
           $(this).removeClass('add').addClass('nothave');
           $(this).html('<b class="price">'+$(this).children().html()+'</b>Закончился');
       }
    });
    $('.block').each(function () {
       $(this).addClass(color[parseInt(Math.random()*4)]) ;
    });
}