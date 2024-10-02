// Función para registrar los datos y almacenarlos en localStorage
function registerPet() {
    const ownerName = document.getElementById("ownerName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const petName = document.getElementById("petName").value;
    const petType = document.getElementById("petType").value;
    const petBreed = document.getElementById("petBreed").value;
    const petColor = document.getElementById("petColor").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Guardar los datos en localStorage
    localStorage.setItem("ownerName", ownerName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    localStorage.setItem("petName", petName);
    localStorage.setItem("petType", petType);
    localStorage.setItem("petBreed", petBreed);
    localStorage.setItem("petColor", petColor);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Redirigir a la página de datos
    window.location.href = 'data.html';
}

// Función para iniciar sesión
function login() {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    const inputUser = document.getElementById("loginUsername").value;
    const inputPass = document.getElementById("loginPassword").value;

    if (inputUser === storedUser && inputPass === storedPass) {
        window.location.href = 'data.html';  // Redirige a la ventana de datos
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// Función para generar el código QR y mostrar los datos en la ventana "data"
function generateQRCode() {
    const petData = {
        owner: localStorage.getItem("ownerName"),
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        address: localStorage.getItem("address"),
        petName: localStorage.getItem("petName"),
        petType: localStorage.getItem("petType"),
        petBreed: localStorage.getItem("petBreed"),
        petColor: localStorage.getItem("petColor")
    };

    document.getElementById("ownerName").innerText = petData.owner;
    document.getElementById("email").innerText = petData.email;
    document.getElementById("phone").innerText = petData.phone;
    document.getElementById("address").innerText = petData.address;
    document.getElementById("petName").innerText = petData.petName;
    document.getElementById("petType").innerText = petData.petType;
    document.getElementById("petBreed").innerText = petData.petBreed;
    document.getElementById("petColor").innerText = petData.petColor;

    const qrData = `https://tusitio.com/encontre-mascota?owner=${encodeURIComponent(petData.owner)}&pet=${encodeURIComponent(petData.petName)}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    
    document.getElementById("qrCode").src = qrCodeUrl;
}

// Función para mostrar la página cuando se escanea el QR y se redirige
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ownerName = urlParams.get('owner');
    const petName = urlParams.get('pet');

    if (document.getElementById('foundOwnerName') && document.getElementById('foundPetName')) {
        document.getElementById('foundOwnerName').innerText = ownerName;
        document.getElementById('foundPetName').innerText = petName;
        document.getElementById('contactOwnerButton').href = `tel:${localStorage.getItem("phone")}`;
    }
}
