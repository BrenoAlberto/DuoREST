$('#user-search').on('input', function() {
    var search = $(this).serialize();
    if(search === "search=") {
      search = "all"
    }
    $.get('/users?' + search, function(data) {
      $('#user-grid').html('');
      data.forEach(function(user) {
        $('#user-grid').append(`
        <div class="col-md-3 col-sm-6">
            <div class="container">
                <h4>${ user.name }</h4>
                <h4>${ user.email }</h4>
                <h4>${ user.cpf }</h4>
            </div>
        </div>
        `);
      });
    });
  });
  
  $('#user-search').submit(function(event) {
    event.preventDefault();
  });