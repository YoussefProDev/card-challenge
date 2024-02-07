let form = document.querySelector("form");
let input = document.querySelectorAll("input");
let cardName = document.querySelector(".card-name");
let cardNumber = document.querySelector(".card-number");
let cardMonth = document.querySelector(".month");
let cardyear = document.querySelector(".year");
let cardcvc = document.querySelector(".card-cvc");
let confirm = document.querySelector("#confirm");
let finish = document.querySelector(".finish");
let continueButton = document.querySelector("#Continue");
let c = [false, false, false, false, false];
let control = (element, i) => {
  if (!element.classList.contains("error") && element.value.length > 0) {
    c[i] = true;
  } else {
    c[i] = false;
  }

  // console.log(c);
  if (!c.includes(false)) {
    confirm.classList.remove("dis");
  } else {
    confirm.classList.add("dis");
  }
};
const onlyNum = /[^0-9]/g;
const onlyWord = /[^a-z\s]/gi;

input.forEach((element, i) => {
  element.addEventListener("input", (event) => {
    if (element.dataset.type === "name") {
      element.value = element.value.replace(onlyWord, "");
      if (event.target.value === "") {
        cardName.innerHTML = "Youssef Ahmed";
        element.classList.add("error");
      } else {
        cardName.innerHTML = element.value;
        element.classList.remove("error");
      }
    }
    if (element.dataset.type === "number") {
      if (element.value.length < 16) {
        element.classList.add("error");
      } else {
        element.classList.remove("error");
      }
      //   console.log(this)
      control(element, 1);
      element.value = element.value.replace(onlyNum, "");
      let aux,
        z = "0";
      if (element.value.length <= 16) {
        for (let i = element.value.length; i <= 16; i++) {
          aux = `${element.value}${z.repeat(16 - element.value.length)}`;
        }
        //
      }
      // console.log(aux)

      let cardN = aux.split("").reduce((acc, el, ind) => {
        if (Number.isInteger(ind / 4)) {
          return `${acc} ${el}`;
        } else {
          return `${acc}${el}`;
        }
      });

      cardNumber.innerHTML = cardN;
    }
    if (element.dataset.type === "month") {
      let month = new Date().getUTCMonth();
      // let month = 22242;
      // console.log(month.toString(),month.toString().length)
      element.value = element.value.replace(onlyNum, "");
      if (element.value < 1 || element.value > 12) {
        element.value = element.value.replace(event.data, "");
      }
      if (element.value.length === 1) {
        cardMonth.innerHTML = `0${element.value}`;
        element.classList.remove("error");
      } else if (element.value.length === 0) {
        element.classList.add("error");
        if (month.toString().length === 1) {
          cardMonth.innerHTML = `0${month}`;
        } else {
          cardMonth.innerHTML = month;
        }
      } else {
        cardMonth.innerHTML = element.value;
        element.classList.remove("error");
      }
    }
    if (element.dataset.type === "year") {
      let year = new Date().getFullYear();

      element.value = element.value.replace(onlyNum, "");
      if (+`20${element.value}` >= year && element.value.length > 1) {
        // console.log("ok ",`20${yearInput.value}`)
        element.classList.remove("error");
        cardyear.innerHTML = element.value;
      } else {
        cardyear.innerHTML = year.toString().slice(2);
        element.classList.add("error");
        // yearInput.value = ''
      }
    }
    if (element.dataset.type === "cvc") {
      element.value = element.value.replace(onlyNum, "");
      if (element.value.length < 1) {
        cardcvc.innerHTML = `123`;
      } else {
        cardcvc.innerHTML = element.value;
      }
      if (element.value.length < 3) {
        element.classList.add("error");
      } else {
        element.classList.remove("error");
      }
    }
    control(element, i);
  });
});




form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.style.display = "none";
  finish.style.display = "flex";
  // finish.style.flexDirection = "column";
  console.log("confirm", event);
});


continueButton.addEventListener("click",(event)=>{
  location.reload()
})