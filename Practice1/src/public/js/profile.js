const overlay = document.querySelector('.overlay');
const closeMessage = document.querySelector('.close')
const newMessageBtn = document.querySelector('.profile__button')
const createMessage = document.querySelector('.create-message')
const sendMessage = document.querySelector('.sendMessage')
const message = document.querySelector('.message')
const messages = document.querySelectorAll('.profile__name')
const messagesClose = document.querySelectorAll('.profile__text-close')
const deleteBtn = document.querySelectorAll('.profile__settings_use img');
const checkboxInput = document.querySelectorAll('.profile__checkbox_use');
const checkboxMain = document.querySelector('.profile__checkbox_main');
const options = document.querySelector('.profile__options');
const deleteAllMess = document.querySelector('.profile__delete_all');
const profileMessages = document.querySelector('.profile__messages');


// Function to hover message when checkbox marked.

function checkBox(input) {  
    const message = input.parentElement.parentElement;

    if(input.checked){
        message.classList.add('active-hover');
        options.classList.add('active');
    } else {
        message.classList.remove('active-hover') 
        options.classList.remove('active');
    }

} 

// Function to click all checkbox.

function clickAllCheckBox(){
    checkboxInput.forEach(input => {

        if(checkboxMain.checked){
            input.checked = true;
            checkBox(input);
        } else {
            input.checked = false;
            checkBox(input);
        }
     
    })
}




// See messages
messages.forEach( message => {
    message.addEventListener('click', function(e) {
        const text = message.parentElement.querySelector('.profile__text')

        text.classList.add('active')
        overlay.classList.add('active')

        e.stopPropagation()

   
    })
})
messagesClose.forEach( icon => {
    icon.addEventListener('click', function(e) {
        const text = e.target.parentElement.parentElement;
        overlay.classList.remove('active')
        text.classList.remove('active')

        e.stopPropagation()

    })
})

// Delete message
deleteBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {

        const profileMessag = btn.parentElement.parentElement;
        const profileDel = profileMessag.querySelector('.profile__delete')
        const btnC = profileDel.querySelector('.profile__button-cancel')
        const btnD = profileDel.querySelector('.profile__button-delete')

        profileDel.classList.add('active')
        overlay.classList.add('active')

        btnC.addEventListener('click', function(e) {
            profileDel.classList.remove('active')
            overlay.classList.remove('active')

            e.stopPropagation()

        })

        btnD.addEventListener('click', async function(e) {
            profileDel.classList.remove('active')
            overlay.classList.remove('active')
            const Message = btnD.parentElement.parentElement.parentElement
            

            e.stopPropagation()
            try {
                // eslint-disable-next-line no-undef
                const response = await axios.delete(`profile/deleteMessage/${Message.id}`)

                if(response.data.redirect) {
                    window.location = "/user/profile"
                }

                
            } catch(error) {
                console.log(error.response)
                
            }
        
            
        })


        e.stopPropagation()
    })
})

// Marcar checkbox y aplicar hover.
checkboxInput.forEach(input => {
    input.addEventListener('change', function(){
        checkBox(input);
    })
})

checkboxMain.addEventListener('change', clickAllCheckBox)



// Create message and send message
newMessageBtn.addEventListener('click', () => {
    createMessage.classList.add('active')
    overlay.classList.add('active')
})

closeMessage.addEventListener('click', () => {
    overlay.classList.remove('active')
    createMessage.classList.remove('active')
    message.classList.remove('active')
    message.classList.remove('activeC')

})

sendMessage.addEventListener('submit', async (e) => {
   

    e.preventDefault();
   
    try {
         
       
        // eslint-disable-next-line no-undef
        const response = await axios.post('profile/scheduledMessage', 
        {
            addressee: e.target.email.value,
            title: e.target.title.value,
            date: e.target.date.value,
            message: e.target.message.value
        })


        message.classList.remove('active')
        message.classList.add('activeC')
        message.textContent = response.data.message;
        e.target.reset()


    }catch(error) {

        if(error.response.status === 401 || error.response.status === 400 || error.response.status === 404) {
            if(error.response.data.message) {
                message.textContent = error.response.data.message;
                message.classList.add('active')
              }
          } 
        
     }
    
})

deleteAllMess.addEventListener('click', async (e)=> {

    const messages = [...checkboxInput];
    const newMessages = messages.filter( checkb => checkb.checked);
    const ids = newMessages.map( mess => mess.parentElement.parentElement.id);
   

    try {
         
        // eslint-disable-next-line no-undef
        const response = await axios.delete('profile/deleteMessages', 
            {  data: {
                ids
            }})

        if(response) {
            console.log("Funcó")
            messages.forEach( mess => {
                profileMessages.removeChild(mess.id);
            })
        }
            

    }catch(error) {
        console.log(error);
       
    }


})