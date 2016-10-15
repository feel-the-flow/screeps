var takeRoom = {
    run: function(current_room,my) {
        var takers = _.filter(Game.creeps, (creep) => creep.memory.role == 'taker');
        if(takers.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE],
                undefined, {role: 'taker'});
                console.log('Spawning new mover: ' + newName);
        }
        if(my==true){
        var exit = current_room.find(FIND_EXIT_BOTTOM);
        takers[0].moveTo(exit[1])

        }
        else {
            takers[0].move(BOTTOM)
            var loc = takers[0].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL);
                    }
            });
            console.log("new function " + loc)
        }
    }
}
module.exports = takeRoom;
