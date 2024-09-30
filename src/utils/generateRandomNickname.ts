// 형용사 배열
const adjectives = [
    "귀여운",
    "용감한",
    "상냥한",
    "멋진",
    "신비한",
    "재빠른",
    "차가운",
    "뜨거운",
    "행복한",
    "슬픈",
    "조용한",
    "활기찬",
    "친절한",
    "똑똑한",
    "강력한",
    "은은한",
    "순수한",
    "기쁜",
    "달콤한",
    "날렵한",
];

// 명사 배열
const nouns = [
    "호랑이",
    "여우",
    "강아지",
    "고양이",
    "늑대",
    "독수리",
    "사자",
    "토끼",
    "펭귄",
    "판다",
    "부엉이",
    "곰",
    "사슴",
    "여왕",
    "왕",
    "용",
    "해적",
    "마법사",
    "기사",
    "도깨비",
];

// 랜덤으로 배열에서 단어를 선택하는 함수
const getRandomElement = (arr: string[]): string => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

// 랜덤 한글 닉네임 생성 함수
export const generateRandomNickname = (): string => {
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    return `${adjective} ${noun}`;
};
