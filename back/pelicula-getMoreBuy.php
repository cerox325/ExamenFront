<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

  $host_name = 'db5009081989.hosting-data.io';
  $database = 'dbs7675540';
  $user_name = 'dbu1664445';
  $password = 'Jaripeo3@';

  $conn = new mysqli($host_name, $user_name, $password, $database);

  if ($conn->connect_error) {
    die('<p>Error al conectar con servidor MySQL: '. $conn->connect_error .'</p>');
  } else {
    //echo '<p>Se ha establecido la conexión al servidor MySQL con éxito.</p>';
  }

  $sql = "SELECT Renta.id_pelicula,Pelicula.url, count(*) as totalRentados FROM Renta INNER JOIN Pelicula ON Renta.id_pelicula = Pelicula.id GROUP BY id_pelicula HAVING COUNT(*)>1 ORDER BY totalRentados DESC";
  $result = $conn->query($sql);
 


  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $respuesta[] = $row;
    }

    echo json_encode($respuesta);
  } else {
    echo "0 results";
  }
  $conn->close();


?>