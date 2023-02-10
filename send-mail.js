import nodemailer from 'nodemailer';
import fs from 'fs';
import process from 'process';

const mailName = process.argv[2] ?? 'ufa';

console.log('for mail', mailName);

const yandexLogin = 'nikita-filatov51@yandex.ru';

const addresses = [
  yandexLogin,
  'nikita45454@gmail.com',
  'adelya0712@gmail.com',
  'adelyalink@yandex.ru'
]

const yandex = {
  server: 'smtp.yandex.ru',
  ssl: true,
  port: '465',
  login: yandexLogin,
  password: 'hafpczqbdazfryrq'
}

const transporter = nodemailer.createTransport({
  host: yandex.server,
  port: yandex.port,
  secure: yandex.ssl,
  auth: {
    user: yandex.login,
    pass: yandex.password
  }
});

const html = fs.readFileSync(`./dist/mail-${mailName}.html`);

const res = await transporter.sendMail({
  from: yandexLogin,
  to: addresses.join(', '),
  subject: 'test mail',
  html
});

console.log(res);
