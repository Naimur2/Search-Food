const FoodDetails= foodName => {
    let Details =[];
    let arr =[];
    let image;
    let id;
    let nameOfFood;
    foodName.forEach((obj)=> {
    let result = Object.keys(obj).map((key) => [key, obj[key]]);
    result.forEach(prop => {
         id = result[0][1];
         nameOfFood = result[1][1];
        if (prop[0].includes('strIng') && prop[0]!==null && prop[1]!=="") arr.push(prop[1]);
        if  (prop[0].includes('strMealThumb') ) image = prop[1];
        
    });
  Details.push([id,nameOfFood,image,arr]);   
});
return Details;
}

export default FoodDetails;