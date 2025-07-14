import fs from "node:fs";
import path, { dirname } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const _filename = fileURLToPath(import.meta.url)
const __dirname = dirname(_filename);

// lokasi folder data dan file mydata
const folder = path.join(__dirname, "data");
const file = path.join(folder, "mydata.txt"); // tipe file bisa di ubah sesuai keinginan

// validasi jika folder data belum ada
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder); // buat folder baru
}

export function tampilkanMenu() {
  console.log(`\n====  MENU  =====`);
  console.log(`1.Tambah`);
  console.log(`2.Edit`);
  console.log(`3.Lihat`);
  console.log(`4.Hapus`);
  console.log(`5.Keluar`);
  rl.question("Pilih menu 1-5: ", prosesPilihan);
}
function tambahData() {
  // readline yang menerima parameter input, jika di input maka dia string
  rl.question("Masukkan data yang ingin ditambahkan: ", (input) => {
    // nambah data diakhir ke variabel file (mydata.txt)tanpa menimpa data sebelumnya, /n untuk membuat inputan dibaris baru
    fs.appendFileSync(file, input + "\n");
    console.log("\n✅   Data ditambahkan.");
    tampilkanMenu();
  });
}
function editData() {
  // memeriksa apakah sebuah fil ada
  if (!fs.existsSync(file)) {
    console.log(`📁 File belum ada`);
    tampilkanMenu();
  }
  // membaca file secara sinkron, yang dimana di baca satu persatu yang di pisahkan menggunakan \n
  // dan string di ubah menjadi array
  const lines = fs.readFileSync(file, `utf8`).split("\n").filter(Boolean); // di gunakan menghapus baris kosong
  // memeriksa apakah array lines kosong atau tidak
  if (lines.length === 0) {
    // jika kosong tampilkan ini
    console.log(`⚠️tidak ada data untuk dirubah.`);
    tampilkanMenu;
  }
  console.log(`\n==== data saat ini ====`);
  // menampilkan daftar data dengan nomor index
  lines.forEach((lines, index) => {
    console.log(`${index + 1}. ${lines}`);
  });
  rl.question(`pilih nomor data yang ingin anda ubah: `, (num) => {
    // menkonversi input pengguna menjadi array
    const index = parseInt(num) - 1;
    // memeriksa apakah index valid atau  tidak
    if (index >= 0 && index < lines.length) {
      // jika valid pengguna memasukkan data baru 
      rl.question(`Masukkan data baru: `, (newData) => {
        // mengupdate data pada index
        lines[index] = newData;
        // menulis kembali data baru, dan di ubah menjadi string
        fs.writeFileSync(file, lines.join(`\n`) + "\n");
        console.log(`✅ Data berhasil di ubah`);
        tampilkanMenu();
      });
    } else {
      console.log(`\n❌ nomor anda pilih salah`);
      editData();
    }
  });
}

function lihatData() {
  // memeriksa apakah file ada secara sinkron
  if (fs.existsSync(file)) {
    //jika ada, maka fs.readFileSync membaca file secara sinkron
    const data = fs.readFileSync(file, `utf-8`);
    console.log("\n=== DATA ANDA===\n" + data);
  } else {
    console.log(`\n📁 File belum ada.`);
  }
  tampilkanMenu();
}

function hapusData() {
  // memeriksa apakah berkas ada 
  if (!fs.existsSync(file)) {
    console.log(`📁 File belum ada`);
    tampilkanMenu();
  }
  // jika ada, maka muncul plihan y / n
  rl.question(`apakah anda yakin ingin menghapus? (y/n): `, (confirm) => {
    // konfirmasi dibuat menjadi huruf kecil agar tidak sensitive
    if (confirm.toLowerCase() === "y") {
      // menghapus file menggunakan fs.unlinkSync(secara sinkron)
      fs.unlinkSync(file);
      console.log(`"\n🗑️ Data berhasil dihapus"`);
    } else {
      // anda memilih n
      console.log(`⚠️ Penghapusan di batalkan`);
    }
    tampilkanMenu();
  });
}

function prosesPilihan(pilihan) {
  switch (pilihan) {
    case "1":
      tambahData();
      break;
    case "2":
      editData();
      break;
    case "3":
      lihatData();
      break;
    case "4":
      hapusData();
      break;
    case "5":
      console.log("👋 Keluar...");
      rl.close();
      break;
    // jika anda tidak memilih pilihan 1-5
    default:
      console.log("❌ Pilihan tidak valid.");
      tampilkanMenu(); // Tampilkan menu lagi jika pilihan tidak valid
  }
}


// tampilkanMenu();
