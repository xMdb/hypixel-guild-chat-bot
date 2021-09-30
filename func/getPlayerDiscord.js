const fetch = require('node-fetch');

module.exports = async function getPlayerDiscord(name) {
   const { links } = await fetch(`https://api.slothpixel.me/api/players/${name}`)
      .then((response) => response.json())
      .catch((error) => console.error(error));
   return links.DISCORD ?? 'Not Set';
};
