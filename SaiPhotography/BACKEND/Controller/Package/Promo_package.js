const multer = require("multer");
const nodemailer = require("nodemailer");
const Package = require("../../models/Package/PromoModel");

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'saiphotography2001@gmail.com', // your email address
    pass: 'kzpy mhwn vfdp phgi'
  }
});

exports.addAlbum = async (req, res) => {
  const Package_Name = req.body.Package_Name;
  const Amount = req.body.Amount;
  const Description = req.body.Description;
  const images = req.files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const newPhotograph = new Package({
    Package_Name,
    Amount,
    Description,
    images,
  });

  try {
    await newPhotograph.save();
    res.json("Photo Album Added");

    // Send email when promo is created
    const mailOptions = {
      from: 'saiphotography2001@gmail.com',
      to: 'tvishnuyan09@gmail.com', // recipient email address
      subject: 'New Promo Created',
      text: `A new promo "${Package_Name}" has been created. Check your dashboard for details.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while adding photo album." });
  }
};

exports.getAlbumDetails = (req, res) => {
  Package.find()
    .then((albums) => {
      res.json(albums);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while fetching customer data." });
    });
};

exports.updateAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { Package_Name , Amount , Description, images} = req.body;
    
  const updateAlbum = {
    Package_Name,
    Amount,
    Description,
    images,
  };

  try {
    const updatedAlbum = await Package.findByIdAndUpdate(albumId, updateAlbum);
    res.status(200).send({ status: "Album Updated", updatedAlbum });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    await Package.findByIdAndDelete(albumId);
    res.status(200).send({ status: "Album deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with delete data", error: err.message });
  }
};

exports.getAlbumById = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await Package.findById(albumId);
    res.status(200).send({
      status: "Album fetched",
      photographer: {
        Package_Name: album.Package_Name,
        Amount: album.Amount,
        Description: album.Description,
        images: album.images,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get album", error: err.message });
  }
};
