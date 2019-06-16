$(document).ready(function() {
  $('textarea').on('input propertychange', () => $('span.counter')[0].innerText = 140 - $('textarea').val().length)
});