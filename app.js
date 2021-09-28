import data from './data.js'
// generate a random qrcode
const button = document.getElementById('random-btn');

button.addEventListener('click', () => {      
    const qrcode = document.getElementById('qrcode');
    qrcode.innerHTML = '';

    let QR_CODE = new QRCode("qrcode", {
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      

    const makeCode = () => {      

        const randomNumber = len => {
        let random;
        let n = '';

        for(let count = 0; count < len; count++) {
            random = Math.floor(Math.random() * 10);
            n += random.toString();
        }
        // console.log('n', n)
        return n;
    }

    let token = randomNumber(13);
    data.token = token
    console.log('data', data)

    // construct the url
    const url = `https://google.com?token=${token}`
    QR_CODE.makeCode(url);
    }

    makeCode();
});
