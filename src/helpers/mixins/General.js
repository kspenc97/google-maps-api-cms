
export default{
    methods:{
        $_genStoplight(importedStore){
                    let nowVal = Date.now();
                    //let weekVal = 604800000;
                    if ((nowVal -  importedStore.lastVisited) >= (importedStore.tillRed * 86400000)) {
                        return 'time-div-red';
                    } else if((nowVal -  importedStore.lastVisited) >= (importedStore.tillYellow * 86400000)) {
                        return 'time-div-yellow';
                    } else {
                        return 'time-div-green'
                    }
        },
        $_genPinStoplight(importedStore){
            let nowVal = Date.now();
            //let weekVal = 604800000;
            if ((nowVal -  importedStore.lastVisited) >= (importedStore.tillRed * 86400000)) {
                  return  'redPin';
            } else if((nowVal -  importedStore.lastVisited) >= (importedStore.tillYellow * 86400000)) {
                  return  'yellowPin';
            } else {
                   return  'greenPin'
            }
        },
        $_genProfitData(importedStore){
            let allProfits = importedStore.profitList.map((loggedProfit)=>{
                return parseInt(loggedProfit.visitProfit);
            });
            let median = this.$_genMedian(allProfits).toLocaleString('en');
            let min = this.$_genMin(allProfits).toLocaleString('en');
            let max = this.$_genMax(allProfits);
            let average = this.$_genAverage(allProfits).toFixed(2);
            let averageFormatted = parseFloat(average).toLocaleString('en');
            let packedData = {
                profitMedian: `$ ${median}`,
                profitMin: `$ ${min}`,
                profitMax: `$ ${max}`,
                profitAverage: `$ ${averageFormatted}`,
                cleanAverage: averageFormatted,
                profitRange: `$${min} to $${max}`
            }
            return packedData;
        },
        $_genAverage(insertedArr){
            return insertedArr.reduce((a, b) => a + b, 0) / insertedArr.length;
        },
        $_genMin(insertedArr){
            let sortedArr = insertedArr.sort(function(a, b){return a-b});
            return sortedArr[0] || 0;
        },
        $_genMax(insertedArr){
            let sortedArr = insertedArr.sort(function(a, b){return a-b});
            let maxVal = parseFloat(sortedArr[(sortedArr.length -1)]).toLocaleString('en');
            return maxVal;
        },
        $_genMedian(insertedArr){
            let middle = Math.floor(insertedArr.length / 2);
            let sortedArr = [...insertedArr].sort((a, b) => a - b);
          return sortedArr.length % 2 !== 0 ? sortedArr[middle] : (sortedArr[middle - 1] + sortedArr[middle]) / 2;
        },
        $_daysAgo(lastVisitedMs){
            let nowVal = Date.now();
            return Math.floor((nowVal -lastVisitedMs) / 86400000);
        },
    }
}