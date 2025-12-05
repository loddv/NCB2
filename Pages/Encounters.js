let groups = {
    "First Gym" : ["Aspertia City", "Route 19", "Route 20", "Floccesy Ranch"],
    "Second Gym" : ["Virbank City", "Virbank Complex 1", "Virbank Complex 2"],
    "Third Gym" : ["Castelia Sewers", "Relic Passage 1", "Castelia Garden", "Route 4", "Pinwheel Forest 1"],
    "Fourth Gym" : ["Desert Resort", "Relic Castle 1", "Route 5", "Route 16", "Lostlorn Forest", "Pinwheel Forest 2", "Route 3", "Wellspring Cave", "Striaton City", "Dreamyard 1", "Dreamyard 2"],
    "Fifth Gym" : ["Route 6", "Chargestone Cave", "Clay Tunnel", "Twist Mountain"],
    "Sixth Gym" : ["Relic Passage 2", "Relic Castle 2", "Mistralton Cave", "Route 7", "Celestial Tower"],
    "Seventh Gym" : ["Reversal Mountain 1", "Strange House", "Reversal Mountain 2", "Undella Town", "Undella Bay", "Seaside Cave", "Route 14", "Abundant Shrine", "Route 13", "Route 12", "Village Bridge", "Route 11", "Route 9"],
    "Eighth Gym" : ["Route 21", "Route 22", "Giant Chasm 1"],
    "Elite Four" : ["Giant Chasm 2", "Route 23", "Victory Road"],
}

function SetupCategories()
{
    let text = [
        "First Gym",
        "Second Gym",
        "Third Gym",
        "Fourth Gym",
        "Fifth Gym",
        "Sixth Gym",
        "Seventh Gym",
        "Eighth Gym",
        "Elite Four",
    ];
    for (let i = 0; i < 9; i++)
    {
        document.getElementById('head').appendChild(document.createElement("br"));
        let b = document.createElement("div");
        b.className = "CategoryButton";
        b.innerHTML = text[i];
        b.style.left = 128 + 192 * i;
        b.style.top = 92;
        b.style.zIndex = 20;
        let str = text[i];
        b.addEventListener ("click", function() {
            OpenTab(str);
        });
        document.getElementById('head').append(b);
    }

    document.getElementById('seasonDropdown').selectedIndex = new Date().getMonth() % 4;

    currentPool = "";

    OpenTab("First Gym");
    LoadPool("Aspertia City");
}

function OpenTab(text)
{
    document.getElementById('dexBG').innerHTML = "";
    for (let id in groups[text])
    {
        if (!pokedexEntries[id].name.includes("("))
        {
            document.getElementById('dexBG').appendChild(document.createElement("br"));
            let b = document.createElement("button");
            b.className = "PoolEntry";
            let str = groups[text][id];
            b.addEventListener ("click", function() {
                LoadPool(str);
            });
            b.innerHTML = groups[text][id];
            b.style.zIndex = 1;

            document.getElementById('dexBG').append(b);
        }
    }
    state[0] = text;
}

function LoadPool(pool)
{
    if (currentPool == pool) return;

    document.getElementById("poolTitle").innerHTML = pool;
    currentPool = pool;

    let dropdown = "";
    for (let t in encounterPools[pool][document.getElementById('seasonDropdown').value])
    {
        let str = encounterPools[pool][document.getElementById('seasonDropdown').value][t][0];
        dropdown += '<option value="' + t + '">' + str + '</option>';
    }
    document.getElementById('typeDropdown').innerHTML = dropdown;

    LoadPieChart(pool);
    state[1] = pool;
}

function LoadPieChart(pool)
{
    document.getElementById('chart').innerHTML = "";
    let type = document.getElementById('typeDropdown').value;
    let season = document.getElementById('seasonDropdown').value;
    let pie = "conic-gradient(gray 0";
    let start = 0;
    let dim = {};
    for (let i = 1; i < encounterPools[pool][season][type].length; i += 2)
    {
        let name = encounterPools[pool][season][type][i];
        let rate = encounterPools[pool][season][type][i + 1];
        let poke = pokedexEntries.find((p) => p.name == name);
        if (!poke) poke = pokedexEntries.find((p) => name.startsWith(p.name));
        
        let typeColor = poke.type1 == "Normal" && poke.type2 != "Normal" ? poke.type2 : poke.type1;
        let color = hexToRgb(type1Colors[typeColor]);
        if (typeColor in dim)
        {
            color.r = Math.round(color.r * dim[typeColor]);
            color.g = Math.round(color.g * dim[typeColor]);
            color.b = Math.round(color.b * dim[typeColor]);
            dim[typeColor] *= 0.9;
        }
        else dim[typeColor] = 0.9;
        pie += ", " + rgbToHex(color.r, color.g, color.b) + " ";
        pie += start + "deg " + (start + 360 * rate) + "deg";

        let icon = document.createElement("div");
        icon.className = "PoolPokemonIcon";
        icon.style.backgroundImage = poke.sprite;

        let ang = start + 360 * rate / 2 - 90;
        let size = 220 - encounterPools[pool][season][type].length * 3;
        icon.style.width = size;
        icon.style.height = size;
        icon.style.left = 550 - size / 2 + Math.cos(ang * (Math.PI/180)) * 220;
        icon.style.top = 300 - size / 2 + Math.sin(ang * (Math.PI/180)) * 220;
        icon.style.lineHeight = (300 - 4 * encounterPools[pool][season][type].length) + "px";
        icon.innerHTML = (rate * 100) + "%";
        
        icon.addEventListener("click", function() {
            OpenPokedexEntry(poke);
        });
        let hitbox = document.createElement("div");
        hitbox.className = "PokeHitbox";
        hitbox.style.width = size / 2;
        hitbox.style.height = size / 2;
        hitbox.style.top = size / 4;
        hitbox.style.left = size / 4;
        icon.appendChild(hitbox);

        document.getElementById('chart').appendChild(icon);
        start += 360 * rate;
    }
    pie += ")"

    document.getElementById("piechart").style.backgroundImage = pie;
}

function componentToHex(c)
{
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
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
    "Fairy" : "#FAB2E2",
};

var state = ["", ""];

function OpenPokedexEntry(poke)
{
    history.pushState(state, document.title, location.pathname);
    window.location.replace("Pokedex.html?Pokemon=" + poke.name);
}