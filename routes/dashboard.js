var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Sale = require('../models/sale');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('dashboard');
  var date = new Date();
  var months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var lastDay = daysInMonth(date.getMonth(),date.getFullYear());
  var monthString = months[date.getMonth()];
  var monthNumber = date.getMonth() + 1;
  var month = date.getMonth();
  var year = date.getFullYear();
  var title = "Dashboard - " + monthString + " " + year;

  var startDate = new Date(year,month,1); 
  if(month==11){
  	month = -1;
  	year++;
  }
  var endDate = new Date(year,month+1,1); 

	console.log("start="+startDate);
	console.log("end="+endDate);  

  //create table body
  Sale.find({storeId:req.user.storeIds[0],date:{"$gte":startDate,"$lt":endDate}},function(err, sales){
	if(err) console.log(err);  // log errors

	  console.log("sales="+sales.length);

	  //aggregate sales by day
	  var salesArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	  for(var i=0;i<sales.length;i++){
	  	var currentDate = new Date(sales[i].date);
	  	var currentDay = currentDate.getDate();
	  	salesArr[currentDay-1] += sales[i].totalValue;
	  }

	  var monthlyEstimate = estimateSales(salesArr,lastDay);

	  var tableBody = '';
	  for(var i=1;i<=lastDay;i++){
	  	if(i<10)
	  		var day = "0" + i;
	  	else 
	  		var day = i;

	  	var dateString = day + "/" + monthNumber + "/" + year;
	  	tableBody += `<tr>
	                    <th scope="row">${dateString}</th>
	                    <td class="text-center">R$ ${salesArr[i-1].toFixed(2)}</td>
	                    <td class="text-center">-</td>                                              
	                                             
	                  </tr>`;
	  }

	  tableBody += `<tr class="table-danger">
	                    <th scope="row">Total</th>
	                    <td class="text-center">-</td>
	                    <td class="text-center">-</td>                                              
	                                             
	                  </tr>`;

	  var content = `<section class="dashboard-header no-padding-bottom">
	            		<div class="container-fluid">
	              			<div class="row">
	              				<div class="statistics col-lg-3 col-12">
				                  <div class="statistic d-flex align-items-center bg-white has-shadow">
				                    <div class="icon bg-blue"><i class="fa fa-dollar"></i></div>
				                    <div class="text"><strong>R$ ${monthlyEstimate}</strong><br><small>Projeção de Vendas</small></div>
				                  </div>
				                </div>
				                <div class="statistics col-lg-3 col-12">
				                  <div class="statistic d-flex align-items-center bg-white has-shadow">
				                    <div class="icon bg-green"><i class="fa fa-percent"></i></div>
				                    <div class="text"><strong>-%</strong><br><small>Variação / Mes Passado</small></div>
				                  </div>
				                </div>
				                <div class="statistics col-lg-3 col-12">
				                  <div class="statistic d-flex align-items-center bg-white has-shadow">
				                    <div class="icon bg-yellow"><i class="fa fa-cart-plus"></i></div>
				                    <div class="text"><strong>24%</strong><br><small>CMV do Mẽs</small></div>
				                  </div>
				                </div>
				                <div class="statistics col-lg-3 col-12">
				                  <div class="statistic d-flex align-items-center bg-white has-shadow">
				                    <div class="icon bg-red"><i class="fa fa-percent"></i></div>
				                    <div class="text"><strong>-%</strong><br><small>Variação / Mẽs Passado</small></div>
				                  </div>
				                </div>
	          				</div>
	          			</div>
	          		</section>

	          		<section class="tables no-padding-bottom">   
				            <div class="container-fluid">
				              <div class="row">
				                <div class="col-lg-12">
				                  <div class="card">
				                  <div class="card-header d-flex align-items-center">
					                      <h3 class="h4">Vendas Diárias</h3>
					                    </div>
				                  	<div class="card-body">
				                      <table class="table">
				                        <thead>
				                          <tr>
				                            <th>Data</th>
				                            <th class="text-center">Vendas</th>
				                            <th class="text-center">CMV</th>                  
				                            
				                          </tr>
				                        </thead>
				                        <tbody>
				                          ${tableBody}
				                        </tbody>
				                      </table>
				                    </div>
				                   </div>
				                  </div>
				                  </div>
				                 </div>
				                </section>
	          		`;

	  res.render('body', {user:"Tamboré", sidebar:sidebar, header:title,content:content,layout:'main'});
	});//Sale
});

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function estimateSales(salesArr,lastDay){
	var tot = 0;
	var date = new Date();
	var today = date.getDate();

	if(today==1)
		return 0

	for(var i=0;i<today -1;i++)
		tot += salesArr[i];

	return (tot / (today-1)) * lastDay ;
}

module.exports = router;
