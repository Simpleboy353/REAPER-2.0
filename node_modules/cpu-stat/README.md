cpu-stat
========

```
  _______ _______ ___ ___ _______ _______ _______ _______
 |   _   |   _   |   Y   |   _   |       |   _   |       |
 |.  1___|.  1   |.  |   |   1___|.|   | |.  1   |.|   | |
 |.  |___|.  ____|.  |   |____   `-|.  |-|.  _   `-|.  |-'
 |:  1   |:  |   |:  1   |:  1   | |:  | |:  |   | |:  |
 |::.. . |::.|   |::.. . |::.. . | |::.| |::.|:. | |::.|
 `-------`---'   `-------`-------' `---' `--- ---' `---'
```

**Note:** This repo can be found on npm here: [cpu-stat](https://www.npmjs.com/package/cpu-stat)

**Note:** This repo can be found on github here: [node-cpu-stat](https://github.com/jub3i/node-cpu-stat)

**Note:** This module only relies on the `os` module, so it should be compatible on all OS's where Node.js runs.

Install
-------

```
npm install cpu-stat
```

Example
-------

```
var cpuStat = require('cpu-stat');
```

```
//by default returns cpu usage percent for all cores over a period of the next 1000ms
cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    //the percentage cpu usage over all cores
    console.log(percent);

    //the approximate number of seconds the sample was taken over
    console.log(seconds);
});
```

```
//get the cpu usage percent for core 0 over a sample period of 2000ms
cpuStat.usagePercent({
    coreIndex: 0,
    sampleMs: 2000,
  },
  function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    //the percentage cpu usage for core 0
    console.log(percent);

    //the approximate number of seconds the sample was taken over
    console.log(seconds);
});
```

```
//get the total number of cores
var totalCores = cpuStat.totalCores();
console.log(totalCores);
```

```
//get the average clock MHz over all cores
var avgClockMHz = cpuStat.avgClockMHz();
console.log(avgClockMHz);
```

```
//get the clock MHz for core with index 2
var avgClockMHzCore2 = cpuStat.clockMHz(2);
console.log(avgClockMHzCore2);
```

usagePercent(opts, cb)
----------------------

Provides a callback `cb(err, percent, seconds)` giving the `percent` cpu usage and `seconds` the length of the sample time, or an error `err`

Option               | Type         | Default            | Explanation
-------------------- | -------------| ------------------ | ------------
opts                 | `Object`     | see below          | Options object, specify what you need the defaults will be filled in
opts.coreIndex       | `Number`     | all cores          | The index of the core to calculate the usage on. Can use any `coreIndex` such that `0 >= coreIndex < memStat.totalCores()`
opts.sampleMs        | `String`     | `1000`             | `sampleMs` is the amount of time to take the measurement over
cb                   | `Function`   | none               | Callback which has signature `cb(err, percent, seconds)`

totalCores()
------------

Returns the total number of cores available on the cpu

clockMHz(coreIndex)
-------------------

Returns the clock speed in MHz of core with index `coreIndex`

avgClockMHz()
-------------

Returns the average clock speed in MHz over all cores

Contributing
------------

Just send a PR, or create an issue if you are not sure.

Areas ripe for contribution:
- testing
- performance
- bugs

Other Stat Modules
------------------


- cpu-stat [npm](https://www.npmjs.com/package/cpu-stat) [git](https://github.com/jub3i/node-cpu-stat)
- net-stat [npm](https://www.npmjs.com/package/net-stat) [git](https://github.com/jub3i/node-net-stat)
- disk-stat [npm](https://www.npmjs.com/package/disk-stat) [git](https://github.com/jub3i/node-disk-stat)
- mem-stat [npm](https://www.npmjs.com/package/mem-stat) [git](https://github.com/jub3i/node-mem-stat)

**Note:** net-stat, disk-stat, mem-stat only work on nix platforms.

License
-------

MIT

