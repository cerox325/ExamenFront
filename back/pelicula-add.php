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


$sql = "INSERT INTO Pelicula (nombre,descripcion,precio,url)
VALUES ('doctor strange', 'multiverso de la locura', 500, 'https://as01.epimg.net/meristation/imagenes/2022/05/27/noticias/1653652226_274491_1653652257_noticia_normal.jpg')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>