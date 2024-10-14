let sueldoChart;  // Variable global para el gráfico

function actualizarKPIs() {
    fetch('connect.php')
        .then(response => response.json())
        .then(data => {
            // Actualizar los KPIs
            document.getElementById('totalSueldos').textContent = `$${data.totalSueldos.toFixed(2)}`;
            document.getElementById('sueldoPromedio').textContent = `$${data.sueldoPromedio.toFixed(2)}`;
            document.getElementById('cantidadEmpleados').textContent = data.cantidadEmpleados;
            
            // Datos para el gráfico
            const sueldoData = {
                labels: ['Total Sueldos', 'Promedio Sueldos', 'Cantidad Empleados'],
                datasets: [{
                    label: 'KPIs de Sueldos',
                    data: [data.totalSueldos, data.sueldoPromedio, data.cantidadEmpleados],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            // Opciones del gráfico
            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#333'
                        }
                    }
                }
            };

            // Destruir gráfico anterior si ya existe
            if (sueldoChart) {
                sueldoChart.destroy();
            }

            // Crear un nuevo gráfico
            const ctx = document.getElementById('sueldoChart').getContext('2d');
            sueldoChart = new Chart(ctx, {
                type: 'bar',  // Puedes cambiar el tipo de gráfico (line, pie, etc.)
                data: sueldoData,
                options: options
            });
        })
        .catch(error => console.error('Error:', error));
}

// Actualizar KPIs cada 5 segundos
setInterval(actualizarKPIs, 5000);

// Llamar a la función para cargar los KPIs al cargar la página
document.addEventListener('DOMContentLoaded', actualizarKPIs);
