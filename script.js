
$(document).ready(function () { // Makes it possible to start to manipulate the document
  $('#sizePicker').submit(function makeGrid(grid) {  // Creates the grid upon clicking the button 'Submit'
    $('table tr').remove(); // Lets the grid be cleared when hitting the 'Submit' button again
    var row_input = $('#input_height').val(); // Allows the user to add a chosen value inside the input box to add rows 
    var col_input = $('#input_width').val(); // Allows the user to add a chosen value inside the 2nd input box to add columns
    var kk=0;
    var t=1;
    var glob=true;
    row_input++;
    col_input++;
    for (var i = 1; i <= row_input; i++) {
      $('table').append("<tr></tr>"); // This loop creates a row of cells 
      for (var j = 1,n = 0; j <= col_input; j++,n++) {
        if ( i === 1){
          $('tr:last').append("<td>"+n+"</td>");
          $('td').attr("class", 'cells')
          $('td').attr("border", '1')
        }
        else{
          if(j === 1){
            $('tr:last').append("<td>"+kk+"</td>"); // This loop adds a cell after every row
            $('td').attr("class", 'cells') // For every 'td', a class of 'cells' is created
          }
          else{
            $('tr:last').append("<td></td>"); // This loop adds a cell after every row
            $('td').attr("class", 'cells') // For every 'td', a class of 'cells' is created
          }
        }
      }
      kk++;
    }
    grid.preventDefault(); // Prevents the grid to be deleted after it is created

    $('.cells').click(function (event) { // The function allows the user to color a cell on click
      var paint = $('#colorPicker').val();
      $(event.target).css('background-color', paint); // Lets the chosen color on a click event to be added to the grid
    });
  }); 

//   $('input[type="checkbox"]').click(function(){

//     if($(this).prop("checked") == true){

//         glob = true;
//         alert("hello true");

//     }

//     else if($(this).prop("checked") == false){

//         glob = false;
//         alert("hello false");
//         $('#pixel_canvas').removeAttr("border");

//     }

// });

  $('#export').on('click', function() {
    //$("table").removeAttr("border");
    
    html2canvas($('#pixel_canvas'), {
        onrendered: function(canvas) {   
          $("table").removeAttr("border");
          $('table').css('border', '0');
            var saveAs = function(uri, filename) {
                var link = document.createElement('a');
                if (typeof link.download === 'string') {
                    document.body.appendChild(link); // Firefox requires the link to be in the body
                    link.download = filename;
                    link.href = uri;
                    link.click();
                    document.body.removeChild(link); // remove the link when done
                } else {
                    location.replace(uri);
                }
            };

            var img = canvas.toDataURL("image/png"),
                uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

            
            saveAs(uri, 'tableExport.png');
        }
    }); 
  });

  // $('#select_image').on('change',function(){
  //   if (this.files && this.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = function (e) {
  //         $('#blah')
  //             .attr('src', e.target.result)
  //             .width(150)
  //             .height(200);
  //     };

  //     reader.readAsDataURL(this.files[0]);
  // }

  // });




});

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#pixel_canvas')
              .attr('background', e.target.result)
              // .width(150)
              // .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

// function checkBox(checkbox){
//   // var checkbox = document.getElementById('grids');
//   if (checkbox.checked != true){
//     alert("hello false");
//     $('#pixel_canvas')
//               .attr('border', '0')
//   }
//   else{
//     alert("hello true");
//     $('#pixel_canvas')
//               .attr('border', '1')
//   }
// }


/*
//Download
function download(filename, canvas) {
  var canvas = canvas;
  var canvasContext = canvas.getContext("2d");
  var imageData = 
      canvasContext.getImageData(0,0,canvas.width,canvas.height);

  var saveCanvas = document.createElement("canvas");
  saveCanvas.width = canvas.width;
  saveCanvas.height = canvas.height;
  var saveCanvasContext = saveCanvas.getContext('2d');
  saveCanvasContext.putImageData(imageData, 0, 0);
  var link = document.createElement('a'), e;
  link.download = filename;
  link.href = saveCanvas.toDataURL();
  if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false, false, 0, null);
      
      link.dispatchEvent(e);
  } else if (lnk.fireEvent) {
      link.fireEvent("onclick");
  }
}*/
