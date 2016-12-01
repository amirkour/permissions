'use strict';

// THIS ABSOLUTELY HAS TO COME BEFORE YOU INCLUDE models/index.js.
// OTHERWISE: YOUR TESTS WILL RUN AGAINST THE WRONG DATABASE
process.env.NODE_ENV='test';

var db = require("../models/index.js"),
    sequelize = db.sequelize,
    Organization = db.Organization,
    Group = db.Group;

describe("Organization", function(){
    beforeAll(function(done){
        sequelize.sync({force:true}).then(done,function(e){
            fail(e);
            done();
        });
    });
    describe("::create", function(){
        it("works",function(done){
            Organization.create({name:'test'}).then(function(org){
                expect(org).not.toBeNull();
                expect(org.get('name')).toEqual("test");
                expect(org.get('id')).toBeGreaterThan(0);
                done();
            }).catch(function(e){
                fail(e);
                done();
            });
        });
    });
});
describe("Group",function(){
    describe("org assoc",function(){
        it("works",function(done){
            var organization = null,
                group = null;

            Organization.create({
                name:'test org'
            }).then(function(org){
                organization = org;
                return Group.create({
                    organization_id: org.get('id'),
                    name: 'org 1 group'
                });
            }).then(function(grp){
                group = grp;
                expect(grp).not.toBeNull();
                expect(grp.organization_id).toEqual(organization.get('id'));
                expect(grp.get('name')).toEqual("org 1 group");
                return grp.getOrganization();
            }).then(function(org){
                expect(org.get('id')).toEqual(organization.get('id'));
                return org.getGroups();
            }).then(function(groups){
                expect(groups.length).toEqual(1);
                expect(groups[0].get('id')).toEqual(group.get('id'));
                expect(groups[0].get('name')).toEqual(group.get('name'));
                done();
            }).catch(function(e){
                fail(e);
                done();
            });
        })
    })
})
