"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const ucfirst			= require('./lib/ucfirst');
const parseCliArgs		= require("./lib/parseCliArgs");
const propCont			= (attr=null,type=null)=>{
	if(!attr || !type) return;
	return `	public ${attr}:${type};${"\n"}`;
}
const propAssign			= (attr=null)=>{
	if(!attr) return;
	return `			if( params.${attr} ) this.${attr} = params.${attr};${"\n"}`;
}

return (()=>{
	let {name=null,attributes=null} = parseCliArgs();
	let propContent = '';
	let propAssignContent = '';
	const moduleRegExp				= new RegExp("{{module}}","g");
	const ModuleRegExp				= new RegExp("{{Module}}","g");
	const propDefinitionRegExp		= new RegExp("{{propDefinition}}","g");
	const propAssignRegExp		= new RegExp("{{propAssign}}","g");
	const origin			= join( __dirname , '../examples/entity.example' );
	const destiny			= join(__dirname, `../src/Entity/${name}.ts`);
	const fileContent		= readFileSync(origin,'utf-8');

	if( !name ){
		console.error(`Cannot create unnamed repository`);
		process.exit(1);
	}

	if(!attributes){
		attributes = [
			['demoAttr1',"string"],
			['demoAttr2',"string"],
			['demoAttr3',"string"],
		];
	}

	attributes.forEach(row=>{
		let [ attr=null,type=null ] = row;
		propContent += propCont(attr,type);
		propAssignContent += propAssign(attr);
	});

	const newContent = fileContent
	.toString()
	.replace(moduleRegExp, name)
	.replace(ModuleRegExp, ucfirst(name))
	.replace(propDefinitionRegExp, propContent)
	.replace(propAssignRegExp, propAssignContent)
	;

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Handler:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
