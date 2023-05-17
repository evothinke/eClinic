const User = require('../models/User')
const MedicalStaff = require('../models/MedicalStaff')
const login = require('../controllers/users/login');


module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) => {
    const { first_name, last_name, gender, phone_number, role, email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const medicalstaff = await MedicalStaff.create({ first_name, last_name, gender, phone_number, role, UserId: user.id });

        // const medicalstaff = await MedicalStaff.create({first_name, last_name, gender, phone_number, role, email, password});
        res.status(201).json(medicalstaff)
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user wasn not created')
    }
}


exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await login(email, password);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


