var express = require('express');
var govTrack = require('govtrack-node');

var app = express();

app.set('port', (process.env.PORT || 3000)); // heroku
app.set('view engine', 'pug'); // using Jade
app.set('views', './views');

app.get('/', function (req, res) {
  res.render('index', { title: 'Congress', message: 'Welcome to Congress\' page'});
});


// I will refactor this code soon.
app.get('/senate', (request, response) => {
  govTrack.findRole({ current: true, limit:600, role_type: "senator", sort:"person" }, (err, res) => {
      var count = {};
      var names = []

      for (var i = 0; i < res.objects.length; i++) {
          if (count[res.objects[i].party]) {
             count[res.objects[i].party] += 1;
          } else { 
             count[res.objects[i].party] = 1;
          }
        
        names.push(res.objects[i].person.name);    
      }
  
      response.render('senate', {names, count});
  });
});


app.listen(app.get('port'), function () {
  console.log('senate app is running on port', app.get('port'));
});
