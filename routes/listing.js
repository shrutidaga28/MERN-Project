const express = require("express");
const app = express();
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEdit));

// router
// .route("/")
// .get(wrapAsync(listingController.index))
// .post(
//     isLoggedIn,
//     (req, res, next) => {
//       console.log("✅ Middleware 1: isLoggedIn - Passed");
//       next();
//     },
//     upload.single("listing[image]"),
//     (req, res, next) => {
//       console.log("✅ Middleware 2: upload.single() - File Upload Done");
  
//       if (!req.file) {
//         console.log("❌ No file received! File upload failed.");
//         req.flash("error", "File upload failed. Try again.");
//         return res.redirect("/listings/new"); // Redirect back to form
//       }
  
//       console.log("📸 Uploaded File Details:", req.file);
//       next();
//     },
//     validateListing,
//     wrapAsync(listingController.createListing)
// );

module.exports = router;