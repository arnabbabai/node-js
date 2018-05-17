const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('date', () => {
  return new Date().getFullYear()
})
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('unable to show');
    }
  })
next();
});

app.get('/',(req,res) => {
res.render('home.hbs',{
  pagetitle: 'home',
//  year: 2016,
  welcome: 'welcome'
});
}) ;
app.get('/about', (req,res) => {
  //res.send('about page');
  res.render('about.hbs',{
    pagetitle: 'about page',
    //year: new Date().getFullYear()
  });
});

app.get('/project',(req,res) => {
  res.render('project.hbs',{
    pagetitle: 'project page'
  });
});
app.get('/bad', (req,res) => {
  res.send({
    error: 'unable to send'
  });
});

app.listen(port);
