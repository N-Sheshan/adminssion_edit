const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
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
// this api will return full database
app.get('/all_tables', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
        connection.query('SHOW TABLES', (err, tables) => {
            if (err) {
                connection.release();
                console.error('Error retrieving tables:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            let table=tables.map(table => Object.values(table)[0])
            for (let i = 0; i < table.length; i++) {
                if (table[i] === 'office_edit') {
                    let spliced = table.splice(i, 1);
                }
                if (table[i] === 'users') {
                    let spliced = table.splice(i, 1);
                }
            }
            console.log(table)
            const tableNames = table;
            const queryPromises = tableNames.map(tableName => {
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM ${tableName}`, (err, tableData) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ [tableName]: tableData });
                    });
                });
            });

            Promise.all(queryPromises)
                .then(results => {
                    const responseData = results.reduce((acc, result) => ({ ...acc, ...result }), {});
                    res.json(responseData);
                    connection.release();
                })
                .catch(error => {
                    console.error('Error querying tables:', error);
                    res.status(500).json({ error: 'Database error' });
                    connection.release();
                });
        });
    });
});

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
        result.query('SELECT * FROM student_master WHERE name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?', [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id], (err, rows) => {
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
        result.query('SELECT * FROM additional_info WHERE admissionNo IN (select admissionNo from student_master where name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?);', [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id+"%"], (err, rows) => {
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

        result.query('SELECT * FROM admission_details WHERE admissionNo IN (select admissionNo from student_master where name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?);', [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id+"%"], (err, rows) => {
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
        result.query('SELECT * FROM fg_master WHERE admissionNo IN (select admissionNo from student_master where name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?);',  [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id+"%"], (err, rows) => {
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
        result.query('SELECT * FROM hsc_aca WHERE admissionNo IN (select admissionNo from student_master where name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?);', [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id+"%"], (err, rows) => {
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
        result.query('SELECT * FROM hsc_voc WHERE admissionNo IN (select admissionNo from student_master where name  LIKE ? OR aadhaarno  LIKE ? OR admissionNo  LIKE ?);',  [req.params.id+"%","%"+req.params.id+"%","%"+req.params.id+"%"], (err, rows) => {
            result.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.get(`/login/:email`,(req,res)=>{
    const email = req.params.email;
    pool.getConnection((err,result)=>{
        if (err) throw err
        result.query(`SELECT * FROM users where email=?`,[email],(err,rows)=>{
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
    pool.getConnection((err, result) => {
        if (err) throw err
        const { id, admissionNo, admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, aadhaarno, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admission_exit} = req.body;
        
        result.query(`UPDATE student_master SET admissionFor=?, quota=?, branchAll=?, mode=?, name=?, dob=?, gender=?, age=?, nationality=?, religion=?, motherto=?, nativity=?, selfno=?, selfe=?, dadn=?, dadno=?, momn=?, momno=?, guardn=?, guardno=?, community=?, caste=?, communityno=?, AllotedCommunity=?,door=?, street=?, location=?, pincode=?, taluk=?, district=?, state=?, door1=?, street1=?, location1=?, pincode1=?, taluk1=?, district1=?, state1=?, GQ_MQ_Converted=?, Dept_Changed=?, year=?, admission_Category=?, admission_exit=? WHERE aadhaarno = ? `, [admissionFor, quota, branchAll, mode, name, dob, gender, age, nationality, religion, motherto, nativity, selfno, selfe, dadn, dadno, momn, momno, guardn, guardno, community, caste, communityno, AllotedCommunity, door, street, location, pincode, taluk, district, state, door1, street1, location1, pincode1, taluk1, district1, state1, GQ_MQ_Converted, Dept_Changed, year, admission_Category, admission_exit, req.params.aadhaarno], (err, rows) => {
            result.release()
            if (!err) {
                res.send()
            } else {
                console.log(err)
            }
        })
    })
})

// update the data in additional_info
app.put('/additional_info_resource/:aadhaarno', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        const { aadhaarno, scholarShip, exquota, sportsquota, diff, pmss, firstg, firstgno, govper, voclast, occupation, job, income, smallschool, schooltype, bigschool, schooltype1, bankn, branchn, branchcode, ifsc, micr, bankholder, accountno, appli, parent, how, dateadmission } = req.body;
        
        result.query(`UPDATE additional_info SET  aadhaarno=?, scholarShip=?, exquota=?, sportsquota=?, diff=?, pmss=?, firstg=?, firstgno=?, govper=?, voclast=?, occupation=?, job=?, income=?, smallschool=?, schooltype=?, bigschool=?, schooltype1=?, bankn=?, branchn=?, branchcode=?, ifsc=?, micr=?, bankholder=?, accountno=?, appli=?, parent=?, how=?, dateadmission=? WHERE admissionNo = ( SELECT admissionNo FROM student_master WHERE aadhaarno = ?);`, [ aadhaarno, scholarShip, exquota, sportsquota, diff, pmss, firstg, firstgno, govper, voclast, occupation, job, income, smallschool, schooltype, bigschool, schooltype1, bankn, branchn, branchcode, ifsc, micr, bankholder, accountno, appli, parent, how, dateadmission, req.params.aadhaarno], (err, rows) => {
            result.release()
            if (!err) {
                res.send(`${aadhaarno}`)
            } else {
                console.log(err)
            }
        })
    })
})

// update the data in admission_details
app.put('/admission_details_resource/:aadhaarno', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        const {  emis, counselNo, counselRank, GQseat, schoolName10, yearOfPassing10, place10, mosin10, schooltype10, schoolName11, yearOfPassing11, place11, mosin11, schooltype11, schoolName12, yearOfPassing12, place12, mosin12, schooltype12, sslcregno, sslcexamno, sslcmarkno, sslcin, sslcsub1, sslcsubm1, sslcout1, sslcsub2, sslcsubm2, sslcout2, sslcsub3, sslcsubm3, sslcout3, sslcsub4, sslcsubm4, sslcout4, sslcsub5, sslcsubm5, sslcout5, sslcsub6, sslcsubm6, sslcout6, sscltot, sslcout } = req.body;
        result.query(`UPDATE admission_details SET emis=?,counselNo=?,counselRank=?,GQseat=?,schoolName10=?,yearOfPassing10=?,place10=?,mosin10=?,schooltype10=?,schoolName11=?,yearOfPassing11=?,place11=?,mosin11=?,schooltype11=?,schoolName12=?,yearOfPassing12=?,place12=?,mosin12=?,schooltype12=?,sslcregno=?,sslcexamno=?,sslcmarkno=?,sslcin=?,sslcsub1=?,sslcsubm1=?,sslcout1=?,sslcsub2=?,sslcsubm2=?,sslcout2=?,sslcsub3=?,sslcsubm3=?,sslcout3=?,sslcsub4=?,sslcsubm4=?,sslcout4=?,sslcsub5=?,sslcsubm5=?,sslcout5=?,sslcsub6=?,sslcsubm6=?,sslcout6=?,sscltot=?,sslcout =?
        WHERE admissionNo = ( SELECT admissionNo FROM student_master WHERE aadhaarno = ?); `, [ emis, counselNo, counselRank, GQseat, schoolName10, yearOfPassing10, place10, mosin10, schooltype10, schoolName11, yearOfPassing11, place11, mosin11, schooltype11, schoolName12, yearOfPassing12, place12, mosin12, schooltype12, sslcregno, sslcexamno, sslcmarkno, sslcin, sslcsub1, sslcsubm1, sslcout1, sslcsub2, sslcsubm2, sslcout2, sslcsub3, sslcsubm3, sslcout3, sslcsub4, sslcsubm4, sslcout4, sslcsub5, sslcsubm5, sslcout5, sslcsub6, sslcsubm6, sslcout6, sscltot, sslcout
            , req.params.aadhaarno], (err, rows) => {
                result.release()
                if (!err) {
                    res.send(`${emis}`)
                } else {
                    console.log(err)
                }
            })
    })
})

// update the data in fg_master
app.put('/fg_master_resource/:aadhaarno', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        const {year,fgNo,fgType} = req.body;
        // const { GQ_MQ_Converted, Dept_Changed, year, admission_Category, admision_exit } = req.body;
        
        result.query(`UPDATE fg_master SET year=?,fgNo=?,fgType=? WHERE admissionNo = ( SELECT admissionNo FROM student_master WHERE aadhaarno = ?); `, [year,fgNo,fgType, req.params.aadhaarno], (err, rows) => {
            result.release()
            if (!err) {
                res.send(`${year}`)
            } else {
                console.log(err)
            }
        })
        
    })
})
// update the data in hsc_aca
app.put('/hsc_aca_resource/:aadhaarno', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        const {applyfor,hscregno,hscmarkno,hscin,category,acasub1,acasub2,acasub3,acasub4,acasub5,acasub6n,acasub6,acatot,acapcm,acacutoff} = req.body;
        
        result.query(`UPDATE hsc_aca SET applyfor=?,hscregno=?,hscmarkno=?,hscin=?,category=?,acasub1=?,acasub2=?,acasub3=?,acasub4=?,acasub5=?,acasub6n=?,acasub6=?,acatot=?,acapcm=?,acacutoff=?
        WHERE admissionNo = ( SELECT admissionNo FROM student_master WHERE aadhaarno = ?);`, [applyfor,hscregno,hscmarkno,hscin,category,acasub1,acasub2,acasub3,acasub4,acasub5,acasub6n,acasub6,acatot,acapcm,acacutoff, req.params.aadhaarno], (err, rows) => {
            result.release()
            if (!err) {
                res.send(`${hscregno}`)
            } else {
                console.log(err)
            }
        })
    })
})
// update the data in hsc_voc
app.put('/hsc_voc_resource/:aadhaarno', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) throw err
        const { applyfor,hscregno,hscmarkno,hscin,category,vocsub1,vocsub2,vocsub3n,vocsub3,vocsub4,vocsub5n,vocsub5,vocsub6n,vocsub6,voctot,voccutoff,vocpcm} = req.body;
        result.query(`UPDATE hsc_voc SET applyfor=?,hscregno=?,hscmarkno=?,hscin=?,category=?,vocsub1=?,vocsub2=?,vocsub3n=?,vocsub3=?,vocsub4=?,vocsub5n=?,vocsub5=?,vocsub6n=?,vocsub6=?,voctot=?,voccutoff=?,vocpcm=?
 WHERE admissionNo = ( SELECT admissionNo FROM student_master WHERE aadhaarno = ?);`, [applyfor,hscregno,hscmarkno,hscin,category,vocsub1,vocsub2,vocsub3n,vocsub3,vocsub4,vocsub5n,vocsub5,vocsub6n,vocsub6,voctot,voccutoff,vocpcm, req.params.aadhaarno], (err, rows) => {
            result.release()
            if (!err) {
                res.send()
            } else {
                console.log(err)
            }
        })
       
    })
})
// this is insert method block{
    app.post('/add_fg_master', (req, res) => {
        pool.getConnection((err, result) => {
            if (err) throw err;
            const { admissionNo, year, fgNo, fgType } = req.body;
            result.query(
                'INSERT INTO fg_master (admissionNo, year, fgNo, fgType) VALUES (?, ?, ?, ?)',
                [admissionNo, year, fgNo, fgType],
                (err, rows) => {
                    result.release();
                    if (!err) {
                        res.send();
                    } else {
                        console.log(err);
                    }
                }
            );
        });
    });
    
// }this end

// this code fro login work
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
        }
  
        const query = 'SELECT * FROM office_edit WHERE email = ? AND password = ? ';
        connection.query(query, [email,password], (err, results) => {
          connection.release();
  
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
          }
  
          if (results.length === 1) {
            res.json({ success: true, message: 'Login successful' });
          } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
          }
        });
      });
    } catch (err) {
      console.error('Error in login API:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           console.error('Error connecting to database:', err);
//           res.status(500).json({ success: false, message: 'Internal server error' });
//           return;
//         }
  
//         const query = 'SELECT email, password FROM users WHERE email = ? ';
//         connection.query(query, [email], async (err, results) => {
//           connection.release();
  
//           if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).json({ success: false, message: 'Internal server error' });
//             return;
//           }
  
//           if (results.length === 1) {
//             const db_password_hash = results[0].password;
  
//             // Verify the user-entered password against the stored hash
//             console.log(password)
//             console.log(db_password_hash)
//             bcrypt.compare(password, db_password_hash, (err, pass_match) => {
//                 console.log(pass_match)
//               if (err) {
//                 console.error('Error occurred during password verification:', err);
//                 res.status(500).json({ success: false, message: 'Internal server error' });
//                 return;
//               }
  
//               if (pass_match) {
//                 // Passwords match, login successful
//                 res.json({ success: true, message: 'Login successful' });
//               } else {
//                 // Passwords do not match, login failed
//                 res.status(401).json({ success: false, message: 'Invalid email or password ---' });
//               }
//             });
//           } else {
//             // User not found with the given email
//             res.status(401).json({ success: false, message: 'Invalid email or password not in db' });
//           }
//         });
//       });
//     } catch (err) {
//       console.error('Error in login API:', err);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });
  
  
// end here
app.listen(port, () => console.log(`this backend has started in the port ${port}`));