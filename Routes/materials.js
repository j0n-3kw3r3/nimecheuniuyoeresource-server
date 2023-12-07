const express = require("express");
const router = express.Router();
const Material = require("../Models/Material");

// upoad material
router.post("/upload", async (req, res,) => {
    const { year, courseCode, courseName, courseLecturer, materialName, materialLink } = req.body;
    if (!year || !courseCode || !courseName || !courseLecturer || !materialName || !materialLink) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const data = new Material({
        year: year,
        courseCode: courseCode,
        courseName: courseName,
        courseLecturer: courseLecturer,
        materialName: materialName,
        materialLink: materialLink,

    });
    try {
        const savedImage = await data.save();
        return res.status(200).json(savedImage)
    }   catch (error) {
        console.log(error);
    }
});
//Update material
router.put("/update/:id", async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        material.year = req.body.year;
        material.courseCode = req.body.courseCode;
        material.courseName = req.body.courseName;
        material.courseLecturer = req.body.courseLecturer;
        material.materialName = req.body.materialName;
        material.materialLink = req.body.materialLink;
        const updatedMaterial = await material.save();
        res.json(updatedMaterial);
    } catch (error) {
        res.json({ message: error });
    }
});

// get all materials
router.get("/materials", async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (error) {
        res.json({ message: error });
    }
});

// get specific material
router.get("/:id", async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        res.json(material);
    } catch (error) {
        res.json({ message: error });
    }
});

// delete material
router.delete("/:id", async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
         await material.deleteOne({ $set: req.body });

           return res.status(200).json(`${req.params.id} has been deleted`);
   
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
