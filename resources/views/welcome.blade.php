<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Laravel Ajax CRUD Example</title>

    <!-- Load Bootstrap CSS -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
         <form id="myForm">
            {{csrf_field()}}
            <div class="form-group">
              <label for="task">Task:</label>
              <input type="text" name="task" class="form-control" id="task">
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <input type="text" description="description" class="form-control" id="description">
            </div>
            <button class="btn btn-primary" id="ajaxSubmit">Submit</button>
          </form>
    </div>


    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script>
        jQuery(document).ready(function(){
            jQuery('#ajaxSubmit').click(function(e){
               e.preventDefault();
               $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                  }
              });
               jQuery.ajax({
                  url: "{{ url('tasks/post') }}",
                  method: 'post',
                  data: {
                     type: jQuery('#type').val(),
                     description: jQuery('#description').val()
                  },
                  success: function(result){
                     console.log(result);
                     jQuery('.alert').show();
                     jQuery('.alert').html(result.success);
                  }});
               });
            });
</body>
</html>