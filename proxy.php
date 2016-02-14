<?php

$url = 'http://www.hereandabove.com/cgi-bin/mazeform';
$params = '';

foreach ($_POST as $key => $value) {
    $params .= sprintf('%s=%s&', $key, $value);
}

// Open connection
$ch = curl_init();

// Set the url, number of POST vars, POST data
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($_POST));
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

// Execute post
$result = curl_exec($ch);

// Close connection
curl_close($ch);

// Output result
echo $result;