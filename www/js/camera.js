var image_flag = false;

var app = {
	image: null,
	imgOptions: null,

	initialize: function () {
		document.addEventListener("DOMContentLoaded", this.onDeviceReady, false);
	},

	onDeviceReady: function () {
		document.querySelector("#btn").addEventListener("click", app.callCamera);
		document.querySelector("#btn2").addEventListener("click", app.callCamera2);
		app.image = document.querySelector("#image");
	},
	//take new pic
	callCamera: function () {
		app.imgOptions =
		{
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			targetWidth: 400,
			targetHeight: 400,
			cameraDirection: Camera.Direction.BACK,
			correctOrientation: true,
			saveToPhotoAlbum: true
		};
		navigator.camera.getPicture(app.imgSuccess, app.imgFail, app.imgOptions);
	},
	//upload existing pic
	callCamera2: function () {
		app.imgOptions = {
			quality: 100,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: false,
			targetWidth: 400,
			targetHeight: 400,
			encodingType: Camera.EncodingType.JPEG,
			correctOrientation: true,
			mediaType: Camera.MediaType.PICTURE
		};
		navigator.camera.getPicture(app.imgSuccess, app.imgFail, app.imgOptions);
	},

	imgSuccess: function (imageData) {
		app.image.src = "data:image/jpeg;base64," + imageData;
		//clear memory in app
		navigator.camera.cleanup();
		image_flag = true;
	},

	imgFail: function (msg) {
		image_flag = false;
		//alert("Failed to get image: " +  msg);
	}

};

app.initialize();

function signup() {
	var imageURI1 = document.getElementById('image').getAttribute("src");

	if (image_flag == true)
		uploadPhoto(imageURI1);
	else
		window.location.replace("index.html");


}


function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";

	var params = new Object();

	params.filename = "filename.jpg";


	options.params = params;
	options.chunkedMode = false;
	var ft = new FileTransfer();

	ft.upload(imageURI, "http://myuopevents.com/php/upload.php", win, fail, options);
}

function win(r) {
	//alert("Code = " + r.responseCode);
	//alert("Response = " + r.response);
	//alert("Sent = " + r.bytesSent);
	window.location.replace("index.html");
}

function fail(error) {
	//alert("An error has occurred: Code = " + error.code);
}
