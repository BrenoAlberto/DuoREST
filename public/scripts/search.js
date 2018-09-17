$('#user-search').on('input', function () {
    var search = $(this).serialize();
    if (search === "search=") {
        search = "all"
    }
    $.get('/users?' + search, function (data) {
        $('#user-grid').html('');
        data.forEach(function (user) {
            $('#user-grid').append(`
        <div class="col-md-3 col-sm-6">
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">${ user.name}</h5>
            <p class="card-text">${ user.email}</p>
            <p class="card-text">${ user.cpf}</p>
            <a class="btn btn-warning card-link" href="/users/${ user._id}/edit">Editar</a>
                <form action="/users/${ user._id}?_method=DELETE" method="POST" class="delete-form">
                    <button class="btn btn-danger">Deletar</button>
                </form>
            </div>
        </div>
    </div>
        `);
        });
    });
});

$('#user-search').submit(function (event) {
    event.preventDefault();
});