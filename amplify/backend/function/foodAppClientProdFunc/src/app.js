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
	STORAGE_FOODAPPPRODDB_ARN
	STORAGE_FOODAPPPRODDB_NAME
	STORAGE_FOODAPPPRODDB_STREAMARN
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

async function getProduct(prodId) {
  const params = {
    TableName: process.env.STORAGE_FOODAPPPRODDB_NAME,
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
      TableName: process.env.STORAGE_FOODAPPPRODDB_NAME
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
  
/*****************************************
 * Get all products or based on category *
 ****************************************/

app.get('/client/products', async function(req, res) {
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

app.get('/client/products/:prodId', async function(req, res) {
  try {
    const { prodId } = req.params;
    const product = await getProduct(prodId);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get product' });
  }
});

/*****************************************
 * API Gateway Information               *
 ****************************************/

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
