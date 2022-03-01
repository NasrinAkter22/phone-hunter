const error=document.getElementById('error')

document.getElementById('loadModule').addEventListener('click',()=>{

    const input=document.getElementById('inputFild')
    const inputText=input.value;
    
    if (input.value==''){
        displayDiv.innerHTML=''
        error.innerText="please enter valid name"
        // input.valu=''
    }
    else{
        const url=`https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayMobile(data.data.slice(0, 20))) 
    }


})



const displayMobile=(mData)=>{
  
    const displayDiv=document.getElementById('mainDiv')
        displayDiv.textContent=''
    mData.forEach(mobile => {
        console.log(mobile);
        const div=document.createElement('div')
       
        div.innerHTML=`<div class="card p-2">
        <img src="${mobile.image}"class="card-img-top"alt="...">
         <div class="card-body">
         <h5 class="class-title"><span class="text-info">name:</span> ${mobile.phone_name}</h5> 
          <h5 class="class-title"><span class="text-info">Brand:</span> ${mobile.brand}</h5>     
          <button onclick="loadModule()"class="btn bg-primary text-white mt-3">Mobile details</button>    

        </div>
        </div>
        
        `

        displayDiv.appendChild(div)

        
  
    });
    
}