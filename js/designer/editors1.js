(function($){
var designer = $.designer;

var selItems=[];
var saveList=[];
var isSelectClicked=false;
$.extend(true, designer.editors, {
	inputEditor : function(){
		this.init = function(obj,rect,prop){
			$('<input type="text" />').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").html($(this).val());
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
			$('<label>'+prop.value+'</label>').val(prop.value).change(function(){
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
					$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(false);
				}
				if(prop.value==true){
					ch.attr("checked",true);
					$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(true);
				}
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
	//------4_11------------
	//------4_14-------
	selectEditor : function(){
		this.init = function(obj,rect,prop){
		    var sleId=rect.toJson().props.id.value;
		    var saveItem={
		    	id:sleId,
		    	text:''
		    };
		    
		   //selItems记录以当前节点为结束的之前所有节点
			saveItem.text=selItems[1];
			var isRepeat=false;
			for(var i=0;i<saveList.length;i++){
				if(sleId==saveList[i].id){
					isRepeat=true;
					saveList[i].text=saveItem.text;
					/*if(saveList[i].text==""){
						saveList[i].text="开始节点";
					}*/
					/*if(saveList.length==1){
						saveList[i].text=saveItem.text;
					}*/
					
				}
			}
			if(isRepeat==false){
				saveList.push(saveItem);
			}

			var sle = $('<select id='+sleId+' style="width:99%;"/>').val(prop.value).change(function(){
				isSelectClicked=true;
				rect.setPropValue(prop.name,$(this).val());
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text($(this).val());
				saveItem.text=$(this).val();
				//-------------
				var isRepeat=false;

			for(var i=0;i<saveList.length;i++){
				if(sleId==saveList[i].id){
					isRepeat=true;
					saveList[i].text=saveItem.text;
				}
			}
			if(isRepeat==false){
				saveList.push(saveItem);

			}
            //-------------
            
		//--------
			}).appendTo(obj);
			
			
			for(var i=0;i<saveList.length;i++){
				if(selItems[0]==saveList[i].id){
					for(var idx=1; idx<selItems.length; idx++){
						if(saveList[i].text==selItems[idx]){
							sle.append('<option value="'+selItems[idx]+'" selected=true>'+selItems[idx]+'</option>');
							$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(selItems[idx]);
							
							rect.setPropValue(prop.name,selItems[idx]);
						}else{
							sle.append('<option value="'+selItems[idx]+'">'+selItems[idx]+'</option>');
							/*$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(selItems[1]);
							rect.setPropValue(prop.name,selItems[1]);*/
						}

					}
				}
			}
		};
		
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	}
	//------4_11------------

	/*selectEditor : function(arg){
		
		this.init = function(obj,rect,prop){	
			
			var sle = $('<select  style="width:99%;"/>').val(prop.value).change(function(){
				rect.setPropValue(prop.name,$(this).val());
				var showText="";
				for(var i=0;i<arg.length;i++){
					if(arg[i].name==$(this).val()){
						showText=arg[i].value;
					}
				}
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(showText);
				preValue=showText;
			}).appendTo(obj);

			if(preValue==""){
	
				//$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text("ant");
			}else{
				$("#"+rect.toJson().props.id.value).children("td[name='"+prop.name+"']").text(preValue);
			}

			for(var idx=0; idx<arg.length; idx++){
				if(preValue==arg[idx].value){
					sle.append('<option value="'+arg[idx].name+'" selected="true">'+arg[idx].value+'</option>');
				}else{
			        sle.append('<option value="'+arg[idx].name+'">'+arg[idx].value+'</option>');
			    }
			}

		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	}*/
	

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

$.selItems=selItems;
$.saveList=saveList;
})(jQuery);