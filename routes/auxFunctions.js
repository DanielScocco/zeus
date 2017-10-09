 

module.exports.formatDate = function (type,dateString){	
    if(type==1){
        var parts = dateString.split("-");
        return parts[2]+"/"+parts[1]+"/"+parts[0];
    }
    else if(type==2){
        var date = new Date();	
        var dd = ""+date.getDate();
        if(dd.length==1)
      	  dd = "0" + dd;
        var mm = String(date.getMonth()+1); //January is 0!
        if(mm.length==1)
      	  mm = "0" + mm;
        var yyyy = date.getFullYear();
        return yyyy+"-"+mm+"-"+dd;  
    }
    else{
    	return "00-00-0000";
    }
}
