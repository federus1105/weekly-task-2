export async function RestApi(user) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    if (!response.ok) {
      throw new Error(`tidak berhasil${response.status}`);
    }
    // karena di minta dijadikan array of object, saya menggunakan map,map mengembalikan array baru
    // dan di dalam map saya tambahkan {} biar jadi object
    const data = await response.json();
    // mengambil data menggunakan map, data yang di ambil adalah name dan city
    let nama = data.map((x) => ({
      nama: x.name,
      domisili: x.address.city,
    }));
    // sort/urut domisili nya secara ascending
        
    console.log(nama);
  } catch (error) {
    console.log(error);
  }
}
// RestApi();
