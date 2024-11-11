let userData = {};
let isLoggedIn = false;

function signup() {
    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    userData = { fullname, phone, email, username, password };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Cadastro realizado com sucesso!");
    showPage("#login");
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const storedData = localStorage.getItem("userData");
    if (storedData) {
        userData = JSON.parse(storedData);
    }

    if (username === userData.username && password === userData.password) {
        isLoggedIn = true;
        alert("Login realizado com sucesso!");
        updateNavLinks();
        showPage("#home");
    } else {
        alert("Nome de usuário ou senha incorretos.");
    }
}

function loadUserProfile() {
    if (isLoggedIn) {
        document.getElementById("profile-fullname").value = userData.fullname || "";
        document.getElementById("profile-phone").value = userData.phone || "";
        document.getElementById("profile-email").value = userData.email || "";
        document.getElementById("profile-username").value = userData.username || "";
        showPage("#perfil");
    } else {
        alert("Por favor, faça login para acessar seu perfil.");
        showPage("#login");
    }
}

function updateProfile() {
    userData.fullname = document.getElementById("profile-fullname").value;
    userData.phone = document.getElementById("profile-phone").value;
    userData.email = document.getElementById("profile-email").value;
    userData.username = document.getElementById("profile-username").value;

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Perfil atualizado com sucesso!");
}

function deleteAccount() {
    if (confirm("Tem certeza de que deseja excluir sua conta?")) {
        userData = {};  
        isLoggedIn = false;
        localStorage.removeItem("userData");
        updateNavLinks();
        alert("Conta excluída com sucesso.");
        showPage("#login");
    }
}

function selectEvent(button) {
    const row = button.parentElement.parentElement.cloneNode(true);
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancelar";
    cancelButton.onclick = () => cancelEvent(cancelButton);

    row.lastElementChild.innerHTML = "";
    row.lastElementChild.appendChild(cancelButton);

    document.getElementById("scheduled-events").appendChild(row);
    button.parentElement.parentElement.remove();
}

function cancelEvent(button) {
    const row = button.parentElement.parentElement.cloneNode(true);
    const selectButton = document.createElement("button");
    selectButton.innerText = "Selecionar";
    selectButton.onclick = () => selectEvent(selectButton);

    row.lastElementChild.innerHTML = "";
    row.lastElementChild.appendChild(selectButton);

    document.querySelector("#eventos tbody").appendChild(row);
    button.parentElement.parentElement.remove();
}

function showPage(pageId) {
    document.querySelectorAll("main").forEach(page => page.style.display = "none");
    document.querySelector(pageId).style.display = "block";
}

function updateNavLinks() {
    const navLinks = document.getElementById("nav-links");

    if (isLoggedIn) {
        navLinks.innerHTML = `
            <li><a href="#" onclick="showPage('#home')">Home</a></li>
            <li><a href="#" onclick="showPage('#o-projeto')">O Projeto</a></li>
            <li><a href="#" onclick="loadUserProfile()">Perfil</a></li>
            <li><a href="#" onclick="showPage('#eventos')">Eventos</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    } else {
        navLinks.innerHTML = `
            <li><a href="#" onclick="showPage('#home')">Home</a></li>
            <li><a href="#" onclick="showPage('#o-projeto')">O Projeto</a></li>
            <li><a href="#" onclick="showPage('#login')">Login</a></li>
            <li><a href="#" onclick="showPage('#cadastro')">Cadastro</a></li>
        `;
    }
}

function logout() {
    isLoggedIn = false;
    updateNavLinks();
    alert("Você foi desconectado.");
    showPage("#login");
}

document.addEventListener("DOMContentLoaded", () => {

    const storedData = localStorage.getItem("userData");
    if (storedData) {
        userData = JSON.parse(storedData);
    }
    updateNavLinks();
    showPage("#home");
});