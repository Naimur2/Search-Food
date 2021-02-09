    const row= document.querySelector(".food-row");
    const backdrop = document.querySelector(".backdrop");
    
    const FoodFest= foods => foods !==null ?  showOutput(foods) : row.innerHTML=noResults;
    const showOutput = (foods) =>{
        row.innerHTML=foods.map(food =>`<div id="${food[0]}" onclick="myFunc(${food[0]})" class="food-card">
            <div style="background-image:url(${food[2]})" class="food-img"></div>
            <div style="font-size:${(food[1]) >=26 ? 0.8 : 1.1}rem" class="food-name"><span>${food[1]}</span></div>
            </div>`)
        };

    const noResults = `<h1 class="no-result">No Results.</h1>`;
    const searchFoodItem = foodGenre =>{
        if(foodGenre==="") {row.innerHTML=noResults;}
        else{
            row.innerHTML=`<div class="lds-ring"><div></div><div></div></div>`;
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodGenre}`)
            .then(res => res.json())
            .then(data => {FoodFest(FoodDetails(data.meals));
            })
            .catch(err => row.innerHTML=noResults);
        }
    };
    
    searchFoodItem("");
    
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
    
    const closeButton = document.querySelector(".modal-button__close");

    const closeModal = () =>{backdrop.style.display="none";
    
};

    function myFunc(id) {
  
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then((data) => {

             let  det=FoodDetails(data.meals);
             let name= det[0][1];
             let image= det[0][2];
             let dev="";
            det[0][3].forEach((item) =>  dev+=`<li class="ingredient">${item}</li>`) ;
            backdrop.innerHTML=`<div class="modal">
            <div class="modal-header"><h1 class="modal-title">Food Details</h1></div>
            <div class="modal-body">
            <div class="modal-image__container">         
              <div style="background-image:url('${image}')" class="modal-image"></div>
             <h2>${name}</h2>
            </div>
             <h3>Ingredients:</h3>
             <ul  class="ingredient-list">
               ${dev}
             </ul>
            </div>
            <div class="modal-footer">
              <button onclick="closeModal()" class="modal-button__close">Close</button>
            </div>`
           
        })
        .catch((err) => alert("Something went wrong"));
        backdrop.style.display="block";
        
    }



   