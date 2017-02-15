$(document).ready(function() {
  var menuUpdate = function() {
    var id = 1, menu_parents = []
    $('.menu-items').each(function() {
      $(this).data('id', id)
      $(this).find('.js-remove').data('id', id)
      menu_parents.push({
        id: parseInt($(this).data('id')),
        menu: $(this).find('[name="menu_name"]').val(),
        url: $(this).find('[name="menu_url"]').val()
      })
      id++
    })
    $.ajax({
      url: '/api/menu',
      type: 'post',
      dataType: 'json',
      data: {menu_parents: JSON.stringify(menu_parents)}
    })
  }
  $('button.btn.btn-primary.add-menu').on('click', function() {
    $('.site-menu').append('<div class="form-group row menu-items"> \
      <div class="col-sm-1"> \
        <span class="form-control text-sm-center drag-handle" style="border:none;cursor:pointer;"><i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-ellipsis-v"></i></span> \
      </div> \
      <div class="col-sm-3"> \
        <input class="form-control underlined" name="menu_name" type="text" placeholder="Menu Name"> \
      </div> \
      <div class="col-sm-3"> \
        <input class="form-control underlined" name="menu_url" type="text" placeholder="Menu URL"> \
      </div> \
      <div class="col-sm-1"> \
        <button class="btn btn-warning-outline btn-sm text-sm-center js-remove"><i class="fa fa-times"></i></button> \
      </div> \
    </div>')
    $('[name="menu_url"], [name="menu_name"]').on('change keyup', function() {
      menuUpdate()
    })
    menuUpdate()
    $('.js-remove').on('click', function() {
      $(this).closest('.menu-items').remove()
      menuUpdate()
    })
  })
  $('.js-remove').on('click', function() {
    $(this).closest('.menu-items').remove()
    menuUpdate()
  })
  Sortable.create($('.site-menu')[0], {
    group: "site-menu",
    handle: ".drag-handle",
    store: {
      set: function (sortable) {
        menuUpdate()
      }
    }
  })
})
