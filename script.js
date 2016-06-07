/**
 * Created by User on 06.06.2016.
 */
var coins       = 1;
var arms        = 0;
var legs        = 0;
var cucumbers   = 0;
var bool        = false;

var clicker         = document.getElementById("clicker");
var buyhand         = document.getElementById("buyhand");
var buyleg          = document.getElementById("buyleg");
var buycucumber     = document.getElementById("buycucumber");
var coinscount      = document.getElementById("coins-count");
var handamount      = document.getElementById("handamount");
var legamount       = document.getElementById("legamount");
var cucumberamount  = document.getElementById("cucumberamount");

function plusCoins() {
    if ( coins != 100) {
        coins++;
        updateText();
        var difference = 101 - coins;
        $(".moneystack").append(
            '<div class="coin" id="coin'+ coins +'" style=" display: none; z-index: ' + difference + '"></div>');
        /*
        $(".moneystack").append(
            '<img src="pic/coins.png" id="coin'
            + coins +
            '" style=" display: none; z-index: '
            + difference +
            '">'
        );
        */
        $("#coin" + coins).fadeIn( "slow" );
    }

}
function removeCoin(amount) {
    var current = coins;
    for(var i = 0; i < amount; i++)
        $("#coin" + current--).fadeOut("slow", function () {
            this.remove();
        });
    updateText();
}
function buy(cost, chose) {
    if (coins >= cost){
        removeCoin(cost);
        coins -= cost;
        if(chose == 1) arms++;
        if(chose == 2) legs++;
        if(chose == 3) cucumbers++;
    }
    updateText();
}
function sell(cost, chose) {
    bool = false;
    if(chose == 1) {
        if(arms != 0) {
            arms--;
            bool = true;
        }
    }else
    if(chose == 2) {
        if(legs != 0) {
            legs--;
            bool = true;
        }
    }else
    if(chose == 3) {
        if(cucumbers != 0) {
            cucumbers--;
            bool = true;
        }
    }
    if (bool)
        for(var i = 0; i < cost; i++)
            plusCoins();
    updateText();
}



//
//$(".moneystack").append("<img src=\"pic/coins.png\" style=\"z-index: 18\">");
//$(".moneystack").append("<img src=\"pic/coins.png\" style=\"z-index: 17\">");
//$(".moneystack").append("<img src=\"pic/coins.png\" style=\"z-index: 16\">");

clicker.addEventListener("click",plusCoins);
buyhand.addEventListener("click",buy.bind(null,5,1));
buyleg.addEventListener("click",buy.bind(null,7,2));
buycucumber.addEventListener("click",buy.bind(null,20,3));



function updateText() {
    coinscount.innerHTML = coins + " coins";
    handamount.innerHTML = "X " + arms;
    if(arms == 0){
        handamount.style.color = "#d74545";
    }else{
        handamount.style.color = "white";
    }

    legamount.innerHTML = "X " + legs;
    if(legs == 0){
        legamount.style.color = "#d74545";
    }else{
        legamount.style.color = "white";
    }

    cucumberamount.innerHTML = "X " + cucumbers;
    if(cucumbers == 0){
        cucumberamount.style.color = "#d74545";
    }else{
        cucumberamount.style.color = "white";
    }
}

