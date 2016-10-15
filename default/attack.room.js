var attackRoom = {
    run: function(current_room,my) {
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackers');
        if(attackers.length < 0) {
            var newName = Game.spawns['Spawn1'].createCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],undefined, {role: 'attackers'});
                console.log('Spawning new attacker: ' + newName);
        }
        if(my==true){
        var exit = current_room.find(FIND_EXIT_BOTTOM);
        attackers[0].moveTo(exit[1])

        }
        else {
            attackers[0].move(BOTTOM)
            var loc = attackers[0].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL);
                    }
            });
            attackers[0].attack(loc)
            console.log("new function " + loc)
        }
    }
}
module.exports = attackRoom;
