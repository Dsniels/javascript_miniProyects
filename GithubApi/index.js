const getUser = username => {
    if(!username) throw new Error("No se ingreso un usuario"); 
    fetch(`https://api.github.com/users/${username}`).then(response => response.json())
    .then(data =>{
        const userImageElement = document.createElement('img');
        userImageElement.src = data.avatar_url;
        userImageElement.style.width = '150px';
        userImageElement.style.height = '150px';
        userImageElement.style.borderRadius = '50%';
        const userNameElement = document.createElement('h2');
        userNameElement.textContent = data.name;
        userNameElement.style.fontSize = '24px';

        const userDescripcionElement = document.createElement('p');
        userDescripcionElement.textContent = data.company;
        userDescripcionElement.style.fontSize = '18px';

        const perfil = document.getElementById('perfil');
        perfil.innerHTML = '';
        perfil.appendChild(userImageElement);
        perfil.appendChild(userNameElement);
        perfil.appendChild(userDescripcionElement);
        if(data.blog !== ''){
            const userBlogElement = document.createElement('a');
            userBlogElement.href = data.blog;
            userBlogElement.textContent = userBlogElement.href;
            perfil.appendChild(userBlogElement);

        }        
    }).catch(error => {
        console.log('Error: ', error);
    });
}

const getCharacter = async () => {
    return new Promise( (resolve, reject) =>{
        fetch('https://swapi.dev/api/people/?search=r2').then(response => resolve(response.json())).catch(err => reject(err))
    });
   
};

const characters = getCharacter().then(data => console.log(data.results[0]))


const form = document.querySelector('form');
form.addEventListener('submit',e => {
    try {
        e.preventDefault();
        getUser(form.elements.search.value);
    } catch (error) {
        window.alert(error.message);
    }

});
