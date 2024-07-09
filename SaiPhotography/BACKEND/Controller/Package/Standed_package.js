const Package = require("../../models/Package/StandedModel");

exports.addAlbum = (req, res) => {
  const Package_Name = req.body.Package_Name;
  const Amount = req.body.Amount;
  const Description = req.body.Description;
  
  const images = req.files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  const newAlbum = new Package({
    Package_Name,
    Amount,
    Description,
    images,
  });

  newAlbum.save()
    .then(() => {
      res.json("Photo Album Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while adding the album." });
    });
};

exports.getAlbumDetails = (req, res) => {
  Package.find()
    .then((albums) => {
      res.json(albums);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while fetching album data." });
    });
};

exports.updateAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { Package_Name, Amount, Description, images } = req.body;

  const updateAlbum = {
    Package_Name,
    Amount,
    Description,
    images,
  };

  try {
    const updatedAlbum = await Package.findByIdAndUpdate(albumId, updateAlbum, { new: true, runValidators: true });
    if (!updatedAlbum) {
      return res.status(404).send({ status: "Album not found" });
    }
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
      album: {
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
