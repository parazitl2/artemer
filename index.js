const textContainer = document.getElementById("message");
const buttonYes = document.getElementById("yes");
const buttonNo = document.getElementById("no");
const buttonsContainer = document.getElementById("buttons-container");
const messages = [
  "ну и пиздуй)",
  "Артём ведь всегда поможет и подскажет?",
  "Ты aбьюзер?",
  "ТОГДА ХВАТИТ ПРИДУМЫВАТЬ ГЛУПЫЕ ОТГОВОРКИ И СКИНЬ ЕМУ СВОИ СИСЬКИ!!!"
];

let genStatus = { done: false };

const hideButtons = () => {
  buttonsContainer.remove();
};

const setMessage = (messageIndex) => {
  textContainer.innerText = messages[messageIndex];
};

const eventInterceptor = (e) => {
  console.log(e.target.id);
  genStatus = generator.next(e.target.id);

  if (genStatus.done) {
    hideButtons();
  }
};

function* answerSequence(arg) {
  console.log("Start generator " + arg);
  let buttonId = yield;
  
  if (buttonId === "yes") {
    setMessage(1);
  } else {
    setMessage(0);
    hideButtons();
    return;
  }

  buttonId = yield;

  if (buttonId === "yes") {
    setMessage(2);
  } else {
    setMessage(0);
    hideButtons();
    return;
  }

  buttonId = yield;

  if (buttonId === "yes") {
    setMessage(0);
    hideButtons();
    return;
  } else {
    setMessage(3);
  }

  return;
}

const generator = answerSequence();
generator.next();

buttonYes.addEventListener("click", eventInterceptor);
buttonNo.addEventListener("click", eventInterceptor)