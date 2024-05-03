const HOST = "server.com/";

const searchInput = document.getElementsByClassName("search_bar_input")[0];

function getRandomString({ length }) {
  const charactersChoice =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let characters = [];
  while (characters.length < length) {
    const randomIndex = Math.floor(Math.random() * charactersChoice.length);
    characters.push(charactersChoice[randomIndex]);
  }
  return characters.join("");
}

function getRandomInteger({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGenerateSuggestions(prefix) {
  const RATIO_EXACT_MATCH = 0.3;
  const RATIO_AUTOCORRECT = 0.1;

  if (Math.random() < RATIO_EXACT_MATCH) {
    return prefix;
  }

  if (Math.random() < RATIO_AUTOCORRECT) {
    return getRandomString({
      length: getRandomInteger({ min: 1, max: prefix.length }),
    });
  }

  return (
    prefix + getRandomString({ length: getRandomInteger({ min: 1, max: 10 }) })
  );
}

function getAutoCompleteHandler(data) {
  const MAX_CHARS = 10;
  const NUM_SUGGESTIONS = 5;
  const RATIO_AUXILIAR_DATA = 0.1;

  if (data.length > MAX_CHARS) {
    return [];
  }
  const result = [];

  while (result.length < NUM_SUGGESTIONS) {
    const suggestion = getGenerateSuggestions(data);
    if (result.find((result) => result.suggestion === suggestion)) {
      continue;
    }

    if (Math.random() < RATIO_AUXILIAR_DATA) {
      for (let i = 0; i < 2; i++) {
        result.push({
          suggestion,
          auxiliary: getRandomString({
            length: getRandomInteger({ min: 5, max: 15 }),
          }),
        });
      }
    } else {
      result.push({ suggestion, auxiliary: "" });
    }
  }

  return result;
}

const endpoints = {
  "/": {
    get: () => "Hello, World!",
  },
  "/autocomplete": {
    get: getAutoCompleteHandler,
  },
};

function getFunction(url, data, callback) {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"), url.length);

  callback(endpoints[endpoint]["get"](data));
}

const api = {
  get: getFunction,
};

function boldedChars({ inputValue, suggestion }) {
  if (suggestion.startsWith(inputValue)) {
    return ` ${suggestion.substring(0, inputValue.length)}<b>${suggestion.substring(inputValue.length, suggestion.length)}</b>`;
  }

  return `<b>${suggestion}</b>`;
}

function createSuggestionElement({ suggestion, auxiliary }) {
  const auxiliaryString = auxiliary ? ` - ${auxiliary}` : "";
  const bold = boldedChars({ inputValue: searchInput.value, suggestion });
  return `<li class="search_suggestions_list_result">${bold}${auxiliaryString}</li>`;
}

function onSuggestions(data) {
  const suggestionsElement =
    document.getElementsByClassName("search_suggestions")[0];
  let suggestions = "";

  for (const suggestion of data) {
    suggestions += createSuggestionElement({
      suggestion: suggestion.suggestion,
      auxiliary: suggestion.auxiliary,
    });
  }

  suggestionsElement.innerHTML += suggestions;
}

function onNewInput(e) {
  api.get(HOST + "autocomplete", searchInput.value, onSuggestions);
}

searchInput.oninput = onNewInput;
