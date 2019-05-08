/*set own values*/
const CARD_PEN_OFFSET = 10, //displacement of the cards
  CARD_SWITCH_RANGE = "130%";

var CARD_ARRAY = [...document.querySelectorAll('div[class*="card"]')];
/* Do not change this */
var COUNT_OF_CARDS = CARD_ARRAY.length;
let last_element = CARD_ARRAY[CARD_ARRAY.length - 1];
let isMoving = false;

let offsetArray = [],
  offset = 0,
  l = CARD_ARRAY.length;
for (let i = 1; i <= l; i++) {
  offsetArray.push(offset);
  offset += CARD_PEN_OFFSET;
}

setCardOffset();
function setCardOffset() {
  CARD_ARRAY.forEach(function (item, index) {
    item.style.zIndex = Math.abs(index - COUNT_OF_CARDS);
    item.style.transform = `translate(${offsetArray[index]}px, ${
      offsetArray[index]
      }px)`;
  });
}

/******************************************************************/
window.addEventListener("wheel", function (e) {
  cardSwitching(e);
});
window.addEventListener("keydown", function (e) {
  cardSwitching(e);
});

function cardSwitching(e) {
  let animationObject = {},
    previousSibling,
    scrolling = "";

  /* return when you scroll during the animation of a card */
  if (scrolling === "up" || scrolling === "down" || isMoving) return;

  if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== undefined) return;

  for (let index of CARD_ARRAY) {
    if (
      parseInt(window.getComputedStyle(index).zIndex) === CARD_ARRAY.length ||
      parseInt(index.style.zIndex) === CARD_ARRAY.length
    ) {
      /*switch the rearmost card */
      if (e.deltaY < 0 || e.keyCode === 38) {
        //deltaY < 0 -> scrolling up
        previousSibling = index.previousElementSibling;
        if (previousSibling === null) previousSibling = last_element;
      }

      animationObject =
        e.deltaY < 0 || e.keyCode === 38
          ? previousSibling
          : e.deltaY > 0 || e.keyCode === 40 ? index : "";
      animationObject.style.transform = `translate(0px, -${CARD_SWITCH_RANGE})`;
      scrolling =
        e.deltaY < 0 || e.keyCode === 38
          ? "up"
          : e.deltaY > 0 || e.keyCode === 40 ? "down" : "";
      isMoving = true;
    }
  }

  if (animationObject !== undefined) {
    animationObject.addEventListener(
      "transitionend",
      function () {
        if (scrolling === "down") {
          animationObject.style.zIndex = 0;
          animationObject.style.transform = `translate(${
            offsetArray[COUNT_OF_CARDS]
            }px, ${offsetArray[COUNT_OF_CARDS]}px)`;
          offsetSwitch(scrolling);
        } else if (scrolling === "up") {
          offsetSwitch(scrolling);
          animationObject.style.zIndex = COUNT_OF_CARDS;
          animationObject.style.transform = `translate(0px, 0px)`;
        }
        scrolling = "";
      },
      { once: true }
    );
  }
}

function offsetSwitch(scrolling) {
  for (let index of CARD_ARRAY) {
    index.style.zIndex =
      scrolling === "down"
        ? parseInt(index.style.zIndex) + 1
        : parseInt(index.style.zIndex) - 1;
    let offsetIndex = Math.abs(parseInt(index.style.zIndex) - COUNT_OF_CARDS);
    index.style.transform = `translate(${offsetArray[offsetIndex]}px, ${
      offsetArray[offsetIndex]
      }px)`;

    index.addEventListener("transitionend", () => (isMoving = false), {
      once: true
    });
  }
}


//=============================Custom code================================
var id = $('#session_id').text();
//console.log(session_id);
var questions = [];
$.post('/mini-game/cards/' + id + '/get', { key: id }, function (result) {
  questions = result;
})


function get_ten_cards() {
  var view_card = "";
  var count = 0;
  while ((questions.length != 0) && (count <= 9)) {
    var question = questions.pop();
    var card_color_index = 0;
    let img_src = question['image-src'];
    var lession_href = question["web-scraper-start-url"];
    var title = question['name_lession'];
    var kanji = question['kanji'];
    var meaning = question['meaning'];
    var true_answer = question['hiragana'];

    switch (count % 5) {
      case 0: card_color_index = 'first'; break;
      case 1: card_color_index = 'second'; break;
      case 2: card_color_index = 'third'; break;
      case 3: card_color_index = 'fourth'; break;
      case 4: card_color_index = 'fifth'; break;
    }
    console.log(count % 5);
    var barem = "<div class=\"card " + card_color_index + "\"><div class=\"row\"><div id=\"qImage\"><img src=\"" + img_src + "\" alt=\"\"></div><div id=\"dataMeta\"><p>Lession: <a href=\"" + lession_href + "\">" + title + "</a></p><p>Kanji: <b>" + kanji + "</b></p><p>Meaning: <b>" + meaning + "</b></p><p>True Answer: <b>" + true_answer + "</b></p></div></div></div>";
    view_card = view_card.concat(barem);
    count++;
  }
  $('#cardd').empty();
  $('#cardd').append(view_card);

  CARD_ARRAY = [...document.querySelectorAll('div[class*="card"]')];
  COUNT_OF_CARDS = CARD_ARRAY.length;
  last_element = CARD_ARRAY[CARD_ARRAY.length - 1];
  isMoving = false;
  offsetArray = [],
  offset = 0,
  l = CARD_ARRAY.length;
  for (let i = 1; i <= l; i++) {
    offsetArray.push(offset);
    offset += CARD_PEN_OFFSET;
  }
  setCardOffset();
  // window.addEventListener("wheel", function (e) {
  //   cardSwitching(e);
  // });
  // window.addEventListener("keydown", function (e) {
  //   cardSwitching(e);
  // });
}
