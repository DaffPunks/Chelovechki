/**
 * Created by User on 06.06.2016.
 */
var coins        = 0;
var arms         = { value: 0 };
var legs         = { value: 0 };
var cucumbers    = { value: 0 };
var chArm1       = { value: false };
var chArm2       = { value: false };
var chLeg1       = { value: false };
var chLeg2       = { value: false };
var chCucumber   = { value: false };
var canBeCooked  = { value: false };


/**
 * Функция прибавляет одну Коину
 */
function plusCoins() {
    if ( coins != 100) {
        coins++;

        updateText();

        var difference = 101 - coins;
        if(coins == 1) {
            $(".moneystack").append(
                '<div class="coin" id="coin' + coins + '" style=" display: none; margin-left: 0; z-index: ' + difference + '"></div>');
            $("#coin" + coins).fadeIn("slow");
        }
        else{
            $(".moneystack").append(
                '<div class="coin" id="coin' + coins + '" style=" display: none; z-index: ' + difference + '"></div>');
            $("#coin" + coins).fadeIn("slow");
        }
    }
}

/**
 * Функция удаляет некоторое кол-во Монет
 * @param    amount Integer Количество монет для удаления
 */
function removeCoin(amount) {
    var current = coins;
    for(var i = 0; i < amount; i++)
        $("#coin" + current--).fadeOut("slow", function () {
            this.remove();
        });
    updateText();
}

/**
 * Функция покупает некоторый ингридиент
 * @param    cost  Стоимость ингридиента
 * @param    chose  Какой ингридиент приобретается
 */
function buy(cost, chose) {
    if (coins >= cost){
        removeCoin(cost);
        coins -= cost;
        chose.value++;
    }
    updateText();
}

/**
 * Функция продаёт некоторый ингридиент
 * @param    cost  Стоимость ингридиента
 * @param    chose  Какой ингридиент продаётся
 */
function sell(cost, chose) {
    if(chose.value != 0) {
        chose.value--;
        for(var i = 0; i < cost; i++)
            plusCoins();
    }
    updateText();
}

/**
 * Функция для работы с производственным индгридиентами
 *
 * @param    criteria Какой ингридиент
 * @param    chose  Был ли уже выбран
 * @param    obj  id в HTMLе
 * @param    src1  ссылка на картинку выбраного ингридиента
 * @param    src2  ссылка на картинку доступного ингридиента
 */
function inventory(criteria ,chose, obj, src1, src2){
    var val = chose;
    var cri = criteria;
        if(val.value == false){
            if(cri.value > 0) {
                $(obj).attr("src", src1);
                val.value = true;
                cri.value--;
            }
        }
        else{
            $(obj).attr("src", src2);
            val.value = false;
            cri.value++;
        }
        updateText();
}

/**
 * Функция создания человечка
 */
function cookMan() {
    if(canBeCooked.value == true){
        chArm1.value = false;
        chArm2.value = false;
        chLeg1.value = false;
        chLeg2.value = false;
        chCucumber.value = false;

        removeCoin(10);

        if(  ($('input[name="sex"]:checked').val()) == "men" ){
            if( ($('input[name="color"]:checked').val()) == "white"){
                $("#person").attr("src","pic/whitemale.png");
            }else{
                $("#person").attr("src","pic/blackmale.png");
            }
        }
        else{
            if( ($('input[name="color"]:checked').val()) == "white"){
                $("#person").attr("src","pic/whitewoman.png");
            }else{
                $("#person").attr("src","pic/blackwoman.png");
            }
        }
    }
    updateText();
}



/**
 * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
 * param  iNumber Integer Число на основе которого нужно сформировать окончание
 * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
 *         например ['яблоко', 'яблока', 'яблок']
 * return String
 */
function getNumEnding(iNumber, aEndings){
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber>=11 && iNumber<=19) {
        sEnding=aEndings[2];
    }
    else {
        i = iNumber % 10;
        switch (i)
        {
            case (1): sEnding = aEndings[0]; break;
            case (2):
            case (3):
            case (4): sEnding = aEndings[1]; break;
            default: sEnding = aEndings[2];
        }
    }
    return sEnding;
}

function checkButtons() {
    if(coins >= 5){
        $("#buyhand").fadeTo('fast',1);
        if(coins >= 7){
            $("#buyleg").fadeTo('fast',1);
            if(coins >= 20){
                $("#buycucumber").fadeTo('fast',1);
            }else{
                $("#buycucumber").fadeTo('fast',0.5);
            }
        }
        else{
            $("#buyleg").fadeTo('fast',0.5);
            $("#buycucumber").fadeTo('fast',0.5);
        }
    }else{
        $("#buyhand").fadeTo('fast',0.5);
        $("#buyleg").fadeTo('fast',0.5);
        $("#buycucumber").fadeTo('fast',0.5);
    }

    if(arms.value == 0)
        $(".sell-hand").fadeTo('fast',0.5);
    else
        $(".sell-hand").fadeTo('fast',1);
    if(legs.value == 0)
        $(".sell-leg").fadeTo('fast',0.5);
    else
        $(".sell-leg").fadeTo('fast',1);
    if(cucumbers.value == 0)
        $(".sell-cucumber").fadeTo('fast',0.5);
    else
        $(".sell-cucumber").fadeTo('fast',1);
}
function checkProduction() {
    if(chArm1.value &&
        chArm2.value &&
        chLeg1.value &&
        chLeg2.value &&
        chCucumber.value &&
        coins >= 10){
        $("#cookman").fadeTo('fast',1);
        canBeCooked.value = true;
    }
    else{
        $("#cookman").fadeTo('fast',0.5);
        canBeCooked.value = false;
    }
}
function checkInventory(){
    function check(criteria, firstobj, secondobj, src1, src2, varprove1, varprove2) {
        var val1 = varprove1;
        var val2 = varprove2;
        if(criteria.value > 0){
            if(!val1.value)
                $(firstobj).attr("src",src1);
            if(!val2.value)
                $(secondobj).attr("src",src1);
        }
        else{
            if(!val1.value)
                $(firstobj).attr("src",src2);
            if(!val2.value)
                $(secondobj).attr("src",src2);
        }
    }
    check(arms, "#arm1", "#arm2", "pic/arm-available.png", "pic/noarm.png", chArm1, chArm2);
    check(legs, "#leg1", "#leg2", "pic/leg-available.png", "pic/noleg.png", chLeg1, chLeg2);
    check(cucumbers, "#cucumber1", "", "pic/cucumber-available.png", "pic/nocucumber.png", chCucumber, chCucumber);

}
function checkSex() {
    if( ($('input[name="sex"]:checked').val()) == "men"){
        $("#person").attr("src","pic/nomale.png");
    }
    else{
        $("#person").attr("src","pic/nowoman.png");
    }
}
function checkBubble() {
    var String;
    var phraseArray = [];
    if(canBeCooked.value == true){
        String = "Всё готово!";
    }
    else{
        if(!chArm1.value || !chArm2.value){
            phraseArray[0] = 1;
            if(!chArm1.value && !chArm2.value){
                phraseArray[0] = 2;
            }
            else{
                phraseArray[0] = 0;
            }
        }
        if(!chLeg1.value || !chLeg2.value){
            phraseArray[1] = 1;
            if(!chLeg1.value && !chLeg2.value){
                phraseArray[1] = 2;
            }
            else{
                phraseArray[1] = 0;
            }
        }
        if(!chCucumber.value){
            phraseArray[2] = 1;
        }else{
            phraseArray[2] = 0;
        }
        if(coins < 10){
            phraseArray[3] = 1;
        }else{
            phraseArray[3] = 0;
        }
        String = "Не хватает ";

        (phraseArray[0] == 2) ? String += "двух ручек" :
            (phraseArray[0] == 1) ? String += "одной ручки" : null;
        if( phraseArray[2] != 0 || phraseArray[3] != 0 || phraseArray[0] != 0)
        {
            (phraseArray[1] == 2) ? String += ", двух ножек" :
                (phraseArray[1] == 1) ? String += ", одной ножки" : null;
        }
        else{
            if(phraseArray[0] == 0){
                (phraseArray[1] == 2) ? String += "двух ножек" :
                    (phraseArray[1] == 1) ? String += "одной ножки" : null;
            }
            else{
                (phraseArray[1] == 2) ? String += "и двух ножек" :
                    (phraseArray[1] == 1) ? String += "и одной ножки" : null;
            }
        }
        if(phraseArray[3] != 0 || (phraseArray[0] != 0 && phraseArray[1] != 0) )
        {
            (phraseArray[2] == 1) ? String += ", огуречика" : null;
        }
        else{
            if(phraseArray[0] == 0 && phraseArray[1] == 0){
                (phraseArray[2] == 1) ? String += "огуречика" : null;
            }
            else{
                (phraseArray[2] == 1) ? String += " и огуречика" : null;
            }
        }
        if(phraseArray[0] != 0 || phraseArray[1] != 0 || phraseArray[2] != 0 )
        {
            (phraseArray[3] == 1) ? String += " и 10 монет" : null;
        }
        else{
            (phraseArray[3] == 1) ? String += "10 монет" : null;
        }
        String += ".";
    }
    $("#bubbletext").text(String);
}
function updateText() {
    if(coins == 0){
        $("#nocoin").show();;
        $("#coins-count").text("Монет нет");
    }else {
        $("#nocoin").hide();
        $("#coins-count").text(coins + " " + getNumEnding(coins, ["Монета", "Монеты", "Монет"]));
    }



    $("#handamount").text("X " + arms.value);
    if(arms.value == 0)
        handamount.style.color = "#d74545";
    else
        handamount.style.color = "white";


    $("#legamount").text("X " + legs.value);
    if(legs.value == 0)
        legamount.style.color = "#d74545";
    else
        legamount.style.color = "white";


    $("#cucumberamount").text("X " + cucumbers.value);
    if(cucumbers.value == 0)
        cucumberamount.style.color = "#d74545";
    else
        cucumberamount.style.color = "white";

    checkButtons();
    checkInventory();
    checkProduction();
    checkBubble();
}

$("#arm1")          .click(inventory.bind(null, arms, chArm1, "#arm1",        "pic/arm.png", "pic/arm-available.png"));
$("#arm2")          .click(inventory.bind(null, arms, chArm2, "#arm2",        "pic/arm.png","pic/arm-available.png"));
$("#leg1")          .click(inventory.bind(null, legs, chLeg1, "#leg1",        "pic/leg.png","pic/leg-available.png"));
$("#leg2")          .click(inventory.bind(null, legs, chLeg2, "#leg2",        "pic/leg.png","pic/leg-available.png"));
$("#cucumber1")     .click(inventory.bind(null, cucumbers, chCucumber, "#cucumber1",   "pic/cucumber.png","pic/cucumber-available.png"));
$("#clicker")       .click(plusCoins);
$("#buyhand")       .click(buy.bind(null,5,arms));
$("#buyleg")        .click(buy.bind(null,7,legs));
$("#buycucumber")   .click(buy.bind(null,20,cucumbers));
$("#sellhand")      .click(sell.bind(null,3,arms));
$("#sellleg")       .click(sell.bind(null,5,legs));
$("#sellcucumber")  .click(sell.bind(null,15,cucumbers));
$("#men")           .click(checkSex);
$("#women")         .click(checkSex);
$("#cookman")       .click(cookMan);

updateText();




