const doSomething = (cb) => {
    console.log('Doing something...');
    cb();
} 

const nextStep = () => {
    console.log('Callback Called');
}

doSomething(nextStep);

// Using an anonymous function as it is most common way to use callback
doSomething(() => {
    console.log('Anonymous Callback Called');
});

// Imediately Calling the function
// doSomething(nextStep()); // This will not work as expected because nextStep is called immediately and its return value (undefined) is passed to doSomething

const Things = () =>{
    console.log('Things Called');
    return () => {
        console.log('A function returned');
    }
}

doSomething(Things());


const CalculateLength = (str, cb) =>{
    const length = str.length;
    cb(length);
};

CalculateLength("Hello Shubham", (len) => {
    console.log("Length of String is: ", len);
});