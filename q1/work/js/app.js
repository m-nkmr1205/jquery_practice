$(function(){
  // q1を読み込んだ時にjs発火
  $("#q1").ready(function(){
    // q1ボタンの文字を緑にする
    $("#q1").css("color", "green");
  });
  
  // q2ボタンをクリック時にjs発火
  $("#q2").on("click", function(){
    // q2ボタンの背景の色を変える
    $(this).css("background", "pink");
  });

  // q3ボタンをクリック時にjs発火
  $("#q3").on("click", function(){
    // q3ボタンが3秒かけてフェードアウトする
    $(this).fadeOut(3000);
  });

  // q4ボタンをクリック時にjs発火
  $("#q4").on("click", function(){
    // q4ボタンサイズが拡大される
    $(this).addClass("large");
  });

  // q5ボタンをクリックした時にjs発火
  $("#q5").on("click", function(){
    // DOMを挿入する
    // 指定した要素の直前に追加
    $(this).before("<span>DOMの前</span>");
    // 指定した要素の最初に追加
    $(this).prepend("<span>DOMの中の前</span>");
    // 指定した要素の最後に追加
    $(this).append("<span>DOMの中の後</span>");
    // 指定した要素の直後に追加
    $(this).after("<span>DOMの後ろ</span>");
  });

  // q6ボタンをクリックした時にjs発火
  $("#q6").on("click", function(){
    // 左の余白と上の余白を取る事で要素を斜め右に2秒かけて移動
    $(this).animate({"marginLeft": 100, "marginTop": 100}, 2000);
  });

  // q7ボタンをクリックした時にjs発火
  $("#q7").on("click", function(){
    // IDのノードを取得
    const q7 = document.getElementById("q7");
    // コンソールに取得したIDノードを表示する
    console.log(q7)
  });

  // q8ボタンにホバー時にjs発火
  $("#q8").hover(
    function(){
      // ホバー時にlargeクラスを追加しボタンサイズを拡大する
      $(this).addClass("large");
    },
    // マウスカーソルがボタンから離れた時の処理
    function() {
      // largeクラスを削除しボタンサイズを元に戻す
      $(this).removeClass('large');
    }
    );


  // q9ボタンをクリックした時にjs発火
  $("#q9 li").on("click", function() {
    // liの要素のインデックス番号を取得する変数を宣言
    const index = $("#q9 li").index(this);
    // アラートでインデックス番号を表示
    alert(index);
  });

  // q10ボタンをクリックした時にjs発火
  $("#q10 li").on("click", function() {
    // q10のインデックス番号を取得する関数を宣言
    const index = $("#q10 li").index(this);
    // q10と同じインデックス番号のq11要素を操作する
    $("#q11 li").eq(index).css({
      "width" : 300,
      "font-size" : 30
    });
  });
});
