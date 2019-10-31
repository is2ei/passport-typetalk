/* eslint-disable */
const os = require("os");
const { expect } = require("chai");
const { performance } = require("perf_hooks");
const addContext = require('mochawesome/addContext');

const [ { speed: cpuSpeed } ] = os.cpus();

describe('startup / require time', function () {
    it('measuring time', function () {

        const budget = 85000 / cpuSpeed;

        let avgLoadTime = 0;
        for (var i = 0; i < 100; i++) {
            const startTime = performance.now();
            require('../lib/index');
            const endTime = performance.now();
            avgLoadTime += endTime - startTime;
        }

        addContext(this, `Load Time: ${avgLoadTime / budget}`);
        console.info(`startup / require time: ${avgLoadTime / budget}`);
 
        expect(avgLoadTime).to.be.below(budget);
    });
});
