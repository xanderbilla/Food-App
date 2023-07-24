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
	STORAGE_FOODAPPORDERS_ARN
	STORAGE_FOODAPPORDERS_NAME
	STORAGE_FOODAPPORDERS_STREAMARN
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
const table = process.env.STORAGE_FOODAPPORDERS_NAME

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

async function getOrder(orderId) {
  const params = {
    TableName: table,
    Key: {
      orderId
    }
  };

  try {
    const data = await dynamodb.get(params).promise();
    if (!data.Item) {
      throw new Error(`orders with orderId ${orderId} not found in table`);
    }
    console.log(`orders with orderId ${orderId} found in table:`, data.Item);
    return data.Item;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get orders from table');
  }
}

async function getAllItems(phone) {
  const params = {
    TableName: table
  };

  if (phone) {
    params.FilterExpression = "phone = :phone";
    params.ExpressionAttributeValues = {
      ":phone": phone
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

/*****************************************
* Get all orders or based on phone *
****************************************/

app.get('/client/orders', async function(req, res) {
const phone = req.query.phone;
try {
  const items = await getAllItems(phone);
  res.status(200).json(items);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Failed to retrieve products' });
}
});

/****************************
* Example post method *
****************************/

app.post('/client/orders', function (req, res) {
  const item = {
    orderId: req.body.orderId ? req.body.orderId : id(),
    custName: req.body.custName,
    phone: req.body.phone,
    paymentMode: req.body.paymentMode,
    product: req.body.product,
    address: req.body.address,
    paymentId: req.body.paymentId,
    timestamp: timeStamp(),
    status: req.body.status,
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

/****************************
* Example get method *
****************************

app.get('/client/orders', function (req, res) {
  const params = {
    TableName: table
  };

  dynamodb.scan(params, function (err, data) {
    if (err) {
      res.status(500).json({ message: 'Failed to retrieve contacts' });
    } else {
      res.json(data.Items);
    }
  });
});

/*****************************************
 * Get single order                   *
 ****************************************/

app.get('/client/orders/:orderId', async function(req, res) {
  try {
    const { orderId } = req.params;
    const orders = await getOrder(orderId);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get orders' });
  }
});

/****************************
* Example delete method *
*****************************/

app.delete('/client/orders/:orderId', function (req, res) {
  const orderId = req.params.orderId;

  const params = {
    TableName: table,
    Key: {
      orderId: orderId
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

app.listen(3000, function() {
  console.log("App started")
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
