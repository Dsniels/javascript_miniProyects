function validate(e) {
    const inputElement = e.target;
    inputElement.classList.add('signup__field__input--error');

    const errorMessageElement = e.target.parentElement.getElementsByClassName('signup__field__error')[0];
    errorMessageElement.innerHTML = 'Error';
}
function isValidName(name) {
    // TODO
  }

const inputs  = document.getElementsByClassName('signup__field__input');

for(const input of inputs){
    input.onblur = validate;
}

function runTests(){
    firtNameTest();

}


function runner({inputs, expectedOutputs, func}) {
	let results = '';
	for(let i = 0; i < inputs;i++){
		const passFail = func(inputs[i]) === expectedOutputs[i] ? 'Pass' : '<span style="color:red">Fail</span>';
        const result = `${func.name}(${inputs[i]}) === ${expectedOutputs[i]} : ${passFail}`;
        results += result + '<br>';
	}
	const resultsElement = document.getElementsByClassName('results');
    resultsElement.innerHTML += (results + '<br>'); 
}

function firtNameTest(){
	const invalidInputs = ['@', '', 'blah$', '123'];
	const validInputs = ['asdfg', 'alfred', 'ALFRED'];

	runner({
		inputs : validInputs,
		expectedOutputs : validInputs.map(_ => true),
		func: isValidName
	});

    runner({
        inputs : invalidInputs,
        expectedOutputs : invalidInputs.map(_ => false),
        func: isValidName
    });
}

console.log('Running tests');
runTests();
console.log('Tests complete');