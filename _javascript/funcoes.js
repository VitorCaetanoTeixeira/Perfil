$(document).ready(function() {
    $("#buttom-enviar").click(function() { 
       
        var proceed = true;
        //Validação de form
               
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ 
                $(this).css('border-color','red'); //muda borda do item paras vermelho  
                proceed = false; 
            }
            //valida email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //muda borda do item paras vermelho    
                proceed = false;               
            }   
        });
       
        if(proceed) 
        {
            //estrutura valores para enviar para o servidor
            post_data = {
                'user_name'     : $('input[name=tName]').val(), 
                'user_email'    : $('input[name=tEmail]').val(), 
                'user_phone'  : $('input[name=tTelefone]').val(),                
                'msg'           : $('textarea[name=tMensagem]').val()
            };
            
            //envio de info via
            $.post('contact_me.php', post_data, function(response){  
                if(response.type == 'error'){ //resposta 
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //limpa form
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form #contact_body").slideUp(); //mensagem de sucesso
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reseta status dos componentes
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#contact_results").slideUp();
    });
});
