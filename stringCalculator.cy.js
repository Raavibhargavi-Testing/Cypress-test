// cypress/e2e/stringCalculator.cy.js

const { add } = require('../../stringCalculator');

describe('String Calculator', () => {

    it('should return 0 for an empty string', () => {
        expect(add("")).to.equal(0);
    });

    it('should return the sum of numbers separated by commas', () => {
        expect(add("1,2,3")).to.equal(6);
    });

    it('should return the sum of numbers separated by newlines', () => {
        expect(add("1\n2\n3")).to.equal(6);
    });

    it('should return the sum of numbers separated by commas and newlines', () => {
        expect(add("1\n2,3")).to.equal(6);
    });

    it('should handle a single number', () => {
        expect(add("5")).to.equal(5);
    });
    
    it('should handle large numbers', () => {
        expect(add("1000,2000,3000")).to.equal(6000);
    });
    
    it('should parse the string as integer numbers', () => {
        expect(add("4\n5.6\n7")).to.equal(16);
    });
});
