require('prototype.spawn')();
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower=require('role.tower');
var runHarvest=require('run.harvest');
var runMovers=require('run.movers');
var takeRoom=require('take.room');
var attackRoom=require('attack.room');
var runHighspeed=require('run.highspeed');

module.exports.loop = function () {
    console.log('----------------------------------------------------------------------------')
    var highspeed = false;
    if(highspeed == true){
        console.log("highspeed")
        //runHighspeed.run();
    }
    else{
    for(var i in Game.rooms) {
        // some variables
        var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
        var room_source_container = []
        var current_room = Game.rooms[i];
        var my = current_room.controller.my
        var sources = current_room.find(FIND_SOURCES)
        // find all containers that are close to sources
        for(i=0; i<sources.length;i++){
            var container = sources[i].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
            if(container!=null){
            room_source_container.push(container.id)
        }
        }

        var spawn_container = Game.spawns.Spawn1.pos.findInRange(FIND_STRUCTURES, 3,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                        &&structure.store[RESOURCE_ENERGY] > 0;
                    }
            });

        var spawn_container_d = Game.spawns.Spawn1.pos.findInRange(FIND_STRUCTURES, 3,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                        &&structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        var controller_container = current_room.controller.pos.findInRange(
            FIND_STRUCTURES,4,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
        runHarvest.run(current_room, room_source_container);
    }
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    runMovers.run(room_source_container, spawn_container,controller_container,
    spawn_container_d, current_room)


    if(builders.length < 2 && Object.keys(Game.constructionSites).length>0) {
        var newName = Game.spawns['Spawn1'].createCustomCreep(energy, 'builder');
        console.log('Spawning new builder: ' + newName);var newName = Game.spawns['Spawn1'].createCustomCreep(1000, 'builder', 0);
    }
    if(upgraders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCustomCreep(1000, 'upgrader');
        console.log('Spawning new upgrader: ' + newName);
    }

    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if (towers.length!=0){
            roleTower.run(towers);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, controller_container, current_room);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, spawn_container, current_room);
        }
    }
}
}
