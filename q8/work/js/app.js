// API
// const settings = {
//   "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
//   "method": "GET",
// }
// $.ajax(settings).done(function (response) {
//   const result = response['@graph'];
//   displayResult(result)
// }).fail(function (err) {
//   displayError(err)
// });



$(function(){
  let pageCount = 1;
   //グローバル変数として前回値を持たせる。検索ワードを前回と比較した時に変数の置き換え処理を行う。
  let previousVal = $("#search-input").val(null)

  // 検索ボタンをクリックした時に発火
  $(".search-btn").on("click", function(){
    const searchWord =  $("#search-input").val() //検索ワードを格納

    // 検索ワードが同じ時と違う時の条件分岐
    if(searchWord === previousVal){
      pageCount += 1;
    } else {
      pageCount = 1;
      previousVal = searchWord;  //今回の検索ワードをグローバル変数に置き換え
      $('ul').empty()  //検索ワードが違う場合は前回の検索結果を削除する。
    }

    const settings = {
      "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      "method": "GET",
    }
    $(".message").remove();  //エラー・検索結果無しの時のメッセージがあれば削除する

    //.doneが通信成功した時の処理、”response”が引数となっていて通信した結果を受け取っている
    $.ajax(settings).done(function (response) {
      const result = response['@graph'][0].items;

      //通信が成功した時の処理(検索結果があった場合、無かった場合のメッセージを表示)
      //引数にレスポンス結果を持たせる。
      displayResult(result)

      //.failが通信に失敗した時の処理、”err”にサーバーから送られてきたエラー内容を受けとる。
      }).fail(function (err) {
        displayError(err)
      });
      //ajaxの処理ここまで
    }); //検索ボタンのクリックイベントここまで

  // 検索結果を表示する関数。displayResultここから
  function displayResult(result) {
    //resultがあった時と無かった時で条件分岐する
    if(result){
      // for分を使って繰り返し処理実行。
      // 書き方→for(初期値; 条件式; 増減式) {処理の実装}
      for (var i = 0; result[i]; i++){
        // resultから必要なデータを格納。 変数[i]を指定する事でresultの配列番号を指定
        const title = result[i].title;
        const creator = result[i]['dc:creator'] 
        const publisher = result[i]['dc:publisher'] 
        const info = result[i].link['@id'] 

        // const title = result[i] ? result[i].title : $('.title').removeClass();
        // const creator = result[i] ? result[i]['dc:creator'] : null
        // const publisher = result[i]? result[i]['dc:publisher'] : null
        // const info = result[i] ? result[i].link['@id'] : null

        // prepend()メソッド、指定の要素の先頭に子要素を追加
        // 検索結果を表示するHTML要素を追加
        $('.lists').prepend('<li class="lists-item"><div class="list-inner" id="list-inner"><p class="title" id="title" >タイトル：' + title + '</p><p class="creator" id="creator" >作者：' + creator + '</p><p class="publisher" id="publisher" >出版社：' + publisher + '</p><a href=' + info + ' class="info" id="info" target="_blank">書籍情報</a></div></li>')
        // 表示結果を左寄せする
        $('.list-inner').css("text-align", "left")

        //繰り返し処理によって同じClass名が複数存在するとDomの特定が難しいため、毎回class名を一旦削除する。
        $('.title').removeClass();
        $('.creator').removeClass();
        $('.publisher').removeClass();
        $('.info').removeClass();
        } //for文ここまで

     //resultが無かった時の処理
    } else {
      $('.inner').prepend('<div class="message" >検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>')
    };
  }; //displayResultここまで

  // ajaxの読み込みに失敗した時の処理(検索ワードが空の時)
  function displayError(err){
    $(".list-inner").remove();  //前回の検索結果を削除
    $('.inner').prepend('<div class="message" >検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>')
  };

  // リセットボタンのクリックイベント
  $(".reset-btn").on("click", function(){
    $(".lists").empty();  //検索結果の要素の中身を削除する
    $(".message").remove();  //エラーメッセージ等は要素ごと削除
    $("#search-input").val('')  //検索ワードを空にする
  }); //リセットボタンここまで

}); //最後の閉じタグ
