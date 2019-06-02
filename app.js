require('dotenv').config();
const smashgg = require('smashgg.js');
const {Tournament} = smashgg;

if(process.argv.length < 4){
    console.log('USAGE app <tournament name> <smashtag>')
    return;
};

~async function(){
    smashgg.initialize(process.env.API_TOKEN)
    smashgg.setLogLevel("info")
    const tourney = process.argv[2]
    const tag = process.argv[3]
    
    const tournament = await Tournament.get(tourney)
    const attendees = await tournament.searchAttendees(tag)
    for(let i in attendees){
        let attendee = attendees[i]
        console.log("Name: %s", attendee.getGamerTag())
        console.log("Phone Number: %s", attendee.getPhoneNumber())
        
        const phases = await attendee.getEnteredPhases()
        console.log('PHASES:')
        console.log(phases);

        const groups = await attendee.getEnteredPhaseGroups()
        console.log('PHASE GROUPS:')
        console.log(groups)
        console.log('-----------------')
    }
}()