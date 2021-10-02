
//|Variaveis de controle de interface| (ocultar, mostrar, alterar, etc....)
let seuVotoPara= document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao= document.querySelector('.d-1-4 ');
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');



//Variaveis de controle de execução
let etapaAtual =0;
let numero = ' ';
let Votobranco = false;

function comecarEtapa(){
	numeros.style.display ='block';

	
	let etapa = etapas[etapaAtual];
	let numero_digitos = '';
	



	for(let i=0; i<etapa.num;i++){
		if(i===0){
		numero_digitos += '<div class="numero pisca"></div>';
		}
		else{numero_digitos += '<div class="numero"></div>';
		}
	}
	
	seuVotoPara.style.display = "none";
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = " ";
	aviso.style.display='none';
	lateral.innerHTML = ' ';
	numeros.innerHTML = numero_digitos;


}

function atualizaInterface(){
let etapa = etapas[etapaAtual];
let candidato = etapa.candidatos

for(let i = 0; i<etapa.opcoes; i++){
	
	num =candidato[i].cnumero;
	aux =candidato[i];
	//console.log(numero)
	
	if(num===numero){
		seuVotoPara.style.display = "block";
		aviso.style.display='block';
		descricao.innerHTML = `Nome: ${aux.nome}<br/>Partido: ${aux.partido}`;


		let fotosHtml = ''; 
		for(let i in aux.fotos){
			fotosHtml += `<div class="d-1-image"><img src="imagens/${aux.fotos[i].url}"><p class="legenda">${aux.fotos[i].legenda}</p></div>`;
			console.log(fotosHtml)
		}

		lateral.innerHTML = fotosHtml;
		break;

	}

	else{
		seuVotoPara.style.display = "block";
		descricao.innerHTML = `<div class='aviso-grande pisca'>  VOTO NULO`;
		aviso.style.display='block';

	}
	
}


}






//Funções dos botões da urna (AÇÕES DE CLICK PARA OS BOTÕES DA URNA)
let contador = 0;
function clicou(n){
	let elNumero = document.querySelector('.numero.pisca');
	if(elNumero!==null){
		elNumero.innerHTML = n;
		numero = `${numero}${n}`;
		console.log(numero)
		
		contador++;

		elNumero.classList.remove('pisca');

		if(elNumero.nextElementSibling!==null){
		elNumero.nextElementSibling.classList.add('pisca')
		}
		else{
			atualizaInterface();

		}
	}
}


function branco(){
	if(numero=== ' ' ){
		Votobranco = true;
		seuVotoPara.style.display = "block";
		aviso.style.display='block';
		descricao.innerHTML = `<div class='aviso-grande pisca'>  VOTO BRANCO`;
		numeros.style.display ='none';

	}
}

function corrige(){
	numero = ' ';
	Votobranco = false;
	contador = 0;

	comecarEtapa();

}

function confirma(){
	let etapa = etapas[etapaAtual];
	let votoConfirmado = false;

	if(Votobranco === true){
		votoConfirmado = true;
		console.log("confirmando voto")
	}
	else if(contador===etapa.num){
		votoConfirmado = true;
		console.log("confirmando o voto")
	}

	//ja é true poque recebeu a propriedade dessas linhas de cima
	if(votoConfirmado){
		etapaAtual++;
		if(etapas[etapaAtual] !== undefined){
			numero = ' ';
		Votobranco = false;
		contador = 0;
			comecarEtapa();
		}
		else{
			alert("fim")
		}
	}


}


comecarEtapa();











//numeros.innerHTML = " ";
//lateral.innerHTML = ' ';
//aviso.style.visibility = 'hidden'
//seuVotoPara.style.display = 'none';