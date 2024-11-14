import jwt from 'jsonwebtoken';

const generateTokenAndCookie = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        samesite: 'strict',
    })
}

export default generateTokenAndCookie;