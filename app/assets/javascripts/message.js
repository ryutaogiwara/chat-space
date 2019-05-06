$(document).on('turbolinks:load', function () {

  $(function () {
    function buildMessageHTML(message) {
      var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      var html = `<div class="message" data-message-id="${message.id}">
                      <div class="upper-message" data-id="${message.id}">
                        <div class="upper-message__user-name">
                        ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                        ${imagehtml}
                      </div>
                    </div> `
      return html;
    }

    function scrollBottom() {
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
    };

    $('#new_message').on('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href

      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function (message) {
          var html = buildMessageHTML(message);
          $('.messages').append(html);
          $('.form__submit').prop("disabled", false);
          scrollBottom()
          $(".new_message")[0].reset();
          $('.hidden')[0].reset();
        })
        .fail(function () {
          alert('error');
        })
      return false;
    })
    var reloadMessages = function () {
      var last_message_id = $(".message").last().data('message-id')
      //ブラウザ上の最後のidを取得、classに注意、生成するhtmlに最新のidが無いと機能しない
      var groupId = location.pathname.split('/')[2]//group_idの取得
      $.ajax({
        url: `/groups/${groupId}/api/messages`,// 変数使用時''でなく``を使う
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = ''; //追加するHTMLの入れ物
          messages.forEach(function (message) { //配列の中身を一つずつ取り出す,map()でも良い？
            if (message.id > last_message_id) { //ブラウザ上のidとDBのidを比較
              insertHTML = buildMessageHTML(message);//関数buildHTMLに配列の中身を一つずつ代入
              $('.messages').append(insertHTML);//message送信時と同じ
              scrollBottom();
            };
          });
        })
        .fail(function () {
          // alert('error');
        });
    };
    //定期的に実行するメソッド
    if (document.location.href.match("/messages") && !isNaN(location.pathname.split('/')[2])) {
      //pathに/messagesを含まないと作動しない、isNaN＝数値ならfalseを返す
      // console.log(!isNaN(location.pathname.split('/')[2]))
      setInterval(reloadMessages, 5000);
    };
  });
});
