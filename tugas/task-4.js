export function devideAndSort (num) {
    // mengubah angka menjadi string
    let numStr = num.toString()

    // memisah string angka berdasarkan 0 dan menjadi array
    let numPisah = numStr.split("0")

    // memecah string angka menjadi array karakter / digit-digit
    let urut = numPisah.map(pisah =>pisah.split(``)
    // map memproses numPisah dan menjadi array baru

    // mengurutkan secara ascending
    .sort()

    // menggabungkan array karakter menjadi array of string
    .join(``))

    // menggabungkan array menjadi satu string tanpa pemisah (``)
    let gabungkan = urut.join(``)

    // mengubah string angkan menjadi number
    return Number(gabungkan);
}
// console.log(devideAndSort(5956560159466056));