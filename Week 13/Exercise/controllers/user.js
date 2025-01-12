import User from '../models/user.js';

const login = (req, res) => {
    let message = req.session.err || '';
    req.session.err = '';
    res.render('pages/login', {
        user: req.session.user, 
        message: message
    });
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

const auth = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then((result) => {
        if (!result) {
            req.session.err = 'Email not registered';
            res.redirect('/login');
        }
        else if (result.password != password) {
            req.session.err = 'Incorrect password';
            res.redirect('/login');
        }
        else {
            req.session.err = '';
            req.session.user = result;
            res.redirect('/');
        }
    })
}

export default { login, logout, auth };