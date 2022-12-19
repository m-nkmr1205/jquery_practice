$(function(){
  // 選択肢を変更した時に
  $(".select-box").on("change",function(){
    // 選択肢されたvalue値を取得
    const val = $(this).val();
    // 拾ってくるフードリストの範囲を取得
    const list = $(".food-list li");
    // valがallであれば取得したフードリストを表示
    "all" === val ? list.show() :
    // valがall以外である場合下記のフープ処理を実行
    $.each(list, function(e, a){
      // フードリストのカテゴリーを取得
      const category = $(a).data("category-type");
      // valとカテゴリーが同じだったら表示、違ければ非表示
      val === category ? $(a).show() : $(a).hide()
    });
  });
});