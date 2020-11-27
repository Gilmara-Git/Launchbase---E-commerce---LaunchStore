// modulo do node - crypto  - para criar o token de recuperacao de senha
const crypto = require("crypto");
const User = require("../models/User");
const mailer = require("../../lib/mailer");

module.exports = {
  logout(req, res) {
    // logout does not need async
    req.session.destroy(); //Quando usuario clicar em SAIR no menu de Minha conta, sessao sera destruida e usuario redirecionado

    return res.redirect("/");
  },
  loginForm(req, res) {
    return res.render("session/login");
  },

  login(req, res) {
    //colocar o usuario no req.session
    req.session.userId = req.user.id;
    return res.redirect("/users");
  },

  forgotForm(req, res) {
    return res.render("session/forgot-password");
  },

  async forgot(req, res) {
    const user = req.user;

    try {
      // um token para esse usuario de
      const token = crypto.randomBytes(20).toString("hex");
      console.log(
        "este e o token criado com cyrpto randomBytes",
        token
      );
      // criar uma expiracao para o token
      let now = new Date();
      now.setHours(now.getHours() + 1); // token expirara em 1 hora

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      // enviar um email com um link de recuperacao de senha
      await mailer.sendMail({
        to: user.email,
        from: "no-reply@launchstore.com.br",
        subject: "Recuperação de Senha",
        html: `<h2>Perdeu a chave?</h2>
          <p>Não se preocupe, clique no link abaixo para recuperar sua senha.</p> 
          <p>
               <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                  RECUPERAR SENHA
               </a>
          </p>
   `,
      });

      // avisar o usuario que enviamos o email
      return res.render("session/forgot-password", {
        success: "Verifique seu email para resetar sua senha!",
      });
    } catch (err) {
      console.error(err);
      return res.render("sessiona/forgot-password", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
};
