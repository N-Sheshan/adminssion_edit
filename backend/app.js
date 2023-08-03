const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'postform'
})
// app.use(express.limit(1000));
app.use(express.static("frontend"))
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// mysql
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GET Method all data's {
// this function to get the data from student_master table
app.get("/student_master", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM student_master ', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// this function to get the data from additional_info table
app.get("/additional_info", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM additional_info', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// this function to get the data from admission_details table
app.get("/admission_details", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM admission_details', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// this function to get the data from fg_master table
app.get("/fg_master", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM fg_master', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// this function to get the data from hsc_aca table
app.get("/hsc_aca", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM hsc_aca', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// this function to get the data from hsc_voc table
app.get("/hsc_voc", (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM hsc_voc', (err, rows) => {
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// } end here
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// get specfic element{
// getting the element using id
app.get('/:id', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM student_master WHERE aadhaarno = ?', [req.params.id], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// getting the element using id in additional_info
app.get('/additional_info/:id', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM additional_info WHERE aadhaarno = ?', [req.params.id], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// getting the element using id in admission_details
app.get('/admission_details/:id', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
    
        result.query('SELECT * FROM admission_details WHERE emis = ?', [req.params.id], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// getting the element using id in fg_master
app.get('/fg_master/:id', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM fg_master WHERE admissionNo = ?', [req.params.id], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// getting the element using id in fg_master
app.get('/hsc_aca/:id', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM hsc_aca WHERE hscregno = ?', [req.params.id], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// getting the element using id in fg_master
app.get(`/hsc_voc/:id`, (req, res) => {
    const searchString = req.params.id;
    pool.getConnection((err, result) => {
        if (err) throw err
        result.query('SELECT * FROM hsc_voc WHERE admissionNo = ?', [searchString], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
// }end
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// update method
// update the data in student_master
app.put('/student_master_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE student_master SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})

// update the data in additional_info
app.put('/additional_info_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE additional_info SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})

// update the data in admission_details
app.put('/admission_details_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE additional_info SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})

// update the data in fg_master
app.put('/fg_master_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE additional_info SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})
// update the data in hsc_aca
app.put('/hsc_aca_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE additional_info SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})
// update the data in hsc_voc
app.put('/hsc_voc_resource/:aadhaarno', (req, res) => {
    console.log(req.params.aadhaarno)
    pool.getConnection((err, result) => {
        if (err) throw err
        // const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        const {GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit} = req.body;
        console.log(year)
        result.query('UPDATE additional_info SET GQ_MQ_Converted=?,Dept_Changed=?,year=?,admission_Category=?,admision_exit=? WHERE aadhaarno = ? ',[GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit,req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${year}`)
                } else {
                    console.log(err)
                }
            })
        // console.log(req.body)
    })
})

app.listen(port, () => console.log(`this backend has started in the port ${port}`));