<?php

$url = sprintf('http://www.hereandabove.com%s', str_replace(' ', '+', $_GET['url']));
$img = file_get_contents($url);
$name = sprintf('images/%s', uniqid('maze-'));
file_put_contents($name, $img);

echo $name;