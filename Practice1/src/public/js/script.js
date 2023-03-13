
const container = document.querySelector(".container")
const passShowHide = document.querySelectorAll(".showPass")  
const passFields= document.querySelectorAll(".password")
const loginBtn= document.querySelector(".login-link")
const signup= document.querySelector(".signup")
const registration = document.querySelector('.registration')
const login = document.querySelector('.login')
const message = document.querySelector(".message")   
const messageL = document.querySelector(".mLogin")   
      
      
    //   js code to show/hide password and change icon
    passShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () =>{
        passFields.forEach(passF => {
            if(passF.type ==="password"){
                passF.type = "text";

                passShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash","uil-eye")
                })
            } else {
                passF.type = "password";
                passShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye","uil-eye-slash");
                })
            }
        })
        })
    })

    signup.addEventListener("click", () => {
        container.classList.add("active");

    })

    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    })

    // Request to comprobate and render Congratulation page
    registration.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
           // eslint-disable-next-line no-undef
            const resp = await axios.post('/user/register', {
                name: e.target.name.value,
                surname: e.target.surname.value,
                email: e.target.email.value,
                password: e.target.password.value

           })

           if(resp.data.redirect) {
                window.location = "/congratulation"
           }

        } catch(error) {

              if(error.response.status === 400) {
                if(error.response.data[0].name && error.response.data[0].message) {
                    message.textContent = error.response.data[0].message;
                    message.classList.add('active')
                  }
              } 

              if(error.response.status === 409) {
                    message.textContent = error.response.data.errors[0];
                    message.classList.add('active');
              } 
          }
        })

    login.addEventListener('submit', async (e) => {
        e.preventDefault();
       
        try {
             
            // eslint-disable-next-line no-undef
            const response = await axios.post('/user/login', 
            {
                email: e.target.email.value,
                password: e.target.password.value
            })

            e.target.reset()

            if(response.data.redirect) {
                window.location = "/user/profile"
            }


    
            console.log(response)
        }catch(error) {

            console.log(error.response)

            if(error.response.status === 401 || error.response.status === 400) {
                if(error.response.data.message) {
                    messageL.textContent = error.response.data.message;
                    messageL.classList.add('active')
                  }
              } 
            
        }
        
    })