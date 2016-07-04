/// <reference path="jquery.d.ts" />
var MAX_COINS = 100;
var GameEngine = (function () {
    function GameEngine() {
        this.canBeCooked = false;
    }
    /**
     * Returns the word according a numeral
     *
     *  @param {number} iNumber
     *  @param {string[]} aEndings
     */
    GameEngine.prototype.getNumEnding = function (iNumber, aEndings) {
        var sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber >= 11 && iNumber <= 19) {
            sEnding = aEndings[2];
        }
        else {
            i = iNumber % 10;
            switch (i) {
                case (1):
                    sEnding = aEndings[0];
                    break;
                case (2):
                case (3):
                case (4):
                    sEnding = aEndings[1];
                    break;
                default: sEnding = aEndings[2];
            }
        }
        return sEnding;
    };
    GameEngine.prototype.checkCoins = function () {
        if (this.coinBag.coins == 0) {
            $("#nocoin").show();
            $("#coins-count").text("Монет нет");
        }
        else {
            $("#nocoin").hide();
            $("#coins-count").text(this.coinBag.coins + " " + this.getNumEnding(this.coinBag.coins, ["Монета", "Монеты", "Монет"]));
        }
    };
    GameEngine.prototype.checkInventory = function () {
        function textColor(id, amount) {
            $(id).text("X " + amount);
            if (amount == 0)
                $(id).removeClass('any').addClass('no-any');
            else
                $(id).removeClass('no-any').addClass('any');
        }
        textColor("#handamount", this.ingredientArm.amount);
        textColor("#legamount", this.ingredientLeg.amount);
        textColor("#cucumberamount", this.ingredientCucumber.amount);
    };
    GameEngine.prototype.checkBox = function () {
        function ableToInsert(box, ingredient) {
            if (!box.itInserted) {
                if (ingredient.amount > 0) {
                    $(box.id).removeClass(box.name + "-not-available " + box.name + "-checked").addClass(box.name + "-available");
                }
                else {
                    $(box.id).removeClass(box.name + "-available " + box.name + "-checked").addClass(box.name + "-not-available");
                }
            }
        }
        ableToInsert(this.boxArm1, this.ingredientArm);
        ableToInsert(this.boxArm2, this.ingredientArm);
        ableToInsert(this.boxLeg1, this.ingredientLeg);
        ableToInsert(this.boxLeg2, this.ingredientLeg);
        ableToInsert(this.boxCucumber, this.ingredientCucumber);
    };
    GameEngine.prototype.checkButton = function () {
        function transparentButton(id, trueOrFalse) {
            if (trueOrFalse) {
                $(id).removeClass("not-available");
            }
            else {
                $(id).addClass("not-available");
            }
        }
        transparentButton("#buyhand", this.coinBag.coins >= this.ingredientArm.cost);
        transparentButton("#buyleg", this.coinBag.coins >= this.ingredientLeg.cost);
        transparentButton("#buycucumber", this.coinBag.coins >= this.ingredientCucumber.cost);
        transparentButton("#sellhand", this.ingredientArm.amount != 0);
        transparentButton("#sellleg", this.ingredientLeg.amount != 0);
        transparentButton("#sellcucumber", this.ingredientCucumber.amount != 0);
    };
    GameEngine.prototype.checkProduction = function () {
        if (this.boxArm1.itInserted &&
            this.boxArm2.itInserted &&
            this.boxLeg1.itInserted &&
            this.boxLeg2.itInserted &&
            this.boxCucumber.itInserted &&
            this.coinBag.coins >= 10) {
            $("#cookman").removeClass("not-available");
            this.canBeCooked = true;
        }
        else {
            $("#cookman").addClass("not-available");
            this.canBeCooked = false;
        }
    };
    //TODO: Refactor this shit
    GameEngine.prototype.checkBubble = function () {
        function foo(chArm1, chArm2, chLeg1, chLeg2, chCucumber, coins, canBeCooked) {
            var String;
            var phraseArray = [];
            if (canBeCooked == true) {
                String = "Всё готово!";
            }
            else {
                //Arms
                if (!chArm1 || !chArm2) {
                    phraseArray[0] = 1;
                }
                if (!chArm1 && !chArm2) {
                    phraseArray[0] = 2;
                }
                if (chArm1 && chArm2) {
                    phraseArray[0] = 0;
                }
                //Legs
                if (!chLeg1 || !chLeg2) {
                    phraseArray[1] = 1;
                }
                if (!chLeg1 && !chLeg2) {
                    phraseArray[1] = 2;
                }
                if (chLeg1 && chLeg2) {
                    phraseArray[1] = 0;
                }
                //Cucumbers
                if (!chCucumber) {
                    phraseArray[2] = 1;
                }
                else {
                    phraseArray[2] = 0;
                }
                //Coins
                if (coins < 10) {
                    phraseArray[3] = 1;
                }
                else {
                    phraseArray[3] = 0;
                }
                //----------------------
                String = "Не хватает ";
                //----------------------
                (phraseArray[0] == 2) ? String += "двух ручек" :
                    (phraseArray[0] == 1) ? String += "одной ручки" : null;
                //----------------------
                if (phraseArray[2] != 0 || phraseArray[3] != 0) {
                    if (phraseArray[0] != 0) {
                        (phraseArray[1] == 2) ? String += ", двух ножек" :
                            (phraseArray[1] == 1) ? String += ", одной ножки" : null;
                    }
                    else {
                        (phraseArray[1] == 2) ? String += "двух ножек" :
                            (phraseArray[1] == 1) ? String += "одной ножки" : null;
                    }
                }
                else {
                    if (phraseArray[0] != 0) {
                        (phraseArray[1] == 2) ? String += " и двух ножек" :
                            (phraseArray[1] == 1) ? String += " и одной ножки" : null;
                    }
                    else {
                        (phraseArray[1] == 2) ? String += "двух ножек" :
                            (phraseArray[1] == 1) ? String += "одной ножки" : null;
                    }
                }
                //----------------------
                if (phraseArray[3] != 0) {
                    if (phraseArray[0] != 0 || phraseArray[1] != 0) {
                        (phraseArray[2] == 1) ? String += ", огуречика" : null;
                    }
                    else {
                        (phraseArray[2] == 1) ? String += "огуречика" : null;
                    }
                }
                else {
                    if (phraseArray[0] != 0 || phraseArray[1] != 0) {
                        (phraseArray[2] == 1) ? String += " и огуречика" : null;
                    }
                    else {
                        (phraseArray[2] == 1) ? String += "огуречика" : null;
                    }
                }
                //----------------------
                if (phraseArray[0] != 0 || phraseArray[1] != 0 || phraseArray[2] != 0) {
                    (phraseArray[3] == 1) ? String += " и 10 монет" : null;
                }
                else {
                    (phraseArray[3] == 1) ? String += "10 монет" : null;
                }
                //----------------------
                String += ".";
            }
            $("#bubbletext").text(String);
        }
        foo(this.boxArm1.itInserted, this.boxArm2.itInserted, this.boxLeg1.itInserted, this.boxLeg2.itInserted, this.boxCucumber.itInserted, this.coinBag.coins, this.canBeCooked);
    };
    GameEngine.checkSex = function () {
        if (($('input[name="sex"]:checked').val()) == "men") {
            $("#person").removeClass("woman white black").addClass("man");
        }
        else {
            $("#person").removeClass("man white black").addClass("woman");
        }
    };
    GameEngine.prototype.cookMan = function () {
        if (this.canBeCooked == true) {
            this.boxArm1.itInserted = false;
            this.boxArm2.itInserted = false;
            this.boxLeg1.itInserted = false;
            this.boxLeg2.itInserted = false;
            this.boxCucumber.itInserted = false;
            this.coinBag.removeCoins(10);
            if (($('input[name="color"]:checked').val()) == "white") {
                $("#person").remove('black').addClass("white");
            }
            else {
                $("#person").remove('white').addClass("black");
            }
        }
    };
    GameEngine.prototype.setObjects = function (coinBag, ingredientArm, ingredientLeg, ingredientCucumber, boxArm1, boxArm2, boxLeg1, boxLeg2, boxCucumber) {
        this.coinBag = coinBag;
        this.ingredientArm = ingredientArm;
        this.ingredientLeg = ingredientLeg;
        this.ingredientCucumber = ingredientCucumber;
        this.boxArm1 = boxArm1;
        this.boxArm2 = boxArm2;
        this.boxLeg1 = boxLeg1;
        this.boxLeg2 = boxLeg2;
        this.boxCucumber = boxCucumber;
    };
    GameEngine.prototype.makeCycle = function () {
        this.checkCoins();
        this.checkInventory();
        this.checkBox();
        this.checkButton();
        this.checkProduction();
        this.checkBubble();
    };
    return GameEngine;
}());
var CoinBag = (function () {
    function CoinBag() {
        this.coins = 0;
    }
    CoinBag.prototype.plusCoins = function (amount) {
        for (var i = 0; i < amount; i++) {
            if (this.coins != MAX_COINS) {
                this.coins++;
                var difference = 101 - this.coins;
                if (this.coins == 1) {
                    $(".moneystack").append(this.makeCoinDiv(0, difference));
                }
                else {
                    $(".moneystack").append(this.makeCoinDiv(-15, difference));
                }
            }
        }
    };
    CoinBag.prototype.makeCoinDiv = function (margin, difference) {
        return '<div class="coin" id="coin' + this.coins + '" style=" margin-left: ' + margin + 'px; z-index: ' + difference + '"/>';
    };
    CoinBag.prototype.removeCoins = function (amount) {
        for (var i = 0; i < amount; i++)
            $("#coin" + this.coins--).remove();
    };
    return CoinBag;
}());
var Ingredient = (function () {
    function Ingredient(cost, sell) {
        this.amount = 0;
        this.cost = cost;
        this.sell = sell;
    }
    Ingredient.prototype.buyIngredient = function (coinBag) {
        if (coinBag.coins >= this.cost) {
            coinBag.removeCoins(this.cost);
            this.amount++;
        }
    };
    Ingredient.prototype.sellIngredient = function (coinBag) {
        if (this.amount != 0) {
            this.amount--;
            coinBag.plusCoins(this.sell);
        }
    };
    return Ingredient;
}());
var BoxStaff = (function () {
    function BoxStaff(id, name) {
        this.id = id;
        this.name = name;
        this.itInserted = false;
    }
    BoxStaff.prototype.insertIngredient = function (ingredient) {
        if (this.itInserted == false) {
            if (ingredient.amount > 0) {
                $(this.id).removeClass(this.name + "-available").addClass(this.name + "-checked");
                this.itInserted = true;
                ingredient.amount--;
            }
        }
        else {
            $(this.id).removeClass(this.name + "-checked").addClass(this.name + "-available");
            this.itInserted = false;
            ingredient.amount++;
        }
    };
    return BoxStaff;
}());
var Coins = new CoinBag;
var Arms = new Ingredient(5, 3);
var Legs = new Ingredient(7, 5);
var Cucumbers = new Ingredient(20, 15);
var ArmBox1 = new BoxStaff("#arm1", 'arm');
var ArmBox2 = new BoxStaff("#arm2", 'arm');
var LegBox1 = new BoxStaff("#leg1", 'leg');
var LegBox2 = new BoxStaff("#leg2", 'leg');
var CucumberBox = new BoxStaff("#cucumber", 'cucumber');
var Game = new GameEngine();
function makeGameCycle() {
    Game.setObjects(Coins, Arms, Legs, Cucumbers, ArmBox1, ArmBox2, LegBox1, LegBox2, CucumberBox);
    return Game.makeCycle();
}
$("#clicker").click(function () {
    Coins.plusCoins(1);
    makeGameCycle();
});
$("#buyhand").click(function () {
    Arms.buyIngredient(Coins);
    makeGameCycle();
});
$("#buyleg").click(function () {
    Legs.buyIngredient(Coins);
    makeGameCycle();
});
$("#buycucumber").click(function () {
    Cucumbers.buyIngredient(Coins);
    makeGameCycle();
});
$("#sellhand").click(function () {
    Arms.sellIngredient(Coins);
    makeGameCycle();
});
$("#sellleg").click(function () {
    Legs.sellIngredient(Coins);
    makeGameCycle();
});
$("#sellcucumber").click(function () {
    Cucumbers.sellIngredient(Coins);
    makeGameCycle();
});
$("#men").click(function () {
    GameEngine.checkSex();
});
$("#women").click(function () {
    GameEngine.checkSex();
});
$("#cookman").click(function () {
    Game.cookMan();
    makeGameCycle();
});
$("#arm1").click(function () {
    ArmBox1.insertIngredient(Arms);
    makeGameCycle();
});
$("#arm2").click(function () {
    ArmBox2.insertIngredient(Arms);
    makeGameCycle();
});
$("#leg1").click(function () {
    LegBox1.insertIngredient(Legs);
    makeGameCycle();
});
$("#leg2").click(function () {
    LegBox2.insertIngredient(Legs);
    makeGameCycle();
});
$("#cucumber").click(function () {
    CucumberBox.insertIngredient(Cucumbers);
    makeGameCycle();
});
makeGameCycle();
//# sourceMappingURL=typescript.js.map