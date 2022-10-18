$(function(){
  // メニューホバー時に
  $(".dropdwn li").hover(function(){
    //メニューの子要素であるドロップダウンメニューを表示（slideDown）する
    $(this).children("ul").slideDown();
  },
  // ホバーが外れた時ドロップダウンメニューを非表示（slideUp）する
  function(){
    $(this).children("ul").slideUp();
  });
});



