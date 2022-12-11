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
  let previousVal = $("#search-input").val() // 読み込み時に処理されるので値が入らない
 
  // 関数を使って前回値であるsearchWordを渡す？
  // スコープの関係でpreviousValは外から参照できない。
  // function word(sw){
  //   previousVal = sw;
  //  console.log(previousVal)
  // };

  // 検索結果を表示する関数
  function displayResult(result) {
    // for分を使って繰り返し処理実行。
    // 書き方→for(初期値; 条件式; 増減式) {処理の実装}
   for (var i = 0; i < 20; i++){
    // resultから必要なデータを格納。 変数[i]を指定する事でresultの配列番号を指定
    const title = result[i]['title'];
    const creator = result[i]['dc:creator'];
    const publisher = result[i]['dc:publisher'];
    const info = result[i]['link']['@id'];

    // prepend()メソッド、指定の要素の先頭に子要素を追加
    // 検索結果を表示するHTML要素を追加
    $('.lists').prepend('<li class="lists-item"><div class="list-inner" id="list-inner"><p class="title" id="title" ></p><p class="creator" id="creator" ></p><p class="publisher" id="publisher" ></p><a class="info" id="info">書籍情報</a></div></li>')
    // 表示結果を左寄せする
    $('.list-inner').css("text-align", "left")

    // 結果を表示すする
    //IDでセレクタを指定すると同じIDが複数出来てしまうので使用不可。IDは1ページに1つのみ。
    $('.title').text("タイトル：" + title);
    $('.creator').text("作者：" + creator);
    $('.publisher').text("出版社：" + publisher);
    // attr()を使用する事で属性を操作可能。書き方→対象要素.attr( { 属性:'値', 属性:'値', 属性:'値',..})
    // href属性を追加してリンクを設定
    $('.info').attr({href: info});

    //繰り返し処理によって同じClass名が複数存在するとDomの特定が難しいため、毎回class名を一旦削除する。
    $('.title').removeClass();
    $('.creator').removeClass();
    $('.publisher').removeClass();
    $('.info').removeClass();

    } //for文ここまで
  }; //displayResultここまで


  // ajaxの読み込みに失敗した時の処理(検索ワードが空の時)
  function displayError(err){
    $('.inner').prepend('<div class="message" >検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>')
  };

//検索結果が無かった時の処理
  function message(){
    console.log("検索結果が見つかりませんでした")
    $('.inner').prepend('<div class="message" >検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>')
  };

  // 検索ボタンをクリックした時に発火
  $(".search-btn").on("click", function(){
    const searchWord =  $("#search-input").val() //検索ワードを格納
    const settings = {
      "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      "method": "GET",
    }
 

    //.doneが通信成功した時の処理、”response”が引数となっていて通信した結果を受け取っている
    $.ajax(settings).done(function (response) {
      const result = response['@graph'][0]['items'];

      // 検索ワードが同じ時と違う時の条件分岐
      if(searchWord == previousVal){
        console.log('前回と同じ時')
        console.log(previousVal)
      } else {
        pageCount = 1;
        $('ul').empty()  //検索ワードが違う場合は前回の検索結果を削除する。
        console.log('前回と違う時')
        console.log(previousVal)
      }

      // 検索結果があった場合と無かった場合で条件分岐し結果の表示を変える
      if(result){
        displayResult(result)
      } else {
          message()
      };

      //.failが通信に失敗した時の処理、”err”にサーバーから送られてきたエラー内容を受けとる。
      }).fail(function (err) {
        displayError(err)
      });
      // word(searchWord)
    }); //検索ボタン、クリックイベントここまで

  // リセットボタンのクリックイベント
  $(".reset-btn").on("click", function(){
    $(".inner").detach();  //検索結果を削除
    $("#search-input").val('')  //検索ワードを空にする
  }); //リセットボタンここまで

}); //最後の閉じタグ
