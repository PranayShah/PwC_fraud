myCollection = new Mongo.Collection ('myCollection');
bankCollection = new Mongo.Collection('bankCollection');
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
    }
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
    Template.hello.helpers (
      {
        'column' : function ()
        {
          return bankCollection.find().fetch();
        }
      });
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
}