module.exports  = (productValue, temporary)=>{
    let output = temporary.replace(/{%Product name%}/g, productValue.productName)
        output = output.replace (/{%image%}/g,productValue.image)
        output = output.replace (/{%nutrients%}/g,productValue.nutrients)
        output = output.replace (/{%place%}/g,productValue.place)
        output = output.replace (/{%quantity%}/g,productValue.quantity)
        output = output.replace (/{%price%}/g,productValue.price)
        output = output.replace (/{%id%}/g,productValue.id)
        output = output.replace (/{%description%}/g,productValue.description)

        if(!productValue.organic){
            output = output.replace (/{%not organic%}/g,'not-organic');
        }

        return output;
}
