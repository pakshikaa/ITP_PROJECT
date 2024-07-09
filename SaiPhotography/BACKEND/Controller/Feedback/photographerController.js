const photographerModel = require("../../models/Feedback/photographer.js");
const Booking = require("../../models/Schedule/Booking.js");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

exports.createPhotographers = async (req, res) => {
    upload.array("images")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Multer error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Error uploading images: ' + err.message });
        }

        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No files were uploaded' });
            }

            const { F_name, L_name, Email, Phone, Address } = req.body;
            const images = req.files.map((file) => ({
                filename: file.filename,
                path: file.path,
            }));

            if (F_name && L_name && Email && Phone && Address && images.length > 0) {
                const newPhotographer = new photographerModel({
                    F_name,
                    L_name,
                    images,
                    Email,
                    Phone,
                    Address,
                });

                const savedPhotographer = await newPhotographer.save();
                return res.status(201).json(savedPhotographer);
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};



// Get all Photographers
exports.getAllPhotographers = async (req, res) => {
    try {
        const allPhotographers = await photographerModel.find({});
        return res.status(200).json(allPhotographers);
    } catch (error) {
        return res.status(400).json(error);
    }
}


// Get a single Photographer
exports.getSinglePhotographers = async (req, res) => {
    const { id } = req.params;
    try {
        const singlePhotographer = await photographerModel.findById(id);
        if (!singlePhotographer) {
            return res.status(404).json({ message: "Photographer not found" });
        }
        return res.status(200).json(singlePhotographer);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Update a Photographer
exports.updatePhotographers = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPhotographer = await photographerModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPhotographer) {
            return res.status(404).json({ message: "Photographer not found" });
        }
        return res.status(200).json(updatedPhotographer);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Delete a Photographer
exports.deletePhotographers = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPhotographer = await photographerModel.findByIdAndDelete(id);
        if (!deletedPhotographer) {
            return res.status(404).json({ message: "Photographer not found" });
        }
        return res.status(200).json(deletedPhotographer);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Search Photographer
exports.searchPhotographers = async (req, res) => {
    const { F_name } = req.query;
    try {
        let searchResults = [];
        if (F_name) {
            searchResults = await photographerModel.find({ F_name: { $regex: new RegExp(F_name, 'i') } });
        }
        return res.status(200).json(searchResults);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Create a review for a Photographer

exports.createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment, userEmail } = req.body; // Include userEmail in the request body
        const Photographer = await photographerModel.findById(id);
        if (!Photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }
        // Push the review with user's email
        Photographer.reviews.push({ rating, comment, userEmail });
        const totalRating = Photographer.reviews.reduce((acc, review) => acc + review.rating, 0);
        Photographer.rating = totalRating / Photographer.reviews.length;
        Photographer.numReviews = Photographer.reviews.length;
        await Photographer.save();
        res.status(201).json({ success: true, message: 'Review created successfully', data: Photographer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


exports.updateReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const { rating, comment } = req.body;
        const userEmail = req.body.userEmail; // Assuming user email is sent in the request body
        const Photographer = await photographerModel.findById(id);
        if (!Photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }
        const review = Photographer.reviews.find(review => review._id.toString() === reviewId && review.userEmail === userEmail);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        review.rating = rating;
        review.comment = comment;
        
        // Recalculate total rating and number of reviews
        const totalRating = Photographer.reviews.reduce((acc, review) => acc + review.rating, 0);
        Photographer.rating = Photographer.reviews.length > 0 ? totalRating / Photographer.reviews.length : 0;
        Photographer.numReviews = Photographer.reviews.length;

        await Photographer.save();
        res.status(200).json({ success: true, message: 'Review updated successfully', data: Photographer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Delete a Review
exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const userEmail = req.body.userEmail; // Extract userEmail from the request body

        // Find the photographer
        const photographer = await photographerModel.findById(id);
        if (!photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }

        // Find the review index
        const reviewIndex = photographer.reviews.findIndex(review => review._id.toString() === reviewId && review.userEmail === userEmail);
        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Remove the review from the array
        photographer.reviews.splice(reviewIndex, 1);

        // Recalculate total rating and number of reviews
        const totalRating = photographer.reviews.reduce((acc, review) => acc + review.rating, 0);
        photographer.rating = photographer.reviews.length > 0 ? totalRating / photographer.reviews.length : 0;
        photographer.numReviews = photographer.reviews.length;

        // Save the updated photographer
        await photographer.save();

        return res.status(200).json({ success: true, message: 'Review deleted successfully', data: photographer });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }  
}


// Delete a Review
exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const userEmail = req.body.userEmail;

        // Find the photographer
        const photographer = await photographerModel.findById(id);
        if (!photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }

        // Find the review index
        const reviewIndex = photographer.reviews.findIndex(review => review._id.toString() === reviewId && review.userEmail === userEmail);
        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Remove the review from the array
        photographer.reviews.splice(reviewIndex, 1);

        // Recalculate total rating and number of reviews
        const totalRating = photographer.reviews.reduce((acc, review) => acc + review.rating, 0);
        photographer.rating = photographer.reviews.length > 0 ? totalRating / photographer.reviews.length : 0;
        photographer.numReviews = photographer.reviews.length;

        // Save the updated photographer
        await photographer.save();

        return res.status(200).json({ success: true, message: 'Review deleted successfully', data: photographer });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }  
}


///////////////////////////////////////////////////////////////////////
exports.getDetails = (req, res) => {
 
    const userEmail = req.params.email; 
    // Find bookings associated with the logged-in user's email
    Booking.find({ Email: userEmail }) 
      .then((bookings) => {
        res.json(bookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "An error occurred while fetching bookings." });
      });
  };
  