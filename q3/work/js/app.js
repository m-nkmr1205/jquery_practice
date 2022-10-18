$(function(){
  // メニューボタンをクリックした時に
  $(".drawer_button").on("click", function(){
    // メニューボタンにactiveクラスを付与
    $(this).toggleClass("active");
    // メニューリスト,背景の表示/非表示を交互に行う
    $(".drawer_bg").fadeToggle();
    // メニューリストにopenクラスを付与
    $(".drawer_nav_wrapper").toggleClass("open")
  });

});