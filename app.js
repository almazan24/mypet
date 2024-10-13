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
        const petImageInput = document.getElementById("petImage");

        if (petImageInput && petImageInput.files.length > 0) {
            const file = petImageInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                const petImageBase64 = reader.result;
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
                    petImage: petImageBase64 
                };

                localStorage.setItem("userData", JSON.stringify(userData));
                window.location.href = "data.html"; 
            };

            reader.readAsDataURL(file);
        } else {
            alert("Por favor, sube una imagen de tu mascota.");
        }
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
    function displayPetData() {
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

            const petImageElement = document.getElementById("petImageDisplay");
            if (savedUserData.petImage) {
                petImageElement.src = savedUserData.petImage;
            }
            const qrCodeElement = document.getElementById("qrCode");
            qrCodeElement.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(savedUserData.username);
        }
    }
    function logout() {
        localStorage.removeItem("userData");
        window.location.href = "index.html"; 
    }
    if (registerForm) {
        registerForm.addEventListener("submit", registerPet);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
    if (window.location.pathname.includes("data.html")) {
        displayPetData();
        const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.addEventListener("click", logout);
        }
    }
});
