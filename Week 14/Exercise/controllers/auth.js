const forRegistered = (req, res, next) => {
    const user = req.session.user || '';
    if (user) next();
    else res.redirect('/forbidden');
}

export default forRegistered;