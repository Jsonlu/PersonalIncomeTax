const data = require('./Config.json')

let test = 8000.000
let city = "hangzhou"

let citys = data.data;
let cityData = null;
for (let i in citys) {
    if (city == citys[i].id) {
        cityData = citys[i]
        break;
    }
}
if (cityData == null)
    return;


let max = cityData.max
let min = cityData.min
let v = test > max ? max : test
v = (v > min ? v : min)
//五险
let pensionBenefits = v * cityData.socialSecurity.pensionBenefits
let medicalInsurance = v * cityData.socialSecurity.medicalInsurance
let unemploymentInsurance = v * cityData.socialSecurity.unemploymentInsurance
let businessInsurance = v * cityData.socialSecurity.businessInsurance
let maternityInsurance = v * cityData.socialSecurity.maternityInsurance

let sum = cityData.socialSecurity.pensionBenefits
    + cityData.socialSecurity.medicalInsurance
    + cityData.socialSecurity.unemploymentInsurance
    + cityData.socialSecurity.businessInsurance
    + cityData.socialSecurity.maternityInsurance;
let sunV = sum * v
console.log('社保:' + sunV)

//一金
let accumulationFundRate = cityData.accumulationFund.rate
let accumulationFundMax = cityData.accumulationFund.maxValue
let accumulationFundMin = cityData.accumulationFund.minValue
let value = test * accumulationFundRate
let accumulationFund = value > accumulationFundMax ? accumulationFundMax : value
accumulationFund = accumulationFund < accumulationFundMin ? accumulationFundMin : accumulationFund
console.log('公积金:' + accumulationFund)

//个税
let vst = test - (sunV + accumulationFund) - 3500;
let tax = {rate: 0, sum: 0};
for (let index in data.tax) {
    let keys = data.tax[index]
    let min = keys.min
    let max = keys.max
    if (vst >= min && vst < max) {
        tax = keys
        break;
    }
}
let d = vst * tax.rate - tax.sum
console.log('个税:' + d)


console.log('税前:' + test)
console.log('税后:' + (test - sunV - accumulationFund - d))