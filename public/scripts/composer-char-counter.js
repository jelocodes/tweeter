$(document).ready(function() {
  const domElem = $('span.counter');
  $('textarea').on('input propertychange', () => {
    domElem[0].innerText = 140 - $('textarea').val().length;
    (parseInt(domElem[0].innerText) < 0) ? domElem.css('color', 'red') : domElem.css('color', 'black');
  });
})