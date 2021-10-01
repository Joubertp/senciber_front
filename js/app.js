import data from '../js/data.js'

/* === QR CODE === */
// create an event
const button = document.getElementById('random-btn');
if (button) {
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


        // generate a qrcode
        const makeCode = () => {
            let listUser = []
            const listConnectedUsers = () => {
                fetch(data.backUrl + '/user/list/')
                    .then(resp => resp.json())
                    .then(resp => {
                        const el = resp.filter(el => {
                            return el
                        })
                        console.log('el', el)
                        QR_CODE.makeCode(JSON.stringify(el));
                    })
            }

            listConnectedUsers()


        }

        makeCode();
    });
}


/* === AUTH === */
// register
let submit = document.getElementById('submit2')
let mail, password, surname, name;
if (submit) {
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        let user = {}
        mail = document.getElementById('mail2').value
        password = document.getElementById('password2').value
        name = document.getElementById('name').value
        surname = document.getElementById('surname').value
        console.log('mail', mail, password)
        user.email = mail
        user.password = password
        user.name = name
        user.surname = surname

        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user })
        }

        console.log('data', init.body)
            /*fetch('http://127.0.0.1:3000/user/list')
        .then(res => console.log(res.json()))
        .catch(error => console.log(error))
        */
        fetch(data.backUrl + '/user/create', init)
            .then(response => response.json())
            .then(res => {
                data.user = res
                window.location.href = data.baseUrl + "/"
            })
            .catch(error => console.log(error));
    });
}

// connection
let submit1 = document.getElementById('submit1')
let mail1, password1;
if (submit1) {
    submit1.addEventListener('click', (e) => {
        e.preventDefault()
        let user = {}
        mail1 = document.getElementById('mail1').value
        password1 = document.getElementById('password1').value
        console.log('mail', mail1, password1)
        user.email = mail1
        user.password = password1

        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user })
        }

        console.log('data', init.body)

        fetch(data.backUrl + '/user/login', init)
            .then(response => response.json())
            .then(res => {
                data.user = res
                const user = data.user
                console.log('user', user)
                window.location.href = data.baseUrl + "/html/connected.html"
            })
            .catch(error => console.log(error));
    });
}

// logout
const deconnect = document.getElementById('deconnect')
if (deconnect) {
    deconnect.addEventListener('click', () => {
        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(data.backUrl + '/user/logout/:' + data.user._id, init)
            .then(response => response.json())
            .then(res => {
                data.user = {}
            })
            .catch(error => console.log(error));

    })
}