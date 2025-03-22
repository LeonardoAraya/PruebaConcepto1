//SP para traer los datos de la BD a la pagina principal
document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector(".tabla tbody");

    try {
        const response = await fetch("http://localhost:3000/api/empleados");
        const empleados = await response.json();

        empleados.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>¢${emp.salario}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener los empleados:", error);
    }
});

// Funcionamiento de los botones para moverse entre paginas
document.addEventListener("DOMContentLoaded", function () {
    let btnInsertar = document.getElementById("btn-insertar");
    if (btnInsertar) {
        btnInsertar.addEventListener("click", function () {
            window.location.href = "/insertar";
        });
    }

    let btnVolver = document.getElementById("btn-volver");
    if (btnVolver) {
        btnVolver.addEventListener("click", function () {
            window.location.href = "/";
        });
    }
});

// Funcionamiento del boton guardar
document.addEventListener("DOMContentLoaded", function () {
    let btnGuardar = document.querySelector(".btn-guardar");

    if (btnGuardar) {
        btnGuardar.addEventListener("click", async function (event) {
            event.preventDefault(); // Evita que el formulario recargue la página

            let nombre = document.getElementById("nombre").value.trim();
            let saldo = document.getElementById("saldo").value.trim();

            // Se verifica que todos los campos de la pantalla esten llenos
            if (!nombre || !saldo) {
                Swal.fire({
                    icon: "error",
                    title: "¡Registro fallido!",
                    text: "Todos los campos deben de estar llenos.",
                    confirmButtonText: "Aceptar",
                    })
                return;
            }

            let data = {
                nombre: nombre,
                salario: parseFloat(saldo)
            };

            // Se llama al servidor a traves de la API y se espera la respuesta
            try {
                let response = await fetch("http://localhost:3000/api/empleados", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                let result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "¡Registro guardado!",
                        text: "El empleado ha sido guardado con éxito.",
                        confirmButtonText: "Aceptar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/"; // Redirigir a la página principal
                            }
                        });
                    
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "¡Registro fallido!",
                        text: result.error,
                        confirmButtonText: "Aceptar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/"; // Redirigir a la página principal
                            }
                        });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "¡Registro fallido!",
                    text: "Hubo un problema con la solicitud.",
                    confirmButtonText: "Aceptar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/"; // Redirigir a la página principal
                        }
                    });
            }
        });
    }
});


