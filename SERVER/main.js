var exp = require('express');

var app = exp();

//MIDDLEWARES
//app.use(exp.static('public'))
app.use(exp.urlencoded({extended:true}))
app.use(exp.json())

var fs= require('fs');

var sql = require("mssql");

var dbConfig = {
    server: "localhost",
    database: "wpData",
    user: "sa",
    password: "0203",
    trustServerCertificate: true,
};

//CHAT-GPT
const https = require('https');
const { Console } = require('console');
const { parse } = require('path');

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + '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'
  }
};
app.post('/chateSor', function (reqq,resp) {
    var ws= reqq.body
    let message = ''
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": `Bu site ne hakkında? ${ws.URI} (max 40 word)`}],
        "temperature": 0.7,
        "n": 1,
        "max_tokens": 100
      };
      const req = https.request(options, (res) => {
        let responseData = '';
      
        res.on('data', (chunk) => {
          responseData += chunk;
        });
      
        res.on('end', () => {
          const resp = JSON.parse(responseData);
          const choices = resp.choices;
          if (resp.choices && resp.choices.length > 0){
          message = choices[0].message.content;
      
          console.log(choices);
        }else{
            message = "İstek sınır aşımı."
        }
          respEnd();
          //console.log(messages);
        });
      });
      
      req.on('error', (error) => {
        console.error(error);
      });
      
      req.write(JSON.stringify(data));
      req.end();

      function respEnd() {
        resp.end(JSON.stringify(message))
      }
});
//chat-gpt


app.post('/vote', function (req,res) {
    
    var data = req.body

    var conn = new sql.ConnectionPool(dbConfig)
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query(`exec proc_vote '${data.URL}', '${data.URI}', ${data.rate}, '${data.uId}'`, function (err, recordset) {
            if (err) {
                console.log(err);
            }else {
                console.log(recordset)
                res.end(JSON.stringify(recordset))
            }
            conn.close();
        });
        
    });

    console.log("request vote: ")

    // console.log(JSON.parse(rate))
    // res.end(JSON.stringify(rate))
});


app.post('/query', function (req,res) {
    
    var data = req.body

    var conn = new sql.ConnectionPool(dbConfig)
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query(`EXEC proc_UserVoteTime '${data.URI}', '${data.uId}'`, function (err, recordset) {
            if (err) {
                console.log(err);
            }else {
                console.log(recordset)
                res.end(JSON.stringify(recordset))
            }
            conn.close();
        });
        
    });

    console.log("request query: ")

});

app.post('/queryAvg', function (req,res) {
    
    var data = req.body
    //console.log(req.body)

    var conn = new sql.ConnectionPool(dbConfig)
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query(`SELECT avgScore FROM t_webSites WHERE domain='${data.URI}'`, function (err, recordset) {
            if (err) {
                console.log(err);
            }else {
                console.log(recordset)
                res.end(JSON.stringify(recordset))
            }
            conn.close();
        });
        
    });

    console.log("request queryAvg: ")

});



app.post('/star', function (req,res) {
    
    res.end(JSON.stringify(req.body))

    console.log("star")
    console.log(req.body)

    // console.log(JSON.parse(rate))
    // res.end(JSON.stringify(rate))
});


var jsn = {
    name: 'MERHABA'
}
app.post('/msg', function (req, res) {

    var data = req.body;

    console.log(data);

    res.end("Mesaj alindi:  " + JSON.stringify(data));
});

app.get('/ebm',function (req,res) {
    fs.readFile('html.html','utf-8',function (err,data) {
        res.end(data);
        console.log("yeni istek(ebm)");
    });
});


var server = app.listen(1881, function () {
    console.log('sunucu calisiyor')
});

  