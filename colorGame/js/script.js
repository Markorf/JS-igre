$(document).ready(function(){

function getRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randColor() {
    return `rgb(${getRandomNumb(0, 255)}, ${getRandomNumb(0, 255)}, ${getRandomNumb(0, 255)})`;
}
    var difficulty = 6,
    mainText = $('header h1'),
    myArr = [],
    guess = 0,
    newColors = $("#newClrs"),
    boxes = $('.box'),
    correctColor,
    spanText = $("#play"),
    btns = $(".btn-wrap").children();
    
    btns.on('click', function(){
        if (!$(this).hasClass('active')) {
            guess = 0;
            difficulty == 6 ? difficulty = 3 : difficulty = 6;
            myArr = []; // bitno
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            spanText.text("");
            init();
        }
    });

    newColors.on('click', function(){
        myArr = []; // bitno
        spanText.text("");
        $(this).text("NEW COLORS");
        guess = 0;
        init();
    });

function init(){
    $(boxes).hide();
    for (var i = 0; i<difficulty; i++) {
        myArr.push(randColor());
        $(boxes[i]).css('background-color', myArr[i]);
        $(boxes[i]).show();
    }
 correctColor = myArr[getRandomNumb(0, myArr.length)];
mainText.text(correctColor);

}
 init();


$(".box-container").on('click', ".box", function(){
    ++guess;
    console.log(guess);

   if ($(this).css('background-color') == correctColor) {
       boxes.css('background-color', correctColor);
       $("header").css("background-color", correctColor);
       spanText.text("Correct");
       newColors.text("You guessed it in " + guess + " times!");
       return true;
   }else {
       if (guess == 3) {
        newColors.text("You lost, play again?");
         // $('.box-container').off('click');
       }
       spanText.text("Try Again");
       $(this).fadeOut(500);
       return "Yo!";

   }
  });
});
