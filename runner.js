const con = require('./dbconnect');
const randomiser = require('./randomiser');

const disconnect = function (){con.end(function(err) {
    if (err) {
        return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
})};

const mysqlConnect = function (){con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM participants", function (err, result, fields) {
        if (err) throw err;
        let arrayEmails = [];
        let orgArray = [];
        result.forEach( (row) => {
            arrayEmails = arrayEmails.concat(row.email)
            orgArray = orgArray.concat(row.orgId)
        });
        let drawResults = randomiser(arrayEmails)
        for (i=0; i < arrayEmails.length; i++) {
            var sql = `INSERT INTO drawresults (whoPresents, whoToPresent, orgId, played) VALUES ('${drawResults[i*2]}', '${drawResults[i*2+1]}', '${orgArray[i]}', '1')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
        console.log("round has been drawn");
        disconnect();
    });
})};

module.exports = mysqlConnect;