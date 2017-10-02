 

module.exports.formatDate = function (type,dateString){	
    var date = new Date(dateString);	
    var dd = String(date.getUTCDate());    
    if(dd.length==1)
  	  dd = "0" + dd;
    var mm = String(date.getMonth()+1); //January is 0!
    if(mm.length==1)
  	  mm = "0" + mm;
    var yyyy = date.getFullYear();
    if(type==1){
    	return dd+"/"+mm+"/"+yyyy;
    }
    else if(type==2){
    	return yyyy+"-"+mm+"-"+dd;	
    }
    else{
    	return "00-00-0000";
    }
}
