export const getDataFromServer = (status, callback) =>{
    if(status) {
        setTimeout(() => {
            const product = [
                `Product 1`,
                `Product 2`,
                `Product 3`
            ]
            callback(product, null)
        }, 3000)
    } else {
        const err = new Error(`Failed to fetch data`)
        callback(null, err)
    }
}
/* fungsi processData menerima dua parameter

*/
export function processData (product, err){
    try {
        // validasi apakah ada error
        if(err) {
            throw err 
        }
        // jika tidak ada product di tampilkan
        console.log(`Product berhasil`,product);
        // jika ada catch menangkap error
    } catch(error) {
        console.log(error.message)
    }
}
// getDataFromServer(true, processData);