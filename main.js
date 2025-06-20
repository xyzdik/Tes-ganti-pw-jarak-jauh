/*
┏━━━━━━━━━━━━━━━┓  
┃ XYZDIK BASE - WHATSAPP     
┣━━━━━━━━━━━━━━━┛
┃♕ Creator: Xyzdik         
┃♕ AI Helper: ChatGPT             
┃♔ Version: 1.0.1 (with GitHub fetch)                 
┗━━━━━━━━━━━━━━━┛
*/

const fetch = require('node-fetch');
const readline = require("readline");

// Fungsi ambil password dari GitHub
let manualPassword = 'default';
(async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/xyzdik/Tes-ganti-pw-jarak-jauh/refs/heads/main/main_fetch_github.js');
        if (res.ok) {
            manualPassword = (await res.text()).trim();
            console.log("✅ Password diambil dari GitHub:", manualPassword);
        } else {
            console.log("⚠️ Gagal fetch password, status:", res.status);
        }
    } catch (err) {
        console.log("❌ Error ambil password:", err.message);
    }
})();

// Fungsi input
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(text, ans => {
        rl.close();
        resolve(ans);
    }));
};

// Contoh validasi
(async () => {
    const inputPw = await question("Masukkan Password: ");
    if (inputPw !== manualPassword) {
        console.log("❌ Password salah, keluar.");
        process.exit();
    }
    console.log("✅ Akses diterima!");
    // Lanjut proses lainnya di sini...
})();
