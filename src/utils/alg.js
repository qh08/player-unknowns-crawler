module.exports = {
    sum: function (array) {

        let sum = 0;

        array.forEach(function(value){
            sum += value;
        })

        return sum;
    },

    average: function (array) {
        return this.sum(array) / array.length;
    },

    stanDev: function (array) {
        const avg = this.average(array);
        const sums = array.map(function (value) {
            return Math.pow((value - avg), 2);
        });
        return Math.pow(this.sum(sums) / array.length, 0.5);
    }
}