const getUser = username => {
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
        userDescripcionElement.textContent = data.bio;
        userDescripcionElement.style.fontSize = '18px';

        const userBlogElement = document.createElement('a');
        userBlogElement.href = data.blog;
        userBlogElement.textContent = userBlogElement.href;

        const perfil = document.getElementById('perfil');
        perfil.innerHTML = '';
        perfil.appendChild(userImageElement);
        perfil.appendChild(userNameElement);
        perfil.appendChild(userDescripcionElement);
        perfil.appendChild(userBlogElement);


        

    }).catch(error => {
        console.log('Error: ', error);
    });
}


const form = document.querySelector('form');

form.addEventListener('submit',e => {
    e.preventDefault();
    getUser(form.elements.search.value);
});
