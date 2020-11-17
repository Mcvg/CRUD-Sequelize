import Operation from '../models/operation';
const { validationResult } = require('express-validator');
const factory = require('../factories/factory');

exports.sum = (req, res, next) => {
  funtionsOperations(req, res, 'Sum', 1);
};

exports.subtraction = (req, res, next) => {
  funtionsOperations(req, res, 'Subtraction', 2);
};

exports.multiplication = (req, res, next) => {
  funtionsOperations(req, res, 'Multiplication', 3);
};

exports.divide = (req, res, next) => {
  funtionsOperations(req, res, 'Divide', 4);
};

export async function funtionsOperations(req, res, operationType, id_typeOperation) {
  const errors = validationResult(req);
  validateErrors(errors);

  try {
    const result = operationResult(req, operationType);
    //const { valueOne, valueTwo, id_typeOperation, result } = req.body;
    var valueOne = +req.body.valueOne;
    var valueTwo = +req.body.valueTwo;
    let newProject = await Operation.create({
      valueOne,
      valueTwo,
      id_typeOperation,
      result,
    }, {
      fields: ['valueOne', 'valueTwo', 'id_typeOperation', 'result']
    });
    if (newProject) {
      res.status(201).json({ message: operationType + " success.", data: { newProject } });
    }

  } catch (e) {
    console.log(e)
    const error = new Error('Validation numbers failed.');
    error.statusCode = 500;
    error.data = e;
    throw error;
  }
};

async function operationResult(req, operationType) {
  try {
    const valueOne = +req.body.valueOne;
    const valueTwo = +req.body.valueTwo;
    const result = await factory.assignOperation(operationType, {
      valueOne,
      valueTwo,
    });
    console.log(result)
    return result;
  } catch (e) {
    console.log(e)
    const error = new Error('Operation failed.');
    error.statusCode = 500;
    error.data = e;
    throw error;
  }
};

function validateErrors(errors) {
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
}


export async function getOperations(req, res) {
  try {
    const operation = await Operation.findAll();
    res.json({
      data: operation
    })
  } catch (e) {
    console.log("Error getOperations "+e)
  }
}

export async function getOneOperation(req, res){
  const { id }= req.params;
  const operation = await Operation.findOne({
    where: {
      id: id
    }
  });
  res.json({
    data: operation
  });
}

export async function deleteOperation(req, res){
  const { id }= req.params;
  const deleteRowCount = await Operation.destroy({
    where: {
      id: id
    }
  });
  res.json({
    message:'Operaction deleted succesfully',
    count: deleteRowCount
  });
}

export async function updateOperation(req, res){
  const { id } = req.params;
  const operations = await Project.findAll({
    attributes: ['id', 'valueOne', 'valueTwo', 'id_typeOperation', 'result'],
    where:{
      id
    }
  });
  if(operations.length > 0){
    operations.forEach(async operation =>{
      await operation.update({
        valueOne,
        valueTwo,
        id_typeOperation,
        result
      })
    })
  }
  return res.json({
    message:'Operation Updated succesfully',
    data: operations
  })
}