var express = require('express');
var govTrack = require('govtrack-node');

var app = express();

app.set('view engine', 'pug'); // using Jade
app.set('views', './views');

app.get('/', function (req, res) {
  res.render('index', { title: 'Congress', message: 'Welcome to Congress\'s page'});
});


// I will refactor this code soon.
app.get('/govTrack', (request, response) => {
    govTrack.findRole({ current: true, limit:600, role_type: "senator", sort:"person" }, (err, res) => {

    
    var body = "";

    var heading =  "<h2>United States Senate</h2><hr>";

    var count = {};

    for (var i = 0; i < res.objects.length; i++) {
        
        if (count[res.objects[i].party]) {
             count[res.objects[i].party] += 1;
 } else { 
    count[res.objects[i].party] = 1;


}
        
        var name = res.objects[i].person.name;
        body += `<p> ${name} </p>`;        
}
      var howMany = "";
    for (party in count) { howMany += `${party}:${count[party]} / `;    }
     howMany += "<hr>";
    var html = `${heading} ${howMany} ${body}`;
    response.send(html);

});


});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
