var roleMover2 = {

    /** @param {Creep} creep **/
    run: function(creep, room_source_container, spawn_container_d) {
        if(creep.carry.energy<creep.carryCapacity*0.25 && creep.memory.source < 2){
            var container =Game.getObjectById( room_source_container[creep.memory.source])
            if(creep.withdraw(container, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN||
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            var targets2 = spawn_container_d;
            var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity*0.5;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            if(tower.length > 0) {
                if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0]);
                }
            }
            if(targets2.length > 0 && targets.length==0 && tower.length==0) {
                if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0]);
                }
            }
        }
    }
};

module.exports = roleMover2;
