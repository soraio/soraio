$(document).ready(function() {
  function chatAddLeft(item) {
    return '<div class="col-md-12 col-xs-12 card-header-side left">' +
             '<div class="col-md-2 col-xs-2">' +
               '<div class="avatar avatar-md">' +
                 '<img avatar="' + item.fullname + '">' +
               '</div>' +
             '</div>' +
             '<div class="col-md-10 col-xs-10 message">' +
               '<span>' + item.message + '</span>' +
             '</div>' +
           '</div>'
  }

  function chatAddRight(item) {
    return '<div class="col-md-12 col-xs-12 card-header-side right">' +
             '<div class="col-md-10 col-xs-10 message">' +
               '<span>' + item.message + '</span>' +
             '</div>' +
             '<div class="col-md-2 col-xs-2">' +
               '<div class="avatar avatar-md">' +
                 '<img avatar="' + item.fullname + '">' +
               '</div>' +
            '</div>' +
           '</div>'
  }
  var chats = new Array()
  setInterval(function() {
    $.getJSON('/api/chats', function(data) {
      if(JSON.stringify(data) != JSON.stringify(chats)){
        chats = data
        $('#chats.chats').html('')
        for (var i = data.length - 5; i < data.length; i++) {
          $('#chats.chats').append((data[i].position != 'right') ? chatAddLeft(data[i]) : chatAddRight(data[i]))
          LetterAvatar.transform()
        }
        // // this for fetch all data chats
        // for (a of data) {
        //   $('#chats.chats').append((a.position != 'right') ? chatAddLeft(a) : chatAddRight(a))
        //   LetterAvatar.transform()
        // }
      }
    })
  }, 2000)
  $('form#chats').on('submit', function(e) {
    e.preventDefault()
    var message = $('form#chats input').val()
    if(message === null || message === '')
      return false

    $.ajax({
      url: '/api/chats',
      type: 'post',
      data: {
        message: $('form input').val()
      },
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
        console.log('Error ajax: ' + err)
      }
    })
    $('form#chats input').val('')
  })
  $('.chat-action').css('display', 'none');
  $('[data-toggle="collapse"]').on('click', function() {
    if($(this).attr('href') === '#chats'){
      if($(this).attr('aria-expanded') === 'true'){
        $('.chat-action').css('display', 'none');
      }else{
        $('.chat-action').css('display', 'block');
      }
    }
  })
})
