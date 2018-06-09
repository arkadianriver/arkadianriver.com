---
---
<?php
/**
 * Captcha credit to http://99webtools.com/blog/php-simple-captcha-script/
 */
session_start();
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  header($_SERVER["SERVER_PROTOCOL"] ." 404 Not Found");
} else {
  if ( isset($_POST["captcha"])
          && $_POST["captcha"] != ""
          && $_SESSION["code"] == $_POST["captcha"]
     ) {
    $name = $_POST["name"] ? $_POST["name"] : '[no name given]';
    $msg = <<<EOM
From your {{ site.title }} website...

Mail received from $name, at {$_POST["email"]}.

{$_POST["textbody"]}
EOM;
    $headers = 'From: {{ site.data.tokens.fromaddy }}'."\r\n".
               'X-Mailer: PHP/'. phpversion();
    $rc = mail('{{ site.data.tokens.toaddy }}',
               $_POST["subject"],
               $msg, $headers);
    if ($rc) {
      header('Location: '. $_POST["success"]);
    } else {
      header('Location: '. $_POST["failure"]);
    }
  } else {
    die("Wrong Captcha code entered. Use the browser back button and try again.");
  }
}

?>
