const User = require('../../models/User')
const MedicalStaff = require('../../models/MedicalStaff')
const login = require('./login');


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
        res.status(201).json(medicalstaff)
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user wasn not created')
    }
}

const redirect = () => {
    res.redirect('/doctor')
}

exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const isAuthenticated = await login(email, password);
      if (isAuthenticated) {
        redirect(res, '/doctor');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
