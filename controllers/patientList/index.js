const router = require("express").Router();
const {Patient, MedicalStaff, Appointment, Specialty} = require ('../../models');
//localhost:3001/patientList
router.get('/', async (req, res) => {
  try {
  const patientData = await Patient.findAll();
  const patientmap = patientData.map((content)=> content.get({plain: true}))
  // const cleanPatientData = patientData.get({plain: true});
  console.log('data', patientmap);
  res.render('patientList', {patientmap});
  } catch (err) {
    res.status(400).json(err);
  }
});

  //localhost:3001/patientList/:patient_id
router.get('/:patient_id', async(req,res)=> {

    const patientData = await Patient.findByPk(req.params.patient_id, {
        include:[{model : MedicalStaff},{model: Appointment}]
    });
    const nicePatientData = patientData.get({plain: true});
    console.log('nice data', nicePatientData);
    res.render('patientChart',nicePatientData);
});
router.get('/:patient_id', async(req,res)=>{

});


router.post('/', async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(200).json(newPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;