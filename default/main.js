var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower=require('role.tower');
var runHarvest=require('run.harvest');
var runMovers=require('run.movers');

module.exports.loop = function () {
    console.log('----------------------------------------------------------------------------')
    for(var i in Game.rooms) {
        var room_source_container = []
        var current_room = Game.rooms[i];
        var sources = current_room.find(FIND_SOURCES)
        for(i=0; i<sources.length;i++){
            var container = sources[i].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
            room_source_container.push(container.id)
        }
        var spawn_container = Game.spawns.Spawn1.pos.findInRange(FIND_STRUCTURES, 3,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                        //&&structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        var spawn_container_d = Game.spawns.Spawn1.pos.findInRange(FIND_STRUCTURES, 3,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                        &&structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        var controller_container = current_room.controller.pos.findClosestByRange(
            FIND_STRUCTURES,
            {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)&&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        //console.log(sources[0].pos)
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
    spawn_container_d)



    if(upgraders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep(
            [WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    if(builders.length < 2 && Object.keys(Game.constructionSites).length>0) {
        var newName = Game.spawns['Spawn1'].createCreep(
            [WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    roleTower.run(towers);
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, controller_container);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, spawn_container);
        }
    }
}
