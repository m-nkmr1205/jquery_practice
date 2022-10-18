$(function() {
  // 各要素を変数に置き換え
  const open = $(".modal_open_button"),
        close = $(".modal_close_button"),
        container = $(".modal_win");

  // openボタンをクリックした時に発火
  open.on("click",function(){
    // モーダルウィンドウを表示させる
    $(container).fadeIn();
  });

  // ×をクリックした時に発火
  close.on("click", function(){
    // モーダルウィンドウを表示を消す
    $(container).fadeOut();
  })

});