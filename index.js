import './server.js';

const HOST = 'server.com/';

const searchInput = document.getElementsByClassName('search_bar__input')[0];

function onSuggestions(data){
    const suggestionsElement = document.getElementsByClassName('search_suggestions')[0];
    suggestionsElement.innerHTML += (data+'<br>');
}

function onNewInput(e) {
    api.get(HOST + 'autocomplete', searchInput.value ,onSuggestions)
}

searchInput.oninput = onNewInput;