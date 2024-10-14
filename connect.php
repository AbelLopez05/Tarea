<?php
// Configuración de la base de datos
$host = 'localhost';
$db = 'empresa';  // Nombre de tu base de datos
$user = 'root';  // Tu usuario de MySQL
$pass = '';  // Tu contraseña de MySQL

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los sueldos
$sql = "SELECT sueldo FROM empleados";
$result = $conn->query($sql);

// Calcular KPIs
$totalSueldos = 0;
$cantidadEmpleados = $result->num_rows;
$sueldoPromedio = 0;

if ($cantidadEmpleados > 0) {
    while($row = $result->fetch_assoc()) {
        $totalSueldos += $row['sueldo'];
    }
    $sueldoPromedio = $totalSueldos / $cantidadEmpleados;
}

// Devolver los KPIs en formato JSON
$data = array(
    'totalSueldos' => $totalSueldos,
    'sueldoPromedio' => $sueldoPromedio,
    'cantidadEmpleados' => $cantidadEmpleados
);

echo json_encode($data);

$conn->close();
?>
