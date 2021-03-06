const chai = require('chai');
const expect = chai.expect;
var Department = require('../../models/volunteers').Department;
var Volunteer = require('../../models/volunteers').Volunteer;
var User = require('../../models/user').User;

describe('Volunteer module db model', () => {
    describe('Departments', () => {
        it('should contain initial data', () => {
            return Department.fetchAll().then((deps) => {
                expect(deps.length).to.be.above(0);
            });
        });
        it('should contain mapping to volunteers', () => {
            return new Department({ id: 1 }).fetch({ withRelated: ['volunteers'] }).then((dep) => {
                expect(dep.related('volunteers')).not.to.be.undefined
            });
        });

    });
    describe('Volunteers', () => {

        before(() => {
            //create a volunteer
            return Volunteer.forge({ user_id: 1, department_id: 1, event_id: 0 }).save().then((vol) => {
                console.log("Successfully created a volunteer for tests");
            });
        });
        it('should contain mapping to Departments', () => {
            return Volunteer.where({ user_id: 1, department_id: 1, event_id: 0 }).fetch({withRelated: ['department']}).then((dep) => {
                expect(dep.related('department')).not.to.be.undefined
            });
        });
        it('should contain mapping to a Role', () => {
            return Volunteer.forge({ id: 1 }).fetch({ withRelated: ['role'], require: true }).then((vol) => {
                expect(vol.related('role')).not.to.be.undefined
            });
        });



    });


});