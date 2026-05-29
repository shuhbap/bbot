const os = require('os');
const Package = require("../package");
const config = require('../config');
const runtime = (seconds) => {
  seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " day, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hours, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minute, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " second") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

function MediaUrls(text) {
        let array = [];
        const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
        let urls = text.match(regexp);
        if (urls) {
                urls.map(url => {
                        if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webp'].includes(url.split('.').pop().toLowerCase())) {
                                array.push(url);
                        }
                });
                return array;
        }else {
        return false;
}
}
async function alive(m, ALIVE_DATA) {
	try{
			const sstart = new Date().getTime();
			let msg = {
							contextInfo: {}
					}
					let extractions = ALIVE_DATA.match(/#(.*?)#/g);
					let URL;
					if (extractions) {
						ALIVE_DATA = ALIVE_DATA.replace( /#([^#]+)#/g,'');
						extractions = extractions.map(m => m.slice(1, -1));
							let arra = [];
							URL = MediaUrls(ALIVE_DATA)[0]; 
							msg.contextInfo.externalAdReply = {
									containsAutoReply: true,
									mediaType: 1,
									previewType: "PHOTO"
							};
							extractions.map(extraction=>{
								extraction = extraction.replace('\\','');
								if (extraction.match(/adattribution/gi)) msg.contextInfo.externalAdReply.showAdAttribution = true;
								if (extraction.match(/adreply/gi)) msg.contextInfo.externalAdReply.showAdAttribution = true;
								if (extraction.match(/largerthumbnail/gi)) msg.contextInfo.externalAdReply.renderLargerThumbnail = true;
								if (extraction.match(/largethumb/gi)) msg.contextInfo.externalAdReply.renderLargerThumbnail = true;
								if (extraction.match(/title/gi)) msg.contextInfo.externalAdReply.title = extraction.replace(/title/gi, '');
								if (extraction.match(/body/gi)) msg.contextInfo.externalAdReply.body = extraction.replace(/body/gi, '');
								if (extraction.match(/thumbnail/gi) && !extraction.match(/largerthumbnail/gi)) msg.contextInfo.externalAdReply.thumbnailUrl = extraction.replace(/thumbnail/gi, '');
								if (extraction.match(/thumb/gi) && !extraction.match(/largerthumbnail/gi) && !extraction.match(/largethumb/gi) && !extraction.match(/thumbnail/gi)) msg.contextInfo.externalAdReply.thumbnailUrl = extraction.replace(/thumb/gi, '');
								if (extraction.match(/sourceurl/gi)) msg.contextInfo.externalAdReply.sourceUrl = extraction.replace(/sourceurl/gi, '');
								if (extraction.match(/mediaurl/gi)) msg.contextInfo.externalAdReply.mediaUrl = extraction.replace(/mediaurl/gi, '');
							});
					} else {
							URL = MediaUrls(ALIVE_DATA)[0]
					}
							const platform = os.platform();
		                                        const prefix = config.HANDLERS;
		     					const version = Package.version
		                                        const sender = m.sender;
							const user = m.pushName;
		                                
							const text = ALIVE_DATA.replace(/&runtime/g,`${runtime(process.uptime())}`).replace(/&version/gi, `${version}`).replace(/&prefix/gi, `${prefix}`).replace(/&sender/gi, `${user}`).replace(/&platform/gi, `${platform}`).replace(/&speed/gi, `${sstart-new Date().getTime()}`).replace(/&gif/g,'');
					        //if (ALIVE_DATA.includes('&sender')) msg.contextInfo.mentionedJid = [m.sender];
                    		if (ALIVE_DATA.includes('&gif')) msg.gifPlayback = true;
		                                           
							if (URL && URL.endsWith('.mp4')) {
									msg.video = {
										url: URL
									},
										
									msg.caption = text.replace(URL,'').trim();
							} else if(URL) {
									msg.image = {
											url: URL
									},
									msg.caption = text.replace(URL,'').trim();
							} else msg.text = text.trim();
							return await m.client.sendMessage(m.jid,msg);
							}catch(e){
	                                                console.log(e)
	}
					}
module.exports = { alive };
