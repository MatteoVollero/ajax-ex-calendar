// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// NON OTTIMIZZATO

$(document).ready(function(){

  var meseCorrente = 0;
  var giorniDeiMesi = [31,28,31,30,31,30,31,31,30,31,30,31];

  $(".prev").hide();
  $(".replace1").show();

  var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";

  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  console.log(source);

  for(var i = 1; i <= giorniDeiMesi[0]; i ++){
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

  $(".next").click(function(){
    $(".entry").remove();
    var prossimoMese = nextMonth(++meseCorrente);
    if(prossimoMese == "Dicembre"){
      $(".next").hide();
      $(".replace2").show();
    } else {
      $(".next").show();
      $(".replace2").hide();
    }

    if(meseCorrente != 0){
      $(".prev").show();
      $(".replace2").hide();
    }

    console.log(prossimoMese)

    $("h1").text(prossimoMese);

    for(var i = 1; i <= giorniDeiMesi[meseCorrente]; i ++){
      var context = {"giorno": i, "numerazione": i};
      var html = template(context);
      $("ul").append(html);
    }

    $.ajax(
      {
        url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + meseCorrente,
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

  });

  $(".prev").click(function(){
    $(".entry").remove();
    var prossimoMese = nextMonth(--meseCorrente);
    if(prossimoMese == "Gennaio"){
      $(".prev").hide();
      $(".replace:first-child").show();
    } else {
      $(".prev").show();
      $(".replace:first-child").hide();
    }

    if(meseCorrente != 12){
      $(".next").show();
      $(".replace2").hide();
    }

    console.log(prossimoMese)

    $("h1").text(prossimoMese);

    for(var i = 1; i <= giorniDeiMesi[meseCorrente]; i ++){
      var context = {"giorno": i, "numerazione": i};
      var html = template(context);
      $("ul").append(html);
    }

    $.ajax(
      {
        url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + meseCorrente,
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

  });

  function nextMonth(meseAttuale){
    switch(meseAttuale){
      case 1: return "Febbraio";
      case 2: return "Marzo";
      case 3: return "Aprile";
      case 4: return "Maggio";
      case 5: return "Giugno";
      case 6: return "Luglio";
      case 7: return "Agosto";
      case 8: return "Settembre";
      case 9: return "Ottobre";
      case 10: return "Novembre";
      case 11: return "Dicembre";
      case 12: return "Fine";
    }
  };

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
