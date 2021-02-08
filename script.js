    const row= document.querySelector(".food-row");
    const input= document.querySelector(".search");
    const button= document.querySelector(".input");
    const card= document.querySelectorAll(".food-card");

    const FoodFest= foods => foods !==null ?  showOutput(foods) : row.innerHTML=noResults;
    const showOutput = (foods) =>{
        row.innerHTML=foods.map(food =>`<div id="${food[0]}" onclick="myFunc()" class="food-card">
            <div style="background-image:url(${food[2]})" class="food-img"></div>
            <div style="font-size:${(food[1]) >=26 ? 0.8 : 1.1}rem" class="food-name"><span>${food[1]}</span></div>
            </div>`)};

    const noResults = `<h1 class="no-result">No Results.</h1>`;

    const searchFoodItem = foodGenre =>{
        if(foodGenre==="") {row.innerHTML=noResults;}
        else{
            row.innerHTML=`<div class="lds-ring"><div></div><div></div></div>`;
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodGenre}`)
            .then(res => res.json())
            .then(data => {FoodFest(Ingredient(data.meals));
            })
            .catch(err => row.innerHTML=noResults);
        }
    };
 
    searchFoodItem("");

    const Ingredient= foodName => {
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

    const myFunc=()=>{
        console.log("object")
    }
    