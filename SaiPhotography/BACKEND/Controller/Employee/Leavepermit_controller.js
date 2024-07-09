const Leave = require('../../models/empmodel/Leave_model');
const nodemailer = require('nodemailer');
const Employee=require("../../models/empmodel/Employee_model")


const sendEmailNotification = async (toEmail, status) => {
    // Create a Nodemailer transporter using SMTP or other email service of your choice
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'balacinema235@gmail.com',
            pass: 'bzfv mdhl rgic rlhu' // Your Gmail password or app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'balacinema235@gmail.com',
        to: toEmail, // Recipient email address
        subject: 'Leave Application Notification',
        text: `Your leave application status has been  ${status}`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};


const calculateAttendancePercentage = (attendance) => {
    let totalDays = 0;
    let presentDays = 0;

    for (let i = 0; i < attendance.length; i++) {
        totalDays++;
        if (attendance[i].Attendancestatus === 'present') {
            presentDays++;
        }
    }

    const percentage = (presentDays / totalDays) * 100;

    return percentage.toFixed(2); 
};


exports.getAllLeave = async (req, res) => {
    try {
        const leaves = await Leave.find();

        // Update leave records with attendance percentage
        const leavesWithPercentage = await Promise.all(leaves.map(async (leave) => {
            const employee = await Employee.findOne({ email: leave.email });
            if (employee) {
                const attendancePercentage = calculateAttendancePercentage(employee.attendance);
                leave.percentage = attendancePercentage;
            }
            return leave;
        }));

        res.json(leavesWithPercentage);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error while retrieving leave information' });
    }
};


exports.UpdateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Leave.findByIdAndUpdate(id, req.body, { new: true }); // Set { new: true } to return the updated document
        if (data) {
            // Assuming `data` contains the updated leave information including the email and status fields
            await sendEmailNotification(data.email, data.status);
            res.json(data);
        } else {
            res.status(404).send({ message: `Cannot update Employee with identified id ${id} or maybe user not found!` });
        }
    } catch (err) {
        res.status(500).send({ message: `Error updating Employee information: ${err.message}` });
    }
};


