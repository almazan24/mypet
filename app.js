document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    function registerPet(event) {
        event.preventDefault(); 

        const ownerName = document.getElementById("ownerName").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const petName = document.getElementById("petName").value;
        const petType = document.getElementById("petType").value;
        const petBreed = document.getElementById("petBreed").value;
        const petColor = document.getElementById("petColor").value;

        const userData = {
            ownerName,
            username,
            email,
            password,
            phone,
            address,
            petName,
            petType,
            petBreed,
            petColor
        };
        
        localStorage.setItem("userData", JSON.stringify(userData));
        
        window.location.href = "data.html"; 
    }

    function login(event) {
        event.preventDefault(); 

        const loginUsername = document.getElementById("loginUsername").value;
        const loginPassword = document.getElementById("loginPassword").value;
        
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        

        if (savedUserData && loginUsername === savedUserData.username && loginPassword === savedUserData.password) {

            window.location.href = "data.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }


    if (window.location.pathname.includes("data.html")) {
        const savedUserData = JSON.parse(localStorage.getItem("userData"));

        if (savedUserData) {
            const ownerInfo = `Dueño: ${savedUserData.ownerName} <br>
                               Teléfono: ${savedUserData.phone} <br>
                               Dirección: ${savedUserData.address}`;
            const petInfo = `Nombre de la Mascota: ${savedUserData.petName} <br>
                             Tipo: ${savedUserData.petType} <br>
                             Raza: ${savedUserData.petBreed} <br>
                             Color: ${savedUserData.petColor}`;

            document.getElementById("ownerInfo").innerHTML = ownerInfo;
            document.getElementById("petInfo").innerHTML = petInfo;


            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Dueño:%20${savedUserData.ownerName},%20Teléfono:%20${savedUserData.phone},%20Mascota:%20${savedUserData.petName}`;
            document.getElementById("qrImage").src = qrCodeUrl;
        } else {
            alert("No hay datos disponibles.");
        }
    }


    if (registerForm) {
        registerForm.addEventListener("submit", registerPet);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
