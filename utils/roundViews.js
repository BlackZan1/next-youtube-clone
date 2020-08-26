export function roundViews(views, length, letter) {
    if((views / length) >= 1) {
        let roundedNum = Math.floor(views / length);

        if(roundedNum < 10) {
            let secondNum = views % length + ''

            roundedNum += `.${secondNum[0]}`;
        }

        views = roundedNum + letter;

        return views;
    }

    return views;
}