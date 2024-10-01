export const cleanDescription = (description: string): string => {
    let isFirstPassive = true; // 첫 passive 확인용

    return description
        .replace(/<br\s*\/?>/g, " ") // <br> 태그를 공백으로 변환
        .replace(/<passive>(.*?)<\/passive>/g, (_, p1) => {
            // 첫 번째 passive 일 경우 passive:로 변환
            const result = isFirstPassive ? `${p1}:` : p1;
            isFirstPassive = false; // 이후는 태그 제거로 변경
            return result;
        })
        .replace(/<[^>]+>/g, "") // 나머지 태그 및 내부 문자열 제거
        .replace(/\s+/g, " ") // 연속 공백을 하나로 합침
        .replace(/,+/g, ",") // 연속 쉼표를 하나로 합침
        .trim(); // 앞뒤 공백 제거함
};
