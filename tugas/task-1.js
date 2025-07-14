export const fetchData = (status) => {
    return new Promise((resolve, reject) => {
        if(status){
            setTimeout(() =>{
                resolve(`Data berhasil disimpan`)
            }, 3000)
        } else{
            reject(`Gagal mengambil data`)
        }
    })
}

// Then catch
fetchData(true) // hasil akhir nya bergantung dengan status nya
.then((data) => {
    // jika status nya true akan mencetak ini
    console.log(`Sukses:`, data)
    // jika statusnya gagal, catch akan menangkap error
}).catch (error => {
    console.log(`Gagal;:`, error)
})
 
/* async await
function getData menerima parameter status
parameter nya akan menerima boolean
*/
async function getData(status) {
    // jika status nya true blok try akan di cetak
    try {
        const result = await fetchData(status)
        console.log(`Berhasil`, result)
    // jika status nya false blok catch akan menangkap error
    } catch(error) {
        console.log(`Terjadi Kesalahan:`, error)
    }
}
export default getData;