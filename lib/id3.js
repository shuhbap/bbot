const { getBuffer } = require("./index.js");
const NodeID3 = require('node-id3');
module.exports = {
async Writer(title , artist , image, dls){
//let image = await getBuffer(`https://i.imgur.com/1GcN7NF.jpeg`)
let dd = await NodeID3.write({
    title: title || "𝑆𝑢ℎ𝑎𝑖𝑑-𝐵𝑟𝑜",
    artist: artist || "ˢᵘʰᵃⁱᵈ ",
    album: "𝐴𝐹𝐼𝑌𝐴-𝑀𝐷",
    APIC: image || "https://i.imgur.com/3CmfQGM.jpeg",
    TRCK: "27"
},
    dls
)
return dd
}
}
