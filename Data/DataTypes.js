iconSwaps =
{
    69: 722,
    70: 723,
    71: 724,
    287: 656,
    288: 657,
    289: 658,
    290: 653,
    291: 654,
    292: 655,
    16: 661,
    17: 662,
    18: 663,
    535: 704,
    536: 705,
    537: 706,
    265: 0,
    266: 0,
    267: 0,
    268: 0,
    269: 0,
    225: 0,
    441: 0,
    401: 0,
    402: 0,
    52: 0,
    53: 0,
    431: 0,
    432: 0,
};

hiddenForms =
[
    "Vulpix",
    "Ninetales"
];

class Pokemon
{
    constructor(id, name, baseid, formid, baseStats, oldStats, types, abilities, evYield, genderRatio, levelRate, levelUpMoves, tms, eggMoves, eggGroups, tutors, evolutionMethods, forms, locations)
    {
        this.id = id;
        this.name = name;
        this.baseid = baseid;
        this.formid = formid;

        this.sprite = 'url("../DexSprites/' + name + '.png")';
        this.icon = 'url("../IconSprites/' + name + '.png")';

        this.baseStats = baseStats;
        this.baseHP = baseStats[0];
        this.baseAtt = baseStats[1];
        this.baseDef = baseStats[2];
        this.baseSpA = baseStats[3];
        this.baseSpD = baseStats[4];
        this.baseSpe = baseStats[5];
        this.baseStatTotal = this.baseHP + this.baseAtt + this.baseDef + this.baseSpA + this.baseSpD + this.baseSpe;

        this.oldbaseStats = oldStats;
        this.oldBaseHP = oldStats[0];
        this.oldBaseAtt = oldStats[1];
        this.oldBaseDef = oldStats[2];
        this.oldBaseSpA = oldStats[3];
        this.oldBaseSpD = oldStats[4];
        this.oldBaseSpe = oldStats[5];
        this.oldBaseStatTotal = this.oldBaseHP + this.oldBaseAtt + this.oldBaseDef + this.oldBaseSpA + this.oldBaseSpD + this.oldBaseSpe;

        this.type1 = types[0];
        this.type2 = types[1];
        this.ability1 = abilities[0];
        this.ability2 = abilities[1];
        this.ability3 = abilities[2];

        this.evYield = evYield;
        this.genderRatio = genderRatio;
        this.levelRate = levelRate;

        this.levelUpMoves = levelUpMoves;
        this.tms = tms;
        this.eggMoves = eggMoves;
        this.eggGroups = eggGroups;
        this.tutors = tutors;

        this.tutors.sort((a, b) =>
        {
            let cost1 = a[0].substring(0, a[0].length - 1);
            let type1 = a[0].substring(a[0].length - 1, a[0].length);
            let cost2 = b[0].substring(0, b[0].length - 1);
            let type2 = b[0].substring(b[0].length - 1, b[0].length);
            return shardID[type1] == shardID[type2] ? Number(cost1) - Number(cost2) : shardID[type1] - shardID[type2];
        });

        this.evolutionMethods = evolutionMethods;
        this.forms = forms;
        this.locations = locations;
    }
}

shardID = {
    "0" : 0,
    "r" : 1,
    "b" : 2,
    "y" : 3,
    "g" : 4,
}

class MoveData
{
    constructor(id, name, type, category, power, accuracy, pp, effects)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.pp = pp;
        this.effects = effects;
    }
}

class EvolutionMethod
{
    constructor(from, to, method, parameter)
    {
        this.from = from;
        this.to = to;
        this.method = method;
        this.parameter = parameter;
    }
}