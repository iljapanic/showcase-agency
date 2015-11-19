var config = require('./')

module.exports = {
    src: config.sourceAssets + "/svg/*.svg",
    dest: config.baseDirectory, 
    settings: {
    	"mode": {
        	"css": {
	            "spacing": {
	                "padding": 5
	            },
	            "dest": "./",
	            "layout": "diagonal",
	            "sprite": config.publicAssets + "/img/sprite.svg",
	            "bust": false,
	            "render": {
	                "scss": {
	                    "dest": config.sourceAssets + "/sass/utils/_sprite.scss",
	                    "template": config.sourceAssets + "/sass/utils/_sprite-template.scss"
	                }
	            }
            }
        }  
    }
}