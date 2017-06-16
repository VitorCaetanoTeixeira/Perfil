/*
Tela, divide questões.
mailtimp
*/
var questao=1;

$("#prox").click(function(){
	
		if($("input[name=q"+questao+"]:checked").length == 1){
			$("#txt_erro").hide();		
			if(questao >= 25){
				$("#volt").hide();
				$("#prox").hide();
				$("#ttl").hide();
				$("#q"+questao).hide();
				$("#form").show();
			}else{
				$("#volt").show();
				$("#q"+questao).hide();
				questao++;
				$("#q"+questao).show();
			}
		}else{

			if($("#txt_erro").length <= 0){
				$("#erro").append("<p id='txt_erro' style='color:red;'>Selecione uma resposta para avançar!</p>");
			}else{
				$("#txt_erro").show();
			}
		}
						
	
});
$("#volt").click(function(){
	if(questao == 1){
		$("#volt").hide();
	}else{
		$("#q"+questao).hide();
		questao--;
		$("#q"+questao).show();
	}
});

/*
resultado
*/
//$( "input[type=checkbox]" ).on( "click", countChecked );
//$( document ).ready(function() {

	var Teste = {
		a :0, 
		i :0,
		o :0,
		c :0
	}
//ação botão
	$("#calc").click(function(){

	 	if(verifica()){



			 //estrutura valores para enviar para o servidor
           post_data = {
                'user_name'     : $('input[name=tName]').val(), 
                'user_email'    : $('input[name=tMail]').val(), 
                'title'         : "Lead - Teste Gratuito"
                 
            };
           // var result = false; 
            //envio de info via
            $.post('contact_lead.php', post_data, function(response){  
                if(response.type == 'error'){ //resposta 
            //      result = false;
             //    alert("Erro:" + response.text);
                }else{
               // 	alert("Enviou:" + response.text);
               //   result = true;
                }
            }, 'json');



          // if(result){


				//pega resultado
				$("input[type=radio]:checked").each(function(index, item){
					switch($(item).val()) {
					    case "A":
					        Teste.a++;
					        break;
					    case "I":
					        Teste.i++;
					        break;
					    case "O":
					        Teste.o++; 
					        break;
					    case "C":
					        Teste.c++;
					        break;
					}
			
				
				});	

				Teste.a *=4;//Tubarão
				Teste.o *=4;//Lobo
				Teste.c *=4;//Gato
				Teste.i *=4;//Águia

				$("#form").hide();
				$("#tll").hide();
				$("#rResposta").show();
				$("#rTubarao").text(Teste.a + "%");
				$("#rLobo").text(Teste.o + "%");
				$("#rGato").text(Teste.c + "%");
				$("#rAguia").text(Teste.i + "%");
			//}
	}
		//alert("A = " +Teste.a + "\n I = " + Teste.i + "\n O = " + Teste.o + "\n C = " + Teste.c  );
		//limpa info
		//Teste.a =0;
		//Teste.b =0;
		//Teste.c =0;
		//Teste.i =0;
	});

	
	function verifica(){
		var vName = false;
		var vEmail = false;
		if($("#tName").val() != null && $("#tName").val() != "" && $("#tName").val() !== undefined){
			var vName = true;
			$("#erro_name").hide();
		}else{
			
			if($("#erro_name").length <= 0){
				$("#erro").append("<p id='erro_name' style='color:red;'>Por favor, informe seu nome.</p>");
			}else{
				$("#erro_name").show();
			}
		}
		var sEmail	= $("#tMail").val();
		// filtros
		var emailFilter=/^.+@.+\..{2,}$/;
		var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/
		// condição

		if(!(emailFilter.test(sEmail))||sEmail.match(illegalChars)){
			if($("#erro_email").length <= 0){
				$("#erro").append("<p id='erro_email' style='color:red;'>Por favor, informe um email válido.</p>");
			}else{
				$("#erro_email").show();
			}
			
		}else{
			$("#erro_email").hide();
			vEmail = true;	
		}
		
		if(vEmail == true && vName == true){
			return true;
		}else{
			return false;
		}
	}

//});