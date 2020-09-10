const docx = require('docx-templates')
const libre = require('libreoffice-convert')
const path = require('path')
const extend = '.pdf'
const fs = require('fs');
//convert file
const enterPath = path.join(__dirname, '../public/files/report.docx');
const outputPath = path.join(__dirname, '../public/files/report.pdf');
// end convert file
const Labo = require('../models/labo')
const Address = require('../models/address-book')
const Labo_detail = require('../models/labo-detail')
const PatientDetail = require('../models/patient-detail');
const express = require('express');
const router = express.Router();

function date_ConvertedToAge(raw_Date) {
  const d = new Date(raw_Date);
  const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d)
  const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
  return calculate_age(new Date(`${ye}, ${mo}, ${da}`));
}

function dateFormatConverted(raw_Date) {
  const d = new Date(raw_Date);
  const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d)
  const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
  return (`${da}/${mo}/${ye}`);
}

function calculate_age(dob) {
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

router.post('/print-patient-sr/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let patient_detail = await PatientDetail.find({patient: id}).sort('-createdAt').populate('patient');
    let new_patient_detail = patient_detail[0];
    let address = await Address.findById(new_patient_detail.patient.current_address_book);
    let data = {
      kh_name: new_patient_detail.patient.kh_name,
      lt_name: new_patient_detail.patient.lt_name,
      phone: new_patient_detail.patient.phone,
      gender: new_patient_detail.patient.gender,
      age: new_patient_detail.patient.age,
      date: dateFormatConverted(new_patient_detail.date),
      detail: new_patient_detail,
      address: address.province + ', ' + address.district + ', ' + address.commune + ', ' + address.village,

    };
    const template = fs.readFileSync('./sr-register-patient.docx');
    const buffer = await docx.createReport({
      template,
      data: data,
    });
    await fs.writeFileSync('./public/files/report.docx', buffer);
    // Read file
    const file = await fs.readFileSync(enterPath);
    libre.convert(file, extend, undefined, async (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
      } else {
        console.log('converted')
      }
      await fs.writeFileSync(outputPath, done);
    });
    res.json({
      status: true,
      label: {
        pdf: `${Date.now()}-${new_patient_detail.patient.lt_name}.pdf`,
        docx: `${Date.now()}-${new_patient_detail.patient.lt_name}.docx`,
      },
      data: {
        // pdf: 'http://localhost:9000/files/report.pdf',
        // docx: 'http://localhost:9000/files/report.docx',
        pdf: 'https://api.khykimlong.cloudware.com.kh/files/report.pdf',
        docx: 'https://api.khykimlong.cloudware.com.kh/files/report.docx',
      },
      message: 'Successfully Generated report!'
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
    console.log(e)
    return false
  }
})
router.post('/print-labo-sr/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let labos = await Labo.findById(id).populate('patient');
    let address = await Address.findById(labos.patient.current_address_book);
    let labo_details = await Labo_detail.find({labo: labos._id});
    let data = {
      doctor: labos.doctor,
      full_name: labos.patient.kh_name,
      gender: labos.patient.gender,
      age: labos.patient.age,
      address: address.province + ' ' + address.district + ' ' + address.commune + ' ' + address.village,
      labo_date: dateFormatConverted(labos.labo_date),
      hems: labo_details.filter((d) => {
        return d.type === 'HEMATOLOGY'
      }),
      leus: labo_details.filter((d) => {
        return d.type === 'LEUCOCYTAIRE'
      }),
      bios: labo_details.filter((d) => {
        return d.type === 'BIOCHIMIE'
      }),
      sers: labo_details.filter((d) => {
        return d.type === 'SÉROLOGIE'
      })
    };
    const template = fs.readFileSync('./blood-sr.docx');
    const buffer = await docx.createReport({
      template,
      data: data,
    });
    await fs.writeFileSync('./public/files/report.docx', buffer);

    // Read file
    const file = await fs.readFileSync(enterPath);
    await libre.convert(file, extend, undefined, async (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
      } else {
        console.log('converted');
      }
      await fs.writeFileSync(outputPath, done);
    });
    res.json({
      status: true,
      label: {
        pdf: `${Date.now()}-${labos.patient.lt_name}.pdf`,
        docx: `${Date.now()}-${labos.patient.lt_name}.docx`,
      },
      data: {
        // pdf: 'http://localhost:9000/files/report.pdf',
        // docx: 'http://localhost:9000/files/report.docx',
        pdf: 'https://api.khykimlong.cloudware.com.kh/files/report.pdf',
        docx: 'https://api.khykimlong.cloudware.com.kh/files/report.docx',
      },
      message: 'Successfully Generated report!'
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
    console.log(e)
    return false
  }
});

module.exports = router;
