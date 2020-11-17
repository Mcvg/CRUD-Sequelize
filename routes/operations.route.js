const express = require("express");
const { body } = require("express-validator");
const operationController = require("../controllers/operations.controller");
const router = express.Router();
const valuesNumerics = [
  body("valueOne")
    .exists()
    .withMessage("Value one is required")
    .matches(/^[0-9.-]+$/, "i")
    .withMessage("The value one must be only numeric")
    .trim()
    .escape(),
  body("valueTwo")
    .exists()
    .withMessage("Value two is required")
    .matches(/^[0-9.-]+$/, "i")
    .withMessage("The value two must be only numeric")
    .trim()
    .escape(),
  body("id_typeOperation"),
  body("result")
];


router.post(
  '/sum',
  valuesNumerics,
  operationController.sum
);

router.post(
  '/subtraction',
  valuesNumerics,
  operationController.subtraction
);

router.post(
  '/multiplication',
  valuesNumerics,
  operationController.multiplication
);

router.post(
  '/divide',
  [
    body("valueOne")
      .exists()
      .withMessage("Value one is required")
      .matches(/^[1-9]+([.][0-9]+)?$/, "i")
      .withMessage("The value one must be only numeric y mayor a 0")
      .trim()
      .escape(),
    body("valueTwo")
      .exists()
      .withMessage("Value two is required")
      .matches(/^[0-9.-]+$/, "i")
      .withMessage("The value two must be only numeric")
      .trim()
      .escape()
  ],
  operationController.divide
);

router.get('/',
  operationController.getOperations
)
router.get('/:id',
  operationController.getOneOperation
)

router.delete('/:id',
  operationController.deleteOperation
)

router.put('/:id',
  operationController.updateOperation
)


module.exports = router;