exports.Leavefileupload = (req,res)=>{
    if(req.files){
    //    console.log(req.files);
       var file = req.files.file
       var filename = file.name
      //  console.log(filename);
       file.mv('./public/profile2/'+filename,(err)=>{
         if(err){
           res.send(err)
         }else{
           res.status(200).json({msg : 'File Uploaded!', fileName : filename})
         }
       })
     }
   }