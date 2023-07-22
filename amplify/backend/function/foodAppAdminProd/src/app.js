/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FOODAPPTABLES_ARN
	STORAGE_FOODAPPTABLES_NAME
	STORAGE_FOODAPPTABLES_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = process.env.STORAGE_FOODAPPTABLES_NAME
async function getProduct(prodId) {
  const params = {
    TableName: table,
    Key: {
      prodId
    }
  };

  try {
    const data = await dynamodb.get(params).promise();
    if (!data.Item) {
      throw new Error(`Product with prodId ${prodId} not found in table`);
    }
    console.log(`Product with prodId ${prodId} found in table:`, data.Item);
    return data.Item;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get product from table');
  }
}

async function getAllItems(category) {
  const params = {
    TableName: table
  };

  if (category) {
    params.FilterExpression = "category = :category";
    params.ExpressionAttributeValues = {
      ":category": category
    };
  }

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to retrieve items from table');
  }
}

const id = () => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString(16).padStart(2, '0'); 
  const date = now.getDate().toString(16).padStart(2, '0');
  const hours = now.getHours().toString(16).padStart(2, '0');
  const minutes = now.getMinutes().toString(16).padStart(2, '0');
  const seconds = now.getSeconds().toString(16).padStart(2, '0');
  const randomSerial = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const id = month + date + hours + minutes + seconds + randomSerial;
  
  return id;
}

const timeStamp = () => {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return timestamp;
}

/****************************
* Example post method *
****************************/

app.post('/admin/products', function (req, res) {
  const item = {
    prodId: id(),
    img: req.body.img,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    category: req.body.category,
    size: req.body.size,
    extras: req.body.extras,
    isNew: req.body.isNew,
    createdAt: timeStamp()
  };
  const params = {
    TableName: table,
    Item: item
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      res.json({ err });
    } else {
      res.json({ success: "Successfully Created" });
    }
  });
});

/*****************************************
 * Get all products or based on category *
 ****************************************/

app.get('/admin/products', async function (req, res) {
  const category = req.query.category;
  try {
    const items = await getAllItems(category);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
});

/*****************************************
 * Get single products                   *
 ****************************************/

app.get('/admin/products/:prodId', async function (req, res) {
  try {
    const { prodId } = req.params;
    const product = await getProduct(prodId);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get product' });
  }
});

/****************************
* Example delete method *
*****************************/

app.delete('/admin/products/:prodId', function (req, res) {
  const prodId = req.params.prodId;

  const params = {
    TableName: table,
    Key: {
      prodId: prodId
    }
  };

  dynamodb.delete(params, function (err, data) {
    if (err) {
      res.status(500).json({ message: 'Failed to delete the order' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  });
});

/****************************
* Example update method *
****************************/

app.put('/admin/products/:prodId', function (req, res) {
  const prodId = req.params.prodId;
  const updatedAttributes = req.body;

  const params = {
    TableName: table,
    Key: {
      prodId: prodId
    },
    UpdateExpression: 'SET',
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    ReturnValues: 'ALL_NEW'
  };

  // Construct the update expression and attribute values dynamically
  Object.keys(updatedAttributes).forEach((key, index) => {
    params.UpdateExpression += ` #${key} = :value${index},`;
    params.ExpressionAttributeValues[`:value${index}`] = updatedAttributes[key];
    params.ExpressionAttributeNames[`#${key}`] = key;
  });

  params.UpdateExpression = params.UpdateExpression.slice(0, -1); // Remove the trailing comma

  dynamodb.update(params, function (err, data) {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
      res.status(500).json({ message: 'Failed to update the item' });
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
      res.json({ message: 'Item updated successfully' });
    }
  });
});


/*****************************************
 * API Gateway Information               *
 ****************************************/

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app