
var urls = ["dashboard","compras","estoque","receitas","producao","vendas"];
var names = ["Dashboard","Compras","Estoque","Receitas","Produção","Vendas"];
var icons = ["fa-bar-chart","fa-cart-plus","fa-sitemap","fa-cutlery","fa-cogs","fa-money"];

function createSidebar(active){
	var sidebar = "";
	for(var i=0;i<urls.length;i++){
		if(active==urls[i]){
			sidebar += "<li class='active'>";
		}
		else{
			sidebar += "<li>";
		}
		sidebar += `<a href="/${urls[i]}"> <i class="fa ${icons[i]}"></i>${names[i]}</a></li>`;
	}           

    return sidebar;
}

module.exports = createSidebar;