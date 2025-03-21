
document.addEventListener("DOMContentLoaded", function() {
    let btnInsertar = document.getElementById("btn-insertar");
    if (btnInsertar) {
        btnInsertar.addEventListener("click", function() {
            window.location.href = "insertar.html";
        });
    }

    let btnVolver = document.getElementById("btn-volver");
    if (btnVolver) {
        btnVolver.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let btnVolver = document.getElementById("btn-volver");
    if (btnVolver) {
        btnVolver.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    }
});
