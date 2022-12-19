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

  //メニュー以外の部分をクリックした時にメニューを閉じる
  $(".drawer_bg").on("click", function(){
    $(".open").toggleClass("open");  //メニューリストの表示非表示切り替え
    $(".drawer_button").toggleClass("active");  //メニューボタンの表示非表示切り替え
    $(".drawer_bg").fadeToggle();  //フェードの表示/非表示切り替え
  });

});