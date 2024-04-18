function startTimer(){
    window.start = Date.now();
}
const scoreTimeLabel = document.getElementById("scoreTimeLabel");
const scoreTimeSpan = document.getElementById("scoreTimeSpan");
const pFromInput = document.getElementById("pFromInput");
const pFromInputFormatted = document.getElementById("pFromInputFormatted");
// 2000
const PI_digits ="14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009";
function getInput(){
    const digitsInputVal = document.getElementById("digitsInput").value;
    pFromInput.textContent = digitsInputVal;

    let digitsInputLength = digitsInputVal.length;
    const numbersCount = document.getElementById("numbersCount");
    if(digitsInputLength==1){
        numbersCount.innerHTML = "You entered: <b>" + digitsInputLength + "</b> Pi digit.";
        numbersCount.style.borderBottom  = "1px solid rgb(131, 176, 240)";
    } else {
        numbersCount.innerHTML = "You entered: <b>" + digitsInputLength + "</b> Pi digits.";
        numbersCount.style.borderBottom  = "1px solid rgb(131, 176, 240)";
        console.log(mistakes);
    } 
    return digitsInputVal;
}

let digitsInput = document.getElementById("digitsInput");

digitsInput.addEventListener('keydown', startTimer, {once:true});

function get_PI(){
    const PI_trimmed= PI_digits.substring(0, getInput().length);

    return PI_trimmed;
}
let mistakes = 0;

let backSpaceCount = 0;

let cheating = false;

const compareResult = document.getElementById("compareResult");

digitsInput.addEventListener('keydown', function(event) {
    const key = event.key;
    if (event.repeat) {
        event.preventDefault();
        compareResult.innerHTML = "<b>Don't hold any key!</b>"; 
    } else {
        if(get_PI() === getInput()){
            if (key === "Backspace") {
                --backSpaceCount;
                event.preventDefault();
                return false;
            }
            if (key === "Enter" && !cheating) {
                const end = Date.now();
                const elapsed = Math.floor( (end - start) / 1000 );
                const milis = (end - start) % 1000;
                const seconds = elapsed % 60;
                const minutes = Math.floor( elapsed / 60 );
                const hours = Math.floor( elapsed / 3600 );
                
                if(hours==0){
                    if(minutes==0){
                        scoreTimeSpan.innerHTML = seconds + "s " + milis + "ms";
                    }else{
                        scoreTimeSpan.innerHTML = minutes + "m " + seconds + "s " + milis + "ms";
                    }
                }else{
                    if(minutes==0){
                        scoreTimeSpan.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
                    } else{
                        scoreTimeSpan.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
                    }
                }
                scoreTimeSpan.style.visibility="visible";
                scoreTimeLabel.style.visibility="visible";
            }else if( key === "Enter" && cheating ){
                const timerDiv = document.getElementById("timerDiv");
                timerDiv.remove();
                const cheatingDivSpan = document.querySelector("#cheatingDiv span");
                cheatingDivSpan.textContent = "You didn't enter Pi digits from your memory so timer is not available.";
            }
        }
    }
});

const alertSound = new Audio("./audio/alert2.wav");

digitsInput.addEventListener('keyup', function(event) {
        
    const key = event.key; 
    
        if (key === "Backspace"){

            ++backSpaceCount;
            
            if(get_PI() === getInput()){
                pFromInputFormatted.innerHTML = "3."+pFromInput.innerHTML.replace(/[0-9]{1,5}/g, ' $&');
                compareResult.innerHTML = "<b>Correct</b>";  
                compareResult.innerHTML += "<br>Mistakes: " + mistakes;

                event.preventDefault();
                return false;
                
            } else {
                var str = pFromInput.innerHTML;
                cut = str.substring(str.length, mistakes-backSpaceCount);
                let str_2 = str.slice(0, -(mistakes-backSpaceCount));

                pFromInput.innerHTML = str_2 + '<span id="redMistake">' + str.slice(-(mistakes-backSpaceCount)) + '</span>';
                
                pFromInputFormatted.innerHTML = "3."+pFromInput.innerHTML.replace(/[0-9]{1,5}/g, ' $&');
                compareResult.innerHTML  = "<b>Incorrect</b>";
                compareResult.innerHTML += "<br>Mistakes: " + mistakes;
            }
        } 
        else if( key >= "0" && key <= "9" || key === "Enter" ){
        
            if(get_PI() === getInput()){
                pFromInputFormatted.innerHTML = "3."+pFromInput.innerHTML.replace(/[0-9]{1,5}/g, ' $&');
                compareResult.innerHTML = "<b>Correct</b>";  
                compareResult.innerHTML += "<br>Mistakes: " + mistakes;
                
            } else {
                if (key === "Enter") {
                    return false;
                }
                mistakes++;
                alertSound.play();

                var str = pFromInput.innerHTML;
                cut = str.substring(str.length, mistakes-backSpaceCount);
                let str_2 = str.slice(0, -(mistakes-backSpaceCount));
                
                pFromInput.innerHTML = str_2 + '<span id="redMistake">' + str.slice(-(mistakes-backSpaceCount)) + '</span>';

                pFromInputFormatted.innerHTML = "3."+pFromInput.innerHTML.replace(/[0-9]{1,5}/g, ' $&');
                compareResult.innerHTML  = "<b>Incorrect</b>";
                compareResult.innerHTML += "<br>Mistakes: " + mistakes;
            }
        }
    
});

digitsInput.addEventListener('paste', 
    function(e){
        e.preventDefault();
        alert("Pasting forbidden!");
    }
);

const btnIncreaseFont = document.querySelector("#fontIncrease");
const btnDecreaseFont = document.querySelector("#fontDecrease");
btnIncreaseFont.addEventListener("click", function(){
    var el = document.getElementById('pFromInputFormatted');
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style); 
    
    if( fontSize >= 78 ){
        el.style.fontSize = fontSize;
    } else{
        el.style.fontSize = (fontSize + 4) + 'px';
    }
});

btnDecreaseFont.addEventListener("click", function(){
    var el = document.getElementById('pFromInputFormatted');
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    if(fontSize>=14){
        el.style.fontSize = (fontSize - 4) + 'px';
    } 
});

const PiDigitsCountInput = document.getElementById("PiDigitsCount");

PiDigitsCountInput.addEventListener('change', function() {

    cheating = true;

    let PiDigitsCount = parseInt(PiDigitsCountInput.value);

    console.log(typeof PiDigitsCount);
    if(PiDigitsCount <= 2000){
        fillWithPIdigits(PiDigitsCount);
        setInput();
    }

    pFromInputFormatted.innerHTML = pFromInput.innerHTML.replace(/[0-9]{1,5}/g, ' $&');
    
});

function fillWithPIdigits(PiDigitsCount){
    PiDigitsCount = parseInt(PiDigitsCount);
    console.log(typeof PiDigitsCount);
    const PI_trimmed= PI_digits.substring(0, PiDigitsCount);
    document.getElementById("digitsInput").value = PI_trimmed;
}

function setInput(){
    let input = document.getElementById("digitsInput");
    let inputVal = input.value;
    let inputLength = inputVal.length;
    input.focus();
    input.setSelectionRange(inputLength, inputLength);
}

function validate(evt) {
    var theEvent = evt || window.event;
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

const maxlength = document.getElementById('digitsInput').getAttribute('maxlength');

window.onload = function() {
    document.getElementById('quizForm').reset()
}