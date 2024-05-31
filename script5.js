// Variáveis globais para controlar se o bot recebeu "oi" e "preciso de ajuda"
var receivedOi = false;
var receivedDenuncia = false;
var receivedAjudaImediata = false;
var receivedPrecisoDeAjuda = false;

// Função para enviar mensagem do usuário e obter resposta do bot
function enviarMensagem() {
  // Obter entrada do usuário
  var userInput = document.getElementById("message").value.toLowerCase();

  // Selecionar o elemento onde as mensagens do chat são exibidas
  var chatBox = document.getElementById("chat-messages");

  // Criar elemento para a mensagem do usuário e exibi-lo no chat
  var userMessageElement = createMessageElement("Você", userInput);
  chatBox.appendChild(userMessageElement);

  // Ocultar botões de ajuda
  ocultarBotoesDeAjuda();

  // Corrigir a entrada do usuário
  var correctedInput = correctSpelling(userInput);

  if (correctedInput === "oi") {
    // Marcar que o bot recebeu "oi"
    receivedOi = true;

    // Exibir resposta do bot
    var botResponseElement = createMessageElement("Bot", "Olá! No que posso te ajudar?");
    chatBox.appendChild(botResponseElement);

  } else if (receivedOi && correctedInput === "preciso de ajuda") {
    // Exibir resposta do bot se o bot recebeu "preciso de ajuda" anteriormente
    var botResponseElement = createMessageElement("Bot", "Certo!Você gostaria de uma ajuda imediata ou uma denúncia?");
    chatBox.appendChild(botResponseElement);

  } else if (receivedDenuncia && correctedInput === "denunciar") {
    var botResponseElement = createMessageElement("Bot", "Você escolheu denunciar.Você gostaria de escrever um esboço de sua denúncia ou gostaria de ligar?");
    chatBox.appendChild(botResponseElement);

  } else {
    // Resposta padrão do bot para outras mensagens
    var botResponseElement = createMessageElement("Bot", "Desculpe, não entendi.");
    chatBox.appendChild(botResponseElement);
  }

  // Limpar entrada do usuário
  document.getElementById("message").value = "";
}

// Função auxiliar para criar elementos de mensagem do chat
function createMessageElement(sender, message) {
  var messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  messageElement.textContent = sender + ": " + message;
  return messageElement;
}

// Função auxiliar para corrigir erros de digitação
function correctSpelling(input) {
  // Palavras-chave esperadas
  var keywords = ["oi", "preciso de ajuda", "denunciar"];
  var minDistance = Infinity;
  var correctedWord = null;

  // Iterar sobre as palavras-chave e calcular a distância de edição
  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    var distance = levenshteinDistance(input, keyword);
    // Se a distância for menor que a mínima atual, atualizar a palavra corrigida
    if (distance < minDistance) {
      minDistance = distance;
      correctedWord = keyword;
    }
  }

  // Se a distância mínima estiver abaixo de um limite, retornar a palavra-chave corrigida
  // Limite aumentado para 4 para corrigir apenas erros significativos
  if (minDistance <= 4) {
    return correctedWord;
  } else {
    return null;
  }
}

// Função para calcular a distância de Levenshtein entre duas strings
function levenshteinDistance(s1, s2) {
  var m = s1.length, n = s2.length;
  var d = [];
  for (var i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (var j = 0; j <= n; j++) {
    d[0][j] = j;
  }
  for (var j = 1; j <= n; j++) {
    for (var i = 1; i <= m; i++) {
      if (s1[i - 1] == s2[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + 1);
      }
    }
  }
  return d[m][n];
}

// Função para ocultar os botões de ajuda
function ocultarBotoesDeAjuda() {
  var botoesDeAjuda = document.querySelectorAll(".question");
  for (var i = 0; i < botoesDeAjuda.length; i++) {
    botoesDeAjuda[i].style.display = "none";
  }
}

// Evento de pressionar Enter
document.getElementById('message').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // Código da tecla Enter
    enviarMensagem();
  }
});

