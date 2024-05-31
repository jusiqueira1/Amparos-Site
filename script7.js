// Variável global para controlar se o bot recebeu "preciso de ajuda"
var receivedPrecisoDeAjuda = false;

// Função para enviar mensagem do usuário e obter resposta do bot
function sendMessage() {
  // Obter entrada do usuário
  var userInput = document.getElementById("user-input").value.toLowerCase();
  var chatBox = document.getElementById("chat-box");

  // Criar elemento para a mensagem do usuário e exibi-lo no chat
  var userMessageElement = createMessageElement("Você", userInput);
  chatBox.appendChild(userMessageElement);

  // Corrigir a entrada do usuário
  var correctedInput = correctSpelling(userInput);

  // Verificar se a mensagem do usuário é "preciso de ajuda"
  if (correctedInput === "preciso de ajuda") {
    // Marcar que o bot recebeu "preciso de ajuda"
    receivedPrecisoDeAjuda = true;
    // Exibir resposta do bot
    var botResponseElement = createMessageElement("Bot", "Certo! O que está acontecendo?");
    chatBox.appendChild(botResponseElement);
  } else if (receivedPrecisoDeAjuda && correctedInput === "Certo! O que está acontecendo?") {
    // Exibir resposta do bot se o bot recebeu "preciso de ajuda" anteriormente
    var botResponseElement = createMessageElement("Bot", "Muito bem, obrigado!");
    chatBox.appendChild(botResponseElement);
  } else if (receivedPrecisoDeAjuda && correctedInput === "how are you?") {
    // Exibir resposta do bot se o bot recebeu "preciso de ajuda" anteriormente
    var botResponseElement = createMessageElement("Bot", "Muito bem, obrigado!");
    chatBox.appendChild(botResponseElement);
  } else {
    // Resposta padrão do bot para outras mensagens
    var botResponseElement = createMessageElement("Bot", "Desculpe, não entendi.");
    chatBox.appendChild(botResponseElement);
  }

  // Limpar entrada do usuário
  document.getElementById("user-input").value = "";
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
  var keywords = ["oi", "preciso de ajuda"];
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
