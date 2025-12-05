sections = [
    [
        "System Changes",
        "Added the Fairy type to the game",
        "Steel no longer resists Dark and Ghost type moves",
        "Ice now resists Water, Flying, and Dragon type moves",
        "Fairy no longer resists Bug type moves",
        "Bug now resists Fairy type moves",
        "",
        "",
        "Critical hit rates have been changed to the following: (note that they still deal 2x damage)",
        "1/24 chance by default",
        "1/8 chance at +1",
        "1/4 chance at +2",
        "1/2 chance at +3",
        "guaranteed at +4",
        "",
        "",
        "Ghost type Pokemon are now immune to hail damage",
        "Enemy trainers now know your Pokemon's ability at all times (this primarily fixes the ability storage bug, but it also evens the playing field with many players using docs to know the opponent's abilities)"
    ],
    [
        "Ability Changes",
        "Overcoat now boosts defense by 30% when any weather condition is active",
        "Adaptability no longer boosts stab moves, instead it boosts super effective hits by 20%",
        "Rivalry no longer reduces damage to Pokemon of the same gender as the user",
        "Overgrow, Blaze, Torrent, and Swarm now boost damage by 30% when below half health instead of by 50% below 1/3 health",
        "Heatproof now makes the user immune to burn",
        "Thick Fat now makes the user immune to hail damage",
        "Chlorophyll, Swift Swim, and Sand Rush boost speed by 50% instead of doubling speed",
        "Water Veil now converts Normal type moves to Water in addition to its normal effect",
        "Forecast now extends the duration of weather moves to 8 turns and has a new form for sandstorm",
        "Speed Boost now raises speed on kill instead of every turn",
        "Plus and Minus now boost the power of all allied Pokemon electric type moves (not including the user's) by 50%",
        "Illuminate now boosts the accuracy of the user and allies by 20%",
        "Toxic Boost's damage increase reduced to 20%, but it now prevents damage taken from poison",
        "Sand Stream and Snow Warning now provide an immunity to their respective weather in the event that the user's type doesn't"
    ],
    [
        "New Abilities",
        "Slush Rush: Boosts speed by 50% in hail",
        "Centrifuge: Summons Gravity for 5 turns when the Pokemon switches in",
        "Pure Heart: Halves damage taken from Dark and Ghost type moves",
        "Fluffy: Boosts defense by 50% but doubles damage taken from fire type moves",
        "Grass Cloak: Restores hp each turn in sunlight",
        "Fly Trap: Restores hp when hit by a Bug type move",
        "Burning Fist: Contact moves have a 20% chance to burn the target",
        "Shimmering: Extends the duration of Light Screen, Reflect, Lucky Chant, Mist, and Safeguard by 3 turns",
        "Refrigerate: Boosts the power of Ice type moves by 50%",
        "Rampage: Using an attack repeatedly increases damage by 25% for each consecutive turn"
    ],
    [
        "Item Changes",
        "Focus Band's effect replaced with reducing damage by 33% when the user is at full health",
        "Thick Club now boosts attack by 50% instead of doubling attack",
        "Light Ball now boosts Sp. Att and Sp. Def by 50% and can be held by Pikachu, Plusle, Minun, Pachirisu, and Emolga",
        "Metronome's damage boost per turn increased to 25%",
        "Rose Incense now boosts the power of fairy type moves instead of grass type moves",
    ],
    [
        "New Items",
        "Reflex Herb: A one time use item that increase the priority of a status move by 1",
    ]
]

function SetupCategories()
{
    document.getElementById("dexBG").innerHTML = "";

    document.getElementById('dexBG').appendChild(document.createElement("br"));

    for (let s in sections)
    {
        let b = document.createElement("div");
        b.className = "ChangesSectionHeader";
        b.innerHTML = sections[s][0];
        b.style.zIndex = 1;
        document.getElementById('dexBG').append(b);

        let text = "<ul>";
        for (let s2 = 1; s2 < sections[s].length; s2++)
        {
            if (sections[s][s2].length == 0) text += "<br>";
            else text += "<li>" + sections[s][s2] + "</li>";
        }
        text += "</ui><br><br>";
        b = document.createElement("div");
        b.className = "ChangesSection";
        b.innerHTML = text;
        b.style.zIndex = 1;
        document.getElementById('dexBG').append(b);
    }
}

function OpenTab(text)
{
    
}