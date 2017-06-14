var api = {
    url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $('#tasks-list');
var plantillaFinal = '';

var cargarPagina = function() {
  cargarTareas();
  $('#add-form').submit(agregarTarea);
};

var plantilla = '<tr>' +
  '<td>__nombre__</td>' +
  '<td>__estatus__</td>' +
  '<td>' +
    '<span class="glyphicon glyphicon-zoom-in"></span>' +
  '</td>' +
  '<td>' +
    '<span class="glyphicon glyphicon-pencil"></span>' +
  '</td>' +
  '<td>' +
    '<a class="btn btn-danger borrar"><span class="glyphicon glyphicon-remove-circle"></span> </a>' +
  '</td>' +
'</tr>';

var crearTarea = function(task){
   plantillaFinal += plantilla.replace("__nombre__", task.name)
     .replace("__estatus__", task.status)
 };

// var borrarTarea = $('.borrar').on('click', function(){
//   plantilla.css('display','none');
// })


var cargarTareas = function (){
  $.getJSON(api.url, function(tasks){
    tasks.forEach(crearTarea);
    $('#tasks-list').html(plantillaFinal);
  });
};

var agregarTarea = function(e) {
  e.preventDefault();
  var nombre = $('#nombre-tarea').val();
  $.post(api.url, {
    name: nombre
  }, function(response){
    $('#myModal').modal('hide');
    cargarTareas();
  });

}


$(document).ready(cargarPagina);
