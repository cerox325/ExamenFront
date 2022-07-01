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
    echo '<p>Se ha establecido la conexión al servidor MySQL con éxito.</p>';
  }

  $id_pelicula = $_POST['id_pelicula'];
  $tiempo = $_POST['tiempo'];
  $total = $_POST['total'];

$sql = "INSERT INTO Renta (id_pelicula, tiempo, total) VALUES (".$id_pelicula.", '".$tiempo."', ".$total.") ";

if ($conn->query($sql) === TRUE) {
  echo "Creado correctamente";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>