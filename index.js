//  api-key: c54d2e27; 
const watchlistBtn = document.getElementById('watchlist-btn')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const watchlistMainEl = document.getElementById('watchlist-main')
const main = document.getElementById('main')
let dataHtml;
let moviesArray = [];

searchInput.addEventListener('keyup' , handleAction)
searchBtn.addEventListener('click' , handleAction)

function handleAction(event){
    if (event.key === 'Enter' || event.type === 'click') {
        fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=c54d2e27`) 
            .then(res =>res.json())
            .then(SearchData => {             
                try{
                    document.getElementById('main').innerHTML = ``
                    const movies = SearchData.Search.map(movie => renderMovies(movie))   
                } 
                
                catch(error){
                    document.getElementById('main').innerHTML = `
                    <h1 class='error'> Search returned no results! </h1>
                    `
                }
            })
    }
    
    
    
}


function addToWatchlist(event){
    const imdbID = event.target.getAttribute(`id`)
        fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=95ff048`)
                    .then((res) => res.json())
                    .then( data =>{
                        movieHtml(data)
                moviesArray.push(movieHtml(data))
            localStorage.setItem('movie' , moviesArray )
            })
    localStorage.setItem('movie' , dataHtml) 
    
        
           
}






function renderMovies(movie){  
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=short&apikey=95ff048`)
                        .then((res) => res.json())
                        .then( data => {
                            movieHtml(data)       
                document.getElementById('main').innerHTML+= dataHtml
                              
      })
}





function movieHtml(data , button){
      let {Title , Poster , Plot , imdbRating , Genre , Runtime , imdbID} = data 
              return  dataHtml = `
                <div class="container"> 
                    <img src=${Poster}> 
                        <div class="info-container"> 
                            <div class="title">
                                <h3>${Title}</h3>
                                <div class="score">      
                                    <p class="star"> &#9733; </p>
                                    <p class="rating"> ${imdbRating} </p>
                            </div>
                        </div>
                                
                    <div class="info">
                            <p class="time"> ${Runtime} </p>
                            <p class="genre"> ${Genre} </p>
                            <div class="add-btns">
                                <i class="fas fa fa-plus-circle"></i>
                            <button onClick="addToWatchlist(event)" class="watchlist-btn" id="${imdbID}">Watchlist</button>
                            </div>
                            </div>
                            <p class="description"> 
                                ${Plot}
                            </p>
                    
                    </div>
                </div> `
}




searchInput.addEventListener('keyup' , handleAction)


searchBtn.addEventListener('click' , handleAction)






    


   
            



            




            