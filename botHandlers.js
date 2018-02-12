var DialogflowApp	=	require('actions-on-google').DialogflowApp;
var request			=	require('request');
var serviceNowApi 	=	require('./serviceNow');
var sNow 	= 	require('./config');

var botHandlers = {};
//var botResponses = require('./facebook.js');
botHandlers.processRequest = function(req, res){
	return new Promise(function(resolve, reject){
		
		console.log('Process request started');
		let action = req.body.result.action; // https://dialogflow.com/docs/actions-and-parameters		
		let parameters = req.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters		
		let inputContexts = req.body.result.contexts; // https://dialogflow.com/docs/contexts
		let requestSource = (req.body.originalRequest) ? req.body.originalRequest.source : undefined;	
		let payloadText = '';						
		var sessionId = (req.body.sessionId)?req.body.sessionId:'';		
		var sourceType = require('./'+requestSource);
		
		if(req.body.originalRequest.data.message){
			if(req.body.originalRequest.data.message.quick_reply){
				payloadText = req.body.originalRequest.data.message.quick_reply.payload;
			}else{
				payloadText = req.body.originalRequest.data.message.text;
			}
		}else if(req.body.originalRequest.data.postback){
			payloadText = req.body.originalRequest.data.postback.payload;
		}
		
		
		switch(action){
			
		}		
	
		generateResponse(action, sessionId, payloadText, requestSource)
		.then(function(responseJson){
		
			//responseJson.contextOut = inputContexts;						
		})
		.then(function(resp){			
			resolve(resp);
		})
		.catch(function(err){
			reject(err);
		})	
		
			
	});
}

function generateResponse(action, sessId, actionValue, requestSource){
	return new Promise(function(resolve, reject){
		
			sourceType.generateResponseTemplate(responseContent, 'quickreply')
			.then((resp)=>{ 
				//console.log(facebook[resp.templateGenerateFunc);
				return resp.templateGenerateFunc(resp.responseContent);
			})
			.then((resp)=>{
				resolve(resp); 
			})					
			.catch((err)=>{ reject(err) });

	});
}


module.exports = botHandlers;