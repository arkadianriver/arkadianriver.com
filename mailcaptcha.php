<?php
/**
 * written by http://99webtools.com/blog/php-simple-captcha-script/
 */
session_start();
$code=rand(1000,9999);
$_SESSION["code"]=$code;
$im = imagecreatetruecolor(50, 24);
$bg = imagecolorallocate($im, 22, 192, 212); // background color cyan
$fg = imagecolorallocate($im, 55, 55, 55);   // text color gray
imagefill($im, 0, 0, $bg);
imagestring($im, 5, 5, 5,  $code, $fg);
header("Cache-Control: no-cache, must-revalidate");
header('Content-type: image/png');
imagepng($im);
imagedestroy($im);
?>