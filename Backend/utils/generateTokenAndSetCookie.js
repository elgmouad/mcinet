import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId, profile) => {
    try {
        // console.log('Generating verification code for user:', userId);
        const token = jwt.sign({id: userId, profile: profile}, process.env.JWT_SECRET, 
            {expiresIn: "1h",
        });
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        // console.log('Token from the external function: ', token, expiresIn)
        return token;
    }catch (error) {
        res.status(500).json({success: false, message: "server error"})
        throw new Error('Failed to generate verification code')
    }

    
};