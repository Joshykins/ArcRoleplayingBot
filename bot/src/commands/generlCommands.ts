import { CommandInput } from "../commandResources/commandTypes";
import { MessageStandard } from "../resources/messageHelper";
import { FormatNumberWithCommas, FormatWithOrdinalSuffix } from "../resources/stringUtils";

export const Roll = async (input: CommandInput) : Promise<void> => {
    const { args, msg} = input;
    if(args[1] && args[1].indexOf("d") != -1) {
        const diceCount = parseInt(args[1].substr(0, args[1].indexOf("d")));
        const sides = parseInt(args[1].substr(args[1].indexOf("d")+1, args[1].length));

        if(diceCount > 10) {
            const min = diceCount;
            const max = diceCount*sides;
            const difference = Math.abs(max-min)+1;
            const decision = Math.floor(Math.random()*difference) + min;


            MessageStandard(
                msg.channel, 
                `Rolled a ${args[1]} and got ${FormatNumberWithCommas(decision)} \n (Too many die! Not listing individual rolls.)`
                );
        }
        else {
            let sum : number = 0;
            let throws : number[] = [];
            let throwMessages = ""
            for (let i = 0; i < diceCount; i++) {
                const result = Math.floor(Math.random()*sides)+1;
                throws.push(result);
                sum += result;
                throwMessages += `\n ${FormatWithOrdinalSuffix(i+1)} roll was ${FormatNumberWithCommas(result)}`
            }
            MessageStandard(
                msg.channel, 
                `Rolled a ${args[1]} and got ${FormatNumberWithCommas(sum)}.\n ${throwMessages}`
            );
        }
    }
    else {
        let diceCount = 1;
        let sides = 20;
        let sum : number = 0;
        let throws : number[] = [];
        let throwMessages = ""
        for (let i = 0; i < diceCount; i++) {
            const result = Math.floor(Math.random()*sides)+1;
            throws.push(result);
            sum += result;
            throwMessages += `\n ${FormatWithOrdinalSuffix(i+1)} roll was ${FormatNumberWithCommas(result)}`;
        }
        MessageStandard(
            msg.channel, 
            `Rolled a 1d20 and got ${FormatNumberWithCommas(sum)}.\n ${throwMessages}`
        );
    }
}
