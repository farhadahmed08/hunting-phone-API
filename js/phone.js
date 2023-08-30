const loadPhone = async(searchText = 13,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones,isShowAll) =>{
    // console.log(phones)
    
    // 1 call the container where we set 
    const phoneContainer = document.getElementById('phone-container');
    
    // 2 clear container before adding new cards
    phoneContainer.textContent ='';
    
    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll ){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    console.log(isShowAll)

    // display only first 12 phones if not showAll;
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    phones.forEach(element => {
        // console.log(element);

        // 3 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-green-100 p-4 shadow-xl';
        // 4 set inner Html
        phoneCard.innerHTML = `
        <figure><img src="${element.image}" alt="phones" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${element.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        `;
        // 5 append child
        phoneContainer.appendChild(phoneCard);
        
    });

    // hiding loading spinner

   toggleLoadingSpinner(false)
}
// handle search button 
const handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.textContent=''
    loadPhone(searchText,isShowAll);
    
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
    loadingSpinner.classList.remove('hidden')}
    else{
        loadingSpinner.classList.add('hidden')
    }

}
   
// show all data

const handleShowAll = () =>{
    handleSearch(true);
}


// 
const handleShowDetail = async (id)=>{
    // console.log(id)
    // load individual phone data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)

    const data = await res.json();
    const phone = data.data
    console.log(phone)

    
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone)=>{
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>DisplaySize:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>Brand:</span>${phone?.brand}</p>
    <p><span>ReleaseDate:</span>${phone?.releaseDate}</p>
    `

    // show the modal
    show_details_modal.showModal();

}

loadPhone()