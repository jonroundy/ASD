function (doc) {
	if (doc._id.substr(0, 9) === "workorder"){
		emit(doc._id.substr(9), {
			"brand": doc.brand,
			"device": doc.device,
			"serial": doc.serial,
			"customername": doc.customername,
			"phoneNumber": doc.phoneNumber,
			"address": doc.address,
			"city": doc.city,
			"state": doc.state,
			"zipcode": doc.zipcode,
			"date": doc.date,
			"esttime": doc.esttime,
			"urgent": doc.urgent,
			
			
			
		});
	}
};