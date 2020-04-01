window.onload = function() {
	$("#back").click(function() {
		location.href = "./Auto.html";


	});

	$("#plus").click(function() {

		var $One = $(
			'<div class="node_one"><div class = "string"></div><div class = "node_small">节点<span>1</span></div><div class = "string"></div><div class = "logic"></div></div>'
		);

		$(".node").prepend($One);

	});
}
