import express from 'express'
import jwt from 'jsonwebtoken'

import pool from '../config/db.js'

const usersRoutes = express.Router()

// usersRoutes.get('/', async (req, res) => {
//   const result = await pool.query("SELECT * FROM users")
//   res.json(result.rows)
// })

usersRoutes.get('/get/user', async(req, res)=>{

  
  const token = req.cookies.token
  
  if (!token) {
    return res.status(401).json({ error: 'not logged in' })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)


    const result = await pool.query('SELECT * FROM users WHERE id = $1', [user.id])
    res.json(result.rows[0]) 
    // console.log("userData in the usersRoutes", result.rows[0])
  } catch(err) {
    console.log("error is", err)
    res.status(401).json({ error: 'invalid token' })
  }
})

usersRoutes.get('/debug', async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM interviews")
    res.json(result.rows)
  }catch(err){
    console.log(err)
    res.status(400).json({message:"custom msg from /debug", err})
  }
})

usersRoutes.get('/get/applications', async(req, res)=>{

  const token = req.cookies.token

  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userId = user.id


    const result = await pool.query('SELECT * FROM applications WHERE user_id = $1 AND NOT is_deleted', [userId]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "No application with that user exist" });
    }


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

usersRoutes.get('/get/interviews', async(req, res)=>{

  const token = req.cookies.token
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userId = user.id
    const result = await pool.query('SELECT * FROM interviews WHERE user_id = $1 ORDER BY round', [userId])

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "No interviews with the user id exist" })
    }

    const interviewJson = []

    for (const interview of result.rows){
      

      interviewJson.push({
        applicationId: interview.application_id,
        userId:interview.user_id,
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


// // this was used to add inital data




usersRoutes.post('/post/application', async(req,res)=>{

  const token = req.cookies.token

  try{

    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userId = user.id

        
  
  
    const application = req.body.application
  
    console.log("application in post/application",application)
  
    const appliedDate = new Date(application.date)
  
    // return res.status(200).json({
    //   message: "this is from post id/applications",
    //   data: application,
    //   userId
    // })
  
    const { company, jobTitle, salaryRange, date, interviewType, stage, source, notes, resumeUsed, isDeleted} = application;
  
    console.log(company)
  
    const result = await pool.query(
          `INSERT INTO applications
          (user_id, company_name, company_logo_link, company_location, company_url,
          job_title, salary_min, salary_max, applied_date,
          interview_type, stage, source, resume_used, notes, is_deleted)
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
          RETURNING *`,
          [
            userId,                    // user_id
            company.name,              // company_name
            company.logoLink,          // company_logo_link
            company.location || null,  // company_location
            company.url || null,       // company_url
            jobTitle,                  // job_title
            salaryRange?.min || null,  // salary_min
            salaryRange?.max || null,  // salary_max
            appliedDate,               // applied_date
            interviewType || null,     // interview_type
            stage || null,             // stage
            source || null,            // source
            resumeUsed || null,        // resume_used
            notes || null,             // notes
            isDeleted ?? false         // is_deleted
          ]
        );
  
    res.status(200).json({id: application.id, result})
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }

})

//add post interviews

usersRoutes.patch('/patch/application', async(req,res)=>{
  const token = req.cookies.token

  try{
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userId = user.id
  
    const application = req.body

    console.log("application in /patch/application",application)
  
    const appliedDate = new Date(application.date)
  
    // console.log("logoLink in /patch/application",application.company.logoLink)
  
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
      WHERE id = $15
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
        application.id
      ]
  );
  
    res.status(200).json({id: application.id, result})

  }catch(err) {
  console.log("exact error:", err.message)  // 👈 this will tell you exactly what's wrong
}

})

usersRoutes.delete('/delete/application', async(req,res)=>{
  const token = req.cookies.token
  const user = jwt.verify(token, process.env.JWT_SECRET)
  const userId = user.id

  const applicationId = req.body.applicationId

  const result = await pool.query(
    `UPDATE applications
      SET
        is_deleted = $1
      WHERE id = $2 AND user_id = $3
      RETURNING *`,
      [
        true,
        Number(applicationId), 
        userId
      ]
    )

    res.status(200).json({id: applicationId, result})

  }
)

usersRoutes.post('/post/interview', async(req,res)=>{

  const token = req.cookies.token

  try{
    const interview = req.body.interview
    const applicationId = req.body.applicationId
    console.log(interview)
    console.log(applicationId)

    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userId = user.id

    // return res.status(200).json({message: "this is from post/interview", interview})
  
  
  
    console.log("application in post/interview",interview)
  
    const appliedDate = new Date(interview.date)
  
    // return res.status(200).json({
    //   message: "this is from post id/applications",
    //   data: application,
    //   userId
    // })
  
    const { round, type, time, details, interviewer, meetingLink, notes, status} = interview

  
    const result = await pool.query(
          `INSERT INTO interviews
          (user_id, application_id, round, type, interview_date,
          start_time, duration_minutes, details, interviewer,
          meeting_link, notes, status)
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          RETURNING *`,
          [
            userId,           
            applicationId,      
            round,
            type,         
            appliedDate ,  
            time.start ,     
            time.duration,     
            details,                  
            interviewer,
            meetingLink,             
            notes, 
            status, 
          ]
        );
  
    res.status(200).json({id: applicationId, result})
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }

})

usersRoutes.patch('/patch/interview', async(req,res)=>{
  const userId = req.params.id
  const round = req.body

  // res.status(200).send({message: "Short circuiting"})
   
  // res.status(200).json({message:"from patch/interviews", data:round})

    // console.log(typeof interview.id)
    // console.log(interview.userID)

    const result = await pool.query(
      `UPDATE interviews
      SET interview_date = $1,
          type = $2,
          start_time = $3,
          duration_minutes = $4,
          details = $5,
          interviewer = $6,
          status = $7,
          meeting_link = $8,
          notes = $9
      WHERE application_id = $10 AND round = $11
      RETURNING *`,
      [
        round.date,          
        round.type,                  
        round.time.start,
        round.time.duration,
        round.details,
        round.interviewer,
        round.status,
        round.meetingLink,
        round.notes,
        Number(round.applicationId), 
        Number(round.round)
      ]
  );
  
    res.status(200).json({reply:result})
  


})

usersRoutes.delete('/delete/user', async(req, res)=>{
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




// usersRoutes.post('/post', async (req, res) => {

//   const data = req.body
//   const token = req.cookies.token
//   const user = jwt.verify(token, process.env.JWT_SECRET)
//   const userId = user.id

//   try {

//     // Clear applications and all dependent interviews, reset serial numbers
//     await pool.query('TRUNCATE TABLE applications RESTART IDENTITY CASCADE;')

//     // Optional: if you want to explicitly reset interviews too (not needed with CASCADE)
//     await pool.query('TRUNCATE TABLE interviews RESTART IDENTITY;')

//     for (const app of data) {

//       const { company, jobTitle, salaryRange, date, interviewType, stage, source, notes, resumeUsed, isDeleted, interviews } = app;

//       const result = await pool.query(
//         `INSERT INTO applications
//         (user_id, company_name, company_logo_link, company_location, company_url,
//         job_title, salary_min, salary_max, applied_date,
//         interview_type, stage, source, resume_used, notes, is_deleted)
//         VALUES
//         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
//         RETURNING id`,
//         [
//           userId,                    // user_id
//           company.name,              // company_name
//           company.logoLink || null,  // company_logo_link
//           company.location || null,  // company_location
//           company.url || null,       // company_url
//           jobTitle,                  // job_title
//           salaryRange?.min || null,  // salary_min
//           salaryRange?.max || null,  // salary_max
//           date,                      // applied_date
//           interviewType || null,     // interview_type
//           stage || null,             // stage
//           source || null,            // source
//           resumeUsed || null,        // resume_used
//           notes || null,             // notes
//           isDeleted ?? false         // is_deleted
//         ]
//       );

//       const applicationId = result.rows[0].id;

//       if (interviews?.length > 0) {

//         interviews.sort((a,b)=>a.round - b.round);

//         for (const interview of interviews) {

//           await pool.query(
//             `INSERT INTO interviews
//             (user_id, application_id, round, type, interview_date, start_time, duration_minutes, details, interviewer, meeting_link, notes, status)
//             VALUES
//             ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
//             [
//               userId,
//               applicationId,
//               interview.round,
//               interview.type,
//               interview.date,
//               interview.time?.start || null,
//               interview.time?.duration || null,
//               interview.details || null,
//               interview.interviewer || null,
//               interview.meetingLink || null,
//               interview.notes || null,
//               interview.status || 'Upcoming'
//             ]
//           )

//         }

//       }

//     }

//     console.log('All applications inserted!');
//     res.json({message:'Data inserted successfully'});

//   } catch (err) {
//      console.error(err);
//     res.status(500).json({
//       error: err.message
//     });
//   }

// });

// //this have to removed
// usersRoutes.post("/post", async (req, res) => {

//   // const { email, password } = req.body

//   const token = req.cookies.token
//   const user = jwt.verify(token, process.env.JWT_SECRET)
//   const userId = user.id

//   const getRes = await fetch("http://localhost:8000/users/get/user")
//   const data = await getRes.json()

//   const email = req.body.email
//   const password = req.body.password

//   const exists = data.some(info => info.email === email)

  
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

//     if (result.rowCount === 0) {
//       // User not found
//       return res.status(404).json({ message: "User doesn't exist" });
//     }

//     // Send the user object to frontend
//     res.json(result.rows[0]); // or res.send(result.rows[0])
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Database error' });
//   }
// })