// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

// function momentExamples(){
//
//   console.log("moment().format('MMMM Do YYYY, h:mm:ss a'");
//   console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
//
//
//   console.log("moment().format('MMMM Do YYYY");
//   console.log(moment().format('MMMM Do YYYY'));
//
//   console.log("moment()");
//   console.log(moment());
// }

function switchMonths(){
  var month=0;
  console.log("log",clickNext());
  if(clickNext(month)){
    month++;
    console.log(month,"NEXT");
  } else {
    console.log("NIENTE");
  }
}


function clickNext(month){
  var next = $('#next');
  $(document).on("click" , next, function(){
    console.log("next");
    month++;
    // console.log("month", month);
  })
}


function getDateFromApi(currentMonth){

  var year = currentMonth.year();
  var month = currentMonth.month();

  $.ajax({

      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: "GET",
      data : {
        'month' : month,
        'year' : year
      },

      success: function(data,state){

        var holidays = data['response'];
        var success = data['success'];

        if(success){
          for (var i = 0; i < holidays.length; i++) {
            console.log(holidays[i]);
            var element = $("#month li[data-datacomplete='"+ holidays[i]['date'] + "']");
            console.log("element", element);
            element.addClass("holidays");
            element.append("" + holidays[i]['name']);
          }
        }


      },
      error: function(err){
        console.log("err" , err);
      }
  });
}




function findDaysInMonth(){
  var currentMonth = moment("2018-01-01");
  var year = currentMonth.year();
  console.log("YEAR" , year);
  console.log(currentMonth);
  printMonth(currentMonth);
  getDateFromApi(currentMonth);
}

function printMonth(currentMonth){
  var daysMonth = currentMonth.daysInMonth();
  console.log(daysMonth,"daysInMonth");

  var template = $('#template').html();
  var compiled = Handlebars.compile(template)
  var target = $('#month');
  target.html('');

  for (var i = 1; i <= daysMonth; i++) {
    var dateComplete= moment({year:currentMonth.year(), month:currentMonth.month(), day:i});


    var daysHTML = compiled({
      "value": i,
      "dateComplete":dateComplete.format("YYYY-MM-DD")
    })


    target.append(daysHTML);

  }

}

function printHolidays(currentMonth){


}



function init(){

  findDaysInMonth();
  switchMonths();

}

// 1) Document Ready-----
$(document).ready(init);
