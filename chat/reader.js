const fs = require('fs');

fs.open('chat/read.json', 'r', (err, file) => {
	if (err) {
		fs.open('chat/read.json', 'w', (err, file) => {
			if (err) {
				console.log(err);
			} else {
				console.log('File created and now reading!!');
			}
		});
	} else {
		console.log('Reading messages!!');
	}
});

module.exports = {
	//sets the info for a msg who read it
	setMsgInfo: (info, callback) => {
		let { id, user_id, user_name } = info;
		console.log(id);

		fs.readFile('chat/read.json', (err, data) => {
			if (err) {
				console.log(err);
				callback(err);
			} else {
				try {
					// console.log(data);

					var newData = JSON.parse(data);
					if (newData[`${id}`] === undefined) {
						newData[`${id}`] = [JSON.stringify(info)];
					} else {
						var currData = newData[`${id}`];
						currData.push(JSON.stringify(info));
						newData[`${id}`] = currData;
					}

					fs.writeFile('chat/read.json', JSON.stringify(newData), () => {});
					callback(null);
				} catch (err) {
					console.log(err);
					callback(err);
				}
			}
		});
	},
	//read the info for a particular msg with a certain id
	getMsgInfo: (id, callback) => {
		fs.readFile('chat/read.json', (err, data) => {
			if (err) {
				console.log(err);
				callback(err);
			} else {
				try {
					const allData = JSON.parse(data);
					let tosenddata = allData[`${id}`];
					let readyData = [];

					tosenddata.forEach((item) => {
						readyData.push(JSON.parse(item));
					});

					callback(null, readyData);
				} catch (err) {
					console.log(err);
					callback(err);
				}
			}
		});
	},
};
