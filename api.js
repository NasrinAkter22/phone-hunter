const error=document.getElementById('error')

document.getElementById('loadModule').addEventListener('click',()=>{

    const input=document.getElementById('inputFild')
    const inputText=input.value;
    document.getElementById('inputFild').value=''
    if (inputText==''){
      const h2=document.getElementById('error_message');
      h2.innerText='Plsease search by entering the product name'
      document.getElementById('product-details-page').textContent=''
      document.getElementById('mainDiv').textContent=''

    }
    else{
        const url=`https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayMobile(data.data.slice(0, 20))) 
    }


})



const displayMobile=(mData)=>{

  if(mData.length=='0'){
    const h2=document.getElementById('error_message');
    h2.innerText=`Oops! We couldn't find results for your search:`
    document.getElementById('product-details-page').textContent=''
    document.getElementById('mainDiv').textContent=''
    
}else{
        
  document.getElementById('error_message').innerText=''
  const displayDiv=document.getElementById('mainDiv')
      displayDiv.textContent=''
  mData.forEach(mobile => {
      const div=document.createElement('div')
     
      div.innerHTML=`<div class="card p-2">
      <img src="${mobile.image}"class="card-img-top"alt="...">
       <div class="card-body">
       <h5 class="class-title"><span class="text-info">name:</span> ${mobile.phone_name}</h5> 
        <h5 class="class-title"><span class="text-info">Brand:</span> ${mobile.brand}</h5>     
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="mobileDetails('${mobile.slug}')" class="btn bg-primary text-white mt-3">Mobile details</button>    

      </div>
      </div>
      
      `

      displayDiv.appendChild(div)


  });   
  

   }
      
}

const mobileDetails=id=>{
    const url=  `https://openapi.programming-hero.com/api/phone/${id}`
        fetch(url)
        .then(response => response.json())
        .then(data=>displayDeatils(data)); 
    
}
const displayDeatils=data=>{
console.log(data.data.releaseDate);
document.getElementById('error_message').innerText=''


let releaseDate;
if(data.data.releaseDate==''){
    releaseDate=`No Release Date Found`
}else{
    releaseDate=data.data.releaseDate;
}

if(data.data.others==undefined){
  bluetooth='No'
  gps='No'
  nfc='No'
  radio='No'
  usb='No'
  wlan='No'
}else{
  bluetooth=data.data.others.Bluetooth;
  gps=data.data.others.GPS;
  nfc=data.data.others.NFC
  radio=data.data.others.Radio
  usb=data.data.others.USB
  wlan=data.data.others.WLAN
}

  const product_details_page=document.getElementById('product-details-page');
  document.getElementById('product-details-page').textContent=''
    const div=document.createElement('div')
       
    div.innerHTML=`

    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Phone Details</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="d-lg-flex m-2 justify-content-center align-items-center ">

    <div class="card border-0   w-80">
    <img src="${data.data.image}" class="img-fluid" alt="...">   
    </div>

    <div class="ms-lg-5  w-80 ">

    <h4 class="card-title fw-bolder py-2">${data.data.name}</h4>
    <h6 class="card-title fw-bolder">${data.data.brand}</h6>
    <p>${releaseDate}</p>
    <hr>
    <h6 style='border-bottom:1px solid gray; ' class='w-50 p-1 tw-bolder'>Main Features</h6>
                <ul>
                    <li> Chip Set: ${data.data.mainFeatures.chipSet}</li>
                      <li >Memory: ${data.data.mainFeatures.memory}</li>
                      <li >Display Size: ${data.data.mainFeatures.displaySize}</li>
                      <li > Storage:${data.data.mainFeatures.storage}</li>
                      <li> Sensors: ${data.data.mainFeatures.sensors.slice(0,2)}
                             <br>
                              ${data.data.mainFeatures.sensors.slice(2,6)} 
                        </li>
                        </ul>
                    <hr>
                    <h6 style='border-bottom:1px solid gray; ' class='w-50 p-1 tw-bolder'>Other Features</h6>
                    <ul>
                        <li >Bluetooth: ${bluetooth}</li>
                        <li > GPS:${gps}</li>
                        <li > NFC: ${nfc}</li>
                        <li >Radio: ${radio}</li>
                        <li > USB: ${usb}</li>
                        <li > WLAN: ${wlan}</li>   
                    </ul>
   


    </div>
    </div>
    </div>
    </div>

    
    `
    product_details_page.appendChild(div)
}

