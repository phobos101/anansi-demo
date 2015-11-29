$(start);

function start() {
  $('#list-events').on('click', updateKeyword);
};

function updateKeyword() {
  event.preventDefault();
  $('#results-area').empty();

  var keyword = $('#keyword-entry').val();
  if (!keyword) keyword = 'css';
  $('#results-area').append('Grabbing '+ keyword +' events now. Please wait!');

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/events/populate',
    data: { keyword }
  }).done(function (data) {
    if (!data) {
      $('#results-area').text('No results for ' + keyword);
    } else {
      listEvents();
    };
  });
};


function listEvents() {
  $('#results-area').empty();
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/events'
  }).done(function (data) {
    var events = data.events;
    for (i in events) {
      var result = events[i];
      append(result)
    };
  });
};

function append(result) {
  $('#results-area').append(
    '<div class="row">'+
      '<div class="col-sm-3">'+
        '<img src="'+ result.image +'" class="img-rounded">'+
      '</div>'+
      '<div class="col-sm-9">'+
        '<div>'+
          '<h3>'+ result.title +'</h3>'+
          '<p>'+ result.city +'</p>'+
          '<p>'+ result.date +'</p>'+
        '</div>'+
      '</div>'+
    '</div><hr>'
  );
};
