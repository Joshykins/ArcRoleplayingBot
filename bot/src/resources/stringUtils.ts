export const FormatNumberWithCommas = (input : number): string => {
    let output : string = input.toLocaleString()

    return output;
}
export const FormatWithOrdinalSuffix = (input : number): string => {
    let s = ["th", "st", "nd", "rd"],
    v = input % 100;
    
    return input + (s[(v - 20) % 10] || s[v] || s[0]);
}