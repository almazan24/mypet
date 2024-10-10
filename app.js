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
        const petDesc = document.getElementById("petDesc").value;


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
            petColor,
            petDesc,
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

    function displayData() {
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        if (savedUserData) {

            document.getElementById("ownerName").textContent = savedUserData.ownerName;
            document.getElementById("email").textContent = savedUserData.email;
            document.getElementById("phone").textContent = savedUserData.phone;
            document.getElementById("address").textContent = savedUserData.address;
            document.getElementById("petName").textContent = savedUserData.petName;
            document.getElementById("petType").textContent = savedUserData.petType;
            document.getElementById("petBreed").textContent = savedUserData.petBreed;
            document.getElementById("petColor").textContent = savedUserData.petColor;
            document.getElementById("petDesc").textContent = savedUserData.petDesc;

            const qrCodeElement = document.getElementById("qrCode");
            const qrCodeData = `Dueño: ${savedUserData.ownerName}, Teléfono: ${savedUserData.phone}, Mascota: ${savedUserData.petName}`;
            generateQRCode(qrCodeData, qrCodeElement);
        } else {
            alert("No hay datos disponibles.");
        }
    }

    function generateQRCode(text, element) {
        const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=150x150`;
        element.src = qrCodeImageUrl;
    }

    if (window.location.pathname.includes("data.html")) {
        displayData();
    }


    if (registerForm) {
        registerForm.addEventListener("submit", registerPet);
    }
    
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
