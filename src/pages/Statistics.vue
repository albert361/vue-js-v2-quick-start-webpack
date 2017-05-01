<template>
    <main-layout>
        <p>Welcome statistics</p>
        <highcharts :options="options"></highcharts>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/main.vue';
    var series = [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }];
    var options = {
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },
        yAxis: {
            title: {
            text: 'Temperature (°C)'
            },
            plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: []
    };
  
    export default {
        components: { MainLayout },
        data() {
            return {
                options: options,
                running: false,
                compute: function(start) {
                    var WHEN_TO_STOP = 10000000;
                    var COMPUTE_BLOCK_SIZE = 1000000;

                    var count = 0;

                    var n = start;
                    var i, hasDivisor;

                    if (!this.running) { // got a message to stop before this call to compute
                        console.dir("Stopped!");
                    } else {
                        while (n < start + COMPUTE_BLOCK_SIZE) {
                            hasDivisor = false;
                            for (i = 2; i <= Math.sqrt(n); i += 1) {
                                if (n % i === 0) {
                                    hasDivisor = true;
                                    break;
                                }
                            }
                            if (!hasDivisor) {
                                // found a prime!
                                count++;
                            }
                            n += 1;
                        }

                        if (n < WHEN_TO_STOP) {
                            // allow for event loop to actually forward messages to the worker
                            setTimeout(() =>this.compute(n), 1);
                        } else {
                            // we reached the end
                            this.running = false;
                            console.dir("Done!");
                        }
                    }

                    // Finally, always report how many primes we've found so far
                    console.dir("Found " + count + " primes between 2 and " + (n - 1));
                }
            }
        },
        mounted() {
            this.options.series = series;
            this.running = true;
            this.compute(1);
        }
    }
</script>