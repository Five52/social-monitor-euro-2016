<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once 'parameters.php';

use Facebook\FacebookRequest;

// Connexion à l'API Graph grâce aux ID de l'application
$fb = new Facebook\Facebook([                                   
    'app_id' => FACEBOOK_APP_ID,
    'app_secret' => FACEBOOK_SECRET_ID,
    'default_graph_version' => 'v2.8',
]);

// On définit un token (sans date de péremption)
$fb->setDefaultAccessToken(FACEBOOK_APP_ID . "|" . FACEBOOK_SECRET_ID);

// On récupère l'application correspondante
$fbApp = $fb->getApp();

// On envoie la requête souhaitée
$response = $fb->sendRequest(
	'GET',
	'/equipedefrance',
    array(
        // Requête de base
        // 'fields' => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){id,message,comments.limit(1000){message,like_count}}'
        // Requête pour les dates (données supplémentaires)
        'fields' => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){id,created_time}'
        // Requête des "LIKE"
        // 'fields' => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(LIKE).limit(0).summary(total_count)}'
        // Requête des "LOVE"
        // 'fields'    => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(LOVE).limit(0).summary(total_count)}'
        // Requête des "WOW"
        // 'fields'    => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(WOW).limit(0).summary(total_count)}'
        // Requête des "HAHA"
        // 'fields'    => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(HAHA).limit(0).summary(total_count)}'
        // Requête des "SAD"
        // 'fields'    => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(SAD).limit(0).summary(total_count)}'
        // Requête des "ANGRY"
        // 'fields'    => 'posts.until(2016:07:13 23:55:00).since(2016:07:07 16:00:00).limit(50){reactions.type(ANGRY).limit(0).summary(total_count)}'
   	)
);

$response->decodeBody();
$response->getDecodedBody();

// Requête de base
// $fp = fopen('data/equipedefrance_likes.json', 'w');
// Résultat pour les dates
$fp = fopen('data/equipedefrance_dates.json', 'w');
// Résultat des "LIKE"
// $fp = fopen('data/equipedefrance_like.json', 'w');
// Résultat des "LOVE"
// $fp = fopen('data/equipedefrance_love.json', 'w');
// Résultat des "WOW"
// $fp = fopen('data/equipedefrance_wow.json', 'w');
// Résultat des "HAHA"
// $fp = fopen('data/equipedefrance_haha.json', 'w');
// Résultat des "SAD"
// $fp = fopen('data/equipedefrance_sad.json', 'w');
// Résultat des "ANGRY"
// $fp = fopen('data/equipedefrance_angry.json', 'w');

// On écrit le résultat obtenu dans le fichier défini
fwrite($fp, json_encode($response->getDecodedBody()));

// On ferme le fichier
fclose($fp);

