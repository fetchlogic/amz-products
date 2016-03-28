var amazonWrapper = require("apac").OperationHelper;
var flatten = require("flat");

module.exports = function(credentials) {

  this.amazonAPI = new amazonWrapper({
    awsId: credentials.accessKeyId,
    awsSecret: credentials.secretAccessKey,
    assocId: credentials.associateId,
    endPoint: determineLocale(credentials.locale),
    xml2jsOptions: {
      explicitArray: false,
      ignoreAttrs: true
    }
  });

  this.lookupBrowseNode = function(opts, callback) {
    this.amazonAPI.execute('BrowseNodeLookup', opts, function(err, res){
      callback(err, res);
    });
  }

  this.getItemsInBrowseNode = function(opts, callback) {
    this.amazonAPI.execute('ItemSearch', opts, function(err, res) {
       callback(err, res);
    });
  },

  this.getItemDetail = function(opts, callback) {
    this.amazonAPI.execute('ItemLookup', opts, function(err, res) {
      callback(err, res);
    });
  },

  this.getSimilarItems = function(opts, callback) {
    this.amazonAPI.execute('SimilarityLookup', {
      'ItemId': opts.items.join()
    }, function(err, res) {
        callback(err, res);
    });
  },

  this.createCart = function(opts, callback) {
    this.amazonAPI.execute('CartCreate', {
      'AssociateTag': credentials.associateId,
      'Item.1.ASIN': opts.ASIN,
      'Item.1.Quantity': opts.qty
    }, function(err, res) {
      callback(err, res);
    });
  },

  this.getCart = function(opts, callback) {
    this.amazonAPI.execute('CartGet', {
      'AssociateTag': credentials.associateId,
      'CartId': opts.cartId,
      'HMAC': opts.HMAC
    }, function(err, res) {
      callback(err, res);
    });
  },

  this.addToCart = function(opts, callback) {

    var requestParams = {
      'CartId': opts.cartId,
      'HMAC': opts.HMAC,
      'Item': {}
    }

    opts.itemsToAdd.forEach(function(item, i) {
      i = i + 1;
      requestParams.Item[i] = {};
      requestParams.Item[i].OfferListingId = item.offerListingId;
      requestParams.Item[i].Quantity = item.qty;
    });

    requestParams = flatten(requestParams);
    requestParams.AssociateTag = credentials.associateId

    this.amazonAPI.execute('CartAdd', requestParams, function(err, res) {
      callback(err, res);
    });
  },

  this.modifyCart = function(opts, callback) {

    var requestParams = {
      'CartId': opts.cartId,
      'HMAC': opts.HMAC,
      'Item': {}
    }

    opts.itemsToModify.forEach(function(item, i) {
      i = i + 1;
      requestParams.Item[i] = {};
      requestParams.Item[i].CartItemId = item.cartItemId;
      requestParams.Item[i].Quantity = item.qty;
    });

    requestParams = flatten(requestParams);
    requestParams.AssociateTag = credentials.associateId;

    this.amazonAPI.execute('CartModify', requestParams, function(err, res) {
      callback(err, res);
    });
  },

  this.clearCart = function(opts, callback) {
    this.amazonAPI.execute('CartClear', {
      'AssociateTag': credentials.associateId,
      'CartId': opts.cartId,
      'HMAC': opts.HMAC
    }, function(err, res) {
      callback(err, res);
    });
  }
}

function determineLocale(locale) {
  if (locale) {
    locale = locale.toUpperCase();
  }

  switch (locale) {
    case 'BR':
      return 'webservices.amazon.com.br';
      break;

    case 'CA':
      return 'webservices.amazon.ca';
      break;

    case 'CN':
      return 'webservices.amazon.cn';
      break;

    case 'FR':
      return 'webservices.amazon.fr';
      break;

    case 'DE':
      return 'webservices.amazon.de';
      break;

    case 'IN':
      return 'webservices.amazon.in';
      break;

    case 'IT':
      return 'webservices.amazon.it';
      break;

    case 'JP':
      return 'webservices.amazon.co.jp';
      break;

    case 'MX':
      return 'webservices.amazon.com.mx';
      break;

    case 'ES':
      return 'webservices.amazon.es';
      break;

    case 'UK':
      return 'webservices.amazon.co.uk';
      break;

    default:
      return 'webservices.amazon.com';
  }
}
