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


function switchMonths(){
  var month=1;
  var currentMonth = moment("2018-"+month+"-01");
  findDaysInMonth(currentMonth);

  $(document).on("click" , '#next', function(){
    console.log("next");

    if (month<12 ){
      month= month+1;
      console.log(month);
      currentMonth = moment("2018-"+month+"-01");
      findDaysInMonth(currentMonth);
    }
    else {
      month=1;
      currentMonth = moment("2018-"+month+"-01");
      findDaysInMonth(currentMonth);
    }
  })

  $(document).on("click" , '#prev', function(){
    console.log("prev");

    if (month>1 ){
      month= month-1;
      console.log(month);
      currentMonth = moment("2018-"+month+"-01");
      findDaysInMonth(currentMonth);
    }
    else {
      month=12;
      currentMonth = moment("2018-"+month+"-01");
      findDaysInMonth(currentMonth);
    }
  })
}



function findDaysInMonth(currentMonth){
    printMonth(currentMonth);
    getDateFromApi(currentMonth);
    addMonthToTitle(currentMonth);
}


function printMonth(currentMonth){
  var daysMonth = currentMonth.daysInMonth();
  console.log(daysMonth,"daysInMonth");

  var template = $('#template').html();
  var compiled = Handlebars.compile(template);
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

        if(success && holidays.length>0 ){

          for (var i = 0; i < holidays.length; i++) {
            console.log("Holidays data response" , holidays,"Holidays[i]", holidays[i]);

              var element = $("#month li[data-datacomplete='"+ holidays[i]['date'] + "']");
              console.log("element", element);
              console.log("holidaysLENGTH", holidays.length);
              element.addClass("holidays");
              element.append("<br>" + holidays[i]['name']);

          }
        } else{
          alert("SORRY! NO HOLIDAYS IN " + currentMonth.format('MMMM').toUpperCase() + " !");
        }

      },
      error: function(err){
        console.log("err" , err);
      }
  });
}


function addMonthToTitle(currentMonth){
  var template = $('#month_template').html();
  var compiled = Handlebars.compile(template);
  var target = $('#selected_month');
  target.html('');
  console.log("addMonth", currentMonth.format('MMMM'));

  var monthHTML = compiled({
    month: currentMonth.format('MMMM')
  });
  target.append(monthHTML);

}


function init(){


  switchMonths();

  // findDaysInMonth();
  // switchMonths();

}

// 1) Document Ready-----
$(document).ready(init);
