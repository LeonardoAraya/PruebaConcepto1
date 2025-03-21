document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector(".tabla tbody");

    try {
        const response = await fetch("http://localhost:3000/api/empleados"); // Nueva ruta con /api
        const empleados = await response.json(); // Convertir a JSON

        empleados.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>${emp.salario}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener los empleados:", error);
    }
});
