const nodemailer = require('nodemailer');
const supModel = require("../../models/Supplier/sup.js");
const inventoryModel = require("../../models/Inventory/Inventory.js");

class supController {
    static getLowHighInventory = async () => {
        try {
            // Find products with quantity below 100 and above 100
            const lowInventory = await inventoryModel.find({ rquantity: { $lt: 100 } }).select('type');
            const highInventory = await inventoryModel.find({ rquantity: { $gt: 100 } }).select('type');

            return { lowInventory, highInventory };
        } catch (error) {
            console.error("Error fetching inventory details:", error);
            throw error;
        }
    };

    static updateSupplierCheck = async () => {
        try {
            const { lowInventory, highInventory } = await this.getLowHighInventory();

            // Update supplier documents based on low inventory
            await Promise.all(lowInventory.map(async (product) => {
                const supplier = await supModel.findOne({ type: product.type });
                if (supplier) {
                    supplier.check = 'low';
                    await supplier.save();
                    // Send email to the supplier
                    await this.sendLowInventoryEmail(supplier.Email);
                }
            }));

            // Update supplier documents based on high inventory
            await Promise.all(highInventory.map(async (product) => {
                const supplier = await supModel.findOne({ type: product.type });
                if (supplier) {
                    supplier.check = 'high';
                    await supplier.save();
                }
            }));
        } catch (error) {
            console.error("Error updating supplier documents:", error);
            throw error;
        }
    };

    // Helper function to send email for low inventory
    static sendLowInventoryEmail = async (recipientEmail) => {
        try {
            // Create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'balacinema235@gmail.com',
                    pass: 'bzfv mdhl rgic rlhu' // Ensure that the password is correct
                }
            });

            // Send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'balacinema235@gmail.com',
                to: recipientEmail,
                subject: 'Low Inventory Alert',
                text: 'Your inventory is running low. Please restock as soon as possible.'
            });

            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending low inventory email:", error);
            throw error;
        }
    };

    static getAllSup = async (req, res) => {
        try {
            console.log("Updating supplier check...");
            await this.updateSupplierCheck();
            console.log("Supplier check updated.");

            // Fetch all suppliers
            const allSup = await supModel.find({});

            if (allSup) {
                return res.status(200).json(allSup);
            } else {
                return res.status(404).json({ message: "No suppliers found" });
            }
        } catch (error) {
            console.error("Error getting suppliers:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static createSup = async (req, res) => {
        const { F_name, L_name, Email, Phone, Address, type } = req.body;
        try {
            if (F_name && L_name && Email && Phone && Address && type) {
                const newSup = new supModel({
                    F_name,
                    L_name,
                    Email,
                    Phone,
                    Address,
                    type,
                });

                const saved_sup = await newSup.save();
                if (saved_sup) {
                    return res.status(201).json(saved_sup);
                } else {
                    return res.status(400).json({ message: "wrong" });
                }
            } else {
                return res.status(400).json({ message: "all fields are required" });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static getSingleSup = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const getSingleData = await supModel.findById(id);
                return res.status(200).json(getSingleData);
            } else {
                return res.status(400).json({ message: "id not found" });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static updateSup = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const getUpdatedData = await supModel.findByIdAndUpdate(id, req.body);
                return res.status(200).json(getUpdatedData);
            } else {
                return res.status(400).json({ message: "id not found" });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static deleteSup = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const getDeleteData = await supModel.findByIdAndDelete(id);
                return res.status(200).json(getDeleteData);
            } else {
                return res.status(400).json({ message: "id not found" });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static getsearchsupplier = async (req, res) => {
        const { query } = req;
        const { F_name } = query;

        try {
            let searchResults = [];

            if (F_name) {
                // If both name and distributor ID are present in the query parameters
                searchResults = await supModel.find({
                    $or: [
                        { F_name: { $regex: new RegExp(F_name, 'i') } },
                    ]
                });
            } else if (F_name) {
                // If only name is present in the query parameters
                searchResults = await supModel.find({
                    F_name: { $regex: new RegExp(F_name, 'i') }
                });
            }

            return res.status(200).json(searchResults);
        } catch (error) {
            return res.status(400).json(error);
        }
    };
}

module.exports = supController;
