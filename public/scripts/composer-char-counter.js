$(document).ready(function(){

  // set max char limit on jQ
  const CHAR_LIMIT = 140;
  $('.counter').text(CHAR_LIMIT);
  
  // counter function
  $('textarea').on("keyup", function(){
    let remaining = CHAR_LIMIT - $(this).val().length;
    const counterEl = $(this).siblings('.counter');
    
    if (remaining > 0){
      // pass the remaining value into the counter span tag
      counterEl.text(remaining).css('color','#2d2e4a')
    } else {
      counterEl.text(remaining).css('color','red');
    }
  });
});


