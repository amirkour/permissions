var db = require('./models/index.js'),
	sequelize = db.sequelize,
	Organization = db.Organization,
	force = true;



console.log("HI world");
sequelize.sync({force: force}).then(function(){
	console.log("SYNC SUCCEEDED");
}).catch(function(e){
	console.log("SYNC FAILED: "  + e);
});
