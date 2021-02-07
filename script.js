// find food item by 1st letter
    const row= document.querySelector(".food-row");
    const input= document.querySelector(".search");
    const button= document.querySelector(".input");

    const FoodFest= foods => foods !==null ?  showOutput(foods) : row.innerHTML=noResults;
    const showOutput = (foods) =>{
        row.innerHTML="";
        foods.forEach(food =>row.innerHTML+=(Output(food.strMeal,food.strMealThumb)))
    };
    const noResults = `<h1 class="no-result">No Results.</h1>`;
    const searchFoodItem = foodGenre =>{
        if(foodGenre==="") {row.innerHTML=noResults; }
        else{
            row.innerHTML=`<div class="lds-ring"><div></div><div></div></div>`;
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodGenre}`)
            .then(res => res.json())
            .then(data => FoodFest(data.meals))
            .catch(err => row.innerHTML=noResults);
        }
    };
 
    searchFoodItem("");

const Output= (foodName,imgUrl) => {
return `
<div class="food-card">
<div style="background-image:url(${imgUrl})" class="food-img"></div>
<div style="font-size:${(foodName.length) >=26 ? 0.8 : 1.1  }rem" class="food-name"><span>${foodName}</span></div>
</div>`
}

