exports.add = function (x, y){
    return x + y;
}

exports.subtract = function(x,y){
    return x - y;
}

exports.multiply = function(x,y){
    return x * y;
}

exports.divide = function(x,y){
    try{
        if( y === 0 ){
            throw new Error("Division by zero is not allowed.");
        }else{
            return x / y;
        }
    }catch(e){
        console.error(e.message);
        return null;
    }
}