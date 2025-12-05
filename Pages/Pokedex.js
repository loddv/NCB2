function LeadingZeros(num)
{
    return ("000" + num).substring(("000" + num).length - 3);
}

function SetupList(filter)
{
    document.getElementById('pokelist').innerHTML = "";
    for (let id in pokedexEntries)
    {
        if (!pokedexEntries[id].name.includes("("))
        {
            if (filter == "" || CheckFilter(filter.toLowerCase(), pokedexEntries[id]))
            {
                document.getElementById('pokelist').appendChild(document.createElement("br"));
                let b = document.createElement("button");
                b.className = "PokedexEntry";
                b.innerHTML = LeadingZeros(pokedexEntries[id].id) + " " + pokedexEntries[id].name;
                let pk = pokedexEntries[id];
                b.addEventListener ("click", function() {
                    OpenPokedexEntry(pk, true);
                });
                b.style.zIndex = 1;

                let icon = document.createElement("div");
                icon.className = "PokedexIcon";
                icon.style.backgroundImage = pokedexEntries[id].icon;
                icon.style.zIndex = 2;
                document.getElementById('pokelist').append(icon);

                document.getElementById('pokelist').append(b);
            }
        }
    }
    for (let n = 0; n < 5; n++)
    {
        document.getElementById('pokelist').appendChild(document.createElement("br"));
    }
}

function CheckFilter(filter, poke)
{
    let dropdown = document.getElementById("filterDropdown").options[document.getElementById("filterDropdown").selectedIndex].text;
    if (dropdown == "Name" && poke.name.toLowerCase().includes(filter))
    {
        return true;
    }
    if (dropdown == "Type" && pokedexEntries.some((p) => poke.forms.includes(p.name) && (p.type1.toLowerCase().includes(filter) || p.type2.toLowerCase().includes(filter))))
    {
        return true;
    }
    if (dropdown == "Ability" && (poke.ability1.toLowerCase().includes(filter) || poke.ability2.toLowerCase().includes(filter)))
    {
        return true;
    }
    if (dropdown == "Move" && (poke.levelUpMoves.some(function (item)
    {
        return item[0].toLowerCase().includes(filter)
    }) || poke.tms.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    }) || poke.tutors.some(function (item)
    {
        return item[1].toLowerCase().includes(filter)
    }) || poke.eggMoves.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    })))
    {
        return true;
    }
    if (dropdown == "Evolution" && (poke.name.toLowerCase().includes(filter) || poke.forms.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    }) || poke.evolutionMethods.some(function (item)
    {
        return item.from.toLowerCase().includes(filter) || item.to.toLowerCase().includes(filter)
    })))
    {
        return true;
    }
    if (dropdown == "Location" && (poke.locations.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    })))
    {
        return true;
    }
    return false;
}

function GoHome()
{
    history.pushState(null, document.title, location.pathname);
    window.location.replace("../index.html");
}

showStatChanges = false;

function ToggleStatChanges()
{
    showStatChanges = !showStatChanges;
    document.getElementById("StatChangesButton").style.backgroundImage = showStatChanges ? "url(../Images/StatChangesOn.png)" : "url(../Images/StatChangesOff.png)";
    OpenPokedexEntry(pokedexEntries[currentPoke], true);
}

function OpenPokedexEntry(poke, resetForms)
{
    currentPoke = pokedexEntries.indexOf(poke);
    document.getElementById("pokeImage").style.backgroundImage = 'url("../DexSprites/' + poke.name + '.png")';
    
    document.getElementById("statBox").innerHTML = "";

    let l = [document.getElementById("learnsetBox").parentElement, document.getElementById("learnsetTMBox").parentElement, document.getElementById("learnsetEggMovesBox").parentElement, document.getElementById("learnsetTutorsBox").parentElement]
    for (let j = 0; j < l.length; j++)
    {
        for (let i = 0; i < l[j].children.length; i++)
        {
            if (l[j].children[i].className == "HomeButton")
            {
                l[j].removeChild(l[j].children[i]);
                i--;
            }
        }
    }
    for (let i = 0; i < document.getElementById("dexPage").children.length; i++)
    {
        if (document.getElementById("dexPage").children[i].className == "MovePopup")
        {
            document.getElementById("dexPage").removeChild(document.getElementById("dexPage").children[i]);
            i--;
        }
    }

    let statNames = ["Hp", "Attack", "Defense", "Sp. Att", "Sp. Def", "Speed"];
    for (let i = 0; i < 6; i++)
    {
        let label = document.createElement("div");
        label.className = "StatText";
        label.style.display = "inline-block";
        label.style.marginTop = 8;
        label.innerHTML = statNames[i];
        label.style.top = 40 * i;
        document.getElementById("statBox").appendChild(label);

        if (!(poke.id in iconSwaps) && showStatChanges)
        {
            let bar = document.createElement("div");
            bar.className = "StatBar";
            bar.style.width = Math.pow(poke.baseStats[i] * 2.25, 1 / 1.1) + 10;
            bar.style.height = 20;
            bar.style.top = -4 + 40 * i;
            if (poke.oldbaseStats[i] < poke.baseStats[i])
            {
                bar.style.backgroundColor = "rgb(128, 255, 128)";
            }
            document.getElementById("statBox").appendChild(bar);

            let bar2 = document.createElement("div");
            bar2.className = "StatBar";
            bar2.style.width = Math.pow(poke.oldbaseStats[i] * 2.25, 1 / 1.1) + 10;
            bar2.style.height = 20;
            bar2.style.top = -4 + 40 * i;
            if (poke.oldbaseStats[i] > poke.baseStats[i])
            {
                bar2.style.backgroundColor = "rgb(255, 128, 128)";
                bar.style.zIndex = 11;
            }
            document.getElementById("statBox").appendChild(bar2);
        }
        else
        {
            let bar = document.createElement("div");
            bar.className = "StatBar";
            bar.style.width = Math.pow(poke.baseStats[i] * 2.25, 1 / 1.1) + 10;
            bar.style.height = 20;
            bar.style.top = -4 + 40 * i;
            document.getElementById("statBox").appendChild(bar);
        }

        label = document.createElement("div");
        label.className = "StatText";
        label.style.display = "inline-block";
        label.style.marginTop = 8;
        label.innerHTML = poke.baseStats[i];
        label.style.top = 40 * i;
        label.style.left = 432
        document.getElementById("statBox").appendChild(label);
    }
    document.getElementById("bstText").innerHTML = "BST: " + (poke.baseStats[0] + poke.baseStats[1] + 
        poke.baseStats[2] + poke.baseStats[3] + poke.baseStats[4] + poke.baseStats[5]);

    document.getElementById("type1Icon").style.backgroundImage = "url(../Images/TypeIcons/" + poke.type1 + ".png";
    if (poke.type1 == poke.type2)
    {
        document.getElementById("type1Icon").style.left = 124;
        document.getElementById("type2Icon").style.display = "none";
    }
    else
    {
        document.getElementById("type1Icon").style.left = 64;
        document.getElementById("type2Icon").style.backgroundImage = "url(../Images/TypeIcons/" + poke.type2 + ".png";
        document.getElementById("type2Icon").style.display = "";
    }

    let abil = "";
    if (poke.ability2 == "--") abil = "Ability: " + poke.ability1;
    else abil = "Abilities: " + poke.ability1 + ", " + poke.ability2;
    document.getElementById("abilityText").innerHTML = abil + "<br>Hidden Ability: " + poke.ability3;

    //Forms
    if (resetForms)
    {
        document.getElementById("formList").innerHTML = "";
        for (let i = 0; i < poke.forms.length; i++)
        {
            if (i == 0 || !hiddenForms.includes(poke.name))
            {
                let form = pokedexEntries.find((p) => { return p.name == poke.forms[i]});
                if (form != null)
                {
                    MakeFormIcon(20 + 90 * (i % 8), i < 8 ? 440 : 540, form);
                }
            }
        }
    }
    for (let i = 0; i < poke.forms.length; i++)
    {
        let form = pokedexEntries.find((p) => { return p.name == poke.forms[i]});
        if (form == poke)
        {
            document.getElementById("formOutline").style.top = i < 8 ? 440 : 540;
            document.getElementById("formOutline").style.left = 16 + 90 * (i % 8);
            if (poke.forms.indexOf(poke.name) == 0)
                document.getElementById("formOutline").style.left = 16 + 90 * (i + poke.formid);
        }
    }
    document.getElementById("dexPage").scrollTop = 0;

    //Evolutions
    let evoHeight = 560;
    if (resetForms && poke.evolutionMethods.length > 0)
    {
        let usedEvos = {};
        let evoNames = [];
        for (let i = 0; i < poke.evolutionMethods.length; i++)
        {
            let fromIcon = [];
            let form = pokedexEntries.find((p) => { return p.name == poke.evolutionMethods[i].from});
            let altForm = pokedexEntries.find((p) => {return p.name.startsWith(form.name) && p.formid == poke.formid});
            if (altForm) form = altForm;
            if (!(form.name in usedEvos))
            {
                let x = 400 + 90 * i;
                let y = 440;
                let icon = MakeFormIcon(x, y, form);

                usedEvos[form.name] = [icon, x, y, poke.evolutionMethods[i]];
                evoNames.push(form.name);
                fromIcon = [icon, x, y];
            }
            else
            {
                fromIcon = usedEvos[form.name];
            }

            form = pokedexEntries.find((p) => { return p.name == poke.evolutionMethods[i].to});
            altForm = pokedexEntries.find((p) => {return p.name.startsWith(form.name) && p.formid == poke.formid});
            if (altForm) form = altForm;
            if (!form)
            {
                form = pokedexEntries.find((p) => { return p.name == poke.evolutionMethods[i].to});
            }
            let x = fromIcon[1] + 160;
            let y = fromIcon[2];
            let icon = MakeFormIcon(x, y, form);

            usedEvos[form.name] = [icon, x, y, poke.evolutionMethods[i]];
            evoNames.push(form.name);
        }

        //Group icons by x position
        let evoGroups = [];
        let usedX = [];
        for (let key in usedEvos)
        {
            if (usedX.includes(usedEvos[key][1]))
            {
                evoGroups[usedX.indexOf(usedEvos[key][1])].push(usedEvos[key]);
            }
            else
            {
                evoGroups.push([usedEvos[key]]);
                usedX.push(usedEvos[key][1]);
            }
        }

        //Get total height
        let height = 0;
        for (let i = 0; i < evoGroups.length; i++)
        {
            if (evoGroups[i].length > height) height = evoGroups[i].length;
        }

        //Case for eevee
        if (height > 2)
        {
            for (let i = 0; i < evoGroups.length; i++)
            {
                for (let j = 0; j < evoGroups[i].length; j++)
                {
                    if (i == 0) evoGroups[i][j][0].style.left = 520 - 60 * (evoGroups[i].length - 1) + 120 * j;
                    else
                    {
                        evoGroups[i][j][0].style.left = 520 - 60 * (evoGroups[i].length - 1) + 120 * j;
                        evoGroups[i][j][0].style.top = 640;
                        MakeEvoLabel(440 - 60 * (evoGroups[i].length - 1) + 120 * j, 540 + 60 * (j % 2), evoGroups[i][j][3])
                    }
                }
            }
        }
        else
        {
            let startX = evoGroups.length >= 3 ? 300 : 440;
            let startY = height == 1 ? 440 : 520;
            for (let i = 0; i < evoGroups.length; i++)
            {
                for (let j = 0; j < evoGroups[i].length; j++)
                {
                    evoGroups[i][j][0].style.left = startX + 280 * i;
                    evoGroups[i][j][0].style.top = startY - 80 * (evoGroups[i].length - 1) + 160 * j;
                    if (i != 0)
                        MakeEvoLabel(startX + 280 * i - 220, startY - 80 * (evoGroups[i].length - 1) + 160 * j + 36, evoGroups[i][j][3])
                }
            }
        }
        evoHeight = height > 3 ? 740 : height > 2 ? 640 : height == 2 ? 600 : 560;
    }
    if (poke.forms.length > 8) evoHeight += 100;

    let eggGroups = poke.eggGroups.length == 1 ? ("Egg Group: " + poke.eggGroups[0]) : ("Egg Groups: " + poke.eggGroups[0] + ", " + poke.eggGroups[1]);
    document.getElementById("miscText").innerHTML = "Level Rate: " + poke.levelRate + "<br>EV Yield: " + poke.evYield + "<br>" + eggGroups;
    //if (resetForms)
    {
        document.getElementById("miscText").style.top = evoHeight;
        document.getElementById("locationText").style.top = evoHeight + 160;
        document.getElementById("locationText").innerHTML = poke.locations.length == 0 ? "Locations: None" : 
            poke.locations.length == 1 ? "Location: " : "Locations: ";

        for (let i = 0; i < poke.locations.length; i++)
        {
            document.getElementById("locationText").innerHTML += poke.locations[i];
            if (i < poke.locations.length - 1) document.getElementById("locationText").innerHTML += ", ";
        }
        if (poke.locations.length > 8) evoHeight += 26 * (poke.locations.length - 8) / 4
        
        evoHeight += 80;
        document.getElementById("learnsetBox").parentElement.style.top = evoHeight + 160;
        document.getElementById("learnsetTMBox").parentElement.style.top = evoHeight + 160;
        document.getElementById("learnsetEggMovesBox").parentElement.style.top = evoHeight + 240 + 40 * poke.levelUpMoves.length;
        document.getElementById("learnsetTutorsBox").parentElement.style.top = evoHeight + 240 + 40 * poke.tms.length;
    }

    //Moves
    document.getElementById("learnsetBox").innerHTML = "";
    for (let i = 0; i < poke.levelUpMoves.length; i++)
    {
        let move = poke.levelUpMoves[i];

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[0]].type + ".png";
        document.getElementById("learnsetBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[0]].category + ".png";
        document.getElementById("learnsetBox").appendChild(t);

        document.getElementById("learnsetBox").innerHTML += "lv " + move[1] + "<br>";
        
        let label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = move[0];
        label.style.top = 40 * i;
        document.getElementById("learnsetBox").appendChild(label);

        t = document.createElement("div");
        t.className = "MovePopup";
        t.style.top = -120 + 40 * i + parseInt(document.getElementById("learnsetBox").parentElement.style.top);
        t.style.left = 480;
        t.innerHTML = "<u>" + move[0] + "</u><br>Power: " + (moveData[move[0]].category == "Status" || moveData[move[0]].power == 1 ? "---" : moveData[move[0]].power) + "&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + (moveData[move[0]].accuracy == "101" ? "---" : moveData[move[0]].accuracy) + "<br>" + moveData[move[0]].effects;
        document.getElementById("dexPage").appendChild(t);

        label = document.createElement("div");
        label.className = "HomeButton";
        label.style.width = 20;
        label.style.height = 20;
        label.style.top = 14 + 40 * i;
        label.style.left = 390;
        label.style.border = "4px outset rgb(128, 152, 168)";
        label.style.backgroundImage = "url('../Images/QuestionMark.png')"
        document.getElementById("learnsetBox").parentElement.append(label);
        label.addEventListener("mousedown", () =>
        {
            t.style.display = "block";
        });
        label.addEventListener("mouseleave", () =>
        {
            t.style.display = "none";
        });
    }
    document.getElementById("learnsetBox").parentElement.style.height = poke.levelUpMoves.length * 40 + 12;

    //TMs
    document.getElementById("learnsetTMBox").innerHTML = "";
    for (let i = 0; i < poke.tms.length; i++)
    {
        let move = poke.tms[i];

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].type + ".png";
        document.getElementById("learnsetTMBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].category + ".png";
        document.getElementById("learnsetTMBox").appendChild(t);

        document.getElementById("learnsetTMBox").innerHTML += tms[move] + "<br>";
        
        let label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = move;
        label.style.top = 40 * i;
        document.getElementById("learnsetTMBox").appendChild(label);

        t = document.createElement("div");
        t.className = "MovePopup";
        t.style.top = -120 + 40 * i + parseInt(document.getElementById("learnsetTMBox").parentElement.style.top);
        t.style.left = 450;
        t.innerHTML = "<u>" + move + "</u><br>Power: " + (moveData[move].category == "Status" || moveData[move].power == 1 ? "---" : moveData[move].power) + "&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + (moveData[move].accuracy == "101" ? "---" : moveData[move].accuracy) + "<br>" + moveData[move].effects;
        document.getElementById("dexPage").appendChild(t);

        label = document.createElement("div");
        label.className = "HomeButton";
        label.style.width = 20;
        label.style.height = 20;
        label.style.top = 14 + 40 * i;
        label.style.left = 390;
        label.style.border = "4px outset rgb(128, 152, 168)";
        label.style.backgroundImage = "url('../Images/QuestionMark.png')"
        document.getElementById("learnsetTMBox").parentElement.append(label);
        label.addEventListener("mousedown", () =>
        {
            t.style.display = "block";
        });
        label.addEventListener("mouseleave", () =>
        {
            t.style.display = "none";
        });
    }
    document.getElementById("learnsetTMBox").parentElement.style.height = Math.max(poke.tms.length * 40 + 12, 40);

    //Egg Moves
    document.getElementById("learnsetEggMovesBox").innerHTML = "";
    for (let i = 0; i < poke.eggMoves.length; i++)
    {
        let move = poke.eggMoves[i];

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].type + ".png)";
        document.getElementById("learnsetEggMovesBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].category + ".png)";
        document.getElementById("learnsetEggMovesBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 64;
        t.style.top = -16 + 40 * i;
        t.style.left = 0;
        t.style.backgroundImage = "url(../Images/EggIcon.png)";
        t.style.pointerEvents = "none";
        document.getElementById("learnsetEggMovesBox").appendChild(t);
        
        let label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = move;
        label.style.top = 40 * i;
        label.style.left = -20;
        document.getElementById("learnsetEggMovesBox").appendChild(label);

        t = document.createElement("div");
        t.className = "MovePopup";
        t.style.top = -120 + 40 * i + parseInt(document.getElementById("learnsetEggMovesBox").parentElement.style.top);
        t.style.left = 480;
        t.innerHTML = "<u>" + move + "</u><br>Power: " + (moveData[move].category == "Status" || moveData[move].power == 1 ? "---" : moveData[move].power) + "&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + (moveData[move].accuracy == "101" ? "---" : moveData[move].accuracy) + "<br>" + moveData[move].effects;
        document.getElementById("dexPage").appendChild(t);

        label = document.createElement("div");
        label.className = "HomeButton";
        label.style.width = 20;
        label.style.height = 20;
        label.style.top = 14 + 40 * i;
        label.style.left = 390;
        label.style.border = "4px outset rgb(128, 152, 168)";
        label.style.backgroundImage = "url('../Images/QuestionMark.png')"
        document.getElementById("learnsetEggMovesBox").parentElement.append(label);
        label.addEventListener("mousedown", () =>
        {
            t.style.display = "block";
        });
        label.addEventListener("mouseleave", () =>
        {
            t.style.display = "none";
        });
    }
    document.getElementById("learnsetEggMovesBox").parentElement.style.height = Math.max(poke.eggMoves.length * 40 + 12, 40);

    //Tutors
    document.getElementById("learnsetTutorsBox").innerHTML = "";
    for (let i = 0; i < poke.tutors.length; i++)
    {
        let move = poke.tutors[i];

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[1]].type + ".png)";
        document.getElementById("learnsetTutorsBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[1]].category + ".png)";
        document.getElementById("learnsetTutorsBox").appendChild(t);

        if (move[0] != "0")
        {
            let cost = move[0].substring(0, move[0].length - 1);
            let shard = move[0].substring(move[0].length - 1, move[0].length);
            let shardIcon = shard == "r" ? "RedShard" : shard == "y" ? "YellowShard" : shard == "b" ? "BlueShard" : "GreenShard";
            t = document.createElement("div");
            t.className = "TypeIcon";
            t.style.height = 48;
            t.style.top = 2 + 40 * i;
            t.style.left = 32;
            t.style.backgroundImage = "url(../Images/" + shardIcon + ".png)";
            t.style.pointerEvents = "none";
            document.getElementById("learnsetTutorsBox").appendChild(t);
        
            let label = document.createElement("div");
            label.className = "learnsetMoveText";
            label.style.display = "inline-block";
            label.innerHTML = cost;
            label.style.top = 40 * i;
            label.style.right = 404;
            document.getElementById("learnsetTutorsBox").appendChild(label);
        }
        
        label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = move[1];
        label.style.top = 40 * i;
        document.getElementById("learnsetTutorsBox").appendChild(label);

        t = document.createElement("div");
        t.className = "MovePopup";
        t.style.top = -120 + 40 * i + parseInt(document.getElementById("learnsetTutorsBox").parentElement.style.top);
        t.style.left = 450;
        t.innerHTML = "<u>" + move[1] + "</u><br>Power: " + (moveData[move[1]].category == "Status" || moveData[move[1]].power == 1 ? "---" : moveData[move[1]].power) + "&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + (moveData[move[1]].accuracy == "101" ? "---" : moveData[move[1]].accuracy) + "<br>" + moveData[move[1]].effects;
        document.getElementById("dexPage").appendChild(t);

        label = document.createElement("div");
        label.className = "HomeButton";
        label.style.width = 20;
        label.style.height = 20;
        label.style.top = 14 + 40 * i;
        label.style.left = 390;
        label.style.border = "4px outset rgb(128, 152, 168)";
        label.style.backgroundImage = "url('../Images/QuestionMark.png')"
        document.getElementById("learnsetTutorsBox").parentElement.append(label);
        label.addEventListener("mousedown", () =>
        {
            t.style.display = "block";
        });
        label.addEventListener("mouseleave", () =>
        {
            t.style.display = "none";
        });
    }
    document.getElementById("learnsetTutorsBox").parentElement.style.height = Math.max(poke.tutors.length * 40 + 12, 40);
}

function MakeFormIcon(x, y, poke)
{
    let icon = document.createElement("div");
    icon.className = "PokeFormIcon"
    icon.zIndex = 12;
    icon.style.backgroundImage = poke.icon;
    icon.style.top = y;
    icon.style.left = x;
    icon.addEventListener("click", function() {
        OpenPokedexEntry(poke, true);
    });
    document.getElementById("formList").appendChild(icon);
    return icon;
}

function MakeEvoLabel(x, y, evo)
{
    let s = "";
    if (evo.method == 1) s += "Friendship";
    else if (evo.method == 2) s += "Friendship\n(day)";
    else if (evo.method == 3) s += "Friendship\n(night)";
    else if (evo.method == 4) s += "Lv. " + evo.parameter;
    else if (evo.method == 5) s += "Trade";
    else if (evo.method == 6) s += "Trade with\n" + evo.parameter;
    else if (evo.method == 7) s += "Trade Karra /\nShelmet";
    else if (evo.method == 8) s += evo.parameter;
    else if (evo.method == 9) s += "Lv. " + evo.parameter + "\nAtt > Def";
    else if (evo.method == 10) s += "Lv. " + evo.parameter + "\nAtt = Def";
    else if (evo.method == 11) s += "Lv. " + evo.parameter + "\nAtt < Def";
    else if (evo.method == 12) s += "Lv. " + evo.parameter + "\nPers < 5";
    else if (evo.method == 13) s += "Lv. " + evo.parameter + "\nPers > 5";
    else if (evo.method == 14) s += "Lv. " + evo.parameter;
    else if (evo.method == 15) s += "Lv. " + evo.parameter + " with\nfree slot";
    else if (evo.method == 16) s += "Beauty";
    else if (evo.method == 17) s += evo.parameter + "\n(Male)";
    else if (evo.method == 18) s += evo.parameter + "\n(Female)";
    else if (evo.method == 19 || evo.method == 20) s += "Level up with\n" + evo.parameter;
    else if (evo.method == 21) s += "Level up with\n" + evo.parameter;
    else if (evo.method == 22) s += "Level up with\n" + evo.parameter;
    else if (evo.method == 23) s += "Lv. " + evo.parameter + "\n(Male)";
    else if (evo.method == 24) s += "Lv. " + evo.parameter + "\n(Female)";
    else if (evo.method == 25) s += "Chargestone\nCave";
    else if (evo.method == 26) s += "Moss Rock";
    else if (evo.method == 27) s += "Icy Rock";

    let text = document.createElement("div");
    text.className = "EvoLabel"
    text.zIndex = 12;
    text.style.width = 256;
    if (s.includes('\n')) text.style.top = y - 12;
    else text.style.top = y;
    text.style.left = x;
    text.innerHTML = s;
    document.getElementById("formList").appendChild(text);
    return text;
}

type1Colors = {
    "Normal" : "#C6C6A7",
    "Grass" : "#A7DB8D",
    "Fire" : "#F5AC78",
    "Water" : "#9DB7F5",
    "Electric" : "#FAE078",
    "Ice" : "#BCE6E6",
    "Bug" : "#C6D16E",
    "Poison" : "#C183C1",
    "Flying" : "#C6B7F5",
    "Fighting" : "#D67873",
    "Rock" : "#D1C17D",
    "Ground" : "#EBD69D",
    "Psychic" : "#FA92B2",
    "Dark" : "#A29288",
    "Ghost" : "#A292BC",
    "Dragon" : "#A27DFA",
    "Steel" : "#D1D1E0",
};

type2Colors = {
    "Normal" : "#6D6D4E",
    "Grass" : "#4E8234",
    "Fire" : "#9C531F",
    "Water" : "#445E9C",
    "Electric" : "#A1871F",
    "Ice" : "#638D8D",
    "Bug" : "#6D7815",
    "Poison" : "#682A68",
    "Flying" : "#6D5E9C",
    "Fighting" : "#7D1F1A",
    "Rock" : "#786824",
    "Ground" : "#927D44",
    "Psychic" : "#A13959",
    "Dark" : "#49392F",
    "Ghost" : "#493963",
    "Dragon" : "#4924A1",
    "Steel" : "#787887",
};