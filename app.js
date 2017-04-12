/*
	KittyBot
	Shows random Kitty pictures and gifs.
	See this code in action, by visiting @KittyBot on Telegram!
*/

const TeleBot = require('telebot');
const apiKey = require('./apiKey.json');
const bot = new TeleBot(apiKey.key);

// Log every text message
bot.on('text', function(msg) {
	console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

// On command "start" or "help"
bot.on(['/start', '/help'], function(msg) {
	return bot.sendMessage(msg.chat.id, '😺 Use commands: /papa, /soares, /sumaDaqui and /about');
});

// On command "about"
bot.on('/about', function(msg) {
	let text = '😽 This bot is powered by TeleBot library ' +
		'https://github.com/kosmodrey/telebot Go check the source code!';

	return bot.sendMessage(msg.chat.id, text);
});


bot.on(['/papa', '/soares', '/sumaDaqui'], function(msg) {
	const photos = [
		'http://i.imgur.com/g2REjPE.jpg',
		'http://i.imgur.com/xxDRYHu.jpg',
		'http://i.imgur.com/agC0NvR.jpg',
		'http://i.imgur.com/DWnVtkJ.jpg'
	];
	let photo = photos[Math.floor(Math.random() * photos.length)];

	let promise;
	let id = msg.chat.id;

	promise = bot.sendPhoto(id, photo, { fileName: 'papa.jpg' });

	// Send "uploading photo" action
	bot.sendAction(id, 'upload_photo');

	return promise.catch(error => {
		console.log('[error]', error);
		// Send an error
		bot.sendMessage(id, `😿 An error ${ error.description } occurred, try again.`);
	});

});

// Start getting updates
bot.connect();
