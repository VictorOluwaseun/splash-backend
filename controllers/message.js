// const multer = require('multer');
// const sharp = require('sharp');
const Message = require('./../models/message');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// exports.uploadTourImages = upload.fields([{
//     name: 'imageCover',
//     maxCount: 1
//   },
//   {
//     name: 'images',
//     maxCount: 3
//   }
// ]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

// exports.resizeTourImages = catchAsync(async (req, res, next) => {
//   if (!req.files.imageCover || !req.files.images) return next();

//   // 1) Cover image
//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({
//       quality: 90
//     })
//     .toFile(`public/img/tours/${req.body.imageCover}`);

//   // 2) Images
//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({
//           quality: 90
//         })
//         .toFile(`public/img/tours/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getAllMessages = factory.getAll(Message);
exports.getMessage = factory.getOne(Message
  /*,
    path: 'reviews'
  }*/
);
exports.createMessage = factory.createOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);