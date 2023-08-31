const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&';
const API_URL_FAVOURITES= 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD_IMG = 'https://api.thecatapi.com/v1/images/upload'
const spanError = document.querySelector('error');
const btnRandom = document.querySelector('#btn_Random');

btnRandom.addEventListener('click', loadRandomCats);

 async function loadRandomCats(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    

   if (res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteCat(data[0].id);
    btn2.onclick = () => saveFavouriteCat(data[1].id);
    }}

    async function loadFavouritesCats(){
        const res = await fetch(API_URL_FAVOURITES, {
            method: 'GET',
            headers: {
            'X-API-KEY':'live_DQobmzpMwwWskKun91bE3rnSTAxXMpiGAvSxyFQzKO4Dk280xNEnsRemFGHSjSHC'
            }
        });
        const data = await res.json();

        if (res.status !== 200){
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        } else {
            const section = document.getElementById('favourites_cats');
            section.innerHTML = "";
            const h2 = document.createElement('h2');
            const h2Text = document.createTextNode('Favoritos');
            h2.appendChild(h2Text)
            section.appendChild(h2);
            data.forEach(cat=> {
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                btn.onclick = () => deleteFavouriteCat(cat.id);
                const btnText = document.createTextNode('Sacar el gato de favoritos');

                img.src = cat.image.url
                img.width = 150;
                btn.appendChild(btnText);
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);
            });
        }};

    async function saveFavouriteCat(id){
        const res = await fetch(API_URL_FAVOURITES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY':'live_DQobmzpMwwWskKun91bE3rnSTAxXMpiGAvSxyFQzKO4Dk280xNEnsRemFGHSjSHC'
            },
            body: JSON.stringify({
                image_id: id
            }),
        });

        console.log("messi", res)
        const data = await res.json();

        if (res.status !== 200){
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        }else{
            loadFavouritesCats();
        }
    }

    async function deleteFavouriteCat(id){
        const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
            method: 'DELETE',
            headers:{
            'X-API-KEY':'live_DQobmzpMwwWskKun91bE3rnSTAxXMpiGAvSxyFQzKO4Dk280xNEnsRemFGHSjSHC'
        }
        });

        console.log("messi", res)
        const data = await res.json();

        if (res.status !== 200){
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        }else{
            loadFavouritesCats();
        }
    }

    async function UploadCatImg(){
      const form = document.getElementById('uploadingForm');
      const formData = new FormData(form);

       console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD_IMG, {
        method: 'POST',
        headers: {
            'X-API-KEY':'live_DQobmzpMwwWskKun91bE3rnSTAxXMpiGAvSxyFQzKO4Dk280xNEnsRemFGHSjSHC'
        },
        body: formData,
    })
    const data = await res.json();

    if (res.status !== 201){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        saveFavouriteCat(data.id);
    }
}

    loadRandomCats();
    loadFavouritesCats();