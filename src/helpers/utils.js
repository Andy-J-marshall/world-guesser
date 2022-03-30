// TODO tidy up and rename

function capitalizeText(stringArray) {
    // TODO replace ' and ' with ' & '
    let stringArrayAsString = '';
    let count = 0;
    stringArray.forEach(string => {
        const originalString = string;
        const splitString = originalString.split(' ');
        for (let i = 0; i < splitString.length; i++) {
            splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
        }
        const capitalizedString = splitString.join(' ');
        if (count === 0) {
            stringArrayAsString = capitalizedString;
        } else {
            stringArrayAsString = stringArrayAsString + ', ' + capitalizedString;
        }
        count ++;
    });
    return stringArrayAsString;
}

export default capitalizeText;
