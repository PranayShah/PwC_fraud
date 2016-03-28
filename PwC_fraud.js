myCollection = new Mongo.Collection ('myCollection');
bankCollection = new Mongo.Collection('bankCollection');
emailCollection = new Mongo.Collection ('emailCollection');
if (Meteor.isClient)
{
	Template.body.helpers (
		{
			'set' : function ()
			{
				return Session.get('set');
			}
		});
  Template.hello.helpers (
  {
    'col' : function ()
    {
      return myCollection.find().fetch();
    },
    'sms' : function ()
    { 
    	return /\d+/.exec(this.sms)!==null? /\d+/.exec(this.sms)[0]: null;
    },
    'coll' : function ()
    {
      return emailCollection.find().fetch();
    },
    'column' : function ()
    {
      return bankCollection.find().fetch();
    }
  });
  Template.registerHelper ('when', function ()
    {
      return new Date().toDateString();
    });
  /*Template.hello.helpers (
    {
      'column' : function ()
      {
        var cust =  bankCollection.find().fetch();
        cust.map (function (e,i,l)
          {
            console.log (e);
            if (myCollection.find({"imsi" :e['fldPhoneNo'] }).count() )
            {
              return 
            }
          });
      }
    });*/
}
else
{
	// Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  // Generates: GET, POST on /api/items and GET, PUT, DELETE on
  // /api/items/:id for the Items collection
  Api.addCollection(bankCollection);
  Api.addCollection (emailCollection);
}