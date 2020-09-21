// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
$(document).ready(function(){

  var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";

  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  console.log(source);

  for(var i = 1; i <= 31; i ++){
    var context = {"giorno": i, "numerazione": i};
    var html = template(context);
    $("ul").append(html);
  }

  $.ajax(
    {
      url: endpoint,
      method: "GET",
      success: function (data, stato) {
        var mese = dichiaraMese(data);
        for(var i = 0; i < data.response.length; i ++){
      //parseInt(substring(8,9,data.response[i].date))
      $('*[data-day="'+ parseInt(substring(8,9,data.response[i].date)) + '"] .nome-festivita').text(data.response[i].name);
      $('*[data-day="'+ parseInt(substring(8,9,data.response[i].date)) + '"] .nome-festivita').show();
        }
      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    }
  );

  function substring(start,end,str){
    var newStr="";
    for(var i = start; i <= end ; i ++){
      newStr += str[i];
    }
    return newStr;
  }

  function dichiaraMese(data){
    if(data.response.length == 0){
      return ;
    } else {
      var mese = substring(5,6,data.response[0].date);
      return mese;
    }
  }

});

















//CHIAMATA AJAX
// $.ajax(
//   {
//     url: "http://www.boolean.careers/api/random/boolean",
//     method: "GET",
//     success: function (data, stato) {
//     $("#risultati").html(data);
//     },
//     error: function (richiesta, stato, errori) {
//     alert("E' avvenuto un errore. " + errore);
//     }
//   }
// );
