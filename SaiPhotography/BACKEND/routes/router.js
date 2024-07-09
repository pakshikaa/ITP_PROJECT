const express = require('express');
const router = express.Router();
const Authent = require('../middleware/auth')

//employee
const employeeController = require('../Controller/Employee/Employee_controller')
router.get('/api/employee',employeeController.getAllEmployee)
router.post('/api/employee',employeeController.createEmployee)
router.put('/api/employee/:id',employeeController.UpdateEmployee)
router.delete('/api/employee/:id',employeeController.deleteEmployee)
//leave
const leaveController = require('../Controller/Employee/leave_controller')

router.get('/api/leave/',Authent,leaveController.getAllLeaveForEmployee)
router.post('/api/leave',Authent,leaveController.createLeave)

router.put('/api/leave/:id',Authent,leaveController.updateLeave)
router.delete('/api/leave/:id',Authent,leaveController.deleteLeave)




//fileuploads
const fileUploading = require('../Controller/Employee/fileupload')
router.post('/api/fileupload',fileUploading.EmployeeProfile)
//user
 const user = require('../Controller/Employee/user_controller');
router.post('/api/login',user.UserLogin);
router.get('/api/user',Authent,user.getUser)



const leavefile=require('../Controller/Employee/leavefileupload')
router.post('/api/leavefileupload',Authent,leavefile.Leavefileupload)
const leaveapprove=require('../Controller/Employee/Leavepermit_controller')
router.get('/api/leavepermit',leaveapprove.getAllLeave)
router.put('/api/leavepermit/:id',leaveapprove.UpdateEmployee)
const attendanceController = require('../Controller/Employee/Attendance_controller');
router.post('/api/attendance/:employeeId', attendanceController.recordAttendance);





module.exports = router