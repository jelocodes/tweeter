$(document).ready(function() {

  // Select the character counter DOM element
  const domElem = $('span.counter');

  // When the input box changes, subtract the current length of its contents from 140 and update the character counter
  $('textarea').on('input propertychange', () => {
    domElem[0].innerText = 140 - $('textarea').val().length;

    // Change the character counter to red when the user has run out of characters
    (parseInt(domElem[0].innerText) < 0) ? domElem.css('color', 'red') : domElem.css('color', 'black');
    $('#error').text('');
  });
})