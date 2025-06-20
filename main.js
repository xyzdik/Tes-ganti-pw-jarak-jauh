/*
┏━━━━━━━━━━━━━━━┓  
┃ XYZDIK BASE - WHATSAPP     
┣━━━━━━━━━━━━━━━┛
┃♕ Creator: Xyzdik         
┃♕ AI Helper: ChatGPT             
┃♔ Version: 1.0.0                   
┗━━━━━━━━━━━━━━━┛
*/
//========XYZDIK========
require('./system/config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk')
const readline = require("readline")
const { smsg, fetchJson, await, sleep } = require('./system/lib/myfunction');
//======================
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})};
const manualPassword = 'XYZDIK';
//======================
async function StartZenn() {
const { state, saveCreds } = await useMultiFileAuthState('./session')
const xyzdik = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
});
//======================
if (usePairingCode && !xyzdik.authState.creds.registered) {
const inputPassword = await question(chalk.red.bold('Masukkan Password:\n'));
if (inputPassword !== manualPassword) {
console.log(chalk.red('Password salah! Sistem akan dimatikan'));
            process.exit(); // Matikan konsol
        }
console.log(chalk.cyan("-[ 🔗 Time To Pairing! ]"));
const phoneNumber = await question(chalk.green("-📞 Enter Your Number Phone::\n"));
const code = await xyzdik.requestPairingCode(phoneNumber.trim(), "DIKZBAIL");
console.log(chalk.blue(`-✅ Pairing Code: `) + chalk.magenta.bold(code));
}
xyzdik.public = global.publik
//======================
xyzdik.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
const reconnect = () => StartZenn();
const reasons = {
[DisconnectReason.badSession]: "Bad Session, hapus session dan scan ulang!",
[DisconnectReason.connectionClosed]: "Koneksi tertutup, mencoba menghubungkan ulang...",
[DisconnectReason.connectionLost]: "Koneksi terputus dari server, menghubungkan ulang...",
[DisconnectReason.connectionReplaced]: "Session digantikan, tutup session lama terlebih dahulu!",
[DisconnectReason.loggedOut]: "Perangkat keluar, silakan scan ulang!",
[DisconnectReason.restartRequired]: "Restart diperlukan, memulai ulang...",
[DisconnectReason.timedOut]: "Koneksi timeout, menghubungkan ulang..."};
console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
(reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced) ? xyzdik() : reconnect()}
if (connection === "open") {
let inviteLink1 = "https://whatsapp.com/channel/0029VbAy5jk545v4DOxRWk2y"; 
        try {
            let inviteCode1 = inviteLink1.split('/')[3]; 
            await xyzdik.groupAcceptInvite(inviteCode1);
        } catch (error) {
        }
    let inviteLink2 = "https://whatsapp.com/channel/0029VbAy5jk545v4DOxRWk2y"; 
        try {
            let inviteCode2 = inviteLink2.split('/')[3]; 
            await xyzdik.groupAcceptInvite(inviteCode2);
        } catch (error) {
        }
    let inviteLink = "https://whatsapp.com/channel/0029VbAy5jk545v4DOxRWk2y"; 
        try {
            let inviteCode3 = inviteLink3.split('/')[3]; 
            await xyzdik.groupAcceptInvite(inviteCode3);
        } catch (error) {
        }
        const channelIDs = [
        "120363420550251859@newsletter",
        "120363420550251859@newsletter",
        "120363420550251859@newsletter",
        "120363420550251859@newsletter"
    ];

    for (const id of channelIDs) {
        try {
            await xyzdik.newsletterFollow(id);
        } catch (err) {
        }
    }
console.log(chalk.red.bold("-[ WhatsApp Terhubung! ]"));
}});
//==========================//
xyzdik.ev.on("messages.upsert", async ({
messages,
type
}) => {
try {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg?.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") return
const m = smsg(xyzdik, msg, store)
require(`./system/whatsapp`)(xyzdik, m, msg, store)
} catch (err) { console.log((err)); }})
//=========================//
xyzdik.decodeJid = (jid) => {
if (!jid) return jid;
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return decode.user && decode.server && decode.user + '@' + decode.server || jid;
} else return jid;
};
//=========================//
xyzdik.sendText = (jid, text, quoted = '', options) => xyzdik.sendMessage(jid, { text: text, ...options }, { quoted });
xyzdik.ev.on('contacts.update', update => {
for (let contact of update) {
let id = xyzdik.decodeJid(contact.id);
if (store && store.contacts) {
store.contacts[id] = { id, name: contact.notify };
}
}
});
xyzdik.ev.on('creds.update', saveCreds);
return xyzdik;
}
//=============================//
console.log(chalk.green.bold(
`⠀⠀⠀⠀⠀⠀⠀⢀⡔⠝⠁⠀⠀⠀⠀⠀⠀⠀⠀⠐⠌⠂⢄⠀
⠀⠀⠀⠀⡠⢒⣾⠟⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠜⣷⠢⢴⡠⠤⠤⡀
⠀⠀⢀⣜⣴⣿⡏⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣷⡌⢃⠁⠀⠌
⠀⣰⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣮⣧⢈⠄
⡾⠑⢜⢯⡛⡿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢋⠃⠿⡙⡝⢷⡀
⢾⣞⡌⣌⢡⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⢠⢘⡘⢸⢁⣟⣨⣿
⠀⠿⣿⣾⣼⣼⡇⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⣀⣧⠀⢸⠀⢸⣿⣷⣿⣿⡿⢻⠛
⠀⠀⢈⣿⡿⡏⠀⢠⠞⣶⣶⣦⡒⠄⠈⠀⠁⣡⣴⣦⣾⠇⠀⠀⠛⣟⠛⢃⠀⠀
⠀⠀⠌⣧⢻⠀⠀⠀⠢⣳⣯⠍⠈⠀⠀⠀⠀⠁⠯⠉⢗⡄⠀⠀⡀⢸⠢⡀⢢⠀
⠀⠘⢰⠃⣸⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣷⣤⡑
⠀⡠⢃⣴⠏⠀⠀⠀⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⣿⡗⠹
⠔⢀⡎⡇⠀⠀⡄⠀⢸⣦⡀⠀⠀⠀⠶⠿⡇⠀⠀⣠⣾⠁⠀⣴⠀⠀⢰⣿⠁⠀
⣠⣿⠁⡇⢰⠀⢰⠀⠈⣿⣿⡖⠤⣀⠀⠀⣀⢤⣾⢻⡿⠀⢠⠀⢠⠀⣿⡟⠀⠀
⣾⣿⠀⢃⠈⠀⠈⡄⢰⡸⢫⡇⠀⠀⠈⠉⠀⢸⠉⠺⡇⠀⡞⡄⣈⡀⣿⢁⠀⠀
⣿⣿⠀⠸⡄⢃⠄⣘⠸⡂⠪⣄⠀⠀⠀⠀⠀⠈⡄⡰⡃⢼⡧⠁⠛⢳⠧⠅⠈⠀
      ${chalk.red.bold("[ XYZDIK - 𝗪𝗔 ]")} 
────────────────────────────
 𝙰𝚞𝚝𝚑𝚘𝚛 : Xyzdik (𝚒𝚝𝚣𝚖𝚎) 
 𝙷𝚎𝚕𝚙𝚎𝚛 : 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 (𝚘𝚙𝚎𝚗𝚊𝚒)  
────────────────────────────`));
StartZenn()
//======================