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
  // 検索結果を表示する関数
  function displayResult(result) {
    // for分を使って繰り返し処理実行
    // 書き方→for(初期値; 条件式; 増減式) {処理の実装}
   for (let i = 0; i < 20; i++){
    // resultから必要なデータを格納
    const title = result[i]['title'];
    const creator = result[i]['dc:creator'];
    const publisher = result[i]['dc:publisher'];
    const info = result[i]['link']['@id'];

    // prepend()メソッド、指定の要素の先頭に子要素を追加
    // append()メソッド、指定した要素内の最後に子要素を追加
    $('.lists').prepend('<li class="lists-item"></li>')
    $('.lists-item').append('<div class="list-inner"></div>')
    $('.list-inner').append('<p class="title"></p>')
    $('.list-inner').append('<p class="creator"></p>')
    $('.list-inner').append('<p class="publisher"></p>')
    $('.list-inner').append('<a class="info"></a>')
    $('.list-item').remove();
    // 結果を表示すする
    $('.title').text("タイトル：" + title);
    $('.creator').text("作者：" + creator);
    $('.publisher').text("出版社：" + publisher);
    $('.info').text(info);
   }
  };

  // ajaxの読み込みに失敗した時の処理
  function displayError(err){
    console.log("エラー")
  };

  // 検索ボタンをクリックした時に発火
  $(".search-btn").on("click", function(){
    const searchWord = { title: $("#search-input").val()} //検索ワードを格納
    const pageCount = 1
    const settings = {
      "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      "method": "GET",
      // "appid": "hE1FbEOqrJTjrAKW2sQF" 
    }

    //.doneが通信成功した時の処理、”response”が引数となっていて通信した結果を受け取っている
    $.ajax(settings).done(function (response) {
      const result = response['@graph'][0]['items'];
      displayResult(result)
      console.log(result)
      //.failが通信に失敗した時の処理、”err”にサーバーから送られてきたエラー内容を受けとる。
      }).fail(function (err) {
        displayError(err)
    });

  }); //クリックイベント閉じタグ
}); //最後の閉じタグ
