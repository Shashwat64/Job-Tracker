import express, { application } from 'express'

import pool from '../config/db.js'

const usersRoutes = express.Router()

usersRoutes.get('/', async (req, res) => {
  const result = await pool.query("SELECT * FROM users")
  res.json(result.rows)
})

usersRoutes.get('/:id', async(req, res)=>{

  const userId = req.params.id

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Send the user object to frontend
    res.json({
      message: "this is the data from /:id",
      data:result.rows[0]
    }); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
})

usersRoutes.get('/:id/applications', async(req, res)=>{

  const userId = req.params.id
  console.log(userId)

  try {
    const result = await pool.query('SELECT * FROM applications WHERE user_id = $1 ORDER BY id', [userId]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "No application with that user exist" });
    }
    console.log(result.rows[0])

    // res.json({
    //   data:result
    // })

    const applicationJson = []

    for(const application of result.rows){

      applicationJson.push({
        id: application.id,
        userId: application.user_id,
        company: { 
          logoLink: application.company_logo_link, 
          name: application.company_name, 
          location: application.company_location,
          url: application.company_url
        },
        jobTitle: application.job_title,
        salaryRange: { min: application.salary_min, max: application.salary_max },
        date: application.applied_date.toISOString().slice(0, 10),
        interviewType: application.interview_type,
        stage: application.stage,
        isDeleted: application.is_deleted,
        source: application.source,
        notes: application.notes,
        resumeUsed: application.resume_used,
      })
    }

    console.log(applicationJson)

    // Send the user object to frontend
    res.json({
      message: "this is the data from /:id/applications",
      data:applicationJson,
    }); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Database error' });
  }
})

usersRoutes.get('/:id/interviews', async(req, res)=>{

  const userId = req.params.id

  try {
    const result = await pool.query('SELECT * FROM interviews WHERE user_id = $1 ORDER BY round', [userId])

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "No interviews with the user id exist" })
    }

    const interviewJson = []

    for (const interview of result.rows){
      

      interviewJson.push({
        applicationId: interview.application_id,
        round: interview.round,
        type: interview.type,
        date: interview.interview_date.toISOString().slice(0, 10),
        time:{
          start: interview.start_time.slice(0,5),
          duration: interview.duration_minutes
        },
        details: interview.details,
        interviewer: interview.interviewer,
        meetingLink: interview.meeting_link,
        notes: interview.notes,
        status: interview.status
      })
    }


    // Send the user object to frontend
    res.json({
      message: "this is the data from /:id/interviews",
      data:interviewJson
    }); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
})


// this was used to add inital data
usersRoutes.post('/reset', async (req, res) => {

  const data = req.body
  const userId = 1

  try {

    // Clear applications and all dependent interviews, reset serial numbers
    await pool.query('TRUNCATE TABLE applications RESTART IDENTITY CASCADE;')

    // Optional: if you want to explicitly reset interviews too (not needed with CASCADE)
    await pool.query('TRUNCATE TABLE interviews RESTART IDENTITY;')

    for (const app of data) {

      const { company, jobTitle, salaryRange, date, interviewType, stage, source, notes, resumeUsed, isDeleted, interviews } = app;

      const result = await pool.query(
        `INSERT INTO applications
        (user_id, company_name, company_logo_link, company_location, company_url,
        job_title, salary_min, salary_max, applied_date,
        interview_type, stage, source, resume_used, notes, is_deleted)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        RETURNING id`,
        [
          userId,                    // user_id
          company.name,              // company_name
          company.logoLink || null,  // company_logo_link
          company.location || null,  // company_location
          company.url || null,       // company_url
          jobTitle,                  // job_title
          salaryRange?.min || null,  // salary_min
          salaryRange?.max || null,  // salary_max
          date,                      // applied_date
          interviewType || null,     // interview_type
          stage || null,             // stage
          source || null,            // source
          resumeUsed || null,        // resume_used
          notes || null,             // notes
          isDeleted ?? false         // is_deleted
        ]
      );

      const applicationId = result.rows[0].id;

      if (interviews?.length > 0) {

        interviews.sort((a,b)=>a.round - b.round);

        for (const interview of interviews) {

          await pool.query(
            `INSERT INTO interviews
            (user_id, application_id, round, type, interview_date, start_time, duration_minutes, details, interviewer, meeting_link, notes, status)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [
              userId,
              applicationId,
              interview.round,
              interview.type,
              interview.date,
              interview.time?.start || null,
              interview.time?.duration || null,
              interview.details || null,
              interview.interviewer || null,
              interview.meetingLink || null,
              interview.notes || null,
              interview.status || 'Upcoming'
            ]
          )

        }

      }

    }

    console.log('All applications inserted!');
    res.json({message:'Data inserted successfully'});

  } catch (err) {
     console.error(err);
    res.status(500).json({
      error: err.message
    });
  }

});

usersRoutes.post("/", async (req, res) => {

  // const { email, password } = req.body

  const getRes = await fetch("http://localhost:8000/users")
  const data = await getRes.json()

  const email = req.body.email
  const password = req.body.password

  const exists = data.some(info => info.email === email)

  console.log("email is ",email)
  console.log("password is ",password)
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [1]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Send the user object to frontend
    res.json(result.rows[0]); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
})

usersRoutes.patch('/:id/applications', async(req,res)=>{
  const userId = req.params.id
  const application = req.body

  console.log(typeof application.id)
  console.log(application.userID)

  const appliedDate = new Date(application.date)

  const result = await pool.query(
    `UPDATE applications
    SET company_name = $1,
        company_logo_link = $2,
        company_location = $3,
        company_url = $4,
        job_title = $5,
        salary_min = $6,
        salary_max = $7,
        applied_date = $8,
        interview_type = $9,
        stage = $10,
        source = $11,
        resume_used = $12,
        notes = $13,
        is_deleted = $14
    WHERE id = $15 AND user_id = $16
    RETURNING *`,
    [
      application.company.name,          
      application.company.logoLink,           
      application.company.location,           
      application.company.url,          
      application.jobTitle,
      application.salaryRange.min,
      application.salaryRange.max,
      appliedDate,
      application.interviewType,
      application.stage,
      application.source,
      application.resumeUsed,
      application.notes,
      application.isDeleted,
      Number(application.id), 
      Number(application.userId)
    ]
);

  res.status(200).json({id: application.id, result})

})

usersRoutes.delete('delete/:id', async(req, res)=>{
  // res.status(201).send("delete id is", req.params.id)

  const userId = req.params.id 

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }

})

export default usersRoutes