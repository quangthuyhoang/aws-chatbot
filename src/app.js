import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';


// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);
Interactions.configure(awsconfig);
let userInput = "I want to reserve a hotel for tonight";

// Provide a bot name and user input
// const response = await Interactions.send("BookTrip", userInput);

// Log chatbot response
console.log ("test",response.message);
const AnalyticsResult = document.getElementById('AnalyticsResult');
const AnalyticsEventButton = document.getElementById('AnalyticsEventButton');
let EventsSent = 0;
AnalyticsEventButton.addEventListener('click', (evt) => {
    Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://'+awsconfig.aws_project_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_project_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            AnalyticsResult.innerHTML = '<p>Event Submitted.</p>';
            AnalyticsResult.innerHTML += '<p>Events sent: '+(++EventsSent)+'</p>';
            AnalyticsResult.innerHTML += '<a href="'+url+'" target="_blank">View Events on the Amazon Pinpoint Console</a>';
        });
});