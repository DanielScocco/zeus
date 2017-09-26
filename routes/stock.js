var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('estoque');

  var content = `<section class="tables">   
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                  	<div class="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th class="text-center">Quantidade</th>
                            <th>Duração</th>
                            <th>Última Compra</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Leite</th>
                            <td class="text-center">55</td>
                            <td>15 dias</td>
                            <td>10/09/17</td>
                          </tr>
                          <tr>
                            <th scope="row">Pistache</th>
                            <td class="text-center">15</td>
                            <td>22</td>
                            <td>01/09/17</td>
                          </tr>
                          <tr class="table-danger">
                            <th scope="row">Creme de Leite</th>
                            <td class="text-center">19</td>
                            <td>3 dias</td>
                            <td>25/08/17</td>
                          </tr>
                          <tr>
                            <th scope="row">Açúcar</th>
                            <td class="text-center">67</td>
                            <td>34 dias</td>
                            <td>15/08/17</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                   </div>
                  </div>
                  </div>
                 </div>
                </section>`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Estoque",content:content,layout:'main'});
});

module.exports = router;
