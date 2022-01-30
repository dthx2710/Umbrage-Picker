const noFounderMultiplier = 3;
let winnersArray = [];
const participantTA = document.getElementById('participantsTxt');
const resultSpan = document.getElementById('winnerName');
const winnerListDiv = document.getElementById('winnerListDiv');
const removedCheck = document.getElementById('removeWinner');
const rollingGif = document.getElementById('rollGif');
const resultModal = document.getElementById('resultModal');
const winnersModal = document.getElementById('winnersModal');
const goku = new Audio(`./gokuscreamshort.mp3`);
goku.volume = 0.5;
const poi = new Audio(`./poi.mp3`);

const rollResult = () => {
  event.preventDefault();
  //rng logic
  const partString = participantTA.value;
  if (participantTA.value==""){
    window.alert("Empty");
    return;
  }
  const partArray = partString.split(/\r?\n/);
  const finalPartArray = [];
  for (part of partArray) {
    if (part.trim()){
      let doubleCheck = part.trim().split('*');
      if (doubleCheck[1] == ""){
        for (let i = 1; i < noFounderMultiplier; ++i){
          finalPartArray.push(doubleCheck[0]);
        }
      }
      finalPartArray.push(doubleCheck[0]);
    }
  }
  const winnerIndex = Math.floor(Math.random() * finalPartArray.length);
  const winnerName = finalPartArray[winnerIndex];
  resultSpan.textContent = winnerName;
  winnersArray.push(winnerName);

  // spinner & delay logic
  rollingGif.classList.remove('d-none');
  goku.play();
  setTimeout(()=>{
    rollingGif.classList.add('d-none');
     poi.play();
     $('#resultModal').modal();
     if (removedCheck.checked){
      removeWinner(partArray, winnerName);
     }
    },3500);

}

const winnerList = () =>{
  event.preventDefault();
  // show winners
  let winnerString = "";
  for (winner in winnersArray){
    if (winner == 0){
      winnerString += winnersArray[winner];
    }
    else{
    winnerString += "<br>" + winnersArray[winner];
    }
  }
  winnerListDiv.innerHTML = winnerString;
}

const removeWinner = (participantsArray, wName) => {
  // remove winner logic
  const leftoverParts = participantsArray.filter(name => (name!==(wName+"*") && name!== wName));
  console.log(leftoverParts);
  let leftoverPartsString = "";
  for (winner in leftoverParts){
    if (winner == 0){
      leftoverPartsString +=  leftoverParts[winner];
    }
    else{
      leftoverPartsString += "\n" + leftoverParts[winner];
    }
  }
  participantTA.value = leftoverPartsString
}