const inputField = document.getElementById('input-field');
const button = document.getElementById('button');
const mainDiv = document.getElementById('main-div');
const warningMassage = document.getElementById('warning-massage');


button.addEventListener('click', function () {
    const search = inputField.value;
    warningMassage.innerText = '';
    mainDiv.innerText = '';
    if (search === '') {
        warningMassage.innerHTML = `
        <h5 class="p-3 rounded border border-info">Search field can not be empty</h5>
        `;
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
    if (data.numFound === 0) {
        warningMassage.innerText = '';
        //console.log("data not found");
        warningMassage.innerHTML = `
        <h5 class="p-3 rounded border border-info">Search data not found</h5>
        `;
    }
    else {
        warningMassage.innerText = '';
        warningMassage.innerHTML = `
        <h5 class="p-3 rounded border border-info">Search data found: ${data.numFound}</h5>
        
        `;
        const datas = data.docs;
        datas.forEach(item => {
            // console.log(item.title);
            const divElement = document.createElement('div');
            divElement.classList.add("col-lg-4");
            divElement.classList.add("col-md-6");
            divElement.innerHTML = `

        <div class="card">
        <div class="card-body p-3">
        <img 
        src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top" alt="...">
        const num=item.publisher;
            <h4 class="card-title"><b>Book Title:</b> ${item.title}</h4>
            <p class="card-title"><b>Author Name:</b> ${item.author_name} </p>
            <p><b>Publisher:</b> ${item.publisher ? item.publisher[0] : ' '
                }</p >
        <p><b>Published:</b> ${item.first_publish_year}</p>
        </div >

        </div >

    `
            mainDiv.appendChild(divElement);


        })
    }
}