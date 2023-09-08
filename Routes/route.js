const router = require('express').Router();

router.route('/').get((req, res) => {
    res.json({ "operation_code": 1 })

})

router.route('/').post((req, res) => {
    const data = req.body.data;
    // data = ["M", "1", "334", "4", "B"]
    //separate alphabet and numbers
    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid request format' });
    }
    const full_name = "Sanskar_Gupta"
    var dob = "09/01/2002"
    const user_id = `${full_name}_${dob.replace(/\//g, '')}`;
    const email = 'sg5592@srmist.edu.in';
    const emailRegex = /^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/;
    const roll_number = 'RA2011003010224';
    const numbers = [];
    const alphabets = [];
    let highestAlphabet = null;
    data.forEach(item => {
        if (typeof item === 'string' && item.length === 1) {
            const charCode = item.charCodeAt(0);
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
                // It's an uppercase or lowercase alphabet
                alphabets.push(item);
                if (highestAlphabet === null || item > highestAlphabet) {
                    highestAlphabet = item;
                }
            }
        } else if (!isNaN(item)) {
            numbers.push(item);
        }
    });
    var responseData = {
        is_success: true,
        user_id: user_id,
        email: emailRegex.test(email) ? email : "not valid email",
        roll_number: roll_number,
        numbers: numbers.map(String),
        alphabets,
        highest_alphabet: highestAlphabet
    };
    res.json(responseData);
})
module.exports = router;