<?php

include('adress.php');

// тема письма
$subject = 'Заявка на обратный звонок';

// текст письма
$message = 'Имя пользователя: ' . $_POST['name'] . '
' . 'Номер телефона: ' . $_POST['tel'];

// Для отправки HTML-письма должен быть установлен заголовок Content-type

$headers = "From: $email\r\nReply-To: $email" . "\r\n" . "MIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8";
// $headers  = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

// Дополнительные заголовки
// $headers .= 'To: Илья <murzalev_97@mail.ru>' . "\r\n"; // Свое имя и email
// $headers .= 'From: ' . '<' . 'develio@mail.ru' . '>' . "\r\n";



// Отправляем
if(mail($to, $subject, $message, $headers)) {
    header("Refresh:7; ../index.html");
    // header("Location:10; ../index.html");
    echo ('<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../css/styles.min.css">
    <link rel="icon" href="../img/favicon.png">
    <title>Успешно!</title>
    </head>
    <body>
    <style>
        .row {
            margin-bottom: 20px;
        }
        .h1 {
            text-align: center;
        }
        .h2 {
            text-align: center;
            opacity: 0.7;
            margin-bottom: 20px;
        }
        .h3 {
            font-size: 16px;
        }
        @media screen and (max-width: 576px) {
            .success__img {
                width: 100px;
            }
            .h3 {
                line-height: 18px;
            }
            .h2 {
                margin-bottom: 15px;
            }
            .h1 {
                margin-bottom: 15px;
            }
        }
    </style>

    <div class="container d-f jc-c ai-c w-100 h-100 fw-w">
        <div>
            <div class="row d-f jc-c"><img src="../img/_src/check.svg" alt="" class="success__img" ></div>
            <h1 class="h1 h1_black w-100">Ваша заявка успешно отправлена.</h1>
            <h2 class="h2 w-100">Мы свяжемся с Вами в ближайшее время!</h2>
            <div class="h3">Через 5 секунд Вы будете перенаправлены на главную страницу</div>
        </div>
    </div>
    </body>');
    // $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'index.html';
    // header("Location: $redirect");
    // exit();
} else {
    header("Refresh:5; ../index.html");

    echo ('<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
    <body><h1 class="red">Ошибка отправки сообщения!</h1><p>Проверьте правильность заполненных данных.<br>
    Через 5 секунд вы вернетесь на главную страницу.');
    $title = 'Ошибка!';
}

?>