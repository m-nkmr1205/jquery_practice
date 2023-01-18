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
  let previousVal = "";

  // 検索ボタンをクリックした時に発火
  $(".search-btn").on("click", function(){
    const searchWord =  $("#search-input").val() //検索ワードを格納

    // 検索ワードが同じ時と違う時の条件分岐
    if(searchWord === previousVal){ //今回検索ワードと前回検索ワードが同じ場合
      pageCount += 1;
    } else { //検索ワードが前回と違った場合
      pageCount = 1;
      previousVal = searchWord;  //今回の検索ワードをグローバル変数に置き換え。
      $('ul').empty()  //検索ワードが違う場合は前回の検索結果を削除する。
    }

    const settings = {
      "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      "method": "GET",
    }

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
    $(".message").remove();  //エラー・検索結果無しの時のメッセージがあれば削除する

    //if文でresultがあった時と無かった時で条件分岐する
    if(result){  //resultがあった時の処理

      // 「forEach()」を使ってresultにある要素の数だけ繰り返し処理を実行
      result.forEach((value) => {
        const title = value.title ? value.title : 'タイトル不明'
        const creator = value['dc:creator'] ? value['dc:creator'] : '作者不明'
        const publisher = value['dc:publisher'] ? value ['dc:publisher'] : '出版社不明'
        const info = value.link['@id'] ? value.link['@id'] :'書籍情報不明'

      　 // prepend()メソッド、指定の要素の先頭に子要素を追加
        // 検索結果を表示するHTML要素を追加
        $('.lists').prepend('<li class="lists-item"><div class="list-inner"><p class="title">タイトル：' + title + '</p><p class="creator">作者：' + creator + '</p><p class="publisher">出版社：' + publisher + '</p><a href=' + info + ' class="info" target="_blank">書籍情報</a></div></li>')
      })

     //resultが無かった時の処理
    } else {
      $('.inner').prepend('<div class="message" >検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>')
    };
  }; //displayResultここまで

  // ajaxの読み込みに失敗した時の処理(検索ワードが空の時)
  function displayError(err){
    $(".list-inner").remove();  //前回の検索結果を削除
    $(".message").remove();
    console.log(err)
    let status = err.status  //ステータス番号を取得

    // ステータス番号が0の時はメッセージを表示させる。
    if(status === 0){
      $('.inner').prepend('<div class="message" >正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>')
    } else if(status === 400) {
      $('.inner').prepend('<div class="message" >検索ワードが入力されていません<br>1文字以上入力してください。</div>')
    }else {
      $('.inner').prepend('<div class="message" >予期せぬエラーが発生しました<br>再読み込みを行なってください。</div>')
    };

  }; //ajaxの読み込みに失敗した時の処理(検索ワードが空の時)ここまで

  // リセットボタンのクリックイベント
  $(".reset-btn").on("click", function(){
    $(".lists").empty();  //検索結果の要素の中身を削除する
    $(".message").remove();  //エラーメッセージ等は要素ごと削除
    $("#search-input").val('')  //検索ワードを空にする
    pageCount = 1;
    previousVal = "";
  }); //リセットボタンここまで

}); //最後の閉じタグ
