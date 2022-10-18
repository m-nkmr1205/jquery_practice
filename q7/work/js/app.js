$(function(){
  $(".btn__submit").on("click", function(){
    // テキストボックス　名字
    console.log("名字");
    console.log($("#family__name").val());

    // テキストボックス　名前
    console.log("名前");
    console.log($("#given__name").val());

    // セレクトメニュー　生年月日
    console.log("生年月日");
    console.log($(".year").val() + "年" + $(".month").val() + "月" + $(".day").val() + "日");

    // チェックボックス　性別
    console.log("性別");
    console.log($(".gender__content:checked").val());
  
    // セレクトメニュー　職業
    console.log("職業");
    console.log($(".occupation").val());

    // テキストボックス　アカウント名
    console.log("アカウント名");
    console.log($("#account__name").val());

    // テキストボックス　メールアドレス
    console.log("メールアドレス");
    console.log($("#email").val());

    // テキストボックス　パスワード
    console.log("パスワード");
    console.log($("#password").val());

    // テキストボックス　確認用パスワード
    console.log("確認用パスワード");
    console.log($("#duplication__password").val());

    // テキストボックス　住所
    console.log("住所");
    console.log($("#address").val());

    // テキストボックス　電話番号
    console.log("電話番号");
    console.log($("#tel").val());

    // チェックボックス(複数選択)　購買情報
    console.log("購買情報");
    $(".subscription__checkbox:checked").each(function() {
      console.log($(this).val());
    });
  });
});