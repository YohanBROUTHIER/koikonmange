

export default function formatterSecondesTime(totalTime){
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const secondes = totalTime % 60;
    return `${hours}:${minutes}:${secondes}`;
}