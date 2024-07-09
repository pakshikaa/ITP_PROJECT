const Employee = require('../../models/empmodel/Employee_model');

exports.recordAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        // Find the employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Check if attendance for the given date already exists
        const today = new Date().toISOString().split('T')[0];
        const existingAttendance = employee.attendance.find(record => record.date.toISOString().split('T')[0] === today);
        if (existingAttendance) {
            // If attendance for today already exists, return error
            return res.status(400).json({ error: 'Attendance already recorded for today' });
        } else {
            // Mark employee as present for today
            employee.attendance.push({ date: new Date(), Attendancestatus: 'present' });
            await employee.save();
            // Return success response
            return res.status(200).json({ message: 'Attendance recorded successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
