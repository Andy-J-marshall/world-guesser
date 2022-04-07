export function capitalizeText(stringArray) {
    let stringArrayAsString = '';
    stringArray.forEach((originalString, index) => {
        const splitString = originalString.split(' ');
        splitString.forEach((word, index, array) => {
            array[index] = array[index].charAt(0).toUpperCase() + array[index].slice(1);
        })
        const capitalizedString = splitString.join(' ');
        stringArrayAsString = index === 0 ? capitalizedString : stringArrayAsString + ', ' + capitalizedString;
        stringArrayAsString = stringArrayAsString.replace(' And ', ' & ');
    });
    return stringArrayAsString;
}

export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
