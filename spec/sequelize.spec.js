'use strict';

// THIS ABSOLUTELY HAS TO COME BEFORE YOU INCLUDE models/index.js.
// OTHERWISE: YOUR TESTS WILL RUN AGAINST THE WRONG DATABASE
process.env.NODE_ENV='test';

var db = require("../models/index.js"),
    sequelize = db.sequelize;

describe("sequelize", function(){
    beforeAll(function(done){
        sequelize.sync({force:true}).then(done,function(e){
            fail(e);
            done();
        });
    });

    it("can authenticate",function(done){
        sequelize.authenticate().then(done, function(e){
            fail(e);
            done();
        });
    });
});
