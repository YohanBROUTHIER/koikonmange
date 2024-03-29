

export default function secondesConverterFunction(times){
    const [hours, minutes, secondes] = times.split(':').map(Number);
    return hours * 3600 + minutes * 60 + secondes;
}

