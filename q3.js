const axios = require('axios');

async function parse(inputArray) {
  // @TODO
  // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
  // 		note: you may need to use a CORS proxy
  // 2. parse the inputArray into a list of assets using the above list

  const response = await axios('https://api.fliplet.com/v1/widgets/assets', {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://apps.fliplet.com/*"
    }
  });
  const { assets } = response.data; 

  const filteredList = Object.keys(assets)
    .filter((key) =>
      inputArray.some((input) => key.match(new RegExp(input, "g")))
    )
    .map((key) => assets[key]);

  const parsedList = retrieveParseVersions(filteredList)

  return Promise.resolve(parsedList);
}

function retrieveParseVersions(filteredList) {


  const retrievePath = filteredList.map((asset) => {
    const versions = asset.versions;

    const paths = Object.keys(versions).reduce(
      (prevValue, currValue) =>
        versions[prevValue] > versions[currValue]
          ? versions[prevValue]
          : versions[currValue],
      {}
    );

    return paths
  })


  return retrievePath.flat()
}


parse(['bootstrap', 'fliplet-core', 'moment', 'jquery']).then(function(assets) {
  /*
   
   assets is expected to be an array with the
   following values in the same order as here:
   
   [
   	 "fonts/glyphicons-halflings-regular.ttf",
		 "fonts/glyphicons-halflings-regular.woff",
		 "fonts/glyphicons-halflings-regular.woff2",
     'bootstrap-css.bundle.css',
     'bootstrap-js.bundle.js',
     'jquery.js',
   	 'fliplet-core.bundle.css',
		 'fliplet-core.bundle.js',
     'moment.min.js'
   ]
   
   */

  console.log('The list is', assets);
});
