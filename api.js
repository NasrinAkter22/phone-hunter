const error=document.getElementById('error')

const loadModule =()=>{
const input=document.getElementById('inputFild')
const inputText=input.value

if (input.value==''){
    displayDiv.innerHTML=''
    error.innerText="please enter valid name"
    // input.valu=''
}
else{
    error.innerHTML=''
    displayDiv.innerHTML=''

    const url=`https://openapi.programming-hero.com/api/phones?search=${inputText}`
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => displayMobile(data.data)) 
}
}
const displayMobile=(mData)=>{
    // console.log(mData);
    const dataSize=mData.slice(0,20)
    const displayDiv=document.getElementById('mainDiv')
    dataSize.forEach(mobile => {
        console.log(mobile);
        const div=document.createComment('div')
       
        div.innerHTML=`<div class="card p-5">
        <img src="${mobile.image}"class="card-img-top"alt="...">
         <div class="card-body">
          <h5 class="class-title"><span class="text-info">Brand:</span>${mobile.brand}</h5>     
          <h5 class="class-title"><span class="text-info">name:</span>${mobile.brand}</h5> 
          <button onclick="loadModule()"class="btn bg-primary text-white mt-3">Mobile details</button>
              

        </div>
        </div>
        
        
        `

        displayDiv.appendChild(div)

        
  
    });
    
}