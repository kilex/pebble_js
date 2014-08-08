/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var allMenu = [];
var Settings = require('settings');
//var allCards;

Settings.config(
  { url: 'http://ezhbaev.ru/pebble/myapp/?settings' },
  function(e) {
    console.log('closed configurable');

    // Show the parsed response
    console.log(JSON.stringify(e.options));

    // Show the raw response if parsing failed
    if (e.failed) {
      console.log(e.response);
    }
  }
);


var main = new UI.Card({
  title: 'DemKa',
  //icon: 'images/menu_icon.png',
  subtitle: 'Loading...',
  body: 'Wait.'
});


main.show();
loadMain();

function itemSelected(e, lvl){
  console.log('sec='+e.section+'&item='+e.item+'&lvl='+lvl);
  ajax(
    {
      url: Settings.option('server_url')+'?sec='+e.section+'&item='+e.item+'&lvl='+lvl,
      type: 'json'
    },
    function(data){
      
      if (data.show == "Menu"){
          makeMenu(data.level, data.sections);
      }
      if (data.show == 'Card'){
        makeCard(data.card);
      }
    },
    function(error){
      var wind = new UI.Window();
      var textfield = new UI.Text({
        position: new Vector2(0, 50),
        size: new Vector2(144, 30),
        font: 'gothic-24-bold',
        text: error,
        textAlign: 'center'
      });
      wind.add(textfield);
      wind.show();
    }
  );
}

var ResultCard = new UI.Card();

function makeCard(carddata){
  
  if (carddata.title){
    ResultCard.title(carddata.title);
  }
  if (carddata.subtitle){
    ResultCard.subtitle(carddata.subtitle);
  }
  if (carddata.body){
    ResultCard.body(carddata.body);
  }
  ResultCard.show();
}


function makeMenu(menu_level, sections){
  var menu;
  
  console.log(menu_level);
  console.log(allMenu[menu_level]);
  
  if (menu_level in allMenu){
    console.log('GET FROM ARR');
    menu = allMenu[menu_level];
  }else{
    console.log('MAKE NEW');
    menu = new UI.Menu({sections:'[]'});
    allMenu[menu_level] = menu;
    menu.on('select', function(e) {
      console.log('Selected item: ' + e.section + ' ' + e.item);
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
      itemSelected(e, menu_level);
    });
  }
  for (var sec in menu.sections){
    menu.sections[sec].remove(); 
  }
  
  for(sec in sections)
  {
    menu.section(sec, sections[sec]);
  }

  menu.show();
  
  
}

function loadMain()
{
  
  var options = Settings.option();
  console.log(JSON.stringify(options));
  
  
  
  ajax(
    {
      url: Settings.option('server_url'),
      type: 'json'
    },
    function(data) {
      var sections = data.sections;
      var menu = new UI.Menu({sections:'[]'});
      for(var sec in sections)
      {
        menu.section(sec, sections[sec]);
      }
    
      menu.show();
      
      menu.on('select', function(e) {
        console.log('Selected item: ' + e.section + ' ' + e.item);
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
        itemSelected(e, 0);
      });
      
      main.subtitle("Press 'SELECT' to RELOAD");
      
    },
    function(error) {
      console.log(error);
      main.subtitle('Loding error.');
          
    }
  );
}

main.on('click', 'select', function(e) {
  loadMain();
});



/*

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/