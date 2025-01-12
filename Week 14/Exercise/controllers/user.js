import User from '../models/user.js';

const login = (req, res) => {
    let message = req.session.err || '';
    req.session.err = '';
    res.render('pages/login', {
        user: req.session.user, 
        message: message
    })
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

const auth = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    

    User.findOne({
        where: { email: email }
    }).then((result) => {
        if (!result) {
            req.session.err = 'Email not registered';
            res.redirect('/user/login');
        }
        else if (result.password !== password) {
            req.session.err = 'Incorrect password';
            res.redirect('/user/login');
        }
        else {
            req.session.err = '';
            req.session.user = result;
            console.log(req.session.user);
            res.redirect('/');
        }
    })
}

export default { login, logout, auth };