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
        <div class="card">
            <h3>${ user.name }</h3>
            <hr>
            <h4>${ user.email }</h4>
            <hr>
            <h4>${ user.cpf }</h4>
            <hr>
            <div class="row text-center">
                <div class="col-md-6 col-sm-6">
                    <a class="btn btn-warning" href="/users/${ user._id }/edit">Editar</a>
                </div>
                <form action="/users/${ user._id }?_method=DELETE" method="POST" class="delete-form col-md-6 col-sm-6">
                    <button class="btn btn-danger">Deletar</button>
                </form>
            </div>
        </div>
    </div>
        `);
      });
    });
  });
  
  $('#user-search').submit(function(event) {
    event.preventDefault();
  });