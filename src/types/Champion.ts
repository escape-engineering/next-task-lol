//TODO - 타입 리팩토링 필요
export type ChampionList = {
    type: string;
    format: string;
    version: string;
    data: {
        [key: string]: Champion;
    };
};

export type Champion = {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficultiy: number;
    };
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    tags: string[];
    partype: string;
    stats: {
        hp: number;
        hpperlevel: number;
        mp: number;
        mpperlevel: number;
        movespeed: number;
        armor: number;
        armorperlevel: number;
        spellblock: number;
        spellblockperlevel: number;
        attackrange: number;
        hpregen: number;
        hpregenperlevel: number;
        mpregen: number;
        mpregenperlevel: number;
        crit: number;
        critperlevel: number;
        attackdamage: number;
        attackdamageperlevel: number;
        attackspeedperlevel: number;
        attackspeed: number;
    };
};

export interface ChampionDetail {
    type: string;
    format: string;
    version: string;
    data: {
        [key: string]: ChampionData;
    };
}

interface ChampionData {
    id: string;
    key: string;
    name: string;
    title: string;
    image: ChampionImage;
    skins: Skin[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: ChampionInfo;
    stats: ChampionStats;
    spells: Spell[];
    passive: Passive;
    recommended: [];
}

interface ChampionImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Skin {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
}

interface ChampionInfo {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}

interface ChampionStats {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}

export interface Spell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    leveltip: LevelTip;
    maxrank: number;
    cooldown: number[];
    cost: number[];
    range: number[];
    image: ChampionImage;
    resource: string;
}

interface LevelTip {
    label: string[];
    effect: string[];
}

interface Passive {
    name: string;
    description: string;
    image: ChampionImage;
}
