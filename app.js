var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var chosen = "all";
var properties = {name:"Country Name",
                topLevelDomain:"Top Level Domain",
                alpha2Code: "Alpha-2 Code",
                alpha3Code:"Alpha-3 Code",
                callingCodes:"calling Code",
                capital:"capital",
                altSpellings:"Alternative Spellings",
                region:"Region",
                subregion:"Sub Region",
                population:"Population",
                latlng:"Latitude And Longitude",
                demonym:"Demonym",
                area:"Area",
                gini:"Gini",
                timezones:"Timezone",
                borders:"Border Countries",
                nativeName:"Native Name",
                numericCode:"Numeric Code",
                currencies:"Currencies",
                languages:"Languages",
                translations:"Translations",
                    };
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    var value = req.query.searchType;
    if(value != null)
        chosen = req.query.choice;
    else
        chosen = "all";
    var url = "https://restcountries.eu/rest/v2";
    if(chosen=="all"){
        url+="/all"; 
    }
    else if(chosen == "alpha"){
        url+="/alpha?codes="+value;
    } 
    else{
        url+="/"+chosen+"/"+value;
    }
    console.log("url "+url);
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var results = JSON.parse(body);
            console.log(results[0]);
            res.render("home",{results:results});
        }
        else{
            res.send("Enter valid details!")
        }
    });
});

app.get("/:countryName",function(req,res){
    var name = req.params.countryName;
    var url = "https://restcountries.eu/rest/v2/alpha/"+name;
    console.log(url);
    request(url,function(error,response,body){
       if(!error && response.statusCode==200){
           var results = JSON.parse(body);
        //   console.log(results);
           res.render("country",{results:results,properties:properties}); 
       } 
    });
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server started at port "+process.env.PORT); 
});