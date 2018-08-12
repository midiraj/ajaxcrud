
$(document).ready(function($) {

  var is_ajax_fire = 0;
  if (is_ajax_fire == 0) {
    getData();
  };
  $.ajaxSetup({
    headers:{
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
    }
  });


  function manageRow(data){
    var rows = '';
    $.each(data, function(key, value) {
      rows = rows + '<tr>';
      rows = rows + '<td>'+value.title+'</td>';
      rows = rows + '<td>'+value.description+'</td>';
      rows = rows + '<td data-id = "'+value.id+'">';
      rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button>'; 
      rows = rows + '<button class="btn btn-danger remove-item">Delete</button>'; 
      rows = rows + '</td>';
      rows = rows + '</tr>';
    });

    $("tbody").html(rows);

  };

  // End Manage All Data

// Remove Task 

  $("body").on('click', '.remove-item', function() {
    var id = $(this).parent("td").data("id");
    var c_obj = $(this).parents("tr");

    $.ajax({
      url: url + '/' + id,
      type: 'delete',
      dataType: 'json',      
    }).done(function(data) {
      c_obj.remove();
      toastr.success('Item Deleted Successfully.', 'Success Alert', {timeOut: 5000});
      manageRow(data);
    });
    

  });

//  End Remove Tasks

  function getData(){
    $.ajax({
        dataType: 'json',
        type:'GET',
        url: url,
      }).done(function(data){
        // console.log(data);
        is_ajax_fire += 1; 
        manageRow(data);
    });  
    
  };
  


  // Add New Task  
  $(".crud-submit").click(function(e) {
    e.preventDefault();

  var action = $("#create-item").find('form').attr('action');
  var title = $("#create-item").find("input[name='title']").val();
  var description = $("#create-item").find("textarea[name='description']").val();

  
  $.ajax({
    url: action,
    type: 'POST',
    dataType: 'json',
    data: {title: title, description:description}
  }).done(function(data) {
    $(".title").val('');
    $(".description").val('');
    $(".modal").modal('hide');
    manageRow(data);
    // console.log(data);
    
    toastr.success('Task Created Successfully.', 'Success Alert', {timeOut: 4000});

    });
  });

  //End Add New Task


  // Edit Item Start
    $('body').on('click', '.edit-item', function() {
      var id = $(this).parent("td").data("id");
      var title = $(this).parent("td").prev("td").prev("td").text();
      var description = $(this).parent("td").prev("td").text();

      $("#edit-item").find("input[name = 'title']").val(title);
      $("#edit-item").find("textarea[name = 'description']").val(description);
      $("#edit-item").find('form').attr("action", url + '/' + id);
    });

/* Updated new Item */
$(".crud-submit-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var title = $("#edit-item").find("input[name='title']").val();
    var description = $("#edit-item").find("textarea[name='description']").val();


    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{title:title, description:description}
    }).done(function(data){
        manageRow(data);
        $(".modal").modal('hide');
        toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
    });
});
  
    // Update New Item

    $("#crud-submit-edit").click(function(e) {
      e.preventDefault();
      var action = $("#edit-item").find("form").attr("action");
      var title = $("#edit-item").find("input[name = 'title']").val();
      var description = $("#edit-item").find("textarea[name='description']").val();

      $.ajax({
        dataType: 'json',
        type: 'PUT',
        url: action,
        data: {title: title, description: description},
      }).done(function(data) {
        manageRow(data);
        $(".modal").modal("hide");
        toastr.success("Task Updated Successfully.", 'Success Alert', {timeOut: 5000});
      });

    });


});