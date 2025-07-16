// Input:
// computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

// Output:
// 143545000

function computeAmount() {
    return {
        amount: 0,
        crore: function (val) {
            this.amount += val * 10000000;
            return this
        },
        lacs: function (val) {
            this.amount += val * 100000;
            return this;
        },
        thousand: function (val) {
            this.amount += val * 1000;
            return this;
        },
        value: function () {
            console.log(this)
            return this.amount;
        }
    }        
}

const x = computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

console.log(x)