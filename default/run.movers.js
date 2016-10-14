var roleMover2 = require('role.mover2');
var roleMover = require('role.mover')
var runMovers = {
    run: function(room_source_container, spawn_container,controller_container,spawn_container_d) {
        var movers1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover2' &&
            creep.memory.source==0);
        var movers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover2' &&
            creep.memory.source==1);
        var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
        console.log('Movers 1: ' + movers1.length + ' Movers 2: ' + movers2.length
            + ' Movers: '+ movers.length);
        if(movers1.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                undefined, {role: 'mover2', source: 0});
            console.log('Spawning new mover: ' + newName);
        }
        if(movers2.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                undefined, {role: 'mover2', source: 1});
            console.log('Spawning new mover: ' + newName);
        }
        if(movers.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                undefined, {role: 'mover'});
            console.log('Spawning new mover: ' + newName);
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'mover2') {
                roleMover2.run(creep, room_source_container,spawn_container_d);
            }
            if(creep.memory.role == 'mover') {
                roleMover.run(creep, spawn_container, controller_container);
            }
        }
    }
}
module.exports = runMovers;
