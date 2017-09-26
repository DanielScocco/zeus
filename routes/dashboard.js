var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('dashboard');

  var content = `<section class="dashboard-header no-padding-bottom">
            		<div class="container-fluid">
              			<div class="row">
              				<div class="statistics col-lg-3 col-12">
			                  <div class="statistic d-flex align-items-center bg-white has-shadow">
			                    <div class="icon bg-blue"><i class="fa fa-dollar"></i></div>
			                    <div class="text"><strong>R$232 mil</strong><br><small>Projeção de Vendas</small></div>
			                  </div>
			                </div>
			                <div class="statistics col-lg-3 col-12">
			                  <div class="statistic d-flex align-items-center bg-white has-shadow">
			                    <div class="icon bg-green"><i class="fa fa-percent"></i></div>
			                    <div class="text"><strong>+14%</strong><br><small>Variação / Ano Passado</small></div>
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
			                    <div class="text"><strong>-13%</strong><br><small>Variação / Mẽs Passado</small></div>
			                  </div>
			                </div>
          				</div>
          			</div>
          		</section>
          		<section class="dashboard-header">
            		<div class="container-fluid">
          				<div class="row">
          					 <!-- Line Chart            -->
			                <div class="chart col-lg-12 col-12">
			                  <div class="line-chart bg-white d-flex align-items-center justify-content-center has-shadow">
			                    <canvas id="lineCahrt"></canvas>
			                  </div>
			                </div>
          				</div>
          			</div>
          		</section`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Dashboard - Setembro 2017",content:content,layout:'main'});
});

module.exports = router;
