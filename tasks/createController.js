"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const getLastCliArg		= require('./lib/getLastCliArg');
const ucfirst			= require('./lib/ucfirst');
const controllerName		= getLastCliArg() || "controller" ;

return (()=>{
	const lowerRegEx		= new RegExp("{{module}}","g");
	const CamelRegEx		= new RegExp("{{Module}}","g");
	const CamelName			= ucfirst( controllerName );
	const origin			= join( __dirname , '../examples/Controller.example' );
	const destiny			= join(__dirname, `../src/Controller/${CamelName}.ts`);
	const fileContent		= readFileSync(origin,'utf-8');
	const newContent		= fileContent.toString().replace(lowerRegEx, controllerName).replace(CamelRegEx,CamelName);
	const exportHandler		= `export { default as ${controllerName} }		from './Restful/${controllerName}';${"\n"}`;

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Handler:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
