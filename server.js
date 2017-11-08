const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname+ '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log!');
        }
    });

    next();
});

/*app.use((req, res, next) =>{
    res.render('maintenance.hbs');
}); */


app.use(express.static(__dirname +'/public'));
//HBS Helpers 
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

 
app.get('/', (req, res)=>{
  //  res.send(html);
  res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Stranger Things rocks!"
  });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: "Whoops! Something went wrong here..."
    });
});

//Server 
const PORT_NUMBER = 3000;
app.listen(PORT_NUMBER, ()=>{
    console.log('Server is listening on port', PORT_NUMBER);
});




