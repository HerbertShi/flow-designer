(function($){
var designer = $.designer;

$.extend(true, designer.editors, {
	inputEditor : function(){
		this.init = function(obj,rect,prop){
			$('<input type="text" />').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				//$("#tbody").children(tr[id='"+rect.toJson().props.id.value+"']).children(td[name='"+prop.name+"']).val()=$(this).val();
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text($(this).val());
			}).appendTo(obj);
			
		}
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		}
	},
	textEditor : function(){
		this.init = function(obj,rect,prop){
			$('<input type="text" />').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text($(this).val());
				rect.setText($(this).val());
			}).appendTo(obj);
			
		}
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		}
	},
	readOnlyEditor : function(){
		this.init = function(obj,rect,prop){
			$('<input type="text" readOnly="true"/>').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
			}).appendTo(obj);
			
		}
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		}
	},
	checkEditor: function() {

			this.init = function(obj, rect, prop) {
				var ch=$('<input style="width:98%;" type="checkbox" />');
				if(prop.value==false){
					ch.attr("checked",false);
					//console.log(prop.value);
					$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(false);
				}
				if(prop.value==true){
					//console.log(prop.value);
					ch.attr("checked",true);
					$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(true);
				}
				//console.log(prop.value);
				ch.click(function() {
					if(ch.attr("checked")==false){
						ch.attr("checked",false);
						rect.setPropValue(prop.name, false);
						$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(false);
					}else{
						ch.attr("checked",true);
						rect.setPropValue(prop.name, true);
						$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(true);
					}
					
				}).appendTo(obj);
			}
			this.destroy = function() {
				$('#' + _div + ' input').each(function() {
					_props[_k].value = $(this).val();
				});
			}
	},
	textareaEditor : function(){
		
		this.init = function(obj,rect,prop){
			
			$('<textarea style="width:98%;" rows="5"  />').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text($(this).val());
			}).appendTo(obj);
			
		
		}
		this.destroy = function(){
			$('#'+_div+' area').each(function(){
				_props[_k].value = $(this).val();
			});
		}
	},
	
	selectEditor : function(arg){
		
		this.init = function(obj,rect,prop){
			if(prop.value==""){
				prop.value="ANT";
			}
			var sle = $('<select  style="width:99%;"/>').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text($(this).val());
			}).appendTo(obj);
			for(var idx=0; idx<arg.length; idx++){
					sle.append('<option value="'+arg[idx].value+'">'+arg[idx].name+'</option>');
			}
			sle.val($(this).val());


			/*if(typeof arg === 'string'){
				$.ajax({
				   type: "GET",
				   url: arg,
				   success: function(data){
					  var opts = eval(data);
					 if(opts && opts.length){
						for(var idx=0; idx<opts.length; idx++){
							sle.append('<option value="'+opts[idx].value+'">'+opts[idx].name+'</option>');
						}
						sle.val(prop.value);
					 }
				   }
				});
			}else {
				for(var idx=0; idx<arg.length; idx++){
					sle.append('<option value="'+arg[idx].value+'">'+arg[idx].name+'</option>');
				}
				sle.val(prop.value);
			}*/
			
			//$(obj).data('editor', this);
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	}

	/*selectEditor : function(arg){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;

			var sle = $('<select  style="width:99%;"/>').val(props[_k].value).change(function(){
				props[_k].value = $(this).val();
			}).appendTo('#'+_div);
			
			if(typeof arg === 'string'){
				$.ajax({
				   type: "GET",
				   url: arg,
				   success: function(data){
					  var opts = eval(data);
					 if(opts && opts.length){
						for(var idx=0; idx<opts.length; idx++){
							sle.append('<option value="'+opts[idx].value+'">'+opts[idx].name+'</option>');
						}
						sle.val(_props[_k].value);
					 }
				   }
				});
			}else {
				for(var idx=0; idx<arg.length; idx++){
					sle.append('<option value="'+arg[idx].value+'">'+arg[idx].name+'</option>');
				}
				sle.val(_props[_k].value);
			}
			
			$('#'+_div).data('editor', this);
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	}*/
});

})(jQuery);