$(function(){
  // navタグをクリックした時に
  $(".nav-item").on("click",function(){
    // クリックされたタブのインデックス番号を取得
    const index = $(".nav li").index(this)
  // クリックされたタブと同じインデックス番号のコンテンツを指定
  // 同じインデックス番号のコンテンツは表示、それ以外は非表示にする
   $(".description li").hide().eq(index).show();
  });
});