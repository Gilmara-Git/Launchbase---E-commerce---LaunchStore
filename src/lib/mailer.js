// installed library npm install nodemailer
const nodemailer =  require('nodemailer')
//mailtrap.io/inboxes -  this is just for test -  caixa de entrada para testar envior de emails


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e5be60456f0019",
      pass: "597d70e94b67fb"
    }
  });