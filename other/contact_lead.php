<?php
if($_POST)
{
    $to_email       = 'leads@sigaseuperfil.com.br';//"sigaseuperfil@gmail.com"; //Recipient email, Replace with own email here
    $from_email     = 'contato@sigaseuperfil.com.br'; //from mail, it is mandatory with some hosts and without it mail might endup in spam.
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $title     = filter_var($_POST["title"], FILTER_SANITIZE_EMAIL);
    
    
    //additional php validation
    if(strlen($user_name)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Nome não pode estar em branco!'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Entrar com email válido!'));
        die($output);
    }
    
    //email body
    //$message_body = $message."\r\n\r\n-".$user_name."\r\nEmail : ".$user_email."\r\nTelefone : ". $phone_number ;
    $message_body ='<p>Nome: '.$user_name.'</p>'.
    			   '<p>Email: '.$user_email.'</p>';

    //proceed with PHP email.
    $headers = 'MIME-Version: 1.1' . "\n".
    'Content-type: text/html; charset=iso-8859-1' . "\n".
    'From:'. $from_email ."\n" .
    'Reply-To:'.$user_email."\n";
    
    $send_mail = mail($to_email,  $title , $message_body, $headers, "-r".$from_email);
                // mail($emaildestinatario, $assunto, $mensagemHTML, $headers, "-r".$emailsender);
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Email enviado com sucesso!'));
        die($output);
    }
}
/*
$quebra_linha = "\n";
$emailsender = "contato@sigaseuperfil.com.br";
$nomeremetente = "remetente";
$emaildestinatario = "vitor130595@gmail.com";
$assunto = "teste email";
$mensagem = "conteudo da mensagem";

$mensagemHTML = '<p>Teste email</p>'.
'<p>Titulo</p>'.
'<p>'.$mensagem.'</p>';

$headers = "MIME-version: 1.1".$quebra_linha;
$headers .= "Content-type: text/html; charset=iso-8859-1".$quebra_linha;
$headers .= "From:". $emailsender.$quebra_linha;
$headers .="Reply-to:". $emailsender.$quebra_linha;

mail($emaildestinatario, $assunto, $mensagemHTML, $headers, "-r".$emailsender);

echo "rodou";*/