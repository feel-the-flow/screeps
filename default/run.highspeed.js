var roleHarvester = require('high.harvester');
var roleUpgrader = require('high.upgrader');
var roleBuilder = require('high.builder');

var runHighspeed = {
    run: function() {
        console.log("in highspeed")
        // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 4;
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters0 = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.source==0);
    var numberOfHarvesters1 = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.source==1);
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    console.log(numberOfHarvesters0 + '  ' + numberOfHarvesters1)
    var name = undefined;
    console.log("n_builder " + _.sum(Game.creeps, (c) => c.memory.role == 'builder'))
    console.log(_.sum(Game.creeps, (c) => c.memory.role == 'upgrader'))
    // if not enough harvesters
    if (numberOfHarvesters0 < (minimumNumberOfHarvesters-4)) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false, source:0});
    }
    else if (numberOfHarvesters1 < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false, source:1});
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else {
        // else try to spawn a builder
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'upgrader', working: false});
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
}
}
}
module.exports = runHighspeed;
