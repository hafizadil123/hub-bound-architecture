const filetoupload = (uploadfiles) => {
   var file = uploadfiles.profile_pic;
   var img_name = Date.now() + "_"+file.name;
   var data = img_name;
		if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" 
		 || file.mimetype == "image/png" || file.mimetype == "image/gif" ){
			 file.mv(process.env.upload_image+Date.now() + "_"+file.name,function(err) {
					if(!err){
						data = "success";
					}
				});
		 }else{
			data = "error";
		 }  
	return data;
}

const file_uploading = {
	filetoupload:filetoupload
};
module.exports = file_uploading;