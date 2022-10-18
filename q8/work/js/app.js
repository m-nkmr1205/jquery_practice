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
  $(".search-btn").on("click", function(){
    const searchWord = { title: $("#search-input").val()} //検索ワードを格納
    const pageCount = 1
    const settings = {
      "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      "method": "GET",
    }
    function displayResult(r) {
      $('.lists').prepend('<p class="list-inner"></p>')
      $('.list-inner').append('<p>タイトル: </p>')
      $('.list-inner').append('<p>作者:</p>')
      $('.list-inner').append('<p>出版社:</p>')
      $('.list-inner').append('<a href="#" >書籍情報</a>')
    }
    
   
    //.doneが通信成功した時の処理、”response”が引数となっていて通信した結果を受け取っている
    $.ajax(settings).done(function (response) {
      const result = response['@graph'];
      displayResult(result)
      console.log(result)


      //.failが通信に失敗した時の処理、”err”にサーバーから送られてきたエラー内容を受けとる。
      }).fail(function (err) {
        displayError(err)
    });

  }); //クリックイベント閉じタグ
}); //最後の閉じタグ