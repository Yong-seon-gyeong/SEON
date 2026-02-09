// tab
function openTab(tabName) {
  document.querySelectorAll('.tab, .tabs').forEach(function (el) {
    el.classList.remove('on');
  });
  document.getElementById(tabName).classList.add('on');
  document.querySelector('.tabs[onclick="openTab(\'' + tabName + '\')"]').classList.add('on');
}

//  counter
if ($('.single-counter').length) { // 1번: .single-counter가 페이지에 있는지 확인
    $('.counter').counterUp({      // 2번: .counter 클래스를 가진 요소들에 기능 부여
      delay: 10,
      time: 1000
    });

}

//scroll_top_btn
$('.scroll_top').hide();
$(window).scroll(function(){
    var height = $(window).scrollTop();
    if(height >200){
        $('.scroll_top').fadeIn(0)
    }
    else{
        $('.scroll_top').fadeOut(0);
    }
});
$('.scroll_top').click(function(){
    $(window).scrollTop(0) ;
});
