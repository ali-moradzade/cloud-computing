# Advertisement System

First homework of cloud computing course (fall 1401)

## Introduction
We want to implement an advertisement system, this system uses cloud services for: Database, Object storage, Image Processing and Email Sending.

Each advertisement contains a description, email and image. Users can register their ads using our apis.

Also each user can see the state of their advertisement with a GET request to our apis, for this, they need to have the unique id of their ad.

## First Backend
You can use the following api to register an advertisement:
```curl
    POST http://localhost:3000/register
```

In the body, you should specify these:
```json
    {
        "description": "string",
        "email": "string",
        "image": "file"
    }
```

You can use postman to send this request, put these in body, and choose `form-data` for type of body. Then you can can change the type from text to file and choose image file.

After you send this request, following steps hasspens: 

### Store Ad in Database

The inital ad is stored in the database in the following form:
```javascript
    {
        description,
        email,
        state: 'pending',
        category: 'other',
        imageUrl: '',
        createdAt: Date.now
    }
```

For database, i've used [Liara](https://liara.ir/) mongodb database services.

### Uploading Image to Simple Storage Service (S3)

After you post your image through our api, we get it, and get a file path from it, using this path and APIs of [Arvan](https://www.arvancloud.com/en/products/cloud-storage) cloud storage services, we upload this image as an object, to a bucket and get a `url` from arvan.

### Upadting ImageUrl

Now using this new `url`, we update our db, and put this as `imageUrl`.

### Sending Id to RabbitMQ

We push id of our advertisement to rabbitMQ, using [Cloud Ampq](https://www.cloudamqp.com/) that provides rabbitMQ as a service.

```javascript
    try {
        // send the postId to the ampq queue
        await ampq.publish(postId);
        console.log(`Advertisement published to the queue successfully ..`);
    } catch (err) {
        console.log('Error in sending the advertisement to the queue: ' + err);
        return null;
    }
```

## Get Advertisement

You can use this API to check the state of your ad at any time

```curl
    GET http://localhost:3000/ad/:id
```

Where `id` is the unique id of your ad, after creating your ad, we give you an id, this is that id.

The result you get is in the form:
```
    Your advertisement is still pending
```
Or something like this:
```json
    {
        "_id": "6378f9f080393fe3350a70e9",
        "description": "This is a truck vehicle",
        "email": "alimorizz1379@gmail.com",
        "state": "approved",
        "category": "trailer",
        "imageUrl": "https://autcloudcomputting.s3.ir-thr-at1.arvanstorage.com/6378f9f080393fe3350a70e9.jpeg",
        "createdAt": "2022-11-19T15:44:48.797Z",
        "__v": 0
    }
```

## Second Backend

This backend reads the unique ids of messages from rabbitMQ, process them, save the result into the db and informs the user via email, state of their advertisement.

### Consuming Message

Now we pop id of message from our rabbitMq, and go for next step.

### Finding the Url

We have the url of the post saved in the database, we get it by:
```javascript
     // Get the URL of the image from database
    let url;
    try {
        console.log(`Getting image URL from database ..`);
        const ad = await Advertisement.findById(postId);
        url = ad.imageUrl;
        console.log(`\timageUrl: ${url}`);
    } catch (err) {
        console.log(`Error getting image URL from database: ${err}`);
        return false;
    }
```

### Send Image for Image Processing System

For our Image Processing System we use [Imagga](https://imagga.com/), it gets url of the image, and retuns some tags and confidences.

```javascript
    try {
        const response = await imagga(url);
        console.log(response);

        state = response.state;
        category = response.category;
    } catch (err) {
        console.log('Error sending image to tagging system: ' + err);
        return false;
    }
```

### Sending Email

If the ad image, has a vehicle tag, and it's confidence is over 50%, we `approve` this ad, other wise we `reject` it. Then inform the user by email, we send the email to ther user by [Mailgun](https://www.mailgun.com/), Mailgun provides services for sending emails to specific email addresses that have given permission to it.
