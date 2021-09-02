const inputField = document.getElementById('input-field');
const button = document.getElementById('button');
const mainDiv = document.getElementById('main-div');
const warningMassage = document.getElementById('warning-massage');


button.addEventListener('click', function () {
    const search = inputField.value;
    warningMassage.innerText = '';
    mainDiv.innerText = '';
    if (search == '') {
        warningMassage.innerText = "search field can not be empty";
        return;
    }
    inputField.value = "";
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => display(data));
})

const display = data => {
    // const length = datas.length;
    // console.log(length);
    mainDiv.innerText = '';
    if (data.numFound == 0) {
        warningMassage.innerText = '';
        //console.log("data not found");
        warningMassage.innerText = 'data not found';
    }
    else {
        warningMassage.innerText = '';
        warningMassage.innerText = `${data.numFound}`;
        const datas = data.docs;
        datas.forEach(item => {
            // console.log(item.title);
            const divElement = document.createElement('div');
            divElement.classList.add("col-4");
            divElement.innerHTML = `
        
        <div class="card p-3">
        <img 
        src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top" alt="...">
            <h4 class="card-title">Book Title: ${item.title}</h4>
            <p class="card-title">Author Name: ${item.author_name}</p>
            <p>Publisher: ${item.publisher}</p>
            <p>Published: ${item.first_publish_year}</p>
        </div>
      
        `
            mainDiv.appendChild(divElement);


        })
    }
}