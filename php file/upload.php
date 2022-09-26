<?php
   

$location       = "../upload";
$uploadfile     = $_POST['filename'];
$uploadfilename = $_FILES['file']['tmp_name'];


if (move_uploaded_file($uploadfilename, $location . '/' . $uploadfile)) 
{
    echo 'File successfully uploaded!';
} 
else 
{
    echo 'Upload error!';
}

   
?>