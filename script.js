var title = document.getElementById('title');
var gameBoard = document.getElementById('container');
var score = document.getElementById('score');

title.setAttribute('style', 'text-align:center');
gameBoard.setAttribute('style', 'text-align:center');
score.setAttribute('style', 'text-align:center');

var divRow = [];
var allImages = [];
var back = [];
var selectedImages = [];
var count = 0;
var curTile = 'none';
var score = 0;
var skellyWin = new Image(500, 500);

//Collect face images in array and assign randomly to tiles

function collectImages() {
  for (var a = 0; a < 16; a ++) {
    allImages[a] = new Image(100, 100);
    allImages[a].src = ('img' + (a + 1) + '.png').toString();
  }
}

collectImages();

function setImages() {
  for (var a = 0; a < 16; a++) {
    var randIndex = Math.floor(Math.random() * allImages.length);
    var face = allImages[randIndex];
    selectedImages.push(face);
    allImages.splice(randIndex, 1);
  }
}

setImages();

selectedImages.sort(function() {
  return 0.5 - Math.random();
});

//Make the board of 16 tiles with skull back and no face

function makeRow(i){
  divRow[i] = document.createElement('div');
  gameBoard.appendChild(divRow[i])[0];
}

function makeDiv(i, j){
  //make container divs for each tile
  var newDiv = document.createElement('div');
  newDiv.className = 'tile';
  divRow[i].appendChild(newDiv)[0];

  //create and add image for back of card
  back[j] = document.createElement('img');
  newDiv.appendChild(back[j]);
  back[j].style.height = '100px';
  back[j].style.width = '100px';
  back[j].src = 'cardback.jpg';
  back[j].className = 'tileBack';

  //pick and add the random images for card's face
  newDiv.appendChild(selectedImages[count]);
  selectedImages[count].style.height = '100px';
  selectedImages[count].style.width = '100px';
  selectedImages[count].style.display = 'none';
  selectedImages[count].className = 'tileFront';
  var imgExt = selectedImages[count].src;
  var clipped = imgExt.substr(imgExt.length - 6);
  clipped = clipped.substr(0,2);
  clipped = parseInt(clipped.replace('g', ''));
  selectedImages[count].id = clipped;
  count++;
}

function makeBoard(){
  for(var i = 1 ; i <=4 ; i++) {
    makeRow(i);
    for(var j = 1; j <= 4; j++) {
      makeDiv(i, j);
    }
  }
}

makeBoard();

$(document).ready(function() {

//Unfinished
  function finishPage(){
    skellyWin.src = 'skelly.gif';
    $('#container').empty();
    $('#container').append(skellyWin);
  }

//~~~Attempting here to bind the click item to cause a delay on flips

  $('.tileBack').bind({
    click: function() {
//  $('.tileBack').click(function() {
    if (curTile === 'none'){
      $(this).parent().find('.tileBack').css('display', 'none');
      $(this).parent().find('.tileBack').addClass('prevBack');
      $(this).parent().find('.tileFront').css('display', 'inline-block');
      $(this).parent().find('.tileFront').addClass('prevFront');
      curTile = $(this).parent().find('.tileFront').attr('id');
    }
    else {
      $(this).parent().find('.tileBack').css('display', 'none');
      $(this).parent().find('.tileFront').css('display', 'inline-block');
      var nextTile = $(this).parent().find('.tileFront').attr('id');

      if (Math.abs(curTile - nextTile) === 8) {
        score += 1;
        $('.score').text(score);
        alert('yep!');
        $('.prevBack').removeClass('prevBack');
        $('.prevFront').removeClass('prevFront');
        curTile = 'none';
        nextTile = 'none';
        if (score === 8){
          finishPage();
        }
      }

      else {
        alert('nope');
        $(this).parent().find('.tileFront').css('display', 'none');
        $(this).parent().find('.tileBack').css('display', 'inline-block');
        $('.prevBack').css('display', 'inline-block');
        $('.prevFront').css('display', 'none');
        curTile = 'none';
        nextTile = 'none';
      }

    }
    console.log(curTile + ' ' + nextTile);
  });
//  });
});



/*
____TO DO list____
1. add finish screen
2. add animation to card flips
3. add timer


Should half these functions be IIFEs?
*/
