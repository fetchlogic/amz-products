# AMZ Products

This module is a thin wrapper around the Amazon Products API. Unlike other modules, which only support one or two methods, this wrapper supports all the methods of the API.

The module is intentionally naive. It acts as a simple wrapper, allowing you to pass any valid options to the methods and returns the root response object from Amazon. I kept it this way, so you'll have the maximum flexibility in how you deal with responses.

Oh, and it returns JSON, not XML.

### Installation

`npm install amz-products`

### Usage

Each method takes an `options` hash as the first argument, and a callback as the second, which takes `error` and `response` arguments.

~~~javascript

var AmazonAPI = require('amz-products');

var amazon = new AmazonAPI({
  accessKeyId     : //your access key,
  secretAccessKey : //your secret access key,
  associateId     : //your associate ID
});

amazon.getItemsInBrowseNode({
  BrowseNode: 1234566
}, function(err, res){
  //do something with the response here
});
~~~

### Methods

All methods in the Amazon Products API have been mapped to this wrapper, but, I've renamed them slightly, since I think Amazon's naming sucks. Here's how things map:

Amazon API Method   |   Our Method
--------------------|------------------
`BrowseNodeLookup`  | `lookupBrowseNode`
`ItemSearch`        | `getItemsInBrowseNode`
`ItemLookup`        | `getItemDetail`
`CartAdd`           | `addToCart`
`CartClear`         | `clearCart`
`CartCreate`        | `createCart`
`CartGet`           | `getCart`
`CartModify`        | `modifyCart`
`SimilarityLookup`  | `getSimilarItems`

All methods take the same options as the Amazon API, in a single `opts` hash passed as the first argument in the method. Refer to the [Amazon Products API Documentation](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/CHAP_ApiReference.html) for details on the options you can pass.

### Locale Settings

The Product Advertising API support different locales, and so does this module. To use a different locale, simply pass the locale ID in when initializing the module. Example:

~~~javascript

var AmazonAPI = require('amz-products');

var amazon = new AmazonAPI({
  accessKeyId: //your access key
  secretAccessKey: //your secret access key
  associateId: //your associate ID
  locale: 'UK'
});

~~~

The module defaults to "US", and passing a locale isn't required. Locale codes are as follows:

Locale        |   Code
--------------|----------
Brazil        | BR
Canada        | CA
China         | CN
France        | FR
Germany       | DE
India         | IN
Italy         | IT
Japan         | JP
Mexico        | MX
Spain         | ES
United Kingdom| UK
United States | US


### Why Another Amazon Products API Module?

Frankly, all the ones I've come across on npm suck. Either they don't support all the methods, or they provide an arcane interface to the API. I'm passionate about developer experience, and want an API wrapper that makes sense, is fully featured, and is dead simple to use.

### What Else?

Not much, really. If you've got ideas or suggestions for improving, create an issue or simply issue a pull request.
