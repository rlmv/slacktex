var clients = require('@slack/client')
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
var RTM_EVENTS = require('@slack/client').RTM_EVENTS

var token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new clients.RtmClient(token);
var web = new clients.WebClient(token);

var bot_user;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (startData) => {
    console.log(`Logged in as "${startData.self.name}"`)
    console.log(`Team is "${startData.team.name}"`)
    bot_user = startData.self.id;
});

function notBot(user) {
    return bot_user !== user;
};

rtm.on(RTM_EVENTS.MESSAGE, function handleMessage(message) {
    console.log("Received", message);

    if (notBot(message.user) && latexFormatted(message.text)) {
        var response = {
            as_user: true,
            attachments: JSON.stringify([
                {
                    fallback: latexImageUrl(message.text),
                    image_url: latexImageUrl(message.text)
                }
            ])
        };
        console.log("Sending", response);
        web.chat.postMessage(message.channel, null, response, (err, info) => {
            if (err) console.error(err);
        });
    };
});

/*
 * Check if the string is formatted like LaTeX.
 */
function latexFormatted(text) {
    return text[0] === '$' && text[text.length-1] === '$';
};

/*
 * Generate the url of the formatted LaTeX image.
 */
function latexImageUrl(latex) {
    return 'http://latex.codecogs.com/png.latex?' + encodeURIComponent(latex);
};


rtm.start();
