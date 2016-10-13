var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester_2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMover = require('role.mover');
var roleTower=require('role.tower');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    console.log('Harvesters2: ' + harvesters2.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    console.log('Movers: ' + movers.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(harvesters2.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester2'});
        console.log('Spawning new harvester2: ' + newName);
    }
    if(movers.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'mover'});
        console.log('Spawning new mover: ' + newName);
    }
    if(upgraders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    if(builders.length < 2 && Object.keys(Game.constructionSites).length>0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    roleTower.run(towers);
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
    }
}
