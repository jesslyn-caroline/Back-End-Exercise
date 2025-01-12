const forAdmin = (req, res, next) => {
    const user = req.session.user || '';
    if (user && user.isAdmin) next();
    else res.redirect('/forbidden');
}

export default forAdmin;