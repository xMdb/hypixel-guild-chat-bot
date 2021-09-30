module.exports = function minecraftifyText(text) {
   let cleanText = text.replaceAll('+', '%2B');
   cleanText = cleanText.replaceAll('&', '%26');
   cleanText = cleanText.replaceAll(' ', '%20');
   cleanText = cleanText.replaceAll(',', '%2C');
   cleanText = cleanText.replaceAll('/', '%2F');
   return `https://fake-chat.matdoes.dev/render.png?m=custom&d=%20${cleanText}&t=1`;
};
