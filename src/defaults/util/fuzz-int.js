function fuzzInt(number, fuzzRatio){
    if (fuzzRatio === 0) return number;
  
    let ratioChunk = number * fuzzRatio;
    let randChunk = Math.floor(Math.random() * Math.floor(ratioChunk));
    let randSign = Math.random() < 0.5 ? -1 : 1;
    
    return number + (randSign * randChunk);
    
}

export default fuzzInt;